var LocalStrategy = require('passport-local').Strategy;
var bCrypt = require('bcrypt-nodejs');

// temporary data store
var users = {};

module.exports = function(passport) {

    // Passport needs to be able to serialize and deserialize users to support persistent login session
    passport.serializeUser(function(user, done) {
        // Tell Passport which ID yo use for user
        console.log('serialize user:', user.username);
        return done(null, user.username);
    });

    passport.deserializeUser(function(username, done) {
        // Return user object back
        return done(null, users[username]);
    });

    passport.use('login', new LocalStrategy({
            passReqToCallback : true
        },
        function(req, username, password, done) {

            // Check if the user not exists
            if (!users[username]) {
                return done("user not found", false);
            }

            // Check if the password is correct
            if (!isValidPassword(users[username], password)) {
                return done("Invalid password", false);
            }

            // Sucessfully signed in
            console.log("Sucessfully signed in");
            return done(null, users[username]);
        })
    );

    passport.use('signup', new LocalStrategy({
            passReqToCallback : true
        },
        function(req, username, password, done) {

            // Check if the user alredy exists
            if (users[username]) {
                return done('username already exists', false);
            }

            // Add user to db
            users[username] = {
                username : username,
                password : createHash(password)
            }

            console.log(JSON.stringify(users));

            // Successfully signup
            return done(null, users[username]);
        })
    );

    var isValidPassword = function(user, password) {
        return bCrypt.compareSync(password, user.password);
    };

    // Generate hash using bCrypt
    var createHash = function(password) {
        return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
    };
};