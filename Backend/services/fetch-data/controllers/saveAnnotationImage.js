const dotenv = require("dotenv");
const { RESPONSE_MESSAGES } = require("../utils/ErrorMessages");
const { decodeToken } = require("../utils/CookiesManagement");
const { getImagebyXN } = require("../database/imageQuery");
const { UploadFiletoSupabase } = require("../utils/UploadFiletoSupabase");
const { DeleteFilefromSupabase } = require("../utils/DeleteFilefromSupabase");
const {
  getAnnotationImage,
  createAnnotationImage,
} = require("../database/annotationQuery");

const saveAnnotationImage = async (req, res) => {
  RESPONSE_MESSAGES.taskError = "An error occurred at save annotation image";
  RESPONSE_MESSAGES.taskSuccess = "Save annotation successfully";
  RESPONSE_MESSAGES.missingArguments = "XN is missing";
  RESPONSE_MESSAGES.notFound = "Original Image not found";
  RESPONSE_MESSAGES.supabaseError = "Error at Supabase";
  dotenv.config();

  try {
    // get xn from params
    const { xn } = req.params;
    if (!xn) {
      return res.status(400).json({
        message: RESPONSE_MESSAGES.missingArguments,
      });
    }

    // get image_id from getImagebyXN
    const image = await getImagebyXN(xn);
    // Handling query error
    if (image?.error) {
      return res.status(500).json({
        message: RESPONSE_MESSAGES.databaseError,
        error: image.error,
      });
    }
    if (!image) {
      return res.status(404).json({
        message: RESPONSE_MESSAGES.notFound,
      });
    }
    const image_id = image.image_id;

    // get user_id from token [SKIP handle error since this process has done on middleware]
    const token = req.cookies.token;
    const decoded = await decodeToken(token);
    const user_id = decoded.user_id;

    // check if image_id and user_id already exist in database
    const existed_annotation = await getAnnotationImage(user_id, xn);
    // Handling query error
    if (existed_annotation?.error) {
      return res.status(500).json({
        message: RESPONSE_MESSAGES.databaseError,
        error: existed_annotation.error,
      });
    }

    // if exist get its filepath and delete image [the createAnnotationImage will overwrite itself]
    if (existed_annotation && existed_annotation.file_path) {
      const delete_image = await DeleteFilefromSupabase(existed_annotation.file_path);
      if (!delete_image.success) {
        return res.status(500).json({ message: RESPONSE_MESSAGES.supabaseError, error: delete_image.error });
      }
    }

    // get files from request
    const image_file = req.file;
    // Check if file exists
    if (!image_file) {
      return res.status(400).json({ message: "Uploaded file not found" });
    }

    const file_name = `annotation-images/${user_id}_${xn}_${new Date().toISOString().replace(/[-:.TZ]/g, '')}.png`;
    console.log("File_name :", file_name);

    // Upload annotation image to Supabase
    const public_url = await UploadFiletoSupabase(req.file.buffer, file_name);
    if (public_url?.error) {
      return res.status(500).json({
        message: RESPONSE_MESSAGES.supabaseError,
        error: public_url.error,
      });
    }

    // insert to annotation table
    const newAnnoImage = await createAnnotationImage(
      user_id,
      image_id,
      public_url
    );
    if (newAnnoImage.error) {
      return res.status(500).json({
        message: RESPONSE_MESSAGES.databaseError,
        error: newAnnoImage.error,
      });
    }

    return res.status(201).json({
      message: RESPONSE_MESSAGES.taskSuccess, file_url: public_url
    });
  } catch (error) {
    console.error("Error in save annotation controller ->", error.message);
    return res.status(500).json({
      message: RESPONSE_MESSAGES.taskError,
      error: error.message,
    });
  }
};

module.exports = { saveAnnotationImage };
