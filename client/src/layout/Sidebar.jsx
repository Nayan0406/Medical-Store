import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai'
import { MdDashboard, MdReceiptLong, MdWarehouse, MdGroup, MdAnalytics, MdSettings } from 'react-icons/md'
import { IoMdHelpCircle } from 'react-icons/io'

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true)

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  const menuItems = [
    {
      id: 1,
      label: 'Dashboard',
      icon: MdDashboard,
      path: '/dashboard'
    },
    {
      id: 2,
      label: 'Billing',
      icon: MdReceiptLong,
      path: '/billing'
    },
    {
      id: 3,
      label: 'Inventory',
      icon: MdWarehouse,
      path: '/inventory'
    },
    {
      id: 4,
      label: 'Customers',
      icon: MdGroup,
      path: '/customers'
    },
    {
      id: 5,
      label: 'Reports',
      icon: MdAnalytics,
      path: '/reports'
    },
    {
      id: 6,
      label: 'Settings',
      icon: MdSettings,
      path: '/settings'
    },
    // {
    //   id: 7,
    //   label: 'Help',
    //   icon: IoMdHelpCircle,
    //   path: '/help'
    // }
  ]

  return (
    <>
      {/* Toggle Button for Mobile */}
      <button
        onClick={toggleSidebar}
        className="fixed bottom-6 right-6 z-40 lg:hidden p-3 bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-700 transition"
      >
        {isOpen ? <AiOutlineClose size={24} /> : <AiOutlineMenu size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-16 h-[calc(100vh-64px)] bg-gray-900 text-white transition-all duration-300 z-30 ${
          isOpen ? 'w-64' : 'w-0 -translate-x-full'
        } lg:translate-x-0 lg:w-64 overflow-y-auto flex flex-col`}
      >
        <div className="p-6 flex-1">
          {/* Sidebar Header */}
          {/* <div className="mb-8">
            <h2 className="text-lg font-bold text-indigo-400">Menu</h2>
          </div> */}

          {/* Navigation Items */}
          <nav className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.id}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center space-x-3 px-4 py-3 text-gray-300 hover:text-indigo-400 hover:bg-gray-800 rounded-lg transition group"
                >
                  <Icon className="w-5 h-5 group-hover:text-indigo-400 transition" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              )
            })}
          </nav>
        </div>

        {/* Sidebar Footer - Sticky to Bottom */}
        <div className="p-6 border-t border-gray-700">
          <div className="px-4 py-3 bg-gray-800 rounded-lg">
            <p className="text-xs text-gray-400">Medical Software v1.0</p>
            <p className="text-xs text-gray-500 mt-1">© 2026 All rights reserved</p>
          </div>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/50 z-20 lg:hidden mt-16"
        />
      )}
    </>
  )
}

export default Sidebar