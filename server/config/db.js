// const mongoose = require('mongoose');
// require("dotenv").config();

// const colors = require('colors')

// const dbConnect = async () => {
//     try {
//         const conn = await mongoose.connect(
//             process.env.MONGODB_URL,
//             {
//                 useNewUrlParser: true,
//                 useUnifiedTopology: true,
//             })

//         console.log(`DB connection successfully ${conn.connection.host}`.bgMagenta.white);
//     } catch (error) {
//         console.log(`issue in db connection ${error}`.bgRed.white);
//         process.exit(1);
//     }
// }
// module.exports = dbConnect;



const mongoose = require("mongoose");
require("dotenv").config();

const colors = require('colors')

const { MONGODB_URL } = process.env;

exports.connect = () => {
    mongoose
        .connect(MONGODB_URL, {
            useNewUrlparser: true,
            useUnifiedTopology: true,
        })
        .then(console.log(`DB Connection Success`.bgMagenta.white))
        .catch((err) => {
            console.log(`DB Connection Failed`);
            console.log(err);
            process.exit(1);
        });
};