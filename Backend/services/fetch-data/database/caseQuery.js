const pool = require("./postgres-config");

// get patient cases with filter, sort, and pagination
async function getCasebyHN(hn, order, status, page) {
  const limit = 10; // Number of rows per page
  const offset = (page - 1) * limit; // Calculate offset for pagination

  try {
    let query = `
      SELECT m.an, m.status, m.description, m.clinical_history, m.examination_details, m.findings, m.impression, m.recommendations, m.action_comments, m.created_at, p.hn
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

    const orderType = order.toLowerCase() === "asc" ? "ASC" : "DESC";
    // ordering and pagination
    query += `
      ORDER BY m.created_at ${orderType}
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
        clinical_history: row.clinical_history,
        examination_details: row.examination_details,
        findings: row.findings,
        impression: row.impression,
        recommendations: row.recommendations,
        action_comments: row.action_comments,
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

async function updateRecordbyAN(
  an,
  findings,
  impression,
  recommendations,
  action_comments
) {
  try {
    const query = `UPDATE medicalrecords
                SET findings = $1,impression = $2, recommendations = $3, action_comments = $4
                WHERE an = $5`;
    const result = await pool.query(query, [
      findings,
      impression,
      recommendations,
      action_comments,
      an,
    ]);
    return result.rows.length === 0
      ? null
      : {
          an: result.rows[0].an,
          findings: result.rows[0].findings,
          impression: result.rows[0].impression,
          recommendations: result.rows[0].recommendations,
          action_comments: result.rows[0].action_comments,
        };
  } catch (error) {
    console.error("Database error in updateRecordbyAN:", error.message);
    return {
      error: error.message,
      code: error.code || "UNKNOWN_ERROR",
    };
  }
}

module.exports = { getCasebyHN, updateRecordbyAN };
