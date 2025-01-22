const pool = require("./postgres-config");

// get patient
async function getPatientbyHN(hn) {
  try {
    const query = `SELECT * FROM patients WHERE hn = $1`;
    const result = await pool.query(query, [hn]);

    // check if query is empty
    return result.rows.length === 0
      ? null
      : {
          HN: result.rows[0].HN,
          first_name: result.rows[0].first_name,
          last_name: result.rows[0].last_name,
          date_of_birth: result.rows[0].date_of_birth,
          sex: result.rows[0].sex,
          height: result.rows[0].height,
          weight: result.rows[0].weight,
          phone: result.rows[0].phone,
          address: result.rows[0].address,
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

module.exports = { getPatientbyHN };
