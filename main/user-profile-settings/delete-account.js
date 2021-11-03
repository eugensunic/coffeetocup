const utils = require('../global/utils.js');
const ObjectId = require('mongodb').ObjectID;

const User = require('../mongo/model/user/user.model.js');
const UserSettings = require('../mongo/model/user/user-settings.model.js');
const UserProfileSettings = require('../mongo/model/user/user-profile-settings.model.js');

const CoffeeOrigin = require('../mongo/model/coffee/coffee-origin.model.js');
const CoffeeBrews = require('../mongo/model/coffee/coffee-brew.model.js');
const CoffeeAttributes = require('../mongo/model/coffee/coffee-attributes.model.js');

module.exports.initDeleteAccount = (app) => {
    app
        .route('/api/user/settings/delete')
        .get(utils.isSessionCookieValid, (req, res, next) => {
            const userId = req.session.passport.user._id;
            Promise.all([
                removeUserTable(userId),
                removeUserAppSettings(userId),
                removeUserProfileSettings(userId),
                removeCoffeeOrigins(userId),
                removeCoffeeBrews(userId),
                removeCoffeeAttributes(userId)
            ]).then(_ => {
                console.log('successfully deleted user In mongo');
                req.session = null;
                res.clearCookie('auth');
                res.end();
            }).catch(err => next(err));
        });

};

// remove user tables
function removeUserTable(userId) {
    return User.deleteMany({
        _id: new ObjectId(userId),
    });
}

function removeUserAppSettings(userId) {
    return UserSettings.deleteMany({
        user_FK: new ObjectId(userId),
    });
}

function removeUserProfileSettings(userId) {
    return UserProfileSettings.deleteMany({
        user_FK: new ObjectId(userId),
    });
}

// remove coffee tables
function removeCoffeeOrigins(userId) {
    return CoffeeOrigin.deleteMany({
        user_FK: new ObjectId(userId),
    });
}

function removeCoffeeBrews(userId) {
    return CoffeeBrews.deleteMany({
        user_FK: new ObjectId(userId),
    });
}

function removeCoffeeAttributes(userId) {
    return CoffeeAttributes.deleteMany({
        user_FK: new ObjectId(userId),
    });
}