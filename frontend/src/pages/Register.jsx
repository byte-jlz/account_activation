import React from 'react'
import { NavLink } from 'react-router-dom'
import { useNavigate, Navigate} from 'react-router-dom';
import axios from 'axios';


const Register = () => {
  
  const [Username, setUsername] = React.useState('')
  const [Email, setEmail] = React.useState('')
  const [Password, setPassword] = React.useState('')

  const handleRegister = async() => {
    const response = await axios.post('http://127.0.0.1:8000/auth/users/', {
      username: Username,
      email: Email,
      password: Password
    })
    console.log(response.data)
  }

  return (
    <div className="w-full max-w-md">
      <div className="bg-gray-800 rounded-lg shadow-2xl p-8 border border-gray-700">
        <h1 className="text-3xl font-bold text-white mb-2 text-center">Create Account</h1>
        <p className="text-gray-400 text-center mb-8">Sign up for your account</p>

        <form className="space-y-6">
          {/* Username Input */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-white font-semibold">Username</span>
            </label>
            <input
              value={Username} onChange={(e) => setUsername(e.target.value)}
              type="text"
              placeholder="Enter your username"
              className="input input-bordered input-md bg-gray-700 text-white border-gray-600 focus:border-blue-500 focus:outline-none placeholder-gray-500"
              required
            />
          </div>

          {/* Email Input */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-white font-semibold">Email</span>
            </label>
            <input
              value={Email} onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Enter your email"
              className="input input-bordered input-md bg-gray-700 text-white border-gray-600 focus:border-blue-500 focus:outline-none placeholder-gray-500"
              required
            />
          </div>

          {/* Password Input */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-white font-semibold">Password</span>
            </label>
            <input
              value={Password} onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Enter your password"
              className="input input-bordered input-md bg-gray-700 text-white border-gray-600 focus:border-blue-500 focus:outline-none placeholder-gray-500"
              required
            />
          </div>

          <button
          onClick={handleRegister}
            type="submit"
            className="btn btn-primary w-full text-white font-semibold py-2 rounded-lg bg-blue-700 hover:bg-blue-800 transition-colors"
          >
            Create Account
          </button>
        </form>

        {/* Login Link */}
        <div className="mt-6 text-center">
          <p className="text-gray-400">
            Already have an account?{' '}
            <NavLink to="/login" className="text-blue-500 hover:text-blue-400 font-semibold">
              Sign in here
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Register