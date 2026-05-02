import React from 'react'
import { Outlet } from 'react-router'
import { NavLink, Navigate } from 'react-router-dom'
import Login from './../Login';


const AuthLayout = () => {
    const token = localStorage.getItem('auth_token')

    // If they are already logged in, send them to the protected app
    if (token) {
        return <Navigate to={"/dashboard"} />
    }

    return (
        // Added a subtle radial gradient background to make the dark mode look premium
        <div className="min-h-screen flex flex-col bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-900 via-black to-black">
            
            {/* Sticky Glassmorphism Header */}
            <header className="sticky top-0 z-50 bg-gray-900/60 backdrop-blur-lg border-b border-gray-800">
                <div className="navbar max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    
                    {/* Brand Logo */}
                    <div className="navbar-start flex items-center gap-2">
                        {/* Added a Medical/Health Cross Icon */}
                        <div className="p-1.5 bg-blue-600 rounded-lg">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                        </div>
                        <NavLink to="/" className="text-xl font-bold text-white tracking-wide hover:text-blue-400 transition-colors">
                            Medi-Kiosk
                        </NavLink>
                    </div>

                    {/* Navigation Links */}
                    <div className="navbar-end flex items-center gap-4">
                        <NavLink 
                            to="/login" 
                            className={({ isActive }) =>
                                `text-sm font-medium transition-colors ${isActive ? "text-blue-400" : "text-gray-300 hover:text-white"}`
                            }
                        >
                            Login
                        </NavLink>

                        <NavLink 
                            to="/register" 
                            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-500 rounded-lg shadow-lg shadow-blue-500/20 transition-all"
                        >
                            Create Account
                        </NavLink>
                    </div>
                </div>
            </header>

            {/* Main Content Area - Centers your Login/Register cards perfectly */}
            <main className="flex-grow flex items-center justify-center px-4 py-12">
                <Outlet />
            </main>

            {/* Minimal Footer */}
            <footer className="border-t border-gray-800/60 py-6 text-center text-sm text-gray-500">
                <p>&copy; 2026 Medi-Kiosk Systems. All rights reserved.</p>
            </footer>
        </div>
    )
}

export default AuthLayout