const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');


const productSchema = new mongoose.Schema({
    product:{
        type:String,
        require:false
    },
    price:{
        type:Number,
        require:false
    },
    waranty:{
        type:Date,
        require:false
    },
   
    image:{
        type:String,
        require:false
    }
})

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required: true,
    },
    password:{
        type:String,
        required: true  
    },
    email:{
        type:String,
        required:true,
        unique: true,
    },
    gender:{
        type:String,
        required:true
    },
    role:{
        type:String,
        required:true
    },
    productDetails:[productSchema],
    otp: { type: String }, // OTP for password reset
    otpExpiresAt: { type: Date } // Expiry time for the OTP

})

const User = mongoose.model('User', userSchema);

module.exports = User;