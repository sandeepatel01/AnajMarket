// create(intantiate) server 
const express = require('express');
const app = express();

const colors = require('colors');
const morgan = require('morgan');
const cors = require('cors');

const path = require('path')

// CONNECTION TO THE DATABASE 
const db = require("./config/db");

// Import all routes 
const authRoutes = require("./routers/auth");
const categoryRoutes = require("./routers/categoryRoutes")
const productRoutes = require("./routers/productRoutes")

// server listen in porst -> load config from  env file 
require("dotenv").config();
const PORT = process.env.PORT || 8080;

// middleware to parse json request body 
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use(express.static(path.join(__dirname, "../build")))


// routes mount 
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);



// start server 
app.listen(PORT, () => {
    console.log(`server started successfully at ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan.white);
})


// Connecting to database
db.connect();

// default route 
// app.get('/', (req, res) => {
//     res.send(`<h1>Welcome to AnajMarket app</h1>`);
// });

app.use('*', function (req, res) {
    res.sendFile(path.join(__dirname, "../build/index.html"))
})
