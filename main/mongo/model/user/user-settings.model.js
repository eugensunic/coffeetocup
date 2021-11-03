const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create table for user settings
const userSettingsSchema = new mongoose.Schema({
    originModalConfirmed: {
        type: Boolean,
        default: false
    },
    gdprConfirmed: {
        type: Boolean,
        default: false
    },
    user_FK: Schema.ObjectId
});

module.exports = mongoose.model('userSettings', userSettingsSchema);