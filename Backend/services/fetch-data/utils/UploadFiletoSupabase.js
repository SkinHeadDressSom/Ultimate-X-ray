const dotenv = require("dotenv");
const { createClient } = require("@supabase/supabase-js");

dotenv.config();

async function UploadFiletoSupabase(image_file, file_name) {
  try {
    // Initializing supabase
    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_KEY,
      { auth: { persistSession: false } }
    );

    // Upload file to Supabase
    const { data, error } = await supabase.storage
      .from("pacs")
      .upload(file_name, image_file, {
        cacheControl: "3600",
        upsert: false,
      });
    console.log("Uploading to Supabase...", data);

    // Handle upload file error
    if (error) {
      console.error("Error during file upload to Supabase:", error.message);
      return {
        error: error.message,
        message: `File upload failed: ${error.message}`,
      };
    }

    // get public_url from supabase
    const { data: public_url, error: url_error } = supabase.storage
      .from("pacs")
      .getPublicUrl(file_name);
    console.log("public_url...", public_url);

    //Handle get public_url error
    if (url_error) {
      console.error("Error during getPublicUrl from Supabase:", error.message);
      return {
        error: url_error.message,
        message: `File d failed: ${error.message}`,
      };
    }

    return public_url.publicUrl;
  } catch (error) {
    console.error("Supabase error in UploadFiletoSupabase:", error.message);
    // return an error object
    return {
      error: error.message,
    };
  }
}
module.exports = { UploadFiletoSupabase };
