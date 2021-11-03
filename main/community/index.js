const User = require('../mongo/model/user/user.model.js');
const CoffeeOrigin = require('../mongo/model/coffee/coffee-origin.model.js');
const CoffeeBrew = require('../mongo/model/coffee/coffee-brew.model.js');
const ObjectId = require('mongodb').ObjectID;

const utils = require('../global/utils.js');
//init community
module.exports.initCommunity = (app) => {
    // SECTION 1
    app
        .route('/api/users')
        .get(utils.isSessionCookieValid, (req, res) => {
            User.find({
                _id: {
                    $ne: new ObjectId(req.session.passport.user._id)
                }
            }, (err, users, next) => {
                if (err) {
                    return next(err);
                }
                res.json({
                    users: getUsersTableParams(users, '_id', 'username', 'firstName', 'lastName')
                });
                return;

            });

        });
    // total coffees (count) (SECTION 2)
    app
        .route('/api/community/total/coffees/amount')
        .get(utils.isSessionCookieValid, (req, res, next) => {
            CoffeeOrigin.countDocuments({}, (err, numOfDocs) => {
                if (err) {
                    return next(err);
                }
                res.json(numOfDocs);
            });
        });
    // total brews (count)
    app
        .route('/api/community/total/brews/amount')
        .get(utils.isSessionCookieValid, (req, res, next) => {
            CoffeeBrew.countDocuments({}, (err, numOfDocs) => {
                if (err) {
                    return next(err);
                }
                res.json(numOfDocs);
            });
        });
    // Average amount of coffees used per brew
    app
        .route('/api/community/avg/coffeeperbrew')
        .get(utils.isSessionCookieValid, (req, res, next) => {
            getAvgCoffeePerProperty('ratio.coffeeNumerator').then(x => {
                res.json(x);
            }).catch((err) => next(err));
        });
    // Average amount of water used per brew
    app
        .route('/api/community/avg/waterperbrew')
        .get(utils.isSessionCookieValid, (req, res, next) => {
            getAvgCoffeePerProperty('ratio.waterDenominator').then(x => {
                res.json(x);
            }).catch((err) => next(err));
        });

    // group by users most coffee users and most brews users (SECTION 3)
    app
        .route('/api/community/origin/totalcoffees/users')
        .get(utils.isSessionCookieValid, (req, res, next) => {
            getTopUsersPerPropInput('coffeeorigins').then(x => {

                res.json(groupByUserMongo(x, 'coffeeorigins'));
            }).catch((err) => next(err));
        });

    app
        .route('/api/community/brew/totalbrews/users')
        .get(utils.isSessionCookieValid, (req, res, next) => {
            getTopUsersPerPropInput('coffeebrews').then(x => {
                res.json(groupByUserMongo(x, 'coffeebrews'));
            }).catch((err) => next(err));
        });


};

function getUsersTableParams(users, ...params) {
    const array = [];
    for (let i = 0; i < users.length; i++) {
        array.push({
            [params[0]]: users[i][params[0]],
            [params[1]]: users[i][params[1]],
            [params[2]]: users[i][params[2]],
            [params[3]]: users[i][params[3]],
        });
    }
    return array;
}

function getAvgCoffeePerProperty(prop) {
    return CoffeeBrew.aggregate([{
        $group: {
            _id: null,
            avg: {
                $avg: '$' + prop
            }
        }
    }]);
}

function getTopUsersPerPropInput(prop) {
    return User.aggregate([{
        $lookup: {
            from: 'userprofilesettings',
            localField: '_id',
            foreignField: 'user_FK',
            as: 'user_profile_settings'
        }
    },
    {
        $lookup: {
            from: prop,
            localField: '_id',
            foreignField: 'user_FK',
            as: prop
        }
    },
    ]);


}

function groupByUserMongo(result, arrayProp) {
    const array = [];
    for (let i = 0; i < result.length; i++) {
        let location = null;
        if (result[i].user_profile_settings.length > 0) {
            location = result[i].user_profile_settings[0].country + ', ' + result[i].user_profile_settings[0].city;
        }
        array.push({
            id: result[i]._id,
            username: result[i].username,
            firstName: result[i].firstName,
            lastName: result[i].lastName,
            location: location,
            [arrayProp]: result[i][arrayProp].reduce((acc, x) => {
                if (!x.isArchived) acc += 1;
                return acc;
            }, 0)
        });
    }
    return array;
}