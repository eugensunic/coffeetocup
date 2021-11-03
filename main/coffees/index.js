const CoffeeOrigin = require("../mongo/model/coffee/coffee-origin.model.js");
const utils = require("../global/utils.js");
const Users = require("../mongo/model/user/user.model.js");

// endpoint visible to all users, (login not required)?
module.exports.initCoffees = (app) => {
  app
    .route("/api/coffees/alluserdata")
    .get(utils.isSessionCookieValid, (req, res, next) => {
      // const id = req.query.otherUserId !== 'undefined' ? req.query.otherUserId : req.session.passport.user._id;
      getAllUserCoffeeProperties()
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
    .route("/api/coffees/users")
    .get(utils.isSessionCookieValid, (req, res, next) => {
      // filter properties which will be sent to FE
      const usersProjection = {
        _id: true,
        firstName: true,
        lastName: true,
        username: true,
      };
      Users.find({}, usersProjection, (err, data) => {
        if (err) {
          return res.status(500).send(err);
        }
        return res.json(data);
      });
    })
    .post((req, res) => { });
};

function getAllUserCoffeeProperties() {
  return CoffeeOrigin.aggregate([
    {
      $match: {
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

