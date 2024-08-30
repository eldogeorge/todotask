// s5 to create logic

const tasks = require("../Models/emsModels");

// SEDS1 register logic
// for export down module. exports 
taskRegister = async (req, res) => {
    // for profile```````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````
    const file = req.file.filename
    // for emsdetails
    const { ttask, dtask, status } = req.body
    // if: to check value in the server, to know to the user
    if (!ttask || !dtask || !status) {
        res.status(404).json("All inputs are required")
    }
    try {//if any internet issue error
        const preTask = await tasks.findOne({ ttask })//findone async data

        if (preTask) {
            res.status(403).json("Task already present")
        }
        else {
            // create object for new Tasks                                      
            const newTask = new tasks({ ttask, dtask, status})

            await newTask.save()//asyn var

            res.status(200).json(newTask)
        }
    }
    catch {
        res.status(400).json("Logic Error")
    }
}

// GES2 get all employees after exports goto router
getAllTasks = async (req, res) => {

    // SSDS8 access search data from request query
    const tosearch = req.query.tosearch//const {search}=req.query

    // SSDS9 regular expresion query then goto line51
    const query = {
        // element to search:{regular expresion:key &value,uppercase& lowercase}
        ttask: { $regex: tosearch, $options: 'i' }
    }

    // 
    try {
        // SSDS10 end
        const allTasks = await tasks.find(query)
        res.status(200).json(allTasks)
    }
    catch (err) {
        res.status(400).json(err)

    }
}

// GSES3 get single employyees after exports goto router
getSingleTask = async (req, res) => {
    const param = req.params.id//or const {id}=req.params.id
    try {
        const sTask = await tasks.findOne({ _id: param })
        res.status(200).json(sTask)
    }
    catch (err) {
        res.status(400).json(err)
    }
}

// RES2 after exports goto router
toRemoveTask = async (req, res) => {
    const param = req.params.id
    try {
        const removeEmployee = await employees.findByIdAndDelete({ _id: param })
        res.status(200).json(removeEmployee)
    }
    catch (err) {
        res.status(400).json(err)
    }
}

// EUES2 logic to update employee upto end after export then goto router import
editTask = async (req, res) => {
    const id = req.params.id//or const {id}=req.params.id
   
    // for emsdetails
    const { fname, lname, email, mobile, gender, status, location,user_profile } = req.body

     // for profile
     const file = req.file?req.file.filename:user_profile   
    // if: to check value in the server, to know to the user
    if (!fname || !lname || !email || !mobile || !gender || !status || !location) {
        res.status(400).json("All inputs are required")
    }
    try{
        const user=await employees.findOne({ _id: id })
        if(user){
            // update all value with new data
            user.fname=fname
            user.lname=lname
            user.email=email
            user.mobile=mobile
            user.gender=gender
            user.status=status
            user.location=location
            user.profile=file

            // save data
            user.save()
            // send to frontend
            res.status(204).json(user)
        }
    }
    catch(err){
        res.status(400).json(err)
    }
}

module.exports = { taskRegister, getAllTasks, getSingleTask, toRemoveTask, editTask }
