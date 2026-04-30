import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

const Activate = () => {
  const { uid, token } = useParams()
  const navigate = useNavigate()
  const [status, setStatus] = useState('pending')
  const [message, setMessage] = useState('Activating your account...')

  useEffect(() => {
    const activateAccount = async () => {
      try {
        await axios.post('http://localhost:8000/auth/users/activation/', {
          uid,
          token,
        })

        setStatus('success')
        setMessage('Your account is activated. Proceed to login.')
      } catch (error) {
        setStatus('error')
        setMessage(
          error.response?.data?.detail || 'Activation failed. Please try again.'
        )
      }
    }

    if (uid && token) {
      activateAccount()
    }
  }, [uid, token])

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="w-full max-w-lg bg-gray-900 rounded-3xl shadow-2xl border border-gray-700 p-10">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-3">Account Activation</h1>
          <p className="text-gray-400">Activation status for your account.</p>
        </div>

        <div className="rounded-3xl bg-gray-800 p-8 border border-gray-700">
          <p
            className={`mb-6 text-center text-lg font-medium ${
              status === 'success' ? 'text-green-300' : 'text-red-300'
            }`}
          >
            {message}
          </p>

          {status === 'success' ? (
            <div className="text-center">
              <NavLink
                to="/login"
                className="btn btn-primary px-8 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-colors"
              >
                Login
              </NavLink>
            </div>
          ) : (
            <div className="text-center">
              <button
                type="button"
                onClick={() => navigate('/login')}
                className="btn btn-ghost px-8 py-3 rounded-full border border-gray-600 text-white hover:bg-gray-800 transition-colors"
              >
                Go to Login
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Activate