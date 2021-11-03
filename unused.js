 // 1.--------------------------------------------------------------
 // Promise.all([aggregateQuery(x), selectedCountryAmount(req.body.country)])
 //     .then((res1) => {
 //         console.log('BREW RESULT RESPONSE: ', res1);
 //         res.send(res1);
 //     });

 // QUERY: get all brews and all existing attributes for the selected coffee origin id
 // function aggregateQuery(x) {
 //     console.log('Aggregate query Brew response: ', x);
 //     return CoffeeOrigin.aggregate([{
 //         $match: {
 //             $and: [{
 //                 _id: ObjectId(x.coffeeOrigin_FK)
 //             }, {
 //                 user_FK: ObjectId(x.user_FK)
 //             }]
 //         },
 //     }, {
 //         $lookup: {
 //             from: 'coffeebrews',
 //             localField: '_id',
 //             foreignField: 'coffeeOrigin_FK',
 //             as: 'coffeeBrew'
 //         }
 //     }, {
 //         $lookup: {
 //             from: 'coffeeattributes',
 //             localField: '_id',
 //             foreignField: 'coffeeOrigin_FK',
 //             as: 'coffeeAttributes'
 //         }
 //     }]);
 // }
 // // QUERY: get number of countries of selected country name
 // function selectedCountryAmount(selectedCountry) {
 //     return CoffeeOrigin.find({
 //         country: selectedCountry
 //     }).then(x => x.length);
 // }


 // 2.--------------------------------------------------------------

 // return for response for FE
 // aggregateQuery(x)
 //     .then((res1) => {
 //         if (res1.length > 0) {
 //             // add Coffee origin to existing result
 //             res1.push(x);
 //             res.send(res1);
 //         } else {
 //             res.send([x]);
 //         }
 //     });

 // QUERY: get all brews and all existing attributes for the selected coffee origin id
 // function aggregateQuery(x) {

 //     console.log(x, 'aggregate query origin');
 //     return CoffeeBrew.aggregate([{
 //         $match: {
 //             $and: [{
 //                 coffeeOrigin_FK: ObjectId(x._id)
 //             }, {
 //                 user_FK: ObjectId(x.user_FK)
 //             }]
 //         },
 //     }, {
 //         $lookup: {
 //             from: 'coffeeattributes',
 //             localField: '_id',
 //             foreignField: 'coffeeOrigin_FK',
 //             as: 'coffeeAttributes'
 //         }
 //     }]);
 // }


 // 3.--------------------------------------------------------------

 //  app
 // .route('/api/coffee/brew/result')
 // .get(utils.isSessionCookieValid, function (req, res) {
 //     aggregateQuery(req)
 //         .then((res1) => {
 //             console.log('aggregate query brew result: ', res1);
 //             res.send(res1);
 //         });
 // })
 // .post((req, res) => {});

 // function aggregateQuery(req) {
 //     return CoffeeOrigin.aggregate([{
 //         $match: {
 //             $and: [{
 //                 country: req.query.country
 //             }, {
 //                 user_FK: ObjectId(req.session.passport.user._id)
 //             }]
 //         }
 //     }, {
 //         $lookup: {
 //             from: 'coffeeattributes',
 //             localField: '_id',
 //             foreignField: 'coffeeOrigin_FK',
 //             as: 'coffeeAttributes'
 //         }
 //     }, {
 //         $lookup: {
 //             from: 'coffeebrews',
 //             localField: '_id',
 //             foreignField: 'coffeeOrigin_FK',
 //             as: 'coffeeBrew'
 //         }
 //     }]);
 // }

 // 4.--------------------------------------------------------------

//  function getAlreadyAddedCoffees(req) {
//      return CoffeeOrigin.aggregate([{
//              $match: {
//                  user_FK: ObjectId(req.session.passport.user._id)
//              },
//          },
//          {
//              $group: {
//                  '_id': '$country',
//                  'count': {
//                      $sum: 1
//                  }

//              }
//          },
//          {
//              $sort: {
//                  'count': -1
//              }
//          },
//          {
//              $limit: 1
//          }
//      ]);

//  }

//  // based on selected country
//  function getMostUsedGrind(req) {
//      return CoffeeBrew.aggregate([{
//              $match: {
//                  user_FK: ObjectId(req.session.passport.user._id)
//              }
//          },
//          {
//              $group: {
//                  '_id': '$grindType',
//                  'count': {
//                      $sum: 1
//                  }

//              }
//          },
//          {
//              $sort: {
//                  'count': -1
//              }
//          },
//          {
//              $limit: 1
//          }
//      ]);

//  }