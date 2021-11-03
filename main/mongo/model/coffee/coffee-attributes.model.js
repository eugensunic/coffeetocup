const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const FlavourModel = new mongoose.Schema({
    fruity: Boolean,
    nutty: Boolean,
    choco: Boolean,
    caramel: Boolean,
    floral: Boolean
}, {
    _id: false
});

// change flavour to object
const coffeeAttributesTable = new mongoose.Schema({
    acidity: Number,
    sweetness: Number,
    bitterness: Number,
    intensity: Number,
    overall: Number,
    flavour: FlavourModel,
    commentText: String,
    formSubmitDate: String,
    user_FK: Schema.ObjectId,
    isArchived: {
        type: Boolean,
        default: false
    },
    coffeeOrigin_FK: Schema.ObjectId,
    coffeeBrew_FK: Schema.ObjectId
});

module.exports = mongoose.model('coffeeAttributes', coffeeAttributesTable);