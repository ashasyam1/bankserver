//IMPORT MODEL
//const {json} = require("express")
// const json = require('express').json;
//import jwt
const jwt=require('jsonwebtoken')
const users = require("../models/modelcollection")
//users.use(json());


// const users = require("../models/modelcollection")


//logic for register

const register=(req,res)=> {
    //accessing variables(acno,psw,uname are keys)
    const acno = req.body.acno;
    const uname = req.body.uname;     
    const psw = req.body.psw;    

    //check acno is present in users collection
    users.findOne({acno}).then(user => {      
        if (user) {
            res.status(401).send("user already exists");
        }
        else {
            //register user-create a new object for user(model)
            //object creation                      
            var newUser = new users({
                uname,
                acno,
                psw,
                balance:0,
                transactions: []
            })                                   
            //save the object in collection  
            newUser.save()
            //response() used to send response the user but in here use json() because
            //json() used to convert js data into json type and send responce  to the users
            res.status(200).json(newUser)
        }
    })

                
    //res.send("register working")
}

//logic for login
//arrow function
const login = (req,res) => {
    const {acno,psw} = req.body
    users.findOne({acno,psw}).then(user => {                               
        if (user) {
            //generate token
            var token=jwt.sign({acno},"secretkey123")
            res.status(200).json({
            acno:user.acno,
            uname:user.uname,
            token 
        })                                                                           
        }
        else {
            res.status(401).json("Incorrect account number or password")
        }
    })           

}
//LOGIC TO GET PROFILE DATAS
const getProfile = (req,res) => {
    //acess acno param from url req
    const { acno } = req.params
    users.findOne({ acno }).then(user => {
        if (user) {
            res.status(200).json({
                acno: user.acno,
                uname: user.uname
            })
        }
        else {
            res.status(401).json("user not exist")
        }

    })

}

//LOGIC TO GET balance enquiry
const getBalance = (req,res) => {
    //acess acno param from url req
    const { acno } = req.params
    users.findOne({ acno }).then(user => {
        if (user) {
            res.status(200).json({
                acno: user.acno,
                balance: user.balance
            })
        }
        else {
            res.status(401).json("user not exist")
        }

    })

}
//money transfer
const moneyTransfer=(req,res)=>{
//access all datas from body
    const {fromacno,toacno,psw,amount,date}=req.body //destruction

    //converting amount to number
    var amnt = parseInt(amount)

    //check from user in db
    users.findOne({acno:fromacno,psw}).then(fromuser=>{
        if (fromuser) {

            //check for toUser
            users.findOne({acno:toacno}).then(touser => {
                if(touser) {
                    //from balance check
                    if (amnt<=fromuser.balance) {
                        fromuser.balance -= amnt
                        fromuser.transactions.push({type:"Debit",amount:amnt,date,user:touser.uname})
                        fromuser.save()
                       
                        touser.balance += amnt
                        touser.transactions.push({type:"Credit",amount:amnt,date,user:fromuser.uname})
                        touser.save()
                        res.status(200).json({ message:"transaction successfull" })   
                    }                                    
                    else {           
                        res.status(401).json({ message:"insufficient balance" })   
                    }
                }         
                else {
                    res.status(401).json({ message:"invalid credit credentials" })
                }
            })
        }
        else {
            res.status(401).json({ message: "invalid debit credentials" })
        }

           
    })

}
//transaction history logic

const history=(req,res)=>{
const {acno}=req.params //destructure
users.findOne({acno}).then(user=>{
if(user){
    res.status(200).json(user.transactions)
}
else{
    res.status(401).json("user not found")
}                 
}) 
}   


//logic to delete acc
const deleteAc=(res,req)=>
{
    const {acno}=req.params
    users.deleteOne({acno}).then(user=>{
        if(user){
            res.status(200).json("Account deleted successfully")
        }
        else{
            res.status(401).json("user not found")
        }   
    })
}

module.exports={
    register, login, getProfile, getBalance, moneyTransfer,history,deleteAc                          
}                             
                     
                                                                                                                   
