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
          hn: result.rows[0].hn,
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

async function getPatientbyName(name) {
  try {
    const searchTerm = `%${name}%`; // Adds % to the user input for partial matching
    const query = `SELECT *
                    FROM patients
                    WHERE first_name LIKE $1 
                    OR last_name LIKE $1 
                    OR CONCAT(first_name, ' ', last_name) LIKE $1`;
    const result = await pool.query(query, [searchTerm]); // Pass searchTerm as a parameter

    // check if query is empty
    if (result.rows.length === 0) {
      return null;
    }

    const search_result = result.rows.map((row) => ({
      hn: row.hn,
      first_name: row.first_name,
      last_name: row.last_name,
      date_of_birth: row.date_of_birth,
      sex: row.sex,
      height: row.height,
      weight: row.weight,
      phone: row.phone,
      address: row.address,
    }));
    return search_result;
  } catch (error) {
    console.error("Database error in getPatient:", error.message);
    // return an error object
    return {
      error: error.message,
      code: error.code || "UNKNOWN_ERROR",
    };
  }
}

module.exports = { getPatientbyHN, getPatientbyName };
