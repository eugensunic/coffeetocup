const CoffeeOrigin = require('../../mongo/model/coffee/coffee-origin.model.js');
const utils = require('../../global/utils.js');
const ObjectId = require('mongodb').ObjectID;

module.exports.initCoffeeResult = (app) => {
    app
        .route('/api/coffee/origin/result')
        .get(utils.isSessionCookieValid, (req, res, next) => {
            originQuery(req).then((res1) => {
                res.json(res1);
            }).catch(err => {
                return next(err);
            });
        });

    app
        .route('/api/coffee/brew/result')
        .get(utils.isSessionCookieValid, (req, res, next) => {
            // will be null if process started from create coffee
            if (req.query.id === 'null') {
                res.end();
                return;

            }
            // will execute if process started from use-coffee
            brewAttributesQuery(req)
                .then((res1) => {
                    res.send(res1);
                }).catch(err => {
                    return next(err);
                });
        });

    app
        .route('/api/coffee/attributes/result')
        .get(utils.isSessionCookieValid, (req, res, next) => {
            // will be null if process started from create coffee
            if (req.query.id === 'null') {
                res.end();
                return;

            }
            // will execute if process started from use-coffee
            brewAttributesQuery(req)
                .then((res1) => {
                    res.send(res1);
                }).catch(err => {
                    return next(err);
                });
        });
};

// get all origin records, limit to 5 records only
function originQuery(req) {
    return CoffeeOrigin.find({
        user_FK: req.session.passport.user._id,
        isArchived: false
    });
}

function brewAttributesQuery(req) {
    return CoffeeOrigin.aggregate([{
        $match: {
            $and: [{
                country: req.query.country,
                isArchived: false
            }, {
                user_FK: new ObjectId(req.session.passport.user._id)
            }]
        }
    }, {
        $lookup: {
            from: 'coffeeattributes',
            localField: '_id',
            foreignField: 'coffeeOrigin_FK',
            as: 'coffeeAttributes'
        }
    }, {
        $lookup: {
            from: 'coffeebrews',
            localField: '_id',
            foreignField: 'coffeeOrigin_FK',
            as: 'coffeeBrew'
        }
    }]).limit(5);
}