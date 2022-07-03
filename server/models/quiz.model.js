const mongoose = require("mongoose"); // mongoose 모듈 불러오기
const Schema = mongoose.Schema;

const quizSchema = Schema(
    {
        makerName: {
            type: String,
        },
        quizCode: {
            type: String,
        },
        quizBundle: [Object],
        quizLength: {
            type: Number,
        },
        patterns: [Array],
    }
)

const Quiz = mongoose.model("Quiz", quizSchema);
module.exports = Quiz;