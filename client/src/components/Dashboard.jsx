import React, { useState } from 'react'
import { MdTrendingUp, MdWarning, MdCheckCircle } from 'react-icons/md'

const Dashboard = () => {
  const [timeframe, setTimeframe] = useState('week')

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Dashboard</h1>
        <p className="text-gray-600">Welcome to MedicalHub Dashboard</p>
      </div>

      {/* Stats Grid - Combined: Revenue, Sales, Bills, Low Stock */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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

        {/* Today Sales */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg shadow p-6 border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-700 text-sm font-semibold">Today Sales</p>
              <p className="text-2xl font-bold text-blue-600 mt-3">₹12,450</p>
              <p className="text-xs text-gray-600 mt-2">+12% from yesterday</p>
            </div>
            <MdTrendingUp className="text-blue-500 text-4xl opacity-30" />
          </div>
        </div>

        {/* Bills */}
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg shadow p-6 border-l-4 border-purple-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-700 text-sm font-semibold">Bills Today</p>
              <p className="text-2xl font-bold text-purple-600 mt-3">45</p>
              <p className="text-xs text-gray-600 mt-2">Average: ₹276.67</p>
            </div>
            <div className="text-purple-500 text-4xl opacity-30">📋</div>
          </div>
        </div>

        {/* Low Stock */}
        <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-lg shadow p-6 border-l-4 border-red-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-700 text-sm font-semibold">Low Stock Items</p>
              <p className="text-2xl font-bold text-red-600 mt-3">8</p>
              <p className="text-xs text-gray-600 mt-2">Need reorder</p>
            </div>
            <div className="text-red-500 text-4xl opacity-30">⚠️</div>
          </div>
        </div>
      </div>

      {/* NEW - Alerts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Expiry Alert */}
        <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg shadow border-l-4 border-orange-500 p-6">
          <div className="flex items-center space-x-4 mb-4">
            <MdWarning className="text-orange-600 text-3xl" />
            <h3 className="text-lg font-bold text-gray-800">Expiry Alerts ⏰</h3>
          </div>
          <div className="space-y-3">
            <div className="bg-white rounded-lg p-3 flex justify-between items-center">
              <div>
                <p className="text-sm font-semibold text-gray-800">Aspirin 500mg</p>
                <p className="text-xs text-orange-600">Expires: 15 May 2026</p>
              </div>
              <span className="text-xs bg-orange-200 text-orange-800 px-3 py-1 rounded-full">29 days</span>
            </div>
            <div className="bg-white rounded-lg p-3 flex justify-between items-center">
              <div>
                <p className="text-sm font-semibold text-gray-800">Cough Syrup</p>
                <p className="text-xs text-orange-600">Expires: 20 May 2026</p>
              </div>
              <span className="text-xs bg-orange-200 text-orange-800 px-3 py-1 rounded-full">34 days</span>
            </div>
            <button className="w-full text-sm text-orange-600 hover:text-orange-700 font-semibold mt-2 p-2 hover:bg-orange-50 rounded">
              View All Expiries →
            </button>
          </div>
        </div>

        {/* Low Stock Alert */}
        <div className="bg-gradient-to-r from-red-50 to-red-100 rounded-lg shadow border-l-4 border-red-500 p-6">
          <div className="flex items-center space-x-4 mb-4">
            <MdWarning className="text-red-600 text-3xl" />
            <h3 className="text-lg font-bold text-gray-800">Low Stock Alerts 📦</h3>
          </div>
          <div className="space-y-3">
            <div className="bg-white rounded-lg p-3 flex justify-between items-center">
              <div>
                <p className="text-sm font-semibold text-gray-800">Paracetamol</p>
                <p className="text-xs text-red-600">Stock: 5 units</p>
              </div>
              <span className="text-xs bg-red-200 text-red-800 px-3 py-1 rounded-full">Critical</span>
            </div>
            <div className="bg-white rounded-lg p-3 flex justify-between items-center">
              <div>
                <p className="text-sm font-semibold text-gray-800">Antibiotic Cream</p>
                <p className="text-xs text-red-600">Stock: 8 units</p>
              </div>
              <span className="text-xs bg-red-200 text-red-800 px-3 py-1 rounded-full">Low</span>
            </div>
            <button className="w-full text-sm text-red-600 hover:text-red-700 font-semibold mt-2 p-2 hover:bg-red-50 rounded">
              View All Low Stock →
            </button>
          </div>
        </div>
      </div>

      {/* NEW - Middle Section: Sales Overview & Top Medicines */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sales Overview */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-800">Sales Overview 📊</h2>
            <div className="flex space-x-2">
              {['day', 'week', 'month'].map(tf => (
                <button
                  key={tf}
                  onClick={() => setTimeframe(tf)}
                  className={`px-4 py-2 rounded-lg font-semibold transition ${
                    timeframe === tf
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {tf.charAt(0).toUpperCase() + tf.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Line Chart Visualization */}
          <div className="w-full h-64 bg-gradient-to-b from-gray-50 to-white rounded-lg p-4 flex flex-col justify-between border border-gray-200">
            <svg viewBox="0 0 500 200" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
              {/* Grid Lines */}
              <line x1="40" y1="20" x2="40" y2="160" stroke="#e5e7eb" strokeWidth="1" />
              <line x1="40" y1="160" x2="480" y2="160" stroke="#e5e7eb" strokeWidth="1" />
              
              {/* Horizontal grid lines */}
              <line x1="40" y1="60" x2="480" y2="60" stroke="#f3f4f6" strokeWidth="1" />
              <line x1="40" y1="100" x2="480" y2="100" stroke="#f3f4f6" strokeWidth="1" />
              <line x1="40" y1="140" x2="480" y2="140" stroke="#f3f4f6" strokeWidth="1" />

              {/* Y-axis labels */}
              <text x="30" y="165" fontSize="12" fill="#9ca3af" textAnchor="end">0</text>
              <text x="30" y="105" fontSize="12" fill="#9ca3af" textAnchor="end">50</text>
              <text x="30" y="25" fontSize="12" fill="#9ca3af" textAnchor="end">100</text>

              {/* Line path */}
              <polyline
                points="60,88 120,78 180,118 240,64 300,44 360,48 420,92"
                fill="none"
                stroke="url(#lineGradient)"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Gradient definition */}
              <defs>
                <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#4f46e5" />
                  <stop offset="100%" stopColor="#7c3aed" />
                </linearGradient>
              </defs>

              {/* Data points */}
              <circle cx="60" cy="88" r="4" fill="#4f46e5" stroke="white" strokeWidth="2" />
              <circle cx="120" cy="78" r="4" fill="#4f46e5" stroke="white" strokeWidth="2" />
              <circle cx="180" cy="118" r="4" fill="#4f46e5" stroke="white" strokeWidth="2" />
              <circle cx="240" cy="64" r="4" fill="#4f46e5" stroke="white" strokeWidth="2" />
              <circle cx="300" cy="44" r="4" fill="#7c3aed" stroke="white" strokeWidth="2" />
              <circle cx="360" cy="48" r="4" fill="#7c3aed" stroke="white" strokeWidth="2" />
              <circle cx="420" cy="92" r="4" fill="#7c3aed" stroke="white" strokeWidth="2" />

              {/* X-axis labels */}
              <text x="60" y="180" fontSize="12" fill="#6b7280" textAnchor="middle">Mon</text>
              <text x="120" y="180" fontSize="12" fill="#6b7280" textAnchor="middle">Tue</text>
              <text x="180" y="180" fontSize="12" fill="#6b7280" textAnchor="middle">Wed</text>
              <text x="240" y="180" fontSize="12" fill="#6b7280" textAnchor="middle">Thu</text>
              <text x="300" y="180" fontSize="12" fill="#6b7280" textAnchor="middle">Fri</text>
              <text x="360" y="180" fontSize="12" fill="#6b7280" textAnchor="middle">Sat</text>
              <text x="420" y="180" fontSize="12" fill="#6b7280" textAnchor="middle">Sun</text>
            </svg>
          </div>

          {/* Legend and Stats */}
          <div className="grid grid-cols-3 gap-4 mt-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-indigo-500 rounded-full"></div>
              <span className="text-xs text-gray-600">Peak: ₹45.2K (Fri)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-indigo-400 rounded-full"></div>
              <span className="text-xs text-gray-600">Avg: ₹35.8K</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
              <span className="text-xs text-gray-600">Low: ₹24.5K (Wed)</span>
            </div>
          </div>
        </div>

        {/* Top Medicines */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Top Medicines 💊</h2>
          <div className="space-y-3">
            {[
              { name: 'Aspirin', sales: 120, revenue: '₹1,200' },
              { name: 'Paracetamol', sales: 95, revenue: '₹950' },
              { name: 'Amoxicillin', sales: 78, revenue: '₹2,340' },
              { name: 'Ibuprofen', sales: 65, revenue: '₹975' },
              { name: 'Metformin', sales: 52, revenue: '₹2,600' },
            ].map((medicine, idx) => (
              <div key={idx} className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-lg p-3 hover:shadow-md transition">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-semibold text-gray-800">{medicine.name}</p>
                    <p className="text-xs text-gray-600">{medicine.sales} sold</p>
                  </div>
                  <span className="text-sm font-bold text-indigo-600">{medicine.revenue}</span>
                </div>
                <div className="bg-gray-200 rounded-full h-2 mt-2 overflow-hidden">
                  <div
                    className="bg-indigo-500 h-full"
                    style={{ width: `${(medicine.sales / 120) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* NEW - Bottom Section: Recent Sales & Customer Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Sales */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Sales 🛒</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b-2 border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Bill #</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Customer</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Items</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Amount</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Status</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { id: '#001', customer: 'Raj Kumar', items: 3, amount: '₹450', status: 'Paid' },
                  { id: '#002', customer: 'Priya Singh', items: 5, amount: '₹890', status: 'Paid' },
                  { id: '#003', customer: 'Arjun Patel', items: 2, amount: '₹320', status: 'Pending' },
                  { id: '#004', customer: 'Nikita Sharma', items: 4, amount: '₹675', status: 'Paid' },
                  { id: '#005', customer: 'Rahul Verma', items: 1, amount: '₹120', status: 'Paid' },
                  { id: '#006', customer: 'Sneha Gupta', items: 6, amount: '₹1,240', status: 'Paid' },
                  { id: '#007', customer: 'Vikram Singh', items: 3, amount: '₹560', status: 'Paid' },
                  { id: '#008', customer: 'Anjali Mehta', items: 4, amount: '₹780', status: 'Pending' },
                  { id: '#009', customer: 'Rohan Kumar', items: 2, amount: '₹340', status: 'Paid' },
                  { id: '#010', customer: 'Divya Sharma', items: 5, amount: '₹925', status: 'Paid' },
                ].map((sale, idx) => (
                  <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50 transition">
                    <td className="px-4 py-3 font-semibold text-gray-800">{sale.id}</td>
                    <td className="px-4 py-3 text-gray-700">{sale.customer}</td>
                    <td className="px-4 py-3 text-gray-700">{sale.items}</td>
                    <td className="px-4 py-3 font-semibold text-indigo-600">{sale.amount}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                        sale.status === 'Paid'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {sale.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button className="w-full mt-4 text-sm text-indigo-600 hover:text-indigo-700 font-semibold p-2 hover:bg-indigo-50 rounded">
            View All Sales →
          </button>
        </div>

        {/* Customer Summary */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Customer Summary 👥</h2>
          <div className="space-y-4">
            {/* Total Customers */}
            <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-lg p-4 border-l-4 border-indigo-500">
              <p className="text-sm text-gray-700">Total Customers</p>
              <p className="text-2xl font-bold text-indigo-600 mt-2">2,345</p>
            </div>

            {/* New This Month */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 border-l-4 border-blue-500">
              <p className="text-sm text-gray-700">New This Month</p>
              <p className="text-2xl font-bold text-blue-600 mt-2">287</p>
              <p className="text-xs text-gray-600 mt-1">+12.3% from last month</p>
            </div>

            {/* Top Customer */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4 border-l-4 border-green-500">
              <p className="text-sm text-gray-700">Top Customer</p>
              <p className="text-lg font-bold text-green-600 mt-2">Raj Kumar</p>
              <p className="text-xs text-gray-600 mt-1">Total spent: ₹45,620</p>
            </div>

            {/* Repeat Rate */}
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4 border-l-4 border-purple-500">
              <p className="text-sm text-gray-700">Repeat Rate</p>
              <p className="text-2xl font-bold text-purple-600 mt-2">68%</p>
              <p className="text-xs text-gray-600 mt-1">Coming back frequently</p>
            </div>
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
              New Bill
            </button>
            <button className="w-full border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50 font-semibold py-2 px-4 rounded-lg transition">
              Add Medicine
            </button>
            <button className="w-full border-2 border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold py-2 px-4 rounded-lg transition">
              Add Customer
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard