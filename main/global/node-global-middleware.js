const express = require('express');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const passportJs = require('./passport-config-js/index.js');
var path = require('path');

module.exports.initMiddleware = (app, passport) => {
  /* 
  body parser
  exposing images from uploads folder
  when you expose the folder then the item is on /first_image.png not /public/first_image.png
  no matter how deeply nested are the folders after
  static-pages, you just need to put the parent folder without slashes 
 */
app.use(express.static('uploads'));
app.use(express.static('public'));
app.use(express.static('angular'));
app.use(express.static('static-pages'));

  app.use(bodyParser.json());
  app.use(
    bodyParser.urlencoded({
      extended: true
    })
  );

  // cookie session configuration
  app.use(
    cookieSession({
      name: 'session',
      keys: ['integralofderivative?_#%'],
      httpOnly: true,
      signed: true
      // expires: new Date(2019, 07, 06, 09, 46, 30, 0)
      // maxAge: 10000 * 2 // 120min
    })
  );

  // instantiate passport middleware
  passportJs.passportInit(app, passport);

  // when user logged in for a long time
  app.use(function (req, res, next) {
    if (isSessionNotValid(req)) {
      req.session = { timeoutOccurred: true };
    }
    next();
  });
};

function isSessionNotValid(req) {
  return parseInt(req.headers.sessioncounter, 10) >= 5;
}
