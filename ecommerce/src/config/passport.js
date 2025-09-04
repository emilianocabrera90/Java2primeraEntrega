const passport = require("passport");
const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt");
const User = require("../dao/models/User.model");

function initializePassport() {
  const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
  };

  // Estrategia JWT principal
  passport.use(
    "jwt",
    new JwtStrategy(opts, async (jwtPayload, done) => {
      try {
        const user = await User.findById(jwtPayload.sub).lean();
        if (!user) return done(null, false, { message: "User not found" });
        // Sanitizamos (sin password)
        delete user.password;
        return done(null, user);
      } catch (err) {
        return done(err, false);
      }
    })
  );

  // Alias "current" (misma verificación, por claridad con la consigna)
  passport.use("current", passport._strategy("jwt"));
}

module.exports = { initializePassport };
