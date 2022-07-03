const mongoose = require("mongoose"); // mongoose 모듈 불러오기
const Schema = mongoose.Schema;

const solverSchema = Schema(
    {
        quizCode: {
            type: String,
        },
        //nickname, color, order of pattern
        info: [Object],
        message: {
            type: String,
        },
        score: {
            type: Number,
        },
        quizLen: {
            type: Number
        }
    }
);

const Solver = mongoose.model("Solver", solverSchema);
module.exports = Solver;