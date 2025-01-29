const { createClient } = require("@supabase/supabase-js");
const dotenv = require("dotenv");
dotenv.config();

if (!process.env.SUPABASE_URL || !process.env.SUPABASE_KEY) {
  console.error("Missing Supabase environment variables.");
  process.exit(1);
}

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

module.exports = supabase;
