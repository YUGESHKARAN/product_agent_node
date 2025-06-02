import React, {useState} from 'react'
import axiosInstance from '../instances/AxiosInstances';
import { Link, useNavigate } from 'react-router-dom';
function Register() {
    const[username, setUsername] = useState('');    
    const[password, setPassword] = useState('');    
    const[email, setEmail] = useState('');  
    const[gender, setGender] = useState('');
    const[role, setRole] = useState('');   
    const[error, setError] = useState('');   

    const navigate = useNavigate();
    const handleRegister = async(e)=>{
    e.preventDefault();
    try{

        const response =  await axiosInstance.post('/register',{username, password,email,gender,role})
        console.log('Response:', response.data);
        if(response.status === 201){
            console.log('Registration successful');
            navigate('/login'); // Redirect to login page after successful registration
        }
     }
     catch(err){
        setError(err.message);
        console.log('Error during registration:', err);
     }
    }
  return (
    <div className="w-full flex items-center justify-center min-h-screen text-white bg-[#1e1e2f] px-4">
  <form
    onSubmit={handleRegister}
    className="w-full sm:w-[400px] bg-gray-700 rounded-lg shadow-lg p-8"
  >
    <h2 className="text-2xl font-bold text-center  mb-3 md:mb-6">
      Register
    </h2>

    <p className='text-red-400'>{error && error}</p>

    <div className="mb-4">
      <label htmlFor="email" className="block text-white font-medium mb-1">
        Username
      </label>
      <input
        id="username"
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter name"
        className="w-full px-4 py-2 border border-gray-300 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 bg-gray-50"
      />
    </div>

    <div className="mb-3 md:mb-6">
      <label htmlFor="email" className="block text-white font-medium mb-1">
        Email Id
      </label>
      <input
        id="email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter Email"
        className="w-full px-4 py-2 border border-gray-300 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 bg-gray-50"
      />
    </div>

     <div className="mb-3 md:mb-6">
      <label htmlFor="password" className="block text-white font-medium mb-1">
      Password
      </label>
      <input
        id="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter  password"
        className="w-full px-4 py-2 border border-gray-300 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 bg-gray-50"
      />
    </div>

     <div className="mb-3 md:mb-6">
      <label htmlFor="gender" className="block text-white font-medium mb-1">
        Email Id
      </label>
      <select
      onChange={(e) => setGender(e.target.value)}
      className="w-full px-4 py-2 border border-gray-300 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 bg-gray-50"
       name="" id="">
        <option value="male">male</option>
        <option value="female">female</option>
        <option value="other">other</option>
      </select>
    </div>

  <div className="mb-3 md:mb-6">
      <label htmlFor="role" className="block text-white font-medium mb-1">
        role
      </label>
      <select
      onChange={(e) => setRole(e.target.value)}
      className="w-full px-4 py-2 border border-gray-300 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 bg-gray-50"
       name="" id="">
        <option value="Manager">Manager</option>
        <option value="Employee">Employee</option>
        <option value="Analyst">Analyst</option>
      </select>
    </div>

    <button
      type="submit"
      className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold md:py-2 py-1 mt-1 rounded-md transition duration-300"
    >
      Submit
    </button>

  <Link
      to="/login"
      className="block text-center text-green-500 hover:text-green-600 mt-4"
    >Back to Login</Link>
 
  </form>
  
  
</div>
  )
}

export default Register