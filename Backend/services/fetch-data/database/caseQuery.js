const pool = require("./postgres-config");

// get patient
async function getCasebyHN(hn) {
  try {
    const query = `SELECT *
                    FROM medicalrecords AS m
                    INNER JOIN patients AS p
                    ON m.patient_id = p.patient_id 
                    WHERE p.HN = $1`;
    const result = await pool.query(query, [hn]);

    // check if query is empty
    if (result.rows.length === 0) {
      return null;
    }

    const cases = result.rows.map((row) => ({
      HN: row.hn,
      AN: row.an,
      status: row.status,
      description: row.description,
      study_date: row.created_at,
    }));

    return cases;
  } catch (error) {
    console.error("Database error in getCasebyHN:", error.message);
    // return an error object
    return {
      error: error.message,
      code: error.code || "UNKNOWN_ERROR",
    };
  }
}

module.exports = { getCasebyHN };
