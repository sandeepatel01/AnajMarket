// create(intantiate) server 
const express = require('express');
const app = express();

const colors = require('colors');
const morgan = require('morgan');
const cors = require('cors');


// Import all routes 
const authRoutes = require("./routers/auth");
const categoryRoutes = require("./routers/category")
const productRoutes = require("./routers/product")


// server listen in porst -> load config from  env file 
require("dotenv").config();
const PORT = process.env.PORT || 8080;


// middleware to parse json request body 
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));


// routes mount 
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);


// start server 
app.listen(PORT, () => {
    console.log(`server started successfully at ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan.white);
})

// CONNECTION TO THE DATABASE 
const dbConnect = require("./config/db");
dbConnect();

// default route 
app.get('/', (req, res) => {
    res.send(`<h1>Welcome to ecommerce app</h1>`);
});
