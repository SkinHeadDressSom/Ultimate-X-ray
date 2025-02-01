const pool = require("./postgres-config");

// get patient
async function getCasebyHN(hn) {
  try {
    const query = `SELECT *
                    FROM medicalrecords AS m
                    INNER JOIN patients AS p
                    ON m.patient_id = p.patient_id
                    WHERE hn = $1`;
    const results = await pool.query(query, [hn]);

    // check if query is empty
    if (results.rows.length === 0) {
      return null;
    }

    return {
      hn: results.rows[0].hn,
      patient_cases: results.rows.map((row) => ({
        an: row.an,
        status: row.status,
        description: row.description,
        study_date: row.created_at,
      })),
    };
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
