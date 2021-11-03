const utils = require("../global/utils.js");
const UserSettings = require("../mongo/model/user/user-settings.model.js");
const ObjectId = require("mongodb").ObjectID;

module.exports.initUserSettings = app => {
  app
    .route("/api/user/settings")
    .get(utils.isSessionCookieValid, (req, res, next) => {
      const id = req.session.passport.user._id;
      UserSettings.findOne(
        {
          user_FK: id
        },
        (err, settings) => {
          if (err) {
            return next(err);
          }
          res.json(settings);
        }
      );
    })
    .post(utils.isSessionCookieValid, (req, res, next) => {
      updateUserSettings(req)
        .then(doc => {
          res.end();
        })
        .catch(err => {
          return next(err);
        });
    });
};

function updateUserSettings(req) {
  const findQuery = {
    user_FK: new ObjectId(req.session.passport.user._id)
  };
  const updateData = {
    $set: {
      originModalConfirmed: req.body.originModalConfirmed,
      gdprConfirmed: req.body.gdprConfirmed
    }
  };
  return UserSettings.findOneAndUpdate(findQuery, updateData, {
    upsert: true,
    useFindAndModify: false,
    new: true
  });
}
