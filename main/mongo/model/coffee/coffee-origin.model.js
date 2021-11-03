const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// const ProductionDateModel = new mongoose.Schema({
//     year: Number,
//     month: Number,
//     day: Number
// }, {
//     _id: false
// });
// const Any = new Schema({
//     any: Schema.Types.Mixed
// });
const coffeeOriginTable = new mongoose.Schema({
    country: String,
    roastingType: String,
    processingType: String,
    manufacturer: String,
    productionDate: Schema.Types.Mixed,
    originSubmitDate: String,
    isArchived: {
        type: Boolean,
        default: false
    },
    user_FK: Schema.ObjectId
});

module.exports = mongoose.model('coffeeOrigin', coffeeOriginTable);