import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { VscCopilot } from 'react-icons/vsc';
import Cookies from 'js-cookie';

function Navbar() {
   const {showAgent, setShowAgent} = useAuth();
   const {logout} = useAuth();
    const {welcomeMessage, setWelcomeMessage} = useAuth();  

   const handleLogout = async()=>{
     await  Cookies.remove('token');
     if (window.speechSynthesis) {
        window.speechSynthesis.cancel(); // Stop any ongoing speech synthesis
     }

     
     await logout(); 
   }

  return (
     <div className="col-span-4 w-full flex justify-between items-center mb-5 border-b border-gray-600 pb-3">
    <h1 className="md:text-3xl text-sm font-bold text-cyan-400">Product Control System</h1>
   
   <div className='flex  items-center gap-4'>
    <div onClick={()=>{setShowAgent(!showAgent); setWelcomeMessage(!welcomeMessage)}} className='cursor-pointer text-xs md:text-2xl text-cyan-400 hover:text-cyan-500 transition-all duration-300'>
        <VscCopilot/>
    </div>
     <button
      className="bg-red-500 hover:bg-red-600 transition-all duration-300 md:px-4 md:py-2 md:text-base text-xs px-3 py-1 md:text-base text-sm rounded-md shadow-md"
      onClick={handleLogout}
    >
      Logout
    </button>
   </div>
  </div>
  )
}

export default Navbar