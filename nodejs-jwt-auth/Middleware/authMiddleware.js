const jwt = require('jsonwebtoken');    
const JWT_SECRET = process.env.ACCESS_TOKEN_SECRET 

const authMiddleware = (req,res,next)=>{
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>

  // console.log('Received token:', token);

  if (!token) {
    return res.status(401).json({ message: "Invalid token" });
  }

    try{
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch(err){
       res.clearCookie('token');
       return res.status(401).json({message:"Invalid token"});
    }
}

module.exports = authMiddleware;