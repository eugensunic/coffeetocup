const UserProfileSettings = require("../mongo/model/user/user-profile-settings.model.js");
const utils = require("../global/utils.js");
const ObjectId = require("mongodb").ObjectID;
const User = require("../mongo/model/user/user.model.js");
const bcrypt = require('bcrypt');
const multer = require("multer");
const upload = multer({
  dest: "uploads/profile-image",
});

module.exports.initBasicSettings = (app) => {
  // Basic route
  app
    .route("/api/user/settings/basic")
    .get(utils.isSessionCookieValid, (req, res, next) => {
      const id =
        req.query.otherUserId !== "undefined" && !!req.query.otherUserId
          ? req.query.otherUserId
          : req.session.passport.user._id;

      const userProfileSettings = UserProfileSettings.findOne({
        user_FK: new ObjectId(id),
      });
      const userBasicInfo = User.findOne({
        _id: new ObjectId(id)
      });

      Promise.all([userProfileSettings, userBasicInfo])
        .then(([settings, user]) => {
          console.log('user here', user);
          let userSettings = {};
          if (settings) {
            userSettings = {
              city: settings.city,
              country: settings.country,
              dateOfBirth: settings.dateOfBirth,
              profileImagePath: settings.profileImage
                ? utils.getImagePath(
                  settings.profileImage.path,
                  utils.profileImageFolder
                )
                : utils.defaultImagePath,
              profileImageName: settings.profileImage
                ? settings.profileImage.originalName
                : "default",
            };
          }
          return res.json({
            ...userSettings,
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            emailId: user.emailId
          });

        })
        .catch((err) => next(err));
    })
    .post(utils.isSessionCookieValid, (req, res, next) => {
      // console.log('result here POST', result);
      console.log('passport value',);
      console.log('req body POST', req.body);
      const findEmail = User.findOne({
        email: req.body.email
      });
      const findUsername = User.findOne({
        username: req.body.username
      });

      Promise.all([findEmail, findUsername]).then(([emailResult, usernameResult]) => {
        if (req.session.passport.user.email !== req.body.email) {
          if (emailResult && emailResult.email === req.body.email) {
            return res.status(200).json({ message: 'Email already exists, try another one' });
          }
        }
        if (req.body.isSocialMedia && usernameResult && usernameResult.username === req.body.username) {
          return res.status(200).json({ message: 'Username already exists, try another one' });
        }

        Promise.all([updateUserProfileBasicData(req), updateBasicData(req)])
          .then(([x, y]) => {
            console.log('updated, basic data', y);
            const response = {
              city: x.city,
              country: x.country,
              username: y.username,
              email: y.email,
              firstName: y.firstName,
              lastName: y.lastName,
            };

            return res.json(response);
          })
          .catch((err) => next(err));
      });
    });

  // Image route
  // upload single('file'), name file has to match stream name on FE
  app
    .route("/api/user/settings/image")
    .get(utils.isSessionCookieValid, (req, res, next) => {
      UserProfileSettings.findOne(
        {
          user_FK: new ObjectId(req.session.passport.user._id),
        },
        (err, user) => {
          if (err) {
            return next(err);
          }
          if (!user) {
            return res.end();
          }
          const imagePath = user.profileImage
            ? user.profileImage.path
            : utils.defaultImagePath;
          res.json(utils.getImagePath(imagePath, utils.profileImageFolder));
        }
      );
    })
    .post(
      utils.isSessionCookieValid,
      upload.single("file"),
      (req, res, next) => {
        const userId = req.session.passport.user._id;
        let deleteImagePath;
        // normal user flow for updating image with deletion inside then
        if (!req.file) {
          console.log("No file received");
          return res.json({
            success: false,
          });
        }
        // call this to delete the image after response
        utils
          .getUserProfileSettings(userId)
          .exec()
          .then((x) => {
            if (!x || !x.profileImage) {
              console.log("no profile image found");
              return Promise.resolve();
            }

            deleteImagePath = x.profileImage.path;
            return Promise.resolve();
          })
          .then((_) => updateUserProfileImage(req).exec())
          .then((x) => {
            res.json(
              utils.getImagePath(x.profileImage.path, utils.profileImageFolder)
            );
          })
          .then((_) => {
            utils.deletePreviousProfileImage(deleteImagePath);
          })
          .catch((err) => {
            return next(err);
          });
      }
    );

  app
    .route("/api/user/settings/delete-image")
    .post(utils.isSessionCookieValid, (req, res, next) => {
      const userId = req.session.passport.user._id;
      let deleteImagePath;
      utils
        .getUserProfileSettings(userId)
        .exec()
        .then((x) => {
          if (!x || !x.profileImage) {
            console.log("no profile image found");
            return Promise.resolve();
          }
          deleteImagePath = x.profileImage.path;
          return Promise.resolve();
        })
        .then((_) => {
          res.json(
            utils.getImagePath(utils.defaultImagePath, utils.profileImageFolder)
          );
        })
        .then((_) => {
          if (deleteImagePath) {
            return utils.deletePreviousProfileImage(deleteImagePath);
          }
          return Promise.resolve();
        })
        .then((_) => deleteImagePathInDatabase(req))
        .catch((err) => {
          return next(err);
        });
    });
};

function updateBasicData(req) {
  const findQuery = {
    _id: new ObjectId(req.session.passport.user._id)
  };
  let updateData = null;
  console.log('REQ BODY HERE', !!req.body.password)
  if (!!req.body.password) {
    return bcrypt.hash(req.body.password, 10)
      .then(function (hash) {
        updateData = {
          $set: {
            username: req.body.username,
            email: req.body.email,
            password: hash,
            firstName: req.body.firstName,
            lastName: req.body.lastName
          }
        };
        return User.findOneAndUpdate(findQuery, updateData, { new: true });
      });
  }
  updateData = {
    $set: {
      username: req.body.username,
      email: req.body.email,
      firstName: req.body.firstName,
      lastName: req.body.lastName
    }
  };
  return User.findOneAndUpdate(findQuery, updateData, { new: true });
}

function updateUserProfileImage(req) {
  const findQuery = {
    user_FK: new ObjectId(req.session.passport.user._id),
  };
  const updateData = {
    $set: {
      profileImage: {
        originalName: req.file.originalname,
        fileName: req.file.filename,
        path: req.file.path,
        mimeType: req.file.mimetype,
      },
    },
  };
  return UserProfileSettings.findOneAndUpdate(findQuery, updateData, {
    upsert: true,
    useFindAndModify: false,
    new: true,
  });
}

function updateUserProfileBasicData(req) {
  const findQuery = {
    user_FK: new ObjectId(req.session.passport.user._id),
  };
  const updateData = {
    $set: {
      country: req.body.country,
      city: req.body.city,
      dateOfBirth: req.body.dateOfBirth,
      user_FK: new ObjectId(req.session.passport.user._id),
    },
  };
  return UserProfileSettings.findOneAndUpdate(findQuery, updateData, {
    upsert: true,
    useFindAndModify: false,
    new: true,
  });
}

function deleteImagePathInDatabase(req) {
  const findQuery = {
    user_FK: new ObjectId(req.session.passport.user._id),
  };
  const updateData = {
    $set: {
      profileImagePath: null,
      profileImage: null,
    },
  };
  return UserProfileSettings.findOneAndUpdate(findQuery, updateData, {
    upsert: true,
    useFindAndModify: false,
    new: true,
  });
}
