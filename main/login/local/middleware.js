const LocalStrategy = require('passport-local').Strategy;
const User = require('../../mongo/model/user/user.model.js');
const bcrypt = require('bcrypt');


module.exports = {
    // post data must be in type:
    // {"email":value, "password":value}
    // sometimes node breaks here, enters the local strategy but then breaks.
    localStrategyMiddleware: (passport) => {
        passport.use(new LocalStrategy({
                usernameField: 'email',
                passwordField: 'password'
            },
            (email, password, done) => {
                console.log('in local strategy middleware');
                User.findOne({
                    email: email
                }, (err, user) => {
                    console.log(err);
                    console.log(user);
                    if (err) {
                        return done(err);
                    }
                    if (!user) {
                        return done(null, false);
                    }
                    bcrypt.compare(password, user.password, (err, match) => {
                        if (match) {
                            return done(null, user);
                        }
                        return done(null, err);
                    });

                });
            }
        ));
    }
};