const CoffeeOrigin = require('../../mongo/model/coffee/coffee-origin.model.js');
const CoffeeBrew = require('../../mongo/model/coffee/coffee-brew.model.js');
const CoffeeAttributes = require('../../mongo/model/coffee/coffee-attributes.model.js');

const utils = require('../../global/utils.js');
const ObjectId = require('mongodb').ObjectID;

module.exports.initCoffeeArchive = (app) => {
    app
        .route('/api/coffee/archive')
        .get(utils.isSessionCookieValid, (req, res, next) => {
            getAllArchivedCoffees(req).then((x) => {
                res.json(x.map((y) => ({
                    ...y,
                    coffeeBrew: y.coffeeBrew.map(z => ({ ...z, ratio: { ...z.ratio, ratio: z.ratio.ratio ? Math.round(z.ratio.ratio) : '' } })),
                    brewsAmount: y.coffeeBrew ? y.coffeeBrew.length : 0,
                    lastBrewSubmitDateTime: utils.createLastBrewSubmitDateTime(y),
                })));
            }).catch(err => {
                return next(err);

            });
        })
        .post(utils.isSessionCookieValid, (req, res, next) => {
            const originId = req.body.originId;
            Promise.all([archiveOrigin(originId), archiveBrews(originId), archiveAttributes(originId)]).then(() => {
                res.end();
            }).catch(err => {
                return next(err);
            });
        });

    app
        .route('/api/coffee/archive/amount')
        .get(utils.isSessionCookieValid, (req, res, next) => {
            CoffeeOrigin.countDocuments({
                user_FK: new ObjectId(req.session.passport.user._id),
                isArchived: true
            }, (err, numOfDocs) => {
                if (err) {
                    return next(err);
                }
                res.json(numOfDocs);
            });
        });


    app
        .route('/api/coffee/origin/delete')
        .get(function (req, res) { })
        .post(utils.isSessionCookieValid, (req, res) => {
            const originId = req.body.originId;
            const userId = req.session.passport.user._id;
            Promise.all([deleteOrigin(originId, userId), deleteBrews(originId, userId), deleteAttributes(originId, userId)]).then(() => {
                res.end();
            });

        });
};

function archiveOrigin(originId) {
    const findQuery = {
        '_id': new ObjectId(originId)
    };
    const updateData = {
        $set: {
            isArchived: true
        }
    };
    return CoffeeOrigin.findOneAndUpdate(findQuery, updateData, {
        upsert: true,
        useFindAndModify: false,
        new: true
    });
}

function archiveBrews(originId) {
    const findQuery = {
        'coffeeOrigin_FK': new ObjectId(originId)
    };
    const updateData = {
        $set: {
            isArchived: true
        }
    };
    return CoffeeBrew.updateMany(findQuery, updateData);
}

function archiveAttributes(originId) {
    const findQuery = {
        'coffeeOrigin_FK': new ObjectId(originId)
    };
    const updateData = {
        $set: {
            isArchived: true
        }
    };
    return CoffeeAttributes.updateMany(findQuery, updateData);
}


function getAllArchivedCoffees(req) {
    return CoffeeOrigin.aggregate([{
        $match: {
            user_FK: new ObjectId(req.session.passport.user._id),
            isArchived: true
        }
    }, {
        $lookup: {
            from: 'coffeebrews',
            localField: '_id',
            foreignField: 'coffeeOrigin_FK',
            as: 'coffeeBrew'
        }
    }, {
        $lookup: {
            from: 'coffeeattributes',
            localField: '_id',
            foreignField: 'coffeeOrigin_FK',
            as: 'coffeeAttributes'
        }
    }]);
}




function deleteOrigin(coffeeOriginId, userId) {
    return CoffeeOrigin.deleteMany({
        user_FK: new ObjectId(userId),
        _id: new ObjectId(coffeeOriginId)
    });
}

function deleteBrews(coffeeOriginId, userId) {
    return CoffeeBrew.deleteMany({
        user_FK: new ObjectId(userId),
        coffeeOrigin_FK: new ObjectId(coffeeOriginId)
    });
}

function deleteAttributes(coffeeOriginId, userId) {
    return CoffeeAttributes.deleteMany({
        user_FK: new ObjectId(userId),
        coffeeOrigin_FK: new ObjectId(coffeeOriginId)
    });
}