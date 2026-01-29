const db = require("../config/db");

exports.findOrCreateOAuthUser = async ({
  provider,
  providerId,
  email,
  name,
}) => {
  const existingUser = await db.query(
    "SELECT * FROM users WHERE provider = $1 AND provider_id = $2",
    [provider, providerId]
  );

  if (existingUser.rows.length > 0) {
    return existingUser.rows[0];
  }

  const newUser = await db.query(
    `INSERT INTO users (email, name, provider, provider_id)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [email, name, provider, providerId]
  );

  return newUser.rows[0];
};
