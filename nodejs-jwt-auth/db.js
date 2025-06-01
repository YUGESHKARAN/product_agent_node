const mongoose = require('mongoose');


const connectionToMongiDB = async()=>{
    try{
        await mongoose.connect("mongodb+srv://yugeshkaran01:GEMBkFW5Ny5wi4ox@blog.adtwl.mongodb.net/JWT-AUTH?retryWrites=true&w=majority&appName=User")
        console.log("Connected to MongoDB") 
    }
    catch(err){
        console.log("error connecting to DB", err)
    }
}

module.exports = {connectionToMongiDB}