const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const generateUrlSchema = new mongoose.Schema({
  originId: Schema.ObjectId,
  userId: Schema.ObjectId,
  username:String,
  generatedUrl: String,
  lastBrewId: String,
});

module.exports = mongoose.model("generateUrl", generateUrlSchema);
