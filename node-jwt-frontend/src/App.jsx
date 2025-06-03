// App.jsx
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './authentication/Login'
import ProtectedRoute from './ProtectedRoute'
import { AuthProvider } from './context/AuthContext'
import Register from './authentication/Register'
import Products from './components/Products'
import Verify from './authentication/Verify'

function App() {
  return (
    <AuthProvider>
    
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgotPassword" element={<Verify />} />
          <Route
            path="/users"
            element={
              <ProtectedRoute>
                <Products />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Login />} />
        </Routes>
      
    </AuthProvider>
  )
}

export default App
