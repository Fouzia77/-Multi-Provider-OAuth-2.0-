const { createClient } = require("redis");

const redis = createClient({
  url: `redis://${process.env.REDIS_HOST || "cache"}:6379`,
});

redis.on("connect", () => console.log("✅ Redis connected"));
redis.on("error", (err) => console.error("Redis error", err));

redis.connect();

module.exports = redis;
