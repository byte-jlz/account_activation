import React from 'react'
import { useState } from 'react'
import axios from 'axios';
import { useNavigate, Navigate, NavLink} from 'react-router-dom';


const Login = () => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const navigate = useNavigate()
  const token = localStorage.getItem('auth_token')

  if (token) {
    return <Navigate to={"/dashboard"} />
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
      navigate('/dashboard')
    } catch (err) {
      console.error('Login Error:', err.response?.data || err.message)
      setError(err.response?.data?.detail || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md">
      <div className="bg-gray-800 rounded-lg shadow-2xl p-8 border border-gray-700">
        <h1 className="text-3xl font-bold text-white mb-2 text-center">Welcome Back</h1>
        <p className="text-gray-400 text-center mb-8">Sign in to your account</p>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Username Input */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-white font-semibold">Username</span>
            </label>
            <input
              type="text"
              placeholder="Enter your username"
              className="input input-bordered input-md bg-gray-700 text-white border-gray-600 focus:border-blue-500 focus:outline-none placeholder-gray-500"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          {/* Password Input */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-white font-semibold">Password</span>
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className="input input-bordered input-md bg-gray-700 text-white border-gray-600 focus:border-blue-500 focus:outline-none placeholder-gray-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Error Message */}
          {error && (
            <div className="alert alert-error text-white">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary w-full text-white font-semibold py-2 rounded-lg bg-blue-700 hover:bg-blue-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? <span className="loading loading-spinner loading-sm"></span> : 'Sign In'}
          </button>
        </form>

        {/* Register Link */}
        <div className="mt-6 text-center">
          <p className="text-gray-400">
            Don't have an account?{' '}
            <NavLink to="/register" className="text-blue-500 hover:text-blue-400 font-semibold">
              Sign up here
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login