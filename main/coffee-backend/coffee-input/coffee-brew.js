const CoffeeBrew = require('../../mongo/model/coffee/coffee-brew.model.js');
const utils = require('../../global/utils.js');
const ObjectId = require('mongodb').ObjectID;

module.exports.initCoffeeBrew = (app) => {
    app
        .route('/api/coffee/brew')
        .get((req, res) => {})
        .post(utils.isSessionCookieValid, (req, res, next) => {
            const brewTime = req.body.brewTime || null;
            if (brewTime) {
                checkLeadingSingleDigit(brewTime);
            }
            const coffeeBrew = new CoffeeBrew({
                technique: req.body.technique,
                brewMethod: req.body.brewMethod,
                grindType: req.body.grindType,
                ratio: req.body.ratio,
                brewTime: brewTime,
                brewSubmitDate: req.body.brewSubmitDate,
                user_FK: new ObjectId(req.session.passport.user._id),
                coffeeOrigin_FK: new ObjectId(req.body.coffeeOriginId),
            });
            coffeeBrew.save().then((x) => {
                res.send({
                    originId: x.coffeeOrigin_FK,
                    brewId: x._id
                });

            }).catch(err => {
                return next(err);
            });
        });
};

function checkLeadingSingleDigit(brewTime) {
    if (brewTime.hour < 10) {
        brewTime.hour = '0' + brewTime.hour;
    }
    if (brewTime.minute < 10) {
        brewTime.minute = '0' + brewTime.minute;
    }
    if (brewTime.second < 10) {
        brewTime.second = '0' + brewTime.second;
    }
}