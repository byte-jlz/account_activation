import React from 'react';
import { Outlet } from 'react-router';
import { Navigate, NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProtectedLayout = () => {
    const token = localStorage.getItem('auth_token');
    const navigate = useNavigate();

    // Protect the route: Redirect to login if no token exists
    if (!token) {
        return <Navigate to="/login" />;
    }

    const handleLogout = async () => {
        try {
            await axios.post('http://127.0.0.1:8000/auth/token/logout/', {}, {
                headers: {
                    'Authorization': `Token ${token}`
                }
            });
        } catch (error) {
            console.error("Logout failed on server, clearing local token.", error);
        } finally {
            // Always clear the token and navigate away, even if the server request fails
            localStorage.removeItem('auth_token');
            navigate('/login');
        }
    };

    return (
        // Radial gradient background matching AuthLayout
        <div className="min-h-screen flex flex-col bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-900 via-black to-black">
            
            {/* Sticky Glassmorphism Header */}
            <header className="sticky top-0 z-50 bg-gray-900/80 backdrop-blur-lg border-b border-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        
                        {/* Brand Logo */}
                        <div className="flex-shrink-0 flex items-center gap-2">
                            <div className="p-1.5 bg-blue-600 rounded-lg shadow-lg shadow-blue-500/20">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                            </div>
                            <NavLink to="/" className="text-xl font-bold text-white tracking-wide hover:text-blue-400 transition-colors">
                                Medi-Kiosk
                            </NavLink>
                        </div>

                        {/* Navigation Links & Action Buttons */}
                        <div className="flex items-center gap-2 md:gap-4">
                            
                            {/* Standard Nav Links */}
                            <div className="flex items-center space-x-1 border-r border-gray-700/50 pr-4 mr-2">
                                {/* Added 'end' prop so it doesn't stay highlighted when visiting child routes */}
                                <NavLink
                                    to="/"
                                    end
                                    className={({ isActive }) =>
                                        `px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                                            isActive 
                                            ? "bg-blue-600/10 text-blue-400" 
                                            : "text-gray-300 hover:bg-gray-800 hover:text-white"
                                        }`
                                    }
                                >
                                    Dashboard
                                </NavLink>

                                <NavLink
                                    to="/Profile"
                                    className={({ isActive }) =>
                                        `px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                                            isActive 
                                            ? "bg-blue-600/10 text-blue-400" 
                                            : "text-gray-300 hover:bg-gray-800 hover:text-white"
                                        }`
                                    }
                                >
                                    Profile
                                </NavLink>
                            </div>

                            {/* Logout Button */}
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all duration-200"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                </svg>
                                <span className="hidden sm:inline">Logout</span>
                            </button>
                        </div>

                    </div>
                </div>
            </header>
            
            {/* Main Content Container - Constrained width to match header */}
            <main className="flex-grow max-w-7xl w-full mx-auto w-full transition-all duration-300 ease-in-out">
                <Outlet />
            </main>
                
            {/* Minimal Footer */}
            <footer className="border-t border-gray-800/60 bg-gray-900/30 py-6 text-center text-sm text-gray-500 mt-auto">
                <p>&copy; 2026 Medi-Kiosk Systems. All rights reserved.</p>
            </footer>
        </div>
    );
}

export default ProtectedLayout;