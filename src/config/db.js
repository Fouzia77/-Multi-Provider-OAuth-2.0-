const { Pool } = require("pg");

const pool = new Pool({
  host: "db",                 // 👈 HARD-CODE for docker
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: 5432,
});

pool.on("connect", () => {
  console.log("✅ PostgreSQL connected");
});

pool.on("error", (err) => {
  console.error("❌ PostgreSQL error", err);
});

module.exports = pool;
