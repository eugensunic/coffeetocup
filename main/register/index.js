const bcrypt = require("bcrypt");
const User = require("../mongo/model/user/user.model.js");
const utils = require("../global/utils");

// localhost: 'mongodb://127.0.0.1:27017/users'
module.exports.initRegister = (app) => {
  app.route("/api/register").post((req, res, next) => {
    console.log("Request here email", req.body.email);
    console.log("Request here username", req.body.username);

    Promise.all([getUserEmail(req.body.email), getUserUsername(req.body.username)]).then(([email, username]) => {
      console.log(username, email);
      if (email) {
        console.log("User already exists email:", email);
        res.send({ emailExists: true });
        return;
      }
      if (username) {
        console.log("User already exists username:", username);
        res.send({ usernameExists: true });
        return;
      }
      console.log("User doesn't exist, save new user to database");
      saveUserToDatabase(
        req.body.firstName,
        req.body.lastName,
        req.body.username,
        req.body.email,
        req.body.registrationTime,
        req.body.password,
        res,
        next
      );
    }).catch(err => {
      if (err) {
        return next(err);
      }
    });

  });
};

function saveUserToDatabase(
  firstName,
  lastName,
  username,
  email,
  time,
  password,
  res,
  next
) {
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      return next(err);
    }
    const user = new User({
      firstName: firstName,
      lastName: lastName,
      username: username,
      email: email,
      password: hash,
      registrationTime: time,
    });
    user
      .save()
      .then(() => {
        res.send({
          registrationSuccess: true,
        });
        console.log("saved to database");
        //send mail
        const SERVICE_NAME = "gmail";
        const SUBJECT = "CoffeeToCup Registration";
        let RECIPIENT = user.email;
        let MESSAGE_CONTENT = "Successfully registered to CoffeeToCup service";

        utils
          .sendMail(SERVICE_NAME, RECIPIENT, SUBJECT, MESSAGE_CONTENT)
          .then((_) => console.log("Registration mail sent succesfully"))
          .catch((err) => {
            console.log("error occured while sending mail", err);
          });
      })
      .catch(() => next(err));
  });
}


function getUserEmail(email) {
  return User.findOne({ email: email }).exec();
}

function getUserUsername(username) {
  return User.findOne({ username: username }).exec();
}

