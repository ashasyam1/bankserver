//import mongoose
const mongoose=require('mongoose')

//create model collection
//schema-fields and values
//users

const users=new mongoose.model("users",{
    uname:String,
    acno:Number,
    psw:String,
    balance:Number,
    transactions:[]
})     
module.exports=users                
