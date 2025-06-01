import React,{ useState, useEffect, useRef }  from 'react'
import axios from 'axios'
import { useAuth } from '../context/AuthContext';
import Cookies from 'js-cookie'
import axiosInstance from '../instances/AxiosInstances';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { FaEdit } from 'react-icons/fa';
import { VscCopilot } from 'react-icons/vsc';
import Chatbot from './Chatbot.';
import Navbar from '../ui/Navbar';
function Products() {
    const [token, setToken] = useState(Cookies.get('token') || null);
    const {logout} = useAuth(); // Import logout from context if needed
    const email = localStorage.getItem('email'); // Get the email from localStorage  
    const [products, setProducts] = useState([]); // Assuming you might need products later

    const [product,setProduct] = useState('');
    const [price,setPrice] = useState('');
    const [id,setId] = useState('');
    const [waranty,setWaranty] = useState('');
    const[image,setImage] = useState('');
    const[imagePreview,setImagePreview] = useState('');
    const[showEdit, setShowEdit] = useState(false); // Assuming you might need this for edit functionality
    const [error, setError] = useState(null); 
    const fileInputRef = useRef(null);
   const {showAgent, setShowAgent} = useAuth(); 
    const handleImage= (e)=>{
         setImage(e.target.files[0]);
    }

    const handleSubmit = async(e)=>{
      e.preventDefault();
      const formData = new FormData();
      formData.append('product', product);  
      formData.append('price', price);
      formData.append('waranty', waranty);
      if(image!==''){
        formData.append('image', image);
      }

      try{
        const response = await axiosInstance.post(`/products/${email}`, formData);
        console.log('Response:', response.data);
      if(response.status ===201){
        setProduct('');
        setPrice('');
        setWaranty(''); 
        setImage('');
        // Clear file input field manually
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
        getProducts(); // Refresh the product list after adding a new product
      }
      }
      catch(err){
        console.log("error",err);
        setError(err.message); // Set error message if needed
    }
  }
    
    const getProducts = async()=>{
        try{
          const response = await axiosInstance.get(`/products/${email}`);
            console.log('Response:', response.data);  
            setProducts(response.data.products);  
        }
        catch(err){
            console.log("error",err);
        }
    }


    useEffect(()=>{
        getProducts();
    },[]);

    const getSingleProduct = async(id)=>{
      try{
        const response = await axiosInstance.get(`products/${email}/${id}`);  
       console.log('Single Product:', response.data.product);
       const productData = response.data.product;
        setProduct(productData.product);
        setPrice(productData.price);
        setWaranty(productData.waranty.slice(0,10)); // Assuming waranty is a date string
        setImagePreview(productData.image);
        setId(productData._id); 
        setShowEdit(true); // Show the edit form

      }
      catch(err){
        console.log("error",err); 
      }
    }



const handleEditProduct = async(e)=>{
  e.preventDefault();
     const formData = new FormData();
      formData.append('product', product);  
      formData.append('price', price);
      formData.append('waranty', waranty);
      if(image!==''){
        formData.append('image', image);
      }

      try{
        const response = await axiosInstance.put(`/products/${email}/${id}`, formData);
        console.log('Response:', response.data);
      if(response.status ===200){
        setProduct('');
        setPrice('');
        setWaranty(''); 
        setImage('');
        setId(''); // Reset the id after editing
       
        // Clear file input field manually
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
        await setShowEdit(false); // Hide the edit form after successful edit 
        getProducts(); // Refresh the product list after adding a new product
      }
      }
      catch(err){
        console.log("error",err);
        setError(err.message); // Set error message if needed
    }


}

const deleteProduct = async(id)=>{
  try{
    
    const response = await axiosInstance.delete(`products/${email}/${String(id)}`);
   
    if(response.status === 200){
      getProducts(); // Refresh the product list after deletion
    } 
  }
  catch(err){
    console.log("error",err);
  }
}



  return (
    <div className="w-full mx-auto text-white bg-[#1e1e2f] min-h-screen p-4 md:p-10">

      <div className={`${showAgent?'grid md:grid-cols-4 md:h-[600px] gap-4':'grid md:grid-cols-4 md:min-h-screen gap-4'} relative`}>
        <Navbar />
        <div className={`${showAgent?'md:col-span-3 mb-10 overflow-y-auto overflow-x-auto scrollbar-hide':'md:col-span-4 overflow-x-auto mb-10 overflow-y-auto scrollbar-hide'} col-span-4`}>

            {products.length > 0 ? (
              <div className="md:grid md:grid-cols-6 hidden overflow-x-auto md:text-base text-sm gap-4 bg-[#2d2d44] text-purple-300 font-semibold p-3 rounded-md shadow-md">
                <p>S.NO</p>
                <p>Product</p>
                <p>Image</p>
                <p>Price</p>
                <p>Warranty</p>
                {/* <p>ID</p> */}
                <p>Actions</p>
              </div>
            ) : (
              <p className="text-xl font-bold text-center text-yellow-400">No Products Found</p>
            )}

            {products.length > 0 &&
              products.map((productData, index) => (
                <div
                  key={index}
                  className="md:grid hidden md:grid-cols-6 gap-4 bg-[#252538] p-3 hover:bg-[#353550] transition-all duration-300 cursor-pointer rounded-md mt-2"
                >
                  <p>{index + 1}</p>
                  <p className="text-cyan-300">{productData.product}</p>
                  <img
                    src={`https://my-bkt-tut.s3.eu-north-1.amazonaws.com/${productData.image}`}
                    className="h-10 w-10 object-cover rounded-md"
                    alt=""
                  />
                  <p className="text-green-300">₹{productData.price}</p>
                  <p>{productData.waranty && productData.waranty.slice(0, 10)}</p>
                  {/* <p>{productData._id}</p> */}
                  <div className="flex items-center gap-3">
                    <p onClick={() => deleteProduct(productData._id)} className="text-red-400 hover:text-red-500">
                      <RiDeleteBin6Line />
                    </p>
                    <p onClick={() => getSingleProduct(productData._id)} className="text-blue-400 hover:text-blue-500">
                      <FaEdit />
                    </p>
                  </div>
                </div>
            ))}

               {products.length > 0 ? (
                <div className="md:hidden overflow-x-auto md:text-xl gap-4 bg-[#2d2d44] text-purple-300 font-semibold p-1 rounded-md shadow-md">
                  <p className='text-center'>Product Details</p>
                </div>
                ) : 
                (
                  <p className="text-xl font-bold text-center text-yellow-400">No Products Found</p>
                )}

                {products.length > 0 &&
                  products.map((productData, index) => (
                <div
                  key={index}
                  className="flex flex-col md:hidden gap-4 bg-[#252538] p-3 hover:bg-[#353550] transition-all duration-300 cursor-pointer rounded-md mt-2"
                >
                  {/* <p>{index + 1}</p> */}
                  <p className="text-cyan-300 font-semibold text-center">{index + 1} {productData.product}</p>
                  <img
                    src={`https://my-bkt-tut.s3.eu-north-1.amazonaws.com/${productData.image}`}
                    className="h-16 w-16 object-contain  rounded-md"
                    alt=""
                  />
                  <p className="text-green-300">Price ₹{productData.price}</p>
                  <p className='text-sm'>Waranty Date {productData.waranty && productData.waranty.slice(0, 10)}</p>
                  {/* <p>{productData._id}</p> */}
                  <div className="flex items-center gap-3">
                    <p onClick={() => deleteProduct(productData._id)} className="text-red-400 hover:text-red-500">
                      <RiDeleteBin6Line />
                    </p>
                    <p onClick={() => getSingleProduct(productData._id)} className="text-blue-400 hover:text-blue-500">
                      <FaEdit />
                    </p>
                  </div>
                </div>
            ))}
              

          <div className="md:w-3/5 w-full mx-auto mt-10 p-6 bg-[#2d2d44] rounded-md shadow-lg text-white">
            <p className="text-sm text-red-400 mb-2">{error && error}</p>
            <h1 className="text-2xl font-bold text-center mb-5">
              {showEdit ? "✏️ Edit Product" : "➕ Add Product"}
            </h1>

            <form onSubmit={showEdit ? handleEditProduct : handleSubmit}>
              <div className="mb-4">
                <label htmlFor="product" className="block mb-1 text-purple-300">
                  Product Name:
                </label>
                <input
                  type="text"
                  id="product"
                  value={product}
                  onChange={(e) => setProduct(e.target.value)}
                  className="w-full p-1 md:p-2 rounded-md bg-[#1e1e2f] border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="price" className="block mb-1 text-purple-300">
                  Price:
                </label>
                <input
                  type="number"
                  id="price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full p-1 md:p-2 rounded-md bg-[#1e1e2f] border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="waranty" className="block mb-1 text-purple-300">
                  Warranty:
                </label>
                <input
                  type="date"
                  id="waranty"
                  value={waranty}
                  onChange={(e) => setWaranty(e.target.value)}
                  className="w-full p-1 md:p-2 rounded-md bg-[#1e1e2f] border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="image" className="block mb-1 text-purple-300">
                  Image:
                </label>
                <input
                  type="file"
                  id="image"
                  ref={fileInputRef}
                  onChange={handleImage}
                  className="w-full p-1 md:p-2 rounded-md bg-[#1e1e2f] border border-gray-600 file:cursor-pointer file:rounded-md file:bg-indigo-500 file:text-white file:px-3 file:py-1"
                />
              </div>

              {showEdit && imagePreview && (
                <img
                  src={`https://my-bkt-tut.s3.eu-north-1.amazonaws.com/${imagePreview}`}
                  className="h-16 w-16 object-cover rounded-md mb-3"
                  alt="Preview"
                />
              )}

              <button
                type="submit"
                className="bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 px-6 py-2 rounded-md shadow-md text-white transition-all duration-300"
              >
                {showEdit ? "Update Product" : "Submit"}
              </button>
            </form>
          </div>
        </div>

          <div className={`${
            showAgent
              ? 'fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-md shadow-lg z-50 md:static md:transform-none md:top-auto md:left-auto md:z-0'
              : 'hidden'
          }`}>
            <Chatbot getProducts={getProducts}/>
          
        </div>
      
      </div>


       
   </div>

  )
}

export default Products