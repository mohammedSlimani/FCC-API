const router = require("express").Router();
const UserActions = require("./db/userActions");
const ExoActions = require("./db/exoActions");

router.post("/new-user", (req, res) => {
    const { username } = req.body;
    if (username == null) {
        res.status(400).send({ error: 'username not valid' });
    } else {
        UserActions.addUser(username, (result) => {
            if (result == null) {
                res.status(400).send({ error: 'username already exists' });
            } else {
                res.status(200).send(result);
            }
        });
    }
});

router.get('/users', (req, res) => {
    UserActions.findAll((result) => {
        if (result == null) {
            res.status(400).send({ error: 'error fetching data' });
        } else {
            res.status(200).send(result);
        }
    })
})

router.post('/add', (req, res) => {
    console.log('body', req.body);
    const { description, userId, duration, date } = req.body;
    ExoActions.addExo(userId, description, duration, date, (result) => {
        if (result == null) {
            res.status(400).send({ error: "Can't add the Exercise" });
        } else {
            res.status(200).send(result)
        }
    })
})

router.get('/log', (req, res) => {
    console.log("query", req.query);
    const { user_id } = req.params;
    ExoActions.findAllExoOfUser(user_id, (result) => {
        if (result == null || result == null)
            res.status(400).send({ error: "can't find the exos of this user" });
        else
            res.status(200).send(result);
    })
})

module.exports = router;