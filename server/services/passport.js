const passport = require("passport");
const User = require("../models/User");
const config = require("./../config/config");
const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;
const LocalStrategy = require("passport-local");
const bcrypt = require("bcryptjs");

// Local Strategy
const localOptions = {
  usernameField: "email"
};

const localLogin = new LocalStrategy(localOptions, function(
  email,
  password,
  done
) {
  User.findOne({ email: email }, function(err, data) {
    if (err) {
      return done(err, false);
    }

    if (!data) {
      return done(null, false);
    }

    // compare passwords
    bcrypt.compare(password, data.password, function(err, isMatch) {
      if (err) {
        return done(err);
      }

      if (!isMatch) return done(null, false);

      return done(null, data);
    });
  });
});

// JWT
const jwtOptions = {
  secretOrKey: config.secret,
  jwtFromRequest: ExtractJWT.fromHeader("authorization")
};

const jwtLogin = new JWTStrategy(jwtOptions, function(payload, done) {
  User.findById(payload.id, function(err, data) {
    if (err) {
      return done(err, false);
    }

    if (data) {
      done(null, data);
    } else {
      done(null, false);
    }
  });
});

passport.use(jwtLogin);
passport.use(localLogin);
