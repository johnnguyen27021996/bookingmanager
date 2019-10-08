const passport = require('passport');
const strategyLocal = require('passport-local').Strategy;
const dbUser = require('../../models/user.model');

passport.serializeUser(function (user, done) {
    return done(null, user);
});

passport.deserializeUser(function (user, done) {
    return done(null, user);
});

passport.use(new strategyLocal(
    function (username, password, done) {
        dbUser.findOne({ username: username }, function (err, doc) {
            if (!doc) {
                return done(null, false, {
                    message: 'Account does not exist'
                })
            } else {
                var checkPass = doc.comparePass(password, doc.password);
                if (checkPass == false) {
                    return done(null, false, {
                        message: 'Incorrect Password'
                    })
                } else {
                    if (doc.active == false) {
                        return done(null, false, {
                            message: 'Account not activated'
                        })
                    } else {
                        return done(null, doc);
                    }
                }
            }
        })
    }
));

module.exports = passport;