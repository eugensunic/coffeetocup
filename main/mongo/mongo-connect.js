const mongoose = require("mongoose");

//'mongodb://127.0.0.1:27017/users'

const mongoFunctions = {
  mongoConnect: (urlString, dbName) => {
    return mongoose.connect(urlString + dbName, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      poolSize: 15
    });
  },

  mongoDisconnect: () => {
    mongoose.disconnect();
    console.log("Ive disconnected mongo");
    process.exit(0);
  }
};

module.exports = mongoFunctions;
