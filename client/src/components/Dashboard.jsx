import React from 'react'

const Dashboard = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Dashboard</h1>
        <p className="text-gray-600">Welcome to MedicalHub Dashboard</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Patients */}
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-indigo-600">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Patients</p>
              <p className="text-3xl font-bold text-gray-800 mt-2">1,234</p>
            </div>
            <div className="text-indigo-600 text-4xl opacity-20">👥</div>
          </div>
        </div>

        {/* Appointments Today */}
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-600">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Appointments Today</p>
              <p className="text-3xl font-bold text-gray-800 mt-2">12</p>
            </div>
            <div className="text-blue-600 text-4xl opacity-20">📅</div>
          </div>
        </div>

        {/* Medicines Available */}
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-600">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Medicines Available</p>
              <p className="text-3xl font-bold text-gray-800 mt-2">856</p>
            </div>
            <div className="text-green-600 text-4xl opacity-20">💊</div>
          </div>
        </div>

        {/* Revenue */}
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-purple-600">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Revenue</p>
              <p className="text-3xl font-bold text-gray-800 mt-2">$45,230</p>
            </div>
            <div className="text-purple-600 text-4xl opacity-20">💰</div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Patients */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Patients</h2>
          <div className="space-y-3">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded transition">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold">
                    P{item}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-800">Patient {item}</p>
                    <p className="text-xs text-gray-500">patient{item}@example.com</p>
                  </div>
                </div>
                <span className="text-xs bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full">Active</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition">
              Add Patient
            </button>
            <button className="w-full border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50 font-semibold py-2 px-4 rounded-lg transition">
              Schedule Appointment
            </button>
            <button className="w-full border-2 border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold py-2 px-4 rounded-lg transition">
              View Reports
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard