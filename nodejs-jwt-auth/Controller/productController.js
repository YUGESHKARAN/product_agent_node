require('dotenv').config();

const User = require('../Model/usersSchema');
const bcrypt = require('bcryptjs'); 


const {S3Client, PutObjectCommand, DeleteObjectCommand} = require('@aws-sdk/client-s3') 

const bucketName = process.env.BUCKET_NAME  

const s3 = new S3Client({
    credentials:{
        accessKeyId : process.env.ACCESS_KEY,
        secretAccessKey : process.env.SECRET_ACCESS_KEY
    },
    region: process.env.BUCKET_REGION
});

const addProducts = async(req,res)=>{
    const {product,price,waranty} = req.body;
    const image = req.file?req.file.originalname:"" ;

    try{
        const user = await User.findOne({email:req.params.email});
        if(!user) return res.status(404).json({message:"User not found"});
        const newProduct = {product,price,waranty,image}
        user.productDetails.push(newProduct);
        await user.save();

        if(req.file){
        const params = {
            Bucket:"my-bkt-tut",
            Key:image,
            Body:req.file.buffer,
            ContentType : req.file.mimetype
        }
        const command = new PutObjectCommand(params)
        await s3.send(command);
        console.log("File uploaded successfully")
       }
        res.status(201).json({message:"Product added successfully", product:newProduct});
    }
    catch(err){
        console.error(err);
        res.status(500).json({message:"Internal Server Error"});
    }
}

const getProducts = async(req,res)=>{
    try{
        const  user = await User.findOne({email:req.params.email}); 
        if(!user) return res.status(404).json({message:"User not found"});
        res.status(200).json({products:user.productDetails});
    }
    catch(err){
        res.status(500).json({meaagse:err.message});
    }
}

const getSingleProduct = async(req,res)=>{
  try{
    const {email, id} = req.params;

    // Find user
    const user = await User .findOne({ email });  
    if (!user) return res.status(404).send({ message: 'User not found' });
    // Find product
    const product = user.productDetails.id(id);
    if (!product) return res.status(404).send({ message: 'Product not found' });
    res.status(200).send({ product });  
  }
  catch(err){
    res.status(500).send({ error: 'Internal Server Error' });
  }
}

const deleteProduct = async (req, res) => {
  try {
     console.log("Params received:", req.params); // Add this line
    const email = decodeURIComponent(req.params.email);
    const id = req.params.id;

    // 1. Find user
    const user = await User.findOne({ email });
    if (!user) return res.status(404).send({ message: 'User not found' });

    // 2. Find product to delete
    const product = user.productDetails.id(id);
    if (!product) return res.status(404).send({ message: 'Product not found' });

    // 3. Delete image from S3 if exists
    if (product.image) {
      const params = {
        Bucket: 'my-bkt-tut',
        Key: product.image,
      };
      await s3.send(new DeleteObjectCommand(params));
      console.log('Image deleted successfully:', product.image);
    }

    // 4. Remove product from productDetails array
    user.productDetails.pull({ _id: id }); // ❗ DO NOT await this

    // 5. Save changes to DB
    await user.save();
    console.log('Product removed :', product);

    res.status(200).send({ message: 'Product deleted successfully' });
  } catch (err) {
    console.error('Error deleting product:', err);
    res.status(400).send({ error: err.message });
  }
};


const editProduct = async(req,res)=>{
  const{email,id} = req.params;
  const {product,price,waranty} = req.body; 
  try{
    const user = await User.findOne({email});
    if(!user) return res.status(404).json({message:"User not found"});

    const productData = user.productDetails.id(id);
    if(!productData) return res.status(404).json({message:"Product not found"});



    productData.product = product || productData.product;
    productData.price = price || productData.price;
    productData.waranty = waranty || productData.waranty;

    if(req.file){
        productData.image = req.file.originalname;
        const params = {
            Bucket: "my-bkt-tut",
            Key: req.file.originalname,
            Body: req.file.buffer,
            ContentType: req.file.mimetype
        }
        const command = new PutObjectCommand(params);
        await s3.send(command);
    }
    await user.save();
    res.status(200).json({message:"Product updated successfully", product:productData});
  }
  catch(err){
    console.error(err);
    res.status(500).json({message:"Internal Server Error"});  
  }
}


module.exports = {addProducts, getProducts,getSingleProduct,deleteProduct,editProduct};