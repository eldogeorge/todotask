// MS3
// connect env file
require('dotenv').config()

// import db connection file MS6 goto models
require('./dataBase/connections')

// s1 
// to create server using express SC1-

// SC1
const express=require('express')
// SC3
const cors=require('cors')

// PS5 import router from Routes auto..
const router = require('./Routes/router')


// SC2
const server=express()

// SC4 to link frontend
server.use(cors())
// SC5 to convert json file to js file
server.use(express.json())
// PS4 router link
server.use(router)
// first var then goto router.js

// SC6 to create port to link 
                // to set port MS 4 goto connections.js
const port=8000 || process.env.port

// GEIS1 export uploads folder to client

server.listen(port,()=>{
    console.log(`--------To-Do-Task Server started At Port Number ${port}--------`);
})