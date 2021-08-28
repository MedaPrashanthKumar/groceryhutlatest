const jwt=require("jsonwebtoken")
require("dotenv").config()
const validateToken=(req,res,next)=>{

    //extract token from header of req object
  let tokenWithBearer=  req.headers['authorization']
   if(tokenWithBearer==undefined){
       res.send({message:"failed",reason:"Unauthorized access"})
   }
   else{
       //get token from bearer token
      let token= tokenWithBearer.slice(7,tokenWithBearer.length)
      //verify token
      jwt.verify(token,"abcdef",(err,decededToken)=>{
        if(err){
        res.send({message:"failed",reason:"Session expired"})
        }
        else{
            next();
        }
      })
   }
}

module.exports=validateToken;