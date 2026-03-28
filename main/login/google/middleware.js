const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../../mongo/model/user/user.model.js");
const utils = require('../../global/utils.js');

module.exports = {
  /*
    Configure credentials in environment variables:
    GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET
    Get them from: https://console.cloud.google.com/apis/credentials

  */
  googleStrategyMiddleware: passport => {
    passport.use(
      new GoogleStrategy(
        {
          clientID: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          callbackURL: global.socialMediaCallbackHost + "auth/google/callback",
          passReqToCallback: true
        },
        (request, accessToken, refreshToken, profile, done) => {
          console.log("Google account: ", profile);
          User.findOne(
            {
              emailId: profile._json.email
            },
            (err, user) => {
              console.log("google user: ", user);
              if (err) {
                return done(err);
              }
              if (user) {
                console.log("user already exists (google)");
                return done(null, user);
              }
              console.log(profile);
              // generate random password here, wrap this with bcrypt shown below
              const userNew = new User({
                firstName: profile._json.given_name,
                lastName: profile._json.family_name,
                emailId: profile._json.email,
                registrationTime: utils.getCurrentDateTimeString(),
                password: null
              });
              userNew.save().then(x => {
                console.log("google user saved", x);
                done(null, x);
              });
            }
          );
        }
      )
    );
  }
};

// bcrypt.hash(utils.generateRandomPassword(), 10, (err, hash) => {
//     if (err) {
//       return next(err);
//     }
//     const userNew = new User({
//       firstName: firstName,
//       lastName: lastName,
//       username: username,
//       email: email,
//       password: hash,
//       registrationTime: utils.getCurrentDateTimeString()
//     });
//     userNew.save().then(() => {
//       res.send({
//         registrationSuccess: true
//       });
//       console.log('saved to database');
//     }).catch(() => next(err));
//   });
