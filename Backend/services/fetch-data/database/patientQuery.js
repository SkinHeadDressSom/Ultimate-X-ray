const pool = require("./postgres-config");

// get patient
async function getPatient(id) {
  try {
    const query = `SELECT * FROM patients WHERE patient_id = $1`;
    const result = await pool.query(query, [id]);

    // check if query is empty
    return result.rows.length === 0
      ? null
      : {
          patient_id: result.rows[0].patient_id,
          first_name: result.rows[0].first_name,
          last_name: result.rows[0].last_name,
          date_of_birth: result.rows[0].date_of_birth,
          sex: result.rows[0].sex,
          height: result.rows[0].height,
          weight: result.rows[0].weight,
          phone: result.rows[0].phone,
        };
  } catch (error) {
    console.error("Database error in getPatient:", error.message);
    // return an error object
    return {
      error: error.message,
      code: error.code || "UNKNOWN_ERROR",
    };
  }
}

module.exports = { getPatient };
