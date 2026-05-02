import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import axios from 'axios';

const Register = () => {
  
  const [Username, setUsername] = useState('')
  const [Email, setEmail] = useState('')
  const [Password, setPassword] = useState('')
  
  // New states for loading, success, and error handling
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(null)

  const handleRegister = async (e) => {
    e.preventDefault() // Prevents the page from refreshing when the form submits
    setLoading(true)
    setError(null)
    setSuccess(false)

    try {
      const response = await axios.post('http://127.0.0.1:8000/auth/users/', {
        username: Username,
        email: Email,
        password: Password
      })
      console.log(response.data)
      
      // If successful, show the message and optionally clear the form
      setSuccess(true)
      setUsername('')
      setEmail('')
      setPassword('')
      
    } catch (err) {
      console.error(err)
      // Display a generic error, or the specific one from your Django backend
      setError('Registration failed. Please ensure your email/username is unique.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-[80vh] px-4 w-full">
      
      <div className="w-full max-w-md bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-gray-700">
        
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-500/10 mb-4 border border-blue-500/20">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight mb-2">Create Account</h1>
          <p className="text-gray-400 text-sm">Join us and start your journey today</p>
        </div>

        {/* Success Message Alert */}
        {success && (
          <div className="p-4 mb-6 rounded-lg bg-emerald-500/10 border border-emerald-500/50 flex items-start gap-3 animate-fade-in">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-emerald-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <h3 className="text-emerald-400 font-medium">Registration Successful!</h3>
              <p className="text-sm text-emerald-400/80 mt-1">A link has been sent to your email to activate your account. Please check your inbox.</p>
            </div>
          </div>
        )}

        {/* Error Message Alert */}
        {error && (
          <div className="p-3 mb-6 rounded-lg bg-red-500/10 border border-red-500/50 flex items-center gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-400 shrink-0" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <p className="text-sm text-red-400">{error}</p>
          </div>
        )}

        {/* Notice we moved handleRegister to the form's onSubmit */}
        <form className="space-y-5" onSubmit={handleRegister}>
          
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
                value={Username} 
                onChange={(e) => setUsername(e.target.value)}
                type="text"
                placeholder="Choose a username"
                className="input input-bordered w-full pl-10 bg-gray-900/50 text-white border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder-gray-500"
                required
                disabled={loading}
              />
            </div>
          </div>

          <div className="form-control">
            <label className="label pb-1">
              <span className="label-text text-gray-300 font-medium">Email Address</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <input
                value={Email} 
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Enter your email"
                className="input input-bordered w-full pl-10 bg-gray-900/50 text-white border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder-gray-500"
                required
                disabled={loading}
              />
            </div>
          </div>

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
                value={Password} 
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Create a strong password"
                className="input input-bordered w-full pl-10 bg-gray-900/50 text-white border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder-gray-500"
                required
                disabled={loading}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn mt-4 w-full border-0 text-white font-semibold rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 shadow-lg shadow-blue-500/25 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="loading loading-spinner loading-md text-white"></span>
            ) : (
              'Create Account'
            )}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-gray-700/50 text-center">
          <p className="text-sm text-gray-400">
            Already have an account?{' '}
            <NavLink 
              to="/login" 
              className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
            >
              Sign in here
            </NavLink>
          </p>
        </div>

      </div>
    </div>
  )
}

export default Register