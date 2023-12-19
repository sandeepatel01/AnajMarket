// import mongoose from "mongoose";
// import colors from "colors";
// import dotenv from "dotenv";

// dotenv.config();

// const connectDB = async () => {
//     try {
//         const conn = await mongoose.connect(process.env.MONGODB_URL,
//             {
//                 useNewUrlParser: true,
//                 useUnifiedTopology: true,
//             });
//         console.log(`Conneted To Mongodb Databse ${conn.connection.host}`.bgMagenta.white);
//     } catch (error) {
//         console.log(`Errro in Mongodb ${error}`.bgRed.white);
//         process.exit(1);
//     }
// };

// export default connectDB;


const mongoose = require('mongoose');
require("dotenv").config();

const colors = require('colors')

const dbConnect = async () => {
    try {
        const conn = await mongoose.connect(
            process.env.MONGODB_URL,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            })

        console.log(`DB connection successfully ${conn.connection.host}`.bgMagenta.white);
    } catch (error) {
        console.log(`issue in db connection ${error}`.bgRed.white);
        process.exit(1);
    }
}
module.exports = dbConnect;