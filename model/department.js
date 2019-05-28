const mongoose  = require("mongoose");

const department_schema = new mongoose.Schema({
    department: {
        type: String,
        required: "Department is required"
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee',
        required: "Employee is required Field"
    }
});


module.exports = mongoose.model("Department" , department_schema);