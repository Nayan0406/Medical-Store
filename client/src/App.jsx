import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import MainLayout from './layout/MainLayout'
import Dashboard from './components/Dashboard'
import Setting from './components/Setting'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Auth Pages - No Navbar/Sidebar */}
          <Route path='/' element={<Login />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          
          {/* Protected Pages - With Navbar/Sidebar */}
          <Route
            path='/dashboard'
            element={
              <MainLayout>
                <Dashboard />
              </MainLayout>
            }
          />
          
          {/* Other Pages */}
          <Route
            path='/billing'
            element={
              <MainLayout>
                <div className="bg-white rounded-lg shadow p-6">
                  <h1 className="text-3xl font-bold text-gray-800">Billing</h1>
                  <p className="text-gray-600 mt-2">Billing information coming soon...</p>
                </div>
              </MainLayout>
            }
          />
          
          <Route
            path='/inventory'
            element={
              <MainLayout>
                <div className="bg-white rounded-lg shadow p-6">
                  <h1 className="text-3xl font-bold text-gray-800">Inventory</h1>
                  <p className="text-gray-600 mt-2">Inventory list coming soon...</p>
                </div>
              </MainLayout>
            }
          />
          
          <Route
            path='/customers'
            element={
              <MainLayout>
                <div className="bg-white rounded-lg shadow p-6">
                  <h1 className="text-3xl font-bold text-gray-800">Customers</h1>
                  <p className="text-gray-600 mt-2">Customers list coming soon...</p>
                </div>
              </MainLayout>
            }
          />
          
          <Route
            path='/reports'
            element={
              <MainLayout>
                <div className="bg-white rounded-lg shadow p-6">
                  <h1 className="text-3xl font-bold text-gray-800">Reports</h1>
                  <p className="text-gray-600 mt-2">Report data coming soon...</p>
                </div>
              </MainLayout>
            }
          />
          
          <Route
            path='/settings'
            element={
              <MainLayout>
                <Setting />
              </MainLayout>
            }
          />
          
          {/* <Route
            path='/help'
            element={
              <MainLayout>
                <div className="bg-white rounded-lg shadow p-6">
                  <h1 className="text-3xl font-bold text-gray-800">Help</h1>
                  <p className="text-gray-600 mt-2">Help page coming soon...</p>
                </div>
              </MainLayout>
            }
          /> */}
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

