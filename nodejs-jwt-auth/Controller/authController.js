const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../Model/usersSchema'); // Importing the User model

const login = async(req,res)=>{

    const {email,password} = req.body;   

    try{
        
    const user = await User.findOne({email});

    if(!user) return res.status(401).json({message:"Invalid email"});

    const isValidPassword  = await bcrypt.compare(password, user.password);

    if(!isValidPassword) return res.status(401).json({message:"Invalid password"});

    const token = jwt.sign({user}, process.env.ACCESS_TOKEN_SECRET,{expiresIn: '1h'});

    // res.cookie('token',token,{
    //     httpOnly: true,
    //     secure: false, // set true if using HTTPS in production
    //     sameSite: 'lax',
    //     // maxAge: 60 * 60 * 1000, // 1 hour
    // })
      res.status(200).json({token, user:user.username,message: "Login successful"}) 
    }
    catch(err){
        console.error(err);
        res.status(500).json({message:"Internal Server Error"});
    }
    
}

module.exports = {login};