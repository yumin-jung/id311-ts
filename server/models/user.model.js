const mongoose = require("mongoose"); // mongoose 모듈 불러오기
const Schema = mongoose.Schema;
const userSchema = Schema(
    {
        firstName: {
            type: String,
        },
        lastName: {
            type: String,
        },
        username: {
            type: String,
        },
        password: {
            type: String,
        },
        quizCode: {
            type: String,
        },
    }
);

const User = mongoose.model("User", userSchema);
module.exports = User;