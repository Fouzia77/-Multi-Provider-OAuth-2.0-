const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");

require("./config/env");      // load environment variables
require("./config/redis");    // initialize redis connection


const authRoutes = require("./routes/auth.routes");

const app = express();

const userRoutes = require("./routes/user.routes");

app.use("/api", userRoutes);

const protectedRoutes = require("./routes/protected.routes");

app.use("/api/protected", protectedRoutes);


require("./config/passport");

const passport = require("passport");
app.use(passport.initialize());

/* =======================
   Global Middlewares
======================= */

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

/* =======================
   Rate Limiting
======================= */

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,                // limit each IP
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(limiter);

/* =======================
   Health Check
======================= */

app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

/* =======================
   Routes
======================= */
app.use("/api/auth", authRoutes);


/* =======================
   404 Handler
======================= */

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

/* =======================
   Error Handler
======================= */

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: "Internal Server Error",
  });
});

module.exports = app;
