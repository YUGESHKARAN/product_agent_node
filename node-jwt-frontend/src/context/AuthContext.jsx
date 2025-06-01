// context/AuthContext.jsx
import React, { createContext, useContext, useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'; 
const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(Cookies.get('token') || null);
  const [showAgent, setShowAgent] = useState(false); // AI agent visibility state
     const[welcomeMessage, setWelcomeMessage] = useState(false) // AI agent welcome message state
  
  const navigate = useNavigate(); 


  const logout = async() => {
    Cookies.remove('token')
    setToken(null)
    
  }

  const loginFunc = (newToken) => {
    // Cookies.set('token', newToken, { expires: '1h' })
    setToken(newToken)
  }

  useEffect(() => {
    setToken(Cookies.get('token') || null)
  }, [])

  useEffect(() => {
        
    if(token) {
      loginFunc(token); // Set user as authenticated
    }
  }, []);

  return (
    <AuthContext.Provider value={{ token, logout, loginFunc, showAgent, setShowAgent, welcomeMessage, setWelcomeMessage }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
