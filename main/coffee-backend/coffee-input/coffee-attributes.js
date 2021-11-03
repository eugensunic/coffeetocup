const CoffeeAttributes = require('../../mongo/model/coffee/coffee-attributes.model.js');
const utils = require('../../global/utils.js');
const ObjectId = require('mongodb').ObjectID;

module.exports.initCoffeeAttributes = app => {
  app
    .route('/api/coffee/attributes')
    .get((req, res) => { })
    .post(utils.isSessionCookieValid, (req, res, next) => {
      const coffeeAttributes = new CoffeeAttributes({
        acidity: req.body.acidity,
        sweetness: req.body.sweetness,
        bitterness: req.body.bitterness,
        intensity: req.body.intensity,
        overall: req.body.overall,
        flavour: req.body.flavour,
        commentText: req.body.commentText ? req.body.commentText.trim() : '',
        formSubmitDate: req.body.formSubmitDate,
        user_FK: new ObjectId(req.session.passport.user._id),
        coffeeOrigin_FK: new ObjectId(req.body.coffeeOriginId),
        coffeeBrew_FK: new ObjectId(req.body.coffeeBrewId)
      });
      coffeeAttributes
        .save()
        .then(x => {
          // FE form ends here, therefore no return value
          res.end();
        })
        .catch(err => {
          return next(err);
        });
    });
};
