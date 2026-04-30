import React from 'react'
import { Outlet } from 'react-router';
import { Navigate, NavLink} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProtectedLayout = () => {

    const token = localStorage.getItem('auth_token')
    const navigate = useNavigate()

  if (!localStorage.getItem('auth_token')) {
    return <Navigate to="/login" />
  }

  const handleLogout = async() => {
    await axios.post('http://127.0.0.1:8000/auth/token/logout/', {}, {
      headers: {
        'Authorization': `Token ${token}`
      }
    })
    localStorage.removeItem('auth_token')
    navigate('/login')
  }

  return (
    <>
        <header className="bg-gray-900 text-white shadow-lg">
            <div className="navbar bg-gray-900 text-white">
                <div className="navbar-start">
                    <NavLink
                        to="/"
                        className="btn btn-ghost text-xl font-bold text-white hover:bg-gray-800"
                    >
                        Medi-Kiosk
                    </NavLink>
                </div>

                <div className="navbar-end gap-2">
                    <NavLink
                        to="/dashboard"
                        className={({ isActive }) =>
                            isActive ? "btn btn-primary" : "btn btn-ghost text-white hover:bg-gray-800"
                        }
                    >
                        Dashboard
                    </NavLink>

                    <NavLink
                        to="/Profile"
                        className={({ isActive }) =>
                            isActive ? "btn btn-primary" : "btn btn-ghost text-white hover:bg-gray-800"
                        }
                    >
                        Profile
                    </NavLink>

                    <NavLink
                        to="/login"
                        className={({ isActive }) =>
                            isActive ? "btn btn-primary" : "btn btn-ghost text-white hover:bg-gray-800"
                        }
                        onClick={handleLogout}
                    >
                        Logout
                    </NavLink>
                </div>
            </div>
        </header>
        
        <main><Outlet /></main>
            
        <footer className="bg-gray-900 text-white text-center py-6 border-t border-gray-800">
            <p>&copy; 2026 Account Activation. All rights reserved.</p>
        </footer>
    </>
  )
}

export default ProtectedLayout