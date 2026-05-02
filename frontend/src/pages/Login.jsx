import React from 'react'
import { useState } from 'react'
import axios from 'axios';
import { useNavigate, Navigate, NavLink } from 'react-router-dom';

const Login = () => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const navigate = useNavigate()
  const token = localStorage.getItem('auth_token')

  if (token) {
    return <Navigate to={"/"} />
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const response = await axios.post('http://127.0.0.1:8000/auth/token/login/', {
        username,
        password
      })

      localStorage.setItem('auth_token', String(response.data.auth_token))

      console.log('Token:', response.data.auth_token)
      console.log('Full Response:', response.data)
      navigate('/')
    } catch (err) {
      console.error('Login Error:', err.response?.data || err.message)
      setError(err.response?.data?.detail || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    // Outer wrapper centers the card vertically and horizontally if not already handled by a Layout
    <div className="flex items-center justify-center min-h-[80vh] px-4 w-full">
      
      {/* Main Card: Glassmorphism effect with subtle border and strong shadow */}
      <div className="w-full max-w-md bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-gray-700">
        
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-500/10 mb-4 border border-blue-500/20">
            {/* Simple decorative lock icon */}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight mb-2">Welcome Back</h1>
          <p className="text-gray-400 text-sm">Please sign in to access your dashboard</p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          
          {/* Username Input with Icon */}
          <div className="form-control">
            <label className="label pb-1">
              <span className="label-text text-gray-300 font-medium">Username</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Enter your username"
                className="input input-bordered w-full pl-10 bg-gray-900/50 text-white border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder-gray-500"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Password Input with Icon */}
          <div className="form-control">
            <label className="label pb-1">
              <span className="label-text text-gray-300 font-medium">Password</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                </svg>
              </div>
              <input
                type="password"
                placeholder="••••••••"
                className="input input-bordered w-full pl-10 bg-gray-900/50 text-white border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder-gray-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Error Message: Styled to be highly visible but elegant */}
          {error && (
            <div className="p-3 mt-4 rounded-lg bg-red-500/10 border border-red-500/50 flex items-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-400 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <p className="text-sm text-red-400">{error}</p>
            </div>
          )}

          {/* Submit Button: Added a subtle gradient and stronger hover states */}
          <button
            type="submit"
            disabled={loading}
            className="btn mt-2 w-full border-0 text-white font-semibold rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 shadow-lg shadow-blue-500/25 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="loading loading-spinner loading-md text-white"></span>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        {/* Register Link: Cleaned up spacing and colors */}
        <div className="mt-8 pt-6 border-t border-gray-700/50 text-center">
          <p className="text-sm text-gray-400">
            Don't have an account yet?{' '}
            <NavLink 
              to="/register" 
              className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
            >
              Create one now
            </NavLink>
          </p>
        </div>

      </div>
    </div>
  )
}

export default Login