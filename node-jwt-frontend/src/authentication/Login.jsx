import { useState } from 'react'
import { useNavigate } from 'react-router-dom'; // If you meant to navigate after login
import {useAuth} from '../context/AuthContext'; // Import useAuth if needed
import axios from 'axios'
import Cookies from 'js-cookie'
import axiosInstance from '../instances/AxiosInstances';
import { Link } from 'react-router-dom';
function Login() {

const [email, setEmail] = useState('')  ;
const [password, setPassword] = useState('');
const [error, setError] = useState('');
const navigate = useNavigate(); 

const {loginFunc} = useAuth(); 
const handleSubmit = async(e)=>{
    e.preventDefault();
    console.log('User Name:', email);
    console.log ('Password:', password);
   
  try{
      const response = await axiosInstance.post('/login',{email, password});
    console.log('Response:', response.data);
  

    if(response.status==200){

     const token = response.data.token; // Assuming the token is returned in the response 
      console.log('Token:', token); 
      await localStorage.setItem('email', email); // Store the token in localStorage
      await Cookies.set('token', token, { expires: 1, sameSite: 'lax' });
      await localStorage.setItem('user',response.data.user); // Store the user data in localStorage
     await  loginFunc(token); // Call the login function from context
      await navigate('/users'); // Navigate to the users page after successful login  
 
    }
    
  }
  catch (error) {
    setError(error.message);
      console.log('Error during login:', error);
    }
   


}
  return (
    <div className="w-full flex items-center justify-center min-h-screen text-white bg-[#1e1e2f] px-4">
  <form
    onSubmit={handleSubmit}
    className="w-full sm:w-[400px] bg-gray-700 rounded-lg shadow-lg p-8"
  >
    <h2 className="text-2xl font-bold text-center  mb-6">
      Login
    </h2>

    <p className='text-sm text-red-500 my-3 font-semibold'>{error && error}</p>

    <div className="mb-4">
      <label htmlFor="email" className="block text-gray-700 font-medium mb-1">
        Email Id
      </label>
      <input
        id="email"
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your name"
        className="w-full px-4 py-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 bg-gray-50"
      />
    </div>

    <div className="mb-6">
      <label htmlFor="password" className="block text-gray-700 font-medium mb-1">
        Password
      </label>
      <input
        id="password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter your password"
        className="w-full px-4 py-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 bg-gray-50"
      />
    </div>

    <button
      type="submit"
      className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-md transition duration-300"
    >
      Submit
    </button>

    <Link
      to="/register"
      className="block text-center text-green-500 hover:text-green-600 mt-4"
    >Click to register</Link>
  </form>
  
  
</div>

  )
}

export default Login