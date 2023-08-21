
//import express
const express=require('express')
//importing logic
const logic=require('../controllers/logic')

const  jwtMiddleware=require('../controllers/middlewares/routerMiddleware')
//middleware

// const jwtMiddleware = require('../controllers/middlewares/routerMiddleware')


//create an object for  router class in express
const router=new express.Router()

//register-data storing->pathsetting and calling register from logic.js
router.post('/bankUser/userRegister',logic.register)

//login
router.post('/bankUser/user-login',logic.login)        
         
//get user-profile     
router.get('/bankUser/user-profile/:acno',jwtMiddleware,logic.getProfile)
//get user-balance    
router.get('/bankUser/user-balance/:acno',jwtMiddleware,logic.getBalance)
//money transfer
router.post('/bankUser/money-Transfer',jwtMiddleware,logic.moneyTransfer)
//transation history
router.get('/bankUser/user-History/:acno',jwtMiddleware,logic.history)
      
//delete ac
router.delete('/bankUser/user-Delete/:acno',logic.deleteAc)                   


                    
                                                       
//export router
module.exports=router
