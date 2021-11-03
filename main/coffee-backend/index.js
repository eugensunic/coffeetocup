const coffeeOrigin = require('./coffee-input/coffee-origin.js');
const coffeeBrew = require('./coffee-input/coffee-brew.js');
const coffeeAttributes = require('./coffee-input/coffee-attributes.js');

const coffeeResult = require('./coffee-results/coffee-result.js');
const coffeeArchive = require('./coffee-results/coffee-archive.js');


// insert, update, delete routes
module.exports.initCoffee = (app) => {
    // input
    coffeeOrigin.initCoffeeOrigin(app);
    coffeeBrew.initCoffeeBrew(app);
    coffeeAttributes.initCoffeeAttributes(app);

    // results
    coffeeResult.initCoffeeResult(app);
    coffeeArchive.initCoffeeArchive(app);
};