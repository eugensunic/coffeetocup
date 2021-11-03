const utils = require("../global/utils.js");
const CoffeeOrigin = require("../mongo/model/coffee/coffee-origin.model.js");
const GenerateUrl = require("../mongo/model/generate-url/index.js");
const ObjectId = require("mongodb").ObjectID;

module.exports.initGenerateCoffeeDataUrl = (app) => {

  app.
    route("/shared-coffee/*")
    .get((req, res, next) => {
      const originId = req.query.originId;
      console.log('generate-coffee route backend');
      if (!originId) {
        return res.status(500).send({});
      }

      Promise.all([getAllDataPerUniqueCoffeeOrigin(originId), getUsername(originId)])
        .then(([data, genUrlObj]) => {
          if (!data || (data && !data.length)) {

            return res.status(500).send({});
          }
          res.header("Content-Type", "application/json");
          res.json(data.map(y => {
            const obj = Object.assign({
              lastBrewSubmitDateTime: utils.createLastBrewSubmitDateTime(y),
              username: genUrlObj.username
            }, y);
            return obj;
          }));
        }).catch(_ => {
          return res.status(500).send({});
        });
    });

  app
    .route("/api/generate/coffee/url")
    .post(utils.isSessionCookieValid, (req, res, next) => {
      const originId = req.body.coffeeOriginId;
      const userId = req.body.userId;
      const username = req.session.passport.user.username;

      // save to database
      addNewCoffeeOriginRecord(originId, userId, username)
        .then((x) => {
          return res.json({ originId: x.originId });
        })
        .catch((err) => {
          return next(err);
        });
    });
};


function addNewCoffeeOriginRecord(originId, userId, username) {
  const findQuery = {
    $and: [
      {
        originId: new ObjectId(originId),
      }
    ],
  };

  const updateData = {
    $set: {
      originId: new ObjectId(originId),
      userId: new ObjectId(userId),
      username: username
    },
  };

  return GenerateUrl.findOneAndUpdate(findQuery, updateData, {
    upsert: true,
    new: true,
  });
}

function getUsername(originId) {
  return GenerateUrl.findOne({ originId: originId })

}
function getAllDataPerUniqueCoffeeOrigin(originId) {
  return CoffeeOrigin.aggregate([
    {
      $match: {
        _id: ObjectId(originId),
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
