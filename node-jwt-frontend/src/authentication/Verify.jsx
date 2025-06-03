import React, {useState,useEffect} from 'react'
import axiosInstance from '../instances/AxiosInstances'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
function Verify() {

    const [email,setEmail] = useState('');
    const [otp,setOtp] = useState('');
    const [password,setPassword] = useState('');
    const [pin,setPin] = useState(false);
    const navigate = useNavigate()
    const [error,setError] = useState('')
    const [msg,setMsg] = useState('')

    const handleSubmit = async(e)=>{
        e.preventDefault()
        console.log("pass email", email)
        try{
           const response = await axiosInstance.post('/verify/send-otp',{email});

           if(response.status===200){
            setPin(true);
             setMsg('OTP Shared Successfully')
           }

        }
        catch(err){
            console.log("Error",err)
            setError(err.message)
        }
    }

    const handlePasswordReset = async(e)=>{
        e.preventDefault()

        try{
         const response = await axiosInstance.post('/verify/reset-password',{email,otp, newPassword:password});
         if(response.status===200){
            navigate('/login')
         }

        }
        catch(err){
            setError(err.message);
            console.log("error",err)
        }

    }

    const handleResendOTP = async(email)=>{
         try{
           const response = await axiosInstance.post('/verify/send-otp',{email});

           if(response.status===200){
            setPin(true);
            setMsg('OTP Re-Shared Successfully')
           }

        }
        catch(err){
            console.log("Error",err)
            setError(err.message)
        }

    }

  return (
    <div className="w-full flex items-center justify-center min-h-screen text-white bg-[#1e1e2f] px-4">

       <form
            onSubmit={!pin? handleSubmit : handlePasswordReset}
            className="w-full sm:w-[400px] bg-gray-700 rounded-lg shadow-lg p-8"
        >
            <h2 className="text-2xl font-bold text-center  mb-6">
             { !pin ? 'Forgot Password':'Reset Password'}
            </h2>

            <p className='text-sm text-red-500 my-3 font-semibold'>{error && error}</p>
            <p className='text-sm text-green-500 my-3 font-semibold'>{msg && msg}</p>

            <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-medium mb-1">
            Enter Email
            </label>
            <input
                id="email"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Your Email"
                className="w-full px-4 py-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 bg-gray-50"
            />
            </div>

            {
                pin && (
            <>
            <div className="mb-4">
                <label htmlFor="OTP" className="block text-gray-700 font-medium mb-1">
                    Enter OTP
                </label>
                <input
                    id="OTP"
                    type="text"
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="Enter OTP Number"
                    className="w-full px-4 py-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 bg-gray-50"
                />
            </div>

            <div className="mb-4">
                    <label htmlFor="password" className="block text-gray-700 font-medium mb-1">
                        Enter New Password
                    </label>
                    <input
                        id="password"
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter New Password"
                        className="w-full px-4 py-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 bg-gray-50"
                    />
            </div>
            </>
                )
            }

            <button
            type="submit"
            className="w-full bg-green-500 mt-5 hover:bg-green-600 text-white font-semibold py-2 rounded-md transition duration-300"
            >
            Submit
            </button>

            {pin && <p className='text-sm text-green-500 cursor-pointer mt-4' onClick={()=>{handleResendOTP(email)}}>resend OTP</p>}

            <Link
            to="/login"
            className="block text-center text-green-500 hover:text-green-600 mt-4"
            >Back to Login</Link>
        
    </form>
            

    </div>
  )
}

export default Verify