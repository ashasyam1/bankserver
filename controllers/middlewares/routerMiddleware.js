//import jwt
// const jwt=require('jsonwebtoken')
const jwt=require('jsonwebtoken')
//middleware-like a anormal fn
//3arguments-(req,res,next)
//arrow fn
//used to validate jwt token
 const jwtMiddleware=(req, res, next)=>{ //next()-function
   try{
    //access token from request header-use[]for calling headers
  const token = req.headers["access_token"] //if token not  accessed then run time errors occur-situation unauthorized user trying to login
//validation token-jwt contains a verify()metod for  this
  jwt.verify(token,"secretkey123") //-o/p true or false
  //calling next function-if token is verified continue the request
  next()
    }
catch{
res.status(404).json("please login")
}
}
 module.exports=jwtMiddleware