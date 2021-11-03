const utils = require("../global/utils");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const User = require("../mongo/model/user/user.model.js");

module.exports.initForgotPassword = app => {
  app.post("/api/password/forgot", (req, res, next) => {
    console.log("mail here", req.body.confirmedEmail);

    const token = crypto.randomBytes(20).toString("hex");

    const findQuery = {
      email: req.body.confirmedEmail
    };

    // pass expires in one hour
    const updateData = {
      $set: {
        resetPasswordToken: token,
        resetPasswordExpires: Date.now() + 3600000
      }
    };

    // deprecation warning
    User.findOneAndUpdate(
      findQuery,
      updateData,
      {
        useFindAndModify: false,
        new: true
      },
      (err, user) => {
        if (err) {
          return next(err);
        } else if (!user) {
          return res.json({ user: null });
        }
        const SERVICE_NAME = "Namecheap";
        const SUBJECT = "CoffeeToCup Forgot Password";
        let RECIPIENT = user.email;
        let MESSAGE_CONTENT =
          "You are receiving this because you (or someone else) have requested a password reset for your account.\n\n" +
          "Please click on the following link, or paste this into your browser to complete the process:\n\n" +
          global.socialMediaCallbackHost + "reset-password/" + token + "\n\n" +
          "If you have not made the request, please ignore this email and your password will remain unchanged.\n";

        utils
          .sendMail(SERVICE_NAME, RECIPIENT, SUBJECT, MESSAGE_CONTENT)
          .then(_ => res.json({ user: user.email }))
          .catch(err => {
            console.log("error occured while sending mail", err);
            res.json({});
          });
      }
    );
  });

  // change password - reset password
  app.post("/api/password/reset", (req, res, next) => {
    console.log(req.params);

    const findQuery = {
      resetPasswordToken: req.body.token,
      resetPasswordExpires: {
        $gt: Date.now()
      }
    };
    const updateData = hash => {
      return {
        $set: {
          password: hash,
          resetPasswordToken: null,
          resetPasswordExpires: null
        }
      };
    };

    bcrypt.hash(req.body.password, 10, (err, hash) => {
      if (err) {
        console.log("went for first error", err);
        return next(err);
      }
      User.findOneAndUpdate(
        findQuery,
        updateData(hash),
        {
          useFindAndModify: false,
          new: true
        },
        (err, user) => {
          if (err) {
            console.log("went to second error", err);
            return next(err);
          } else if (!user) {
            return res.status(403).json({
              user: null
            });
          }
          req.session = null;
          res.clearCookie("auth");
          res.json({});
        }
      );
    });
  });
};
