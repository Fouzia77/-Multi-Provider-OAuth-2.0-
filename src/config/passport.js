const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const GitHubStrategy = require("passport-github2").Strategy;
const pool = require("./db");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails[0].value;

        // 1️⃣ Find or create user
        let user = await pool.query(
          "SELECT * FROM users WHERE email=$1",
          [email]
        );

        if (!user.rows.length) {
          user = await pool.query(
            "INSERT INTO users (name, email) VALUES ($1,$2) RETURNING *",
            [profile.displayName, email]
          );
        }

        // 2️⃣ Link provider
        await pool.query(
          `INSERT INTO auth_providers (user_id, provider, provider_user_id)
           VALUES ($1,'google',$2)
           ON CONFLICT DO NOTHING`,
          [user.rows[0].id, profile.id]
        );

        done(null, user.rows[0]);
      } catch (err) {
        done(err);
      }
    }
  )
);

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.GITHUB_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email =
          profile.emails && profile.emails[0]
            ? profile.emails[0].value
            : null;

        const user = {
          provider: "github",
          providerId: profile.id,
          name: profile.username,
          email,
        };

        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
 )
);


module.exports = passport;
