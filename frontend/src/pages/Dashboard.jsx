import React from 'react'

const Dashboard = () => {
  return (
    // We only need padding and container constraints here, the background and nav are handled by ProtectedLayout
    <div className="p-6 md:p-10 min-h-[85vh] bg-black">
      
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white tracking-tight">Dashboard Overview</h1>
        <p className="text-gray-400 mt-1">Welcome back to your Medi-Kiosk control center.</p>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        
        {/* Stat Card 1 */}
        <div className="bg-gray-800/60 backdrop-blur-md rounded-2xl p-6 border border-gray-700/50 shadow-lg transition-transform hover:-translate-y-1 duration-300">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-400 font-medium">Total Active Users</h3>
            <div className="p-2 bg-blue-500/10 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
          </div>
          <p className="text-3xl font-bold text-white">1,248</p>
          <p className="text-sm text-emerald-400 mt-2 flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" /></svg>
            +12% this week
          </p>
        </div>

        {/* Stat Card 2 */}
        <div className="bg-gray-800/60 backdrop-blur-md rounded-2xl p-6 border border-gray-700/50 shadow-lg transition-transform hover:-translate-y-1 duration-300">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-400 font-medium">Pending Activations</h3>
            <div className="p-2 bg-indigo-500/10 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <p className="text-3xl font-bold text-white">24</p>
          <p className="text-sm text-gray-400 mt-2">Requires your attention</p>
        </div>

        {/* Stat Card 3 */}
        <div className="bg-gray-800/60 backdrop-blur-md rounded-2xl p-6 border border-gray-700/50 shadow-lg transition-transform hover:-translate-y-1 duration-300">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-400 font-medium">System Status</h3>
            <div className="p-2 bg-emerald-500/10 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
              </svg>
            </div>
          </div>
          <p className="text-3xl font-bold text-emerald-400">Online</p>
          <p className="text-sm text-gray-400 mt-2">All services operational</p>
        </div>

      </div>

      {/* Main Content / Recent Activity Area */}
      <div className="bg-gray-800/60 backdrop-blur-md rounded-2xl border border-gray-700/50 shadow-xl overflow-hidden">
        <div className="p-6 border-b border-gray-700/50 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-white">Recent Activity</h2>
          <button className="text-sm text-blue-400 hover:text-blue-300 transition-colors">View All</button>
        </div>
        
        <div className="p-6">
          <div className="space-y-6">
            {/* Activity Item 1 */}
            <div className="flex items-start gap-4">
              <div className="mt-1 w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]"></div>
              <div>
                <p className="text-gray-200">New user registration: <span className="font-semibold">plaza.julzchristian@gmail.com</span></p>
                <p className="text-sm text-gray-500 mt-1">2 minutes ago</p>
              </div>
            </div>

            {/* Activity Item 2 */}
            <div className="flex items-start gap-4">
              <div className="mt-1 w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]"></div>
              <div>
                <p className="text-gray-200">Account activated successfully via email link.</p>
                <p className="text-sm text-gray-500 mt-1">1 hour ago</p>
              </div>
            </div>

            {/* Activity Item 3 */}
            <div className="flex items-start gap-4">
              <div className="mt-1 w-2 h-2 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.8)]"></div>
              <div>
                <p className="text-gray-200">System maintenance completed.</p>
                <p className="text-sm text-gray-500 mt-1">Yesterday</p>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Dashboard