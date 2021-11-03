const CoffeeOrigin = require('../../mongo/model/coffee/coffee-origin.model.js');
const utils = require('../../global/utils.js');
const ObjectId = require('mongodb').ObjectID;

module.exports.initCoffeeOrigin = (app) => {
    app
        .route('/api/coffee/origin')
        .get((req, res) => {})
        .post(utils.isSessionCookieValid, (req, res, next) => {
            const productionDate = req.body.productionDate;
            if (productionDate) {
                setValueZeroIfPropEmpty(productionDate);
            }
            const coffeeOrigin = new CoffeeOrigin({
                country: req.body.country,
                roastingType: req.body.roastingType,
                processingType: req.body.processingType,
                manufacturer: req.body.manufacturer,
                productionDate: productionDate,
                originSubmitDate: req.body.originSubmitDate,
                user_FK: new ObjectId(req.session.passport.user._id)
            });

            // save to database
            coffeeOrigin.save().then((x) => {
                res.send({
                    originId: x._id,
                    country: x.country
                });
            }).catch(err => {
                return next(err);
            });
        });
};

function setValueZeroIfPropEmpty(productionDate) {
    if (productionDate.day == null) {
        productionDate.day = 0;
    }
    if (productionDate.month == null) {
        productionDate.month = 0;
    }
    if (productionDate.year == null) {
        productionDate.year = 0;
    }
}