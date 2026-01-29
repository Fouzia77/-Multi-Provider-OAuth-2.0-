const dotenv = require("dotenv");

dotenv.config();

const requiredVars = [
  "PORT",
  "DB_HOST",
  "DB_USER",
  "DB_PASSWORD",
  "DB_NAME",
  "REDIS_HOST",
  "REDIS_PORT",
  "JWT_ACCESS_SECRET",
  "JWT_REFRESH_SECRET",
];

requiredVars.forEach((key) => {
  if (!process.env[key]) {
    console.warn(`⚠️ Environment variable ${key} is not set`);
  }
});

module.exports = {
  port: process.env.PORT || 8080,

  db: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    name: process.env.DB_NAME,
  },

  redis: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
  },

  jwt: {
    accessSecret: process.env.JWT_ACCESS_SECRET,
    refreshSecret: process.env.JWT_REFRESH_SECRET,
  },
};
