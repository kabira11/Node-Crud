const mongoose = require("mongoose")


var employeeSchema = new mongoose.Schema({
    fullName : {
        type : String,
        required : "Full Name is required"
    },
    email : {
        type : String,
        required : "Email is required"
    },
    mobile : {
        type : String,
        required : "Mobile number is required"
    },
    city : {
        type : String,
        required : "City is required"
    },
    department: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Department",
        required : "department is required field"
    }
},
{
   timestamps: true 
}
)

module.exports = mongoose.model('Employee' , employeeSchema);