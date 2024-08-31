// s2To create paths

//PS1.1 set paths for each requests

//PS1.2 import express
const express=require ('express')
const { taskRegister, getAllTasks, getSingleTask, toRemoveTask, editTask } = require('../Controllers/logic')


//PS2 line 16create an object for Router class in express
//  varname  inside express router class is imported
const router=new express.Router()

// register tasks - post request  //SEDS3                   // SEDS2
router.post('/tasks/register',taskRegister)


// api request tasks in a table 
//GES1 get all employees- get request then goto logic.js, GES3(import getAllEmployees),then goto server-> allAPI.js
router.get('/tasks/getTasksDetails',getAllTasks)


// router request single employyee in view
// GSES2 get single employees- get request then goto logic.js, GSES4(import getSingleEmployees),then goto clientsserver-> allAPI.js
router.get('/tasks/singleTaskDetail/:id',getSingleTask)


// router request to delete employee
// RES1 then goto logic.js                      RES3 imort toremoveremployee then goto clientserver->allapi.js
router.delete('/tasks/toRemoveTask/:id',toRemoveTask)

// router request to update/edit employee
// EUES1 edit employee then goto logic.js                          EUES3 import editEmployee then goto clientServer->edit.js
router.put('/tasks/updateTask/:id',editTask)
// .. other request

//PS3 export router
module.exports=router
