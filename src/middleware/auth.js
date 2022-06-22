const jsonwebtoken = require("jsonwebtoken");

 const authorization = (req,_,next)=>{
  if(!req.headers.authorization){
    throw new Error('Authorization header is required');
  }
  const token = req.headers.authorization.split(' ')[1];
  if(!token){
    throw new Error('Token is required');
  }
  if(jsonwebtoken.verify(token,process.env.JWT_SECRET)){
    return true;
  }
  else{
    throw new Error('Token is invalid');
  }
}
module.exports = authorization;
