const Models = require('./models');

const addUser = (username, done) => {
    findUserByUsername(username, (found) => {
        if (found == null) {
            done(null);
        }
        if (found == false) {
            //No userWith the same username exists, We add it
            let newUser = new Models.User({ username: username });
            newUser.save((err, saved) => {
                if (err) {
                    console.log("error saving the user", err);
                    done(null);
                } else {
                    done(saved);
                }
            })
        } else {
            //A user already exists
            done(false);
        }
    });
}

const findUserByUsername = (username, done) => {
    Models
        .User
        .find({ username: username })
        .exec((err, found) => {
            if (err) {
                console.log("error finding user by username", err);
                done(null);
            }
            else if (found == null) {
                console.log("no user");
                done(false);
            } else {
                done(found);
            }
        })
}

const findUserById = (userId, done) => {
    Models
        .User
        .find({ _id: userId })
        .exec((err, found) => {
            if (err) {
                console.log("err finding user by id", err);
                done(null);
            }
            else if (found == null) {
                done(false);
            } else {
                done(found);
            }
        })
}

const findAll = (done) => {
    Models
        .User
        .find({})
        .exec((err, found) => {
            if (err) {
                console.log("Err finding all the users");
                done(null);
            } else {
                done(found);
            }
        })
}

exports.addUser = addUser;
exports.findUserByUsername = findUserByUsername;
exports.findUserById = findUserById;
exports.findAll = findAll;