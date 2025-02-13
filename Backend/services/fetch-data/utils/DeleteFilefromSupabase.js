const dotenv = require("dotenv");
const { createClient } = require("@supabase/supabase-js");

dotenv.config();

async function DeleteFilefromSupabase(full_url) {
  try {
    // Initializing supabase
    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_KEY,
      { auth: { persistSession: false } }
    );

    // replace base url with ""
    const file_path = full_url.replace(process.env.IMAGE_BASE_URL, "");

    // Delete file from Supabase
    const { data, error } = await supabase.storage
      .from("pacs")
      .remove([file_path]);

    console.log("Deleting file from Supabase...", data);
    // If there's an error during upload
    if (error) {
      console.error("Error during file upload to Supabase:", error.message);
      return {
        success: false,
        message: `File upload failed: ${error.message}`,
        errorDetails: error,
      };
    }

    return {
      success: true,
      message: `File Deleted successfully`,
    };
  } catch (error) {
    console.error("Error at Upload to Supabase function:", error.message);
    return { error: error.message };
  }
}
module.exports = { DeleteFilefromSupabase };
