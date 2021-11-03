const UserSettings = require("../../mongo/model/user/user-settings.model.js");
const User = require("../../mongo/model/user/user.model.js");
const ObjectId = require("mongodb").ObjectID;
const utils = require("../../global/utils.js");
const { setCookieMaxAge } = require('../../global/utils');

module.exports = {
  // use localhost:5000 for testing
  // occurs only when successful login
  init: (app, passport) => {
    app.post("/login", passport.authenticate("local"), (req, res, next) => {
      const userInfo = {};
      UserSettings.findOne(
        {
          user_FK: req.session.passport.user._id
        },
        (err, settings) => {
          if (err) {
            return next(err);
          }

          userInfo.id = req.session.passport.user._id;
          userInfo.firstName = req.session.passport.user.firstName;
          userInfo.lastName = req.session.passport.user.lastName;
          userInfo.email = req.session.passport.user.email;
          userInfo.username = req.session.passport.user.username;
          userInfo.settings = settings;

          res.cookie("auth", userInfo, setCookieMaxAge());
          res.json(userInfo);

          storeLoginTime(req.session.passport.user._id)
            .then(() => { })
            .catch(err => next(err));
          return;
        }
      );
    });
  }
};

function storeLoginTime(userId) {
  const findQuery = {
    _id: new ObjectId(userId)
  };
  const updateData = {
    $set: {
      loginTime: utils.getCurrentDateTimeString()
    }
  };
  return User.findOneAndUpdate(findQuery, updateData, {
    useFindAndModify: false,
    new: true
  });
}
