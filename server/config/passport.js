import passport from "passport";
import googleOwnerStrategy from "./strategy/google-owner.js";

passport.use("google-owner", googleOwnerStrategy);

passport.serializeUser((user, done) => {
  done(null, { id: user._id, role: user.role });
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

export default passport;
