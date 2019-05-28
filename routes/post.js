const router = require("express").Router(); 

const mongoose = require("mongoose");

const Employee = mongoose.model("Employee")

const Department = mongoose.model("Department")

router.get("/" , async (req,res) => {
    const employees = await Employee.find({})
    res.send(employees)
})


//Post data
router.post("/" , async (req,res) => {
        const employee = new Employee();
        employee.fullName = req.body.fullName;
        employee.email = req.body.email;
        employee.mobile = req.body.mobile;
        employee.city = req.body.city;

       await employee.save();
       res.send(employee);
 })

 //Get data
 router.get("/:employeeId" , async (req , res) => {
        const employee = await Employee.findOne({_id: req.params.employeeId})
        res.send(employee)
 })

 //Update data
 router.put("/:employeeId" , async (req , res) => {
        const employee = await Employee.findByIdAndUpdate({
            _id: req.params.employeeId}
            ,req.body,{
                new : true,
                runValidators : true
            })
        res.send(employee)
 })

 //Delete data
 router.delete("/:employeeId" , async (req , res) => {
        const employee = await Employee.findByIdAndRemove({
            _id: req.params.employeeId})
        res.send(employee)
 })

//Department

//Create a department
router.post("/:employeeId/department" , async (req,res) => {
    //Find a employee
    const employee = await Employee.findOne({_id: req.params.employeeId })
    //create a deparment
    const department = new Department();
    department.department = req.body.department;
    department.post = employee._id;
    await department.save();
    // //associate empoye with department
    employee.department = department._id;
    await employee.save();

    res.send(department);
})


//read department

router.get("/:departmentId/department" , async (req,res) => {

    const employee = await Employee.findOne({_id: req.params.departmentId }).populate("department")
    res.send(employee)
})


//edit a department

router.put("/department/:departmentId" , async (req , res) =>{
    const department = await Department.findOneAndUpdate(
        {
        _id: req.params.departmentId
        },
        req.body,
        {new: true , runValidators: true}
    );
    res.send(department);
})

//delete a department

router.delete("/department/:departmentId" , async (req , res) =>{
    await Department.findByIdAndRemove(req.params.departmentId);
    res.send({
        message: "Department Successfully deleted"
    });
})

module.exports = router;