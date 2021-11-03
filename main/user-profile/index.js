const coffeeUserProfile = require("./user-profile.js");
const coffeeUserSettings = require("./user-settings.js");
const coffeeGenerateUrl = require("./generate-coffee-data-url.js");

module.exports.initUserProfile = (app) => {
  coffeeGenerateUrl.initGenerateCoffeeDataUrl(app);
  coffeeUserProfile.initCoffeeUserProfile(app);
  coffeeUserSettings.initUserSettings(app);
};
