const mongoose = require('mongoose');
require('dotenv').config();

const mongodbUrl = process.env.MONGODB_URL;
const connectionToMongDB = async()=>{
    try{
        await mongoose.connect(mongodbUrl)
        console.log("Connected to MongoDB") 
    }
    catch(err){
        console.log("error connecting to DB", err)
    }
}

module.exports = {connectionToMongDB}