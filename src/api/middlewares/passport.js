const LocalStrategy = require("passport-local").Strategy;
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
