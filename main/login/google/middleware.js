const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../../mongo/model/user/user.model.js");
const utils = require('../../global/utils.js');

module.exports = {
  /* 
    configure crendentials on this link
    https://console.developers.google.com/apis/credentials?clientUpdateTime=2020-04-04T19:31:20.591255Z&project=web-generics 
   
  */
  googleStrategyMiddleware: passport => {
    passport.use(
      new GoogleStrategy(
        {
          clientID:
            "831319876929-t97hqlfdh6babotlb44a1rg2bpgtnbb6.apps.googleusercontent.com",
          clientSecret: "8iaNnef-dwqR8nPJqogl6WYs",
          callbackURL: global.socialMediaCallbackHost + "auth/google/callback",
          passReqToCallback: true
        },
        (request, accessToken, refreshToken, profile, done) => {
          console.log("Google account: ", profile);
          User.findOne(
            {
              emailId: profile._json.sub
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
                emailId: profile._json.sub,
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
