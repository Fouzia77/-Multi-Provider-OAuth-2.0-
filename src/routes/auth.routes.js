const passport = require("passport");
const router = require("express").Router();
const ctrl = require("../controllers/auth.controller");
const auth = require("../middleware/auth.middleware");
router.post("/register", ctrl.register);
router.post("/login", ctrl.login);

router.post("/refresh", ctrl.refresh);

router.post("/logout", auth, ctrl.logout);

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  ctrl.oauthSuccess
);

router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

/* GitHub callback */
router.get(
  "/github/callback",
  passport.authenticate("github", { session: false }),
  (req, res) => {
    res.json({
      message: "GitHub login successful",
      user: req.user,
    });
  }
);
module.exports = router;
