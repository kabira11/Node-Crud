const mongoose = require("mongoose")
const mongoDBErrors = require("mongoose-mongodb-errors");
mongoose.Promise = global.Promise;
mongoose.plugin(mongoDBErrors);

mongoose.connect('mongodb://localhost:27017/EmployeeDB' , {useNewUrlParser : true}, (err) =>{
    if(!err) 
    {
        console.log("DB connection successful...")
    }else 
    {
        console.log("Error in DB connection..." + JSON.stringify(err,undefined,2))
    }
});