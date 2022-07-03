const router = require("express").Router();
let Quiz = require("../models/quiz.model");

router.post("/saveQuiz", (req, res) => {
    const quiz = new Quiz(req.body);
    quiz.save((err) => {
        if (err) return res.json({ success: false, err });
        else return res.status(200).json({ success: true, quiz })
    });
});

router.post('/getQuiz', (req, res) => {
    Quiz.find({})
        .exec((err, quizzes) => {
            if (err) return res.status(400).send(err);
            res.status(200).json({ success: true, quizzes });
        });
});


module.exports = router;