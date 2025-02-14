const pool = require("./postgres-config");

// get patient
async function getAnnotationImage(user_id, xn) {
  try {
    const query = `SELECT i.xn, a.file_path, a.created_at
                    FROM annotations as a
                    INNER JOIN images as i
                    ON a.image_id = i.image_id
                    WHERE user_id = $1 
                    AND xn = $2`;
    const result = await pool.query(query, [user_id, xn]);
    // check if query is empty
    return result.rows.length === 0
      ? null
      : {
          xn: result.rows[0].xn,
          file_path: result.rows[0].file_path,
          created_at: result.rows[0].created_at,
        };
  } catch (error) {
    console.error("Database error in getAnnotationImage:", error.message);
    // return an error object
    return {
      error: error.message,
      code: error.code || "UNKNOWN_ERROR",
    };
  }
}

async function createAnnotationImage(user_id, image_id, file_path) {
  try {
    const query = `
      INSERT INTO Annotations (image_id, user_id, file_path, created_at)
      VALUES ($1, $2, $3, $4)
      ON CONFLICT (image_id, user_id) 
      DO UPDATE SET file_path = EXCLUDED.file_path, created_at = EXCLUDED.created_at
      RETURNING *`;

    const result = await pool.query(query, [
      image_id,
      user_id,
      file_path,
      new Date(),
    ]);

    // Check if query returned rows (either new or updated)
    return result.rows.length === 0
      ? null
      : {
          file_path: result.rows[0].file_path,
          created_at: result.rows[0].created_at,
        };
  } catch (error) {
    console.error("Database error in createAnnotationImage:", error.message);
    // Return an error object
    return {
      error: error.message,
      code: error.code || "UNKNOWN_ERROR",
    };
  }
}

module.exports = { getAnnotationImage, createAnnotationImage };