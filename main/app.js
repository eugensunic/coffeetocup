const express = require('express');
const passport = require('passport');
const middleware = require('./global/node-global-middleware.js');

const mongo = require('./mongo/mongo-connect.js');

const register = require('./register/index.js');
const login = require('./login/index.js');
const logout = require('./logout/index.js');

const coffee = require('./coffee-backend/index.js');
const userProfile = require('./user-profile/index.js');
const settings = require('./user-profile-settings/index.js');
const community = require('./community/index.js');
const coffees = require('./coffees/index.js');

const staticPages = require('../static-pages/index.js');

const app = express();

const dbName = process.env.NODE_ENV === 'develop' ? 'coffeestartdev' : 'coffeestart';
const connectionString =
  'mongodb+srv://esunic:mili7788@cluster0-dndis.mongodb.net/' +
  dbName +
  '?retryWrites=true';

mongo
  .mongoConnect(connectionString)
  .then(() => {
    console.log('Database connection successful');
    console.log('APP MODE:', process.env.NODE_ENV === 'develop' ? 'DEVELOP' : 'PRODUCTION');
    global.socialMediaCallbackHost = process.env.NODE_ENV === 'develop' ? 'http://localhost:5000/' : 'https://coffeetocup.com/';
    app.listen(5000, _ => {
      app.emit('appStarted');
      console.log('Server started on port 5000');

      // middleware
      middleware.initMiddleware(app, passport);

      // init all components
      register.initRegister(app);

      login.initLogin(app, passport);
      logout.initLogout(app);

      userProfile.initUserProfile(app);
      settings.initUserSettings(app);

      coffee.initCoffee(app);
      community.initCommunity(app);
      coffees.initCoffees(app);

      // serve static pages for SEO purpose
      staticPages.init(app);
    });
  })
  .catch(err => {
    // 504 Gateway Timeout need to adjust FE for this error
    console.error('App starting error:', err.stack);
    process.exit(1);
  });

// If the Node process ends, close the Mongoose connection
process
  .on('SIGINT', mongo.mongoDisconnect)
  .on('SIGTERM', mongo.mongoDisconnect);

module.exports = app;
