import React from 'react'
import { Outlet} from 'react-router'
import {NavLink, Navigate} from 'react-router-dom'


const AuthLayout = () => {
    const token = localStorage.getItem('auth_token')

    if (token) {
        return <Navigate to={"/"} />
    }

    return (
    <div className="min-h-screen flex flex-col bg-black">
        <header className="bg-gray-900 text-white shadow-lg">
            <div className="navbar bg-gray-900 text-white">
                <div className="navbar-start">
                    <NavLink
                        to="/dashboard"
                        className="btn btn-ghost text-xl font-bold text-white hover:bg-gray-800"
                    >
                        Medi-Kiosk
                    </NavLink>
                </div>

                <div className="navbar-end gap-2">
                    <NavLink
                        to="/login"
                        className={({ isActive }) =>
                            isActive ? "btn btn-primary" : "btn btn-ghost text-white hover:bg-gray-800"
                        }
                    >
                        Login
                    </NavLink>

                    <NavLink
                        to="/register"
                        className={({ isActive }) =>
                            isActive ? "btn btn-primary" : "btn btn-ghost text-white hover:bg-gray-800"
                        }
                    >
                        Register
                    </NavLink>

                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            isActive ? "btn btn-primary" : "btn btn-ghost text-white hover:bg-gray-800"
                        }
                    >
                        
                    </NavLink>
                </div>
            </div>
        </header>

        <main className="flex-grow flex items-center justify-center px-4">
            <Outlet />
        </main>

        <footer className="bg-gray-900 text-white text-center py-6 border-t border-gray-800">
            <p>&copy; 2026 Account Activation. All rights reserved.</p>
        </footer>
    </div>
  )
}

export default AuthLayout