const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BrewingTimeModel = new mongoose.Schema({
    hour: String,
    minute: String,
    second: String
}, {
    _id: false
});

const BrewingRatioModel = new mongoose.Schema({
    ratio: Number,
    coffeeNumerator: Number,
    waterDenominator: Number
}, {
    _id: false
});

const coffeeBrewTable = new mongoose.Schema({
    technique: String,
    brewMethod: String,
    grindType: String,
    ratio: BrewingRatioModel,
    brewTime: BrewingTimeModel,
    brewSubmitDate: String,
    user_FK: Schema.ObjectId,
    isArchived: {
        type: Boolean,
        default: false
    },
    coffeeOrigin_FK: Schema.ObjectId

});

module.exports = mongoose.model('coffeeBrew', coffeeBrewTable);

/** Brew submit 
 * date occurs when user clicks on button next after finished with brewing
 *  which leads him to the attributes table
 */