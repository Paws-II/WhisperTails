import passport from "passport";
import googleStrategy from "./strategies/google-login.js";

passport.use("google", googleStrategy);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

export default passport;
