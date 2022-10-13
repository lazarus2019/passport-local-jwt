const LocalStrategy = require("passport-local").Strategy;
const JwtStrategy = require("passport-jwt").Strategy;
const { ExtractJwt } = require("passport-jwt");
const passport = require("passport");
const User = require("../models/userModel");
const { decodePassword } = require("../../utils/password");

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await User.findOne({ username });
      if (!user) return done(null, false);

      const decodePass = decodePassword(user.password);

      if (decodePass != password) return done(null, false);

      done(null, { username, password, active: true }); // passing data to serialize
    } catch (error) {
      done(error, false);
    }
  })
);

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken("Authorization"),
      secretOrKey: process.env.TOKEN_SECRET_KEY,
    },
    (jwt_payload, done) => {
      // Get user by id
      User.findOne({ id: jwt_payload.id }, (err, user) => {
        if (err) {
          return done(err, false);
        }
        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
          // or you could create a new account
        }
      });
    }
  )
);

passport.serializeUser((user, done) => {
  // user had passed by local (the code above)

  done(null, user.username);
});

passport.deserializeUser(async (username, done) => {
  // Check username (username that pass by serialize code above and decode)
  const user = await User.findOne({ username });
  return done(null, {
    username,
    active: true,
  });
});
