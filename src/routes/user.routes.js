const router = require("express").Router();
const auth = require("../middleware/auth.middleware");

router.get("/me", auth, (req, res) => {
  res.json({
    id: req.user.id,
    role: req.user.role,
  });
});

module.exports = router;