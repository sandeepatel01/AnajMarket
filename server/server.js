const express = require('express');
const app = express();

// server listen in porst -> load config from  env file 
require("dotenv").config();
const PORT = process.env.PORT || 8080;


// start server 
app.listen(PORT, () => {
    console.log(`server started successfully at ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan.white);
})


// CONNECTION TO THE DATABASE 
const dbConnect = require("./config/database");
dbConnect();


// default route 
app.get('/', (req, res) => {
    res.send(`<h1>Welcome to ecommerce app</h1>`);
});