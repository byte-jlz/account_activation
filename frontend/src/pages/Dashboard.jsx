import React from 'react'
import { Navigate } from 'react-router-dom'
import { Outlet} from 'react-router'

const Dashboard = () => {
  


  return (
    <>

    <div className="min-h-screen flex flex-col bg-black">
      <header className="bg-gray-900 text-white shadow-lg">
        <div className="navbar bg-gray-900 text-white">
          
          <main className="flex-grow flex items-center justify-center px-4">
            <Outlet />
          </main>
        </div>
      </header>
      <footer className="bg-gray-900 text-white text-center py-6 border-t border-gray-800">
        <p>&copy; 2026 Account Activation. All rights reserved.</p>
      </footer>
    </div>
   
   
    </>
  )
}

export default Dashboard