const facebookMiddleware = require('./facebook/middleware.js');
const facebook = require('./facebook/facebook.js');

const googleMiddleware = require('./google/middleware.js');
const google = require('./google/google.js');

const localMiddleware = require('./local/middleware.js');
const local = require('./local/local.js');

//init facebook, google, custom login
module.exports.initLogin = (app, passport) => {

    facebookMiddleware.facebookStrategyMiddleware(passport);
    facebook.init(app, passport);

    googleMiddleware.googleStrategyMiddleware(passport);
    google.init(app, passport);

    localMiddleware.localStrategyMiddleware(passport);
    local.init(app, passport);

};