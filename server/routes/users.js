const router = require("express").Router();
let User = require("../models/user.model");

router.post("/saveUser", (req, res) => {
    const user = new User(req.body);
    user.save((err) => {
        if (err) return res.json({ success: false, err });
        else return res.status(200).json({ success: true, user })
    });
});

router.post('/getUsers', (req, res) => {
    User.find({})
        .exec((err, users) => {
            if (err) return res.status(400).send(err);
            res.status(200).json({ success: true, users });
        });
});

module.exports = router;