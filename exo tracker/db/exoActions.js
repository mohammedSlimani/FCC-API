const Models = require('./models');
const UserActions = require('./userActions');

const addExo = (userId, description, duration, date, done) => {
    if (!date) date = new Date();

    UserActions.findUserById(userId, (found) => {
        if (found == null || found == false) {
            //unkown_ID
            console.log("didn't find the user with this id");
            done(null);
        } else {
            let exo = new Models.Exo({ description: description, duration: duration, date: date, authot: found });
            exo.save((err, saved) => {
                if (err) {
                    console.log("err creating the exo", err);
                    done(null);
                } else {
                    done(saved);
                }
            })
        }
    })
}

const findAllExoOfUser = (userId, done) => {
    UserActions.findUserById(userId, (userFound) => {
        if (userFound == null || userFound == false) {
            console.log("couldn't find the user with this id");
            done(null);
        } else {
            Models
                .Exo
                .find({ author: userFound })
                .exec((err, found) => {
                    if (err) {
                        console.log('err finding the exo of the user');
                        done(null);
                    } else {
                        done(found);
                    }
                })
        }

    })
}

const findAll = (done) => {
    Models
        .Exo
        .find()
        .exec((err, found) => {
            if (err) {
                console.log('err finding all the exos');
                done(null);
            } else {
                done(found);
            }
        })
}


exports.addExo = addExo;
exports.findAllExoOfUser = findAllExoOfUser;
exports.findAll = findAll;