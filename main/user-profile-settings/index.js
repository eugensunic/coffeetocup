const settingsBasic = require('./basic-settings');
const settingsPassword = require('./change-password');
const settingsAccount = require('./delete-account');
const forgotPassword = require('./forgot-password.js');


module.exports.initUserSettings = (app) => {
    // change user settings 
    settingsBasic.initBasicSettings(app);
    settingsPassword.initChangePassword(app);
    settingsAccount.initDeleteAccount(app);

    // reset password
    forgotPassword.initForgotPassword(app);

};