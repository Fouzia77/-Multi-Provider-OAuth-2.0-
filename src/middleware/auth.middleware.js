const jwt = require("jsonwebtoken");
const redis = require("../config/redis");

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    // 🔒 Check blacklist
    const blacklisted = await redis.get(`bl_${token}`);
    if (blacklisted) {
      return res.status(401).json({ message: "Token revoked" });
    }

    // ✅ Verify token
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    req.user = decoded;

    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
