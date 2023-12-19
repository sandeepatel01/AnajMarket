// create(intantiate) server 
const express = require('express');
const app = express();

const colors = require('colors');
const morgan = require('morgan');
const cors = require('cors');



// server listen in porst -> load config from  env file 
require("dotenv").config();
const PORT = process.env.PORT || 8080;




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
