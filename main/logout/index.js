const User = require('../mongo/model/user/user.model.js');
const ObjectId = require('mongodb').ObjectID;

module.exports.initLogout = (app) => {
    app.post('/logout', (req, res, next) => {
        storeLogoutTime(req.session.passport.user._id, req.body.loggedOutTime).then(() => {
            req.session = null;
            res.clearCookie('auth');
            res.end();
        }).catch((err) => next(err));
    });
};

function storeLogoutTime(userId, loggedOutTime) {
    const findQuery = {
        _id: new ObjectId(userId),
    };
    const updateData = {
        $set: {
            loggedOutTime: loggedOutTime
        }
    };
    return User.findOneAndUpdate(findQuery, updateData, {
        useFindAndModify: false,
        new: true
    });
}