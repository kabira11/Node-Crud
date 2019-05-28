const express = require('express');

require("express-async-errors");

const app = express();

const mongoose = require("mongoose");

const bodyParser = require("body-parser")

// const morgon = require("morgon")

//data base connection
require("./mongo")

//Model
require('./model/employees')
require('./model/department')

//MiddleWare
app.use(bodyParser.json())
    // .use(morgon())


//Routes
app.use("/employee",require("./routes/post"))


//Not Found Routes
app.use((req,res,next) => {
    req.status = 404;
    const error = new Error("Routes not found.")
    next(error);
})

if(app.get("env") === "production"){
    app.use((error , req ,res , next) => {
        res.status(req.status || 500).send({
            message : error.message
        })
    })
}
app.use((error , req ,res , next) => {
    res.status(req.status || 500).send({
        message : error.message,
        stack : error.stack
    })
})

app.listen(5004,()=>{
    console.log('Express server started at port : 5004');
})
