// ProtectedRoute.jsx
import React, { useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext'

const ProtectedRoute = ({ children }) => {
  const { token, logout } = useAuth()

  useEffect(() => {
    if (!token) {
      logout()
    }
  }, [token, logout])

  return token ? children : <Navigate to="/login" />
}

export default ProtectedRoute
