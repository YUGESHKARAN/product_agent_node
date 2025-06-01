const User = require('../Model/usersSchema');
const express = require('express');
const router = express.Router();  

const multer = require('multer');
const storage =multer.memoryStorage();
const upload = multer({storage})

const {addProducts,getProducts,deleteProduct,editProduct, getSingleProduct} = require('../Controller/productController');

router.get('/:email',getProducts);
router.get('/:email/:id',getSingleProduct); // Assuming you have a function to get a single product
router.post('/:email', upload.single('image'), addProducts); 
router.delete('/:email/:id', deleteProduct); 
router.put('/:email/:id', upload.single('image'),editProduct); 
module.exports = router;