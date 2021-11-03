const nodemailer = require("nodemailer");
const fs = require("fs");
const UserProfileSettings = require("../mongo/model/user/user-profile-settings.model.js");
const ObjectId = require("mongodb").ObjectID;
const credentials = require("dotenv").config().parsed;

// check if user session is active (is user is logged in)
function isSessionCookieValid(req, res, next) {
  if (req.session.timeoutOccurred) {
    req.session = null;
    res.clearCookie("auth");
    res.status(401).json({
      timeOutOccurred: true
    });
    return;
  }
  if (JSON.stringify(req.session) === JSON.stringify({}) || !req.session) {
    req.session = null;
    res.clearCookie("auth");
    res.status(401).json({
      isLoggedIn: false
    });
    return;
  } else {
    next();
  }
}

function sendMail(serviceName, recipientMail, subjectName, contentText) {
  const message = {
    from: 'info@coffeetocup.com',
    to: recipientMail,
    subject: subjectName,
    text: contentText
  };


  // link for generating pass: https://www.namecheap.com/

  let transport = nodemailer.createTransport({
    host: "mail.privateemail.com",
    port: 587,
    secure: false,
    auth: {
      user: credentials.MAIL,
      pass: credentials.GENERATED_PASSWORD
    }
  });

  return new Promise((resolve, reject) => {
    transport.sendMail(message, err => {
      console.log("sendMail info message:", message);
      console.log("sendMail error:", err);
      if (err) {
        reject();
      }
      resolve();
    });
  });
}

function getImagePath(pathToFile, folderName) {
  return pathToFile
    ? pathToFile.substring(pathToFile.indexOf(folderName))
    : module.defaultImagePath;
}

// after user uploads new profile image, delete the previous one to free space in memory
function getUserProfileSettings(userId) {
  return UserProfileSettings.findOne({
    user_FK: new ObjectId(userId)
  });
}

function deletePreviousProfileImage(imagePath) {
  if (!imagePath) imagePath = '';
  fs.unlink(imagePath, err => {
    if (err) {
      console.log(
        err,
        "Error occured while trying to delete user profile image"
      );
    }
    console.log(imagePath, "was deleted successfully ");
  });
}

function getCurrentDateTimeString() {
  const d = new Date();
  const date =
    d.getDate().toString().length === 1
      ? "0" + d.getDate().toString()
      : d.getDate().toString();
  const month =
    (d.getMonth() + 1).toString().length === 1
      ? "0" + (d.getMonth() + 1).toString()
      : (d.getMonth() + 1).toString();
  const year = d.getFullYear();

  const hour =
    d.getHours().toString().length === 1
      ? "0" + d.getHours().toString()
      : d.getHours().toString();
  const minutes =
    d.getMinutes().toString().length === 1
      ? "0" + d.getMinutes().toString()
      : d.getMinutes().toString();

  const MM_DD_YYY__hh_mm =
    month + "/" + date + "/" + year + ", " + hour + ":" + minutes;
  return MM_DD_YYY__hh_mm;
}

function generateRandomPassword() {
  var length = 8,
    charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
    retVal = "";
  for (var i = 0, n = charset.length; i < length; ++i) {
    retVal += charset.charAt(Math.floor(Math.random() * n));
  }
  return retVal;
}

function createLastBrewSubmitDateTime(obj) {
  console.log(obj);
  const lastObject = obj.coffeeBrew[obj.coffeeBrew.length - 1];
  const lastDate = lastObject && lastObject.brewSubmitDate;

  if (lastDate) {
    const datePartOne = lastDate.substring(0, lastDate.indexOf(",")).trim();
    const datePartTwo = lastDate.substring(lastDate.indexOf(",") + 1).trim();

    return datePartOne + ", " + datePartTwo;
  }
  return "";
}

function setCookieMaxAge() {
  return {};
}

module.exports = {
  isSessionCookieValid: isSessionCookieValid,
  sendMail: sendMail,
  getImagePath: getImagePath,
  getUserProfileSettings: getUserProfileSettings,
  deletePreviousProfileImage: deletePreviousProfileImage,
  getCurrentDateTimeString: getCurrentDateTimeString,
  generateRandomPassword: generateRandomPassword,
  createLastBrewSubmitDateTime: createLastBrewSubmitDateTime,
  profileImageFolder: "profile-image",
  defaultImagePath: "/profile-image/default-image.png",
  setCookieMaxAge: setCookieMaxAge
};
