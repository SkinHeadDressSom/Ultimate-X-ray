const pool = require("./postgres-config");

// get patient cases with filter, sort, and pagination
async function getCasebyHN(hn, order, status, page) {
  const limit = 10; // Number of rows per page
  const offset = (page - 1) * limit; // Calculate offset for pagination

  try {
    let query = `
      SELECT m.an, m.status, m.description, m.created_at, p.hn
      FROM medicalrecords AS m
      INNER JOIN patients AS p
      ON m.patient_id = p.patient_id
      WHERE p.hn = $1
    `;

    // list of parameter include [hn, status(opt), limit, offset]
    const params = [hn];
    // status filter if provided
    if (status) {
      query += ` AND m.status = $2`;
      params.push(status);
    }

    // ordering and pagination
    query += `
      ORDER BY m.created_at ${order === "asc" ? "ASC" : "DESC"}
      LIMIT $${params.length + 1}
      OFFSET $${params.length + 2}
    `;

    params.push(limit, offset);

    const results = await pool.query(query, params);

    // Check if query result is empty
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
    return {
      error: error.message,
      code: error.code || "UNKNOWN_ERROR",
    };
  }
}

module.exports = { getCasebyHN };
