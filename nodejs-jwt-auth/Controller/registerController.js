const User = require('../Model/usersSchema');
const bcrypt = require('bcryptjs');

const register = async(req,res)=>{

    try{
      const {username,email,password,gender,role } = req.body;
      const user = await User.findOne({email});
      if(user) return res.status(400).json({message:"User already exist"});

      // Basic input validation
      if (!username || !email || !password) {
      return res.status(400).json({ message: "Username, email, and password are required" });
      }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
        username,
        email,
        password: hashedPassword,
        role,
        gender
    });

    await newUser.save();
    res.status(201).json({message:"User registered successfully"});

    }
    catch(err){
        console.error(err);

    // Handle duplicate key error gracefully
    if (err.code === 11000) {
      return res.status(400).json({ message: "Email already in use" });
    }

    res.status(500).json({ message: "Internal Server Error" });
    }
}

module.exports = {register};