const utils = require("../global/utils.js");
const bcrypt = require("bcrypt");
const ObjectId = require("mongodb").ObjectID;
const User = require("../mongo/model/user/user.model.js");

module.exports.initChangePassword = (app) => {
  app
    .route("/api/user/settings/password/check")
    .get((req, res) => { })
    .post(utils.isSessionCookieValid, (req, res, next) => {
      console.log('req body:', req.body);
      User.findOne(
        {
          _id: new ObjectId(req.session.passport.user._id),
        },
        (err, user) => {
          console.log('err', err);
          console.log('user findone', user);
          if (err) {
            return next(err);
          }
          if (!user) {
            return res.status(403).json({
              user: null,
            });
          }
          bcrypt.compare(
            req.body.currentPassword,
            user.password,
            (err, match) => {
              if (err) {
                return next(err);
              }
              if (!match) {
                res.json({
                  passwordMatch: false,
                });
              }
              res.json({
                passwordMatch: true,
              });
            }
          );
        }
      );
    });
  app
    .route("/api/user/settings/password/change")
    .get((req, res) => { })
    .post(utils.isSessionCookieValid, (req, res, next) => {
      const findQuery = {
        _id: new ObjectId(req.session.passport.user._id),
      };

      const updateData = (hash) => {
        return {
          $set: {
            password: hash,
          },
        };
      };

      bcrypt.hash(req.body.repeatPassword, 10, (err, hash) => {
        if (err) {
          return next(err);
        }
        User.findOneAndUpdate(
          findQuery,
          updateData(hash),
          {
            useFindAndModify: false,
            new: true,
          },
          (err, user) => {
            if (err) {
              return next(err);
            } else if (!user) {
              return res.status(403).json({
                user: null,
              });
            }
            req.session = null;
            res.clearCookie("auth");
            res.end();
            // send confirmation mail here if agreed with Marko
          }
        );
      });
    });
};
