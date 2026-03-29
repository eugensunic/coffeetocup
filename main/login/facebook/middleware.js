const FacebookStrategy = require("passport-facebook").Strategy;
const User = require("../../mongo/model/user/user.model.js");
const utils = require("../../global/utils.js");

module.exports = {
  facebookStrategyMiddleware: passport => {
    /*
        Configure credentials in environment variables:
        FACEBOOK_APP_ID and FACEBOOK_APP_SECRET
        Get them from: https://developers.facebook.com/apps/
    */
    passport.use(
      new FacebookStrategy(
        {
          clientID: process.env.FACEBOOK_APP_ID,
          clientSecret: process.env.FACEBOOK_APP_SECRET,
          callbackURL: global.socialMediaCallbackHost + "auth/facebook/callback",
          profileFields: ["id", "name", "email"]
        },
        (accessToken, refreshToken, profile, done) => {
          console.log("Facebook profile: ", profile);
          User.findOne(
            {
              emailId: profile._json.email || profile._json.id
            },
            (err, user) => {
              if (err) {
                return done(err);
              }
              console.log("facebook user: ", user);
              if (user) {
                console.log("user already exists");
                return done(null, user);
              }
              // generate random password here, wrap this with bcrypt shown below
              const userNew = new User({
                firstName: profile._json.first_name,
                lastName: profile._json.last_name,
                emailId: profile._json.email || profile._json.id,
                registrationTime: utils.getCurrentDateTimeString(),
                password: null,
              });

              userNew.save().then(x => {
                console.log("user has been saved facebook: ", x);
                done(null, x);
              });
            }
          );
        }
      )
    );
  }
};
// email format (facebook, google)
// emails: [ { value: 'eugen.sunic@gmail.com', type: 'account' } ],

// registration properties

// firstName: firstName,
// lastName: lastName,
// username: username,
// email: email,
// password: hash,
// registrationTime: time

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
