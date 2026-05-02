import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Navigate } from 'react-router-dom'

const Profile = () => {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  const [profile, setProfile] = useState(null)
  
  const token = localStorage.getItem('auth_token')
  
  // Form state
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    username: '',
    age: '',
    blood_type: '',
    height: '',
    weight: '',
    gender: ''
  })
  
  const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']
  const genders = ['Male', 'Female', 'Other']
  
  useEffect(() => {
    fetchProfile()
  }, [])
  
  const fetchProfile = async () => {
    try {
      setLoading(true)
      const response = await axios.get('http://127.0.0.1:8000/api/accounts/profile/', {
        headers: {
          'Authorization': `Token ${token}`,
          'Content-Type': 'application/json'
        }
      })
      
      const profileData = response.data
      setProfile(profileData)
      
      // Set form data from profile
      setFormData({
        first_name: profileData.user?.first_name || '',
        last_name: profileData.user?.last_name || '',
        username: profileData.user?.username || '',
        age: profileData.age || '',
        blood_type: profileData.blood_type || '',
        height: profileData.height || '',
        weight: profileData.weight || '',
        gender: profileData.gender || ''
      })
    } catch (err) {
      console.error('Error fetching profile:', err.response?.data || err.message)
      setError('Failed to load profile')
    } finally {
      setLoading(false)
    }
  }
  
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    setError(null)
    setSuccess(null)
    
    try {
      const payload = {
        first_name: formData.first_name,
        last_name: formData.last_name,
        username: formData.username,
        age: formData.age ? parseInt(formData.age) : null,
        blood_type: formData.blood_type || null,
        height: formData.height ? parseFloat(formData.height) : null,
        weight: formData.weight ? parseFloat(formData.weight) : null,
        gender: formData.gender || null
      }
      
      const response = await axios.put('http://127.0.0.1:8000/api/accounts/profile/', payload, {
        headers: {
          'Authorization': `Token ${token}`,
          'Content-Type': 'application/json'
        }
      })
      
      setProfile(response.data)
      setSuccess('Profile updated successfully!')
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(null), 3000)
    } catch (err) {
      console.error('Error updating profile:', err.response?.data || err.message)
      const errorMsg = err.response?.data?.detail || err.response?.data?.message || 'Failed to update profile'
      setError(typeof errorMsg === 'object' ? JSON.stringify(errorMsg) : errorMsg)
    } finally {
      setSaving(false)
    }
  }
  
  if (!token) {
    return <Navigate to="/login" />
  }
  
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    )
  }
  
  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <div className="bg-gray-800 rounded-lg shadow-2xl p-8 border border-gray-700">
        <h1 className="text-3xl font-bold text-white mb-2">Profile Settings</h1>
        <p className="text-gray-400 mb-8">Manage your personal information</p>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Success Message */}
          {success && (
            <div className="alert alert-success text-white bg-green-600">
              {success}
            </div>
          )}
          
          {/* Error Message */}
          {error && (
            <div className="alert alert-error text-white bg-red-600">
              {error}
            </div>
          )}
          
          {/* Name Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text text-white font-semibold">First Name</span>
              </label>
              <input
                type="text"
                name="first_name"
                placeholder="Enter first name"
                className="input input-bordered input-md bg-gray-700 text-white border-gray-600 focus:border-blue-500 focus:outline-none placeholder-gray-500"
                value={formData.first_name}
                onChange={handleChange}
              />
            </div>
            
            <div className="form-control">
              <label className="label">
                <span className="label-text text-white font-semibold">Last Name</span>
              </label>
              <input
                type="text"
                name="last_name"
                placeholder="Enter last name"
                className="input input-bordered input-md bg-gray-700 text-white border-gray-600 focus:border-blue-500 focus:outline-none placeholder-gray-500"
                value={formData.last_name}
                onChange={handleChange}
              />
            </div>
          </div>
          
          {/* Username */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-white font-semibold">Username</span>
            </label>
            <input
              type="text"
              name="username"
              placeholder="Enter username"
              className="input input-bordered input-md bg-gray-700 text-white border-gray-600 focus:border-blue-500 focus:outline-none placeholder-gray-500"
              value={formData.username}
              onChange={handleChange}
            />
          </div>
          
          {/* Age */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-white font-semibold">Age</span>
            </label>
            <input
              type="number"
              name="age"
              placeholder="Enter age"
              min="1"
              max="150"
              className="input input-bordered input-md bg-gray-700 text-white border-gray-600 focus:border-blue-500 focus:outline-none placeholder-gray-500"
              value={formData.age}
              onChange={handleChange}
            />
          </div>
          
          {/* Blood Type */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-white font-semibold">Blood Type</span>
            </label>
            <select
              name="blood_type"
              className="select select-bordered select-md bg-gray-700 text-white border-gray-600 focus:border-blue-500 focus:outline-none"
              value={formData.blood_type}
              onChange={handleChange}
            >
              <option value="" className="bg-gray-800">Select blood type</option>
              {bloodTypes.map(bt => (
                <option key={bt} value={bt} className="bg-gray-800">{bt}</option>
              ))}
            </select>
          </div>
          
          {/* Gender */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-white font-semibold">Gender</span>
            </label>
            <select
              name="gender"
              className="select select-bordered select-md bg-gray-700 text-white border-gray-600 focus:border-blue-500 focus:outline-none"
              value={formData.gender}
              onChange={handleChange}
            >
              <option value="" className="bg-gray-800">Select gender</option>
              {genders.map(g => (
                <option key={g} value={g} className="bg-gray-800">{g}</option>
              ))}
            </select>
          </div>
          
          {/* Height and Weight */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text text-white font-semibold">Height (cm)</span>
              </label>
              <input
                type="number"
                name="height"
                placeholder="Enter height in cm"
                min="0"
                step="0.1"
                className="input input-bordered input-md bg-gray-700 text-white border-gray-600 focus:border-blue-500 focus:outline-none placeholder-gray-500"
                value={formData.height}
                onChange={handleChange}
              />
            </div>
            
            <div className="form-control">
              <label className="label">
                <span className="label-text text-white font-semibold">Weight (kg)</span>
              </label>
              <input
                type="number"
                name="weight"
                placeholder="Enter weight in kg"
                min="0"
                step="0.1"
                className="input input-bordered input-md bg-gray-700 text-white border-gray-600 focus:border-blue-500 focus:outline-none placeholder-gray-500"
                value={formData.weight}
                onChange={handleChange}
              />
            </div>
          </div>
          
          {/* Submit Button */}
          <button
            type="submit"
            disabled={saving}
            className="btn btn-primary w-full text-white font-semibold py-3 rounded-lg bg-blue-700 hover:bg-blue-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-4"
          >
            {saving ? (
              <>
                <span className="loading loading-spinner loading-sm"></span>
                Saving...
              </>
            ) : (
              'Save Changes'
            )}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Profile
