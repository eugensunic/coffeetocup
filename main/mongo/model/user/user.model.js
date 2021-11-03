const mongoose = require('mongoose');

// create table for registered users
const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  username: String,
  email: String,
  emailId: String,
  password: String,
  registrationTime: String,
  loginTime: {
    type: String,
    default: ''
  },
  loggedOutTime: {
    type: String,
    default: ''
  },
  resetPasswordToken: {
    type: String,
    required: false,
    default: null
  },
  resetPasswordExpires: {
    type: Number,
    required: false,
    default: null
  },

});


module.exports = mongoose.model('users', userSchema);