// import express
const express=require('express')

//import .env file
require('dotenv').config()

//import cors
const cors=require('cors')
const rout = require('./routes/userRouting')

//import db connection
require('./db/dbconnection')

// import router
//require('./routes/userRouting')

//server creation(create server using express)
const server=express()

//connect with frontend(accept everything globally because connection string is not defined )
server.use(cors())

//to convert all JSON type datas to JS
server.use(express.json())

server.use(rout)

//for checking in thunderclient
//server.get('/excgetpath/newuser',(req,res)=>{
  //  res.send("get request response")
//})     
// server.get('/excgetpath/lastuser',(req,res)=>{
    // res.send("get request response 2")
// })
//port set
const port=3000 || process.env.port              

//runnin configuratrion
server.listen(port,()=>{
    console.log(`___123server started at port number ${port}`)
})