const router = require("express").Router();
const mongoose = require('mongoose');
let Solver = require("../models/solver.model");

router.post("/saveSolver", (req, res) => {
    const solver = new Solver(req.body);
    solver.save((err) => {
        if (err) return res.json({ success: false, err });
        else return res.status(200).json({ success: true, solver })
    });
});

router.post('/getSolver', (req, res) => {
    Solver.find({})
        .exec((err, solvers) => {
            if (err) return res.status(400).send(err);
            res.status(200).json({ success: true, solvers });
        });
});

router.post('/deleteSolver', (req, res) => {
    const solverList = mongoose.model('Solver');
    solverList.findOneAndDelete({ solver: req.body.solver, message: req.body.message }, (err) => {
        if (err) res.json({ success: false, err });
        else res.status(200).json({ success: true });
    });
});

module.exports = router;