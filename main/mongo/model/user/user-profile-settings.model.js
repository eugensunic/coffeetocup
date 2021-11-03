const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfileImageModel = new mongoose.Schema({
    originalName: String,
    fileName: String,
    path: String,
    mimeType: String
}, {
    _id: false
});

// create table for user settings
const userProfileSettingsSchema = new mongoose.Schema({
    country: String,
    city: String,
    dateOfBirth: Schema.Types.Mixed,
    profileImagePath: String,
    profileImage: ProfileImageModel,
    user_FK: Schema.ObjectId
});

module.exports = mongoose.model('userProfileSettings', userProfileSettingsSchema);



// Image attributes
// {
//     fieldname: 'file',
//     originalname: 'Screen Shot 2018-12-26 at 11.38.30.png',
//     encoding: '7bit',
//     mimetype: 'image/png',
//     destination: 'uploads/',
//     filename: '164cb76e216663383d920d9af88c5c00',
//     path: 'uploads/164cb76e216663383d920d9af88c5c00',
//     size: 150159
// }