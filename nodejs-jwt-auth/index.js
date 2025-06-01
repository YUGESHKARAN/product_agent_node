require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');   
const app =express();
const bcrypt = require('bcryptjs'); 
const jwt = require('jsonwebtoken');    
const cookieParser = require('cookie-parser');  
const {connectionToMongiDB} = require('./db');
const serverless = require("serverless-http");
const authMiddleware = require('./Middleware/authMiddleware'); // Importing the authentication middleware  


app.use(cookieParser()); // Middleware to parse cookies
// app.use(cors({
//   origin: ["http://localhost:5173","https://product-agent-node-jgle.vercel.app/"], 
//   credentials: true
// }));

const allowedOrigins = [
  "http://localhost:5173",
  "https://product-agent-node-jgle.vercel.app"
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps, curl, etc.)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

connectionToMongiDB()

app.get('/',(req,res)=>{
    try{
        res.status(200).json({message:"welcome to backend"});

    }
    catch(err){
        res.status(500).json({message:"Internal Server Error"});
    }
})


const loginRoutes = require('./Routes/login'); // Importing the login route
const usersRoutes = require('./Routes/users'); // Importing the users route
const registerRoutes = require('./Routes/register'); // Importing the register route    
const productRoutes = require('./Routes/productRoutes'); // Importing the product route
app.use('/login',loginRoutes);
app.use('/register',registerRoutes); // Register route for user registration

app.use('/users', authMiddleware,usersRoutes)
app.use('/products', authMiddleware,productRoutes)


// app.listen(3000|| process.env.PORT,(err)=>{
// if(err){
//         console.log("Error in starting server",err);
//         return;
//     }
// console.log(`Server running in the PORT ${process.env.PORT}`);  
// })


module.exports = app;
module.exports.handler = serverless(app);