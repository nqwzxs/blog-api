const passport = require("passport");
const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

const User = require("../models/user.model");

module.exports = function () {
  const jwtOpts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
  };

  passport.use(
    new JWTStrategy(jwtOpts, function (payload, done) {
      User.findById(payload.sub).then((user, err) => {
        if (err) {
          return done(err, false);
        }

        if (!user) {
          return done(null, false);
        }

        return done(null, user);
      });
    }),
  );
};
