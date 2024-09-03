// s5 to create logic

const { request } = require("express");
const tasks = require("../Models/taskModels")


// SEDS1 register logic
// for export down module. exports 
todotaskRegister = async (req, res) => {

    // for taskdetails
    const { ttask, dtask, statu } = req.body.body
    console.log(ttask);
    console.log(dtask);
    console.log(statu);
    console.log(req.body);


    // if: to check value in the server, to know to the user
    if (!ttask || !dtask || !statu) {
        return res.status(400).json("All inputs are required")
    }
    try {//if any internet issue error
        const preTask = await tasks.findOne({ ttask })//findone async data

        if (preTask) {
            return res.status(406).json("Task already present")
        }
        else {
            // create object for new Tasks                                      
            const newTask = new tasks({ ttask, dtask, statu })

            await newTask.save()//asyn var

            return res.status(205).json(newTask)
        }
    }
    catch {
        return res.status(400).json("Logic Error")
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
        const removeTask = await tasks.findByIdAndDelete({ _id: param })
        res.status(200).json(removeTask)
    }
    catch (err) {
        res.status(400).json(err)
    }
}

// EUES2 logic to update employee upto end after export then goto router import
editTask = async (req, res) => {
    const {id}= req.params//or const {id}=req.params.id

    // for emsdetails
    const { ttask, dtask, statu } = req.body
    console.log(req.body);

    // if: to check value in the server, to know to the user
    if (!ttask || !dtask || !statu) {
        return res.status(400).json("All inputs are required")
    }
    try {//if any internet issue error
        const user = await tasks.findOne({ _id: id })//findone async data

        if (user) {
            // update all value with new data
            user.ttask = ttask
            user.dtask = dtask
            user.statu = statu

            // save data
            user.save()
            // send to frontend
            res.status(205).json(user)
        }
    }
    catch {
        return res.status(400).json("Logic Error")
    }
}

module.exports = { todotaskRegister, getAllTasks, getSingleTask, toRemoveTask, editTask }
