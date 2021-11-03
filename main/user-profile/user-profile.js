const CoffeeOrigin = require("../mongo/model/coffee/coffee-origin.model.js");
const CoffeeBrew = require("../mongo/model/coffee/coffee-brew.model.js");
const CoffeeAttributes = require("../mongo/model/coffee/coffee-attributes.model.js");
const User = require("../mongo/model/user/user.model.js");

const utils = require("../global/utils.js");
const { kMaxLength } = require('buffer');
const ObjectId = require("mongodb").ObjectID;

module.exports.initCoffeeUserProfile = (app) => {
  app
    .route("/api/user/data")
    .get(utils.isSessionCookieValid, (req, res, next) => {
      const id =
        req.query.otherUserId !== "undefined"
          ? req.query.otherUserId
          : req.session.passport.user._id;
      User.findOne(
        {
          _id: id,
        },
        (err, user) => {
          if (err) {
            return next(err);
          }
          if (!user) {
            return next(err);
          }
          console.log('user data', user);
          res.json({
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            loginTime: user.loginTime,
            registrationTime: (user.registrationTime && user.registrationTime.includes(',')) ? user.registrationTime.substring(0, user.registrationTime.indexOf(',')) : '',
          });
        }
      );
    })
    .post((req, res) => { });

  app
    .route("/api/coffee/profile/coffees")
    .get(utils.isSessionCookieValid, (req, res, next) => {
      const id =
        req.query.otherUserId !== "undefined"
          ? req.query.otherUserId
          : req.session.passport.user._id;
      getAllUserCoffeeProperties(id)
        .then((x) => {
          const response = x.map((y) => ({
            ...y,
            coffeeBrew: y.coffeeBrew.map(z => ({ ...z, ratio: { ...z.ratio, ratio: z.ratio.ratio ? Math.round(z.ratio.ratio) : '' } })),
            brewsAmount: y.coffeeBrew ? y.coffeeBrew.length : 0,
            lastBrewSubmitDateTime: utils.createLastBrewSubmitDateTime(y),
          }));
          res.json(response);
        })
        .catch((err) => {
          return next(err);
        });
    })
    .post((req, res) => { });

  app
    .route("/api/coffee/origin/update")
    .get((req, res) => { })
    .post(utils.isSessionCookieValid, (req, res, next) => {
      const findQuery = {
        _id: new ObjectId(req.body.coffeeOriginId),
      };

      const updateData = {
        $set: {
          roastingType: req.body.roastingType,
          processingType: req.body.processingType,
          productionDate: req.body.productionDate,
          manufacturer: req.body.manufacturer,
          originSubmitDate: req.body.originSubmitDate,
        },
      };
      CoffeeOrigin.findOneAndUpdate(
        findQuery,
        updateData,
        {
          upsert: true,
          useFindAndModify: false,
        },
        (err, doc) => {
          if (err) {
            return next(err);
          }
          res.end();
        }
      );
    });

  app
    .route("/api/coffee/brewattributes/delete")
    .get((req, res) => { })
    .post(utils.isSessionCookieValid, (req, res, next) => {
      const brewId = req.body.brewId;
      const attributeId = req.body.attributeId;
      const userId = req.session.passport.user._id;

      Promise.all([
        removeSelectedBrew(brewId, userId),
        removeSelectedAttributes(attributeId, userId),
      ])
        .then(() => {
          res.end();
        })
        .catch((err) => {
          return next(err);
        });
    });
};

// see data sample on profile page startcoffee-fe
function getAllUserCoffeeProperties(id) {
  return CoffeeOrigin.aggregate([
    {
      $match: {
        user_FK: new ObjectId(id),
        isArchived: false,
      },
    },
    {
      $lookup: {
        from: "coffeebrews",
        localField: "_id",
        foreignField: "coffeeOrigin_FK",
        as: "coffeeBrew",
      },
    },
    {
      $lookup: {
        from: "coffeeattributes",
        localField: "_id",
        foreignField: "coffeeOrigin_FK",
        as: "coffeeAttributes",
      },
    },
  ]);
}

function removeSelectedBrew(brewId, userId) {
  return CoffeeBrew.remove({
    user_FK: new ObjectId(userId),
    _id: new ObjectId(brewId),
  });
}

function removeSelectedAttributes(attributeId, userId) {
  return CoffeeAttributes.remove({
    user_FK: new ObjectId(userId),
    _id: new ObjectId(attributeId),
  });
}
