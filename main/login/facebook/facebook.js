const { setCookieMaxAge } = require('../../global/utils');

// trigger login process
module.exports = {

    init: (app, passport) => {
        app.get('/auth/facebook',
            passport.authenticate('facebook', {
                session: false

            }),
            (req, res) => {
                console.log('auth/Facebook');
                console.log(res);
            });

        // route returns cookie
        app.get('/auth/facebook/callback',
            passport.authenticate('facebook', {
                failureRedirect: '/errorpage'

            }), (req, res) => {
                console.log('facebook req', req.session);
                res.cookie('auth', req.session, setCookieMaxAge);
                res.redirect('/profile');
            });
    }
};