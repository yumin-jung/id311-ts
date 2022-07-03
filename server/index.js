const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");
const app = express();
const PORT = process.env.PORT || 8080;
const bodyParser = require('body-parser');

// Fix cors error
// let whitelist = ['http://localhost:3000'
//     , 'https://id-311-final-project-git-develop-yumin-jung.vercel.app'
//     , 'https://id311.vercel.app'
//     , 'https://id-311-final-project-yumin-jung.vercel.app'
//     , 'https://id-311-final-project-git-main-yumin-jung.vercel.app']

// let corsOptions = {
//     origin: function (origin, callback) {
//         if (whitelist.indexOf(origin) !== -1) {
//             callback(null, true)
//         } else {
//             callback(new Error('Not allowed by CORS'))
//         }
//     }
// }
let corsOptions = {
    origin: "*",
    credential: true,
};

// routing
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api/users', require('./routes/users'));
app.use('/api/quizzes', require('./routes/quizzes'));
app.use('/api/solvers', require('./routes/solvers'));

mongoose
    .connect('mongodb+srv://yumin:1234@cluster0.3vbre.mongodb.net/?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
        console.log(err);
    });

app.listen(PORT, () => console.log(`server running on ${PORT}`))