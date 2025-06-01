const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../Model/usersSchema');



const users = async(req,res)=>{

    try{
        const  users = await User.find();   
        res.status(200).json({users});

    }
    
    catch(err){
        console.error(err);
        res.status(500).json({message:"Internal Server Error"});
    }
    
}

module.exports = {users};