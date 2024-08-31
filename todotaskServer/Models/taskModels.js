// s3 to create 
// Models Creatation MCS1 line 56

// import mongoose
const  mongoose  = require("mongoose");


const taskSchema=new mongoose.Schema({
    ttask:{
        type:String,
        // *require
        required:true,
        // to remove white space backend vailation
        // trim:true
    },
    dtask:{
        type:String,
        required:true,
        // trim:true
    },
    status:{
        type: String,
        required:true
    }
})

// model connects MCS2
//collectionName same as atlas   collectionName,schemaName
const tasks=new mongoose.model('tasks',taskSchema)


// exports model MCS3 goto index.js

module.exports=tasks
