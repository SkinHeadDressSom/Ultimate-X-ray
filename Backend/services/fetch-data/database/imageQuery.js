const pool = require("./postgres-config");

// get patient
async function getImageCount(an) {
  try {
    const query = `SELECT COUNT(*) AS image_count
                    FROM images AS i
                    INNER JOIN medicalrecords AS m
                    ON i.record_id = m.record_id 
                    WHERE m.AN = $1`;
    const result = await pool.query(query, [an]);

    return { count: result.rows[0].image_count || 0 }; // Return count 0 if no images are found
  } catch (error) {
    console.error("Database error in getImageCount:", error.message);
    // return an error object
    return {
      error: error.message,
      code: error.code || "UNKNOWN_ERROR",
    };
  }
}

module.exports = { getImageCount };
