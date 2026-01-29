const db = require("../config/db");

exports.me = async (req, res) => {
  const result = await db.query(
    "SELECT id,name,email,role FROM users WHERE id=$1",
    [req.user.id]
  );
  res.json(result.rows[0]);
};

exports.updateMe = async (req, res) => {
  const { name } = req.body;
  const result = await db.query(
    "UPDATE users SET name=$1 WHERE id=$2 RETURNING id,name,email,role",
    [name, req.user.id]
  );
  res.json(result.rows[0]);
};

exports.listUsers = async (_, res) => {
  const result = await db.query("SELECT id,name,email,role FROM users");
  res.json(result.rows);
};
