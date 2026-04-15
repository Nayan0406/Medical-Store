import React, { useState } from 'react'
import { MdUploadFile, MdSave, MdRefresh } from 'react-icons/md'

const Setting = () => {
  const [settings, setSettings] = useState({
    // General Settings
    shopName: '',
    ownerName: '',
    mobileNumber: '',
    email: '',
    shopAddress: '',
    gstNumber: '',
    licenseNumber: '',
    logo: null,
    logoPreview: null,

    // Billing & GST Settings
    gstEnabled: true,
    gstPercentage: 18,
    showLogo: true,
    showGstNumber: true,
    footerMessage: 'Thank you, visit again',
    defaultDiscount: 0,
    roundOff: true,
    autoPrint: false,

    // Inventory Settings
    lowStockAlert: 10,
    expiryAlertDays: 30,
    allowNegativeStock: false,
  })

  const [saved, setSaved] = useState(false)
  const [activeTab, setActiveTab] = useState('general')

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
    setSaved(false)
  }

  const handleLogoChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setSettings(prev => ({
          ...prev,
          logo: file,
          logoPreview: reader.result
        }))
      }
      reader.readAsDataURL(file)
      setSaved(false)
    }
  }

  const handleSave = () => {
    console.log('Settings saved:', settings)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const handleReset = () => {
    setSettings({
      shopName: '',
      ownerName: '',
      mobileNumber: '',
      email: '',
      shopAddress: '',
      gstNumber: '',
      licenseNumber: '',
      logo: null,
      logoPreview: null,
      gstEnabled: true,
      gstPercentage: 18,
      showLogo: true,
      showGstNumber: true,
      footerMessage: 'Thank you, visit again',
      defaultDiscount: 0,
      roundOff: true,
      autoPrint: false,
      lowStockAlert: 10,
      expiryAlertDays: 30,
      allowNegativeStock: false,
    })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow p-6">
        <h1 className="text-3xl font-bold text-gray-800">Settings</h1>
        <p className="text-gray-600 mt-2">Manage your shop and billing configurations</p>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow border-b border-gray-200">
        <div className="flex flex-wrap">
          <button
            onClick={() => setActiveTab('general')}
            className={`flex-1 px-6 py-4 text-center font-semibold transition border-b-2 ${
              activeTab === 'general'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-gray-600 hover:text-indigo-600'
            }`}
          >
            👉 General Settings
          </button>
          <button
            onClick={() => setActiveTab('billing')}
            className={`flex-1 px-6 py-4 text-center font-semibold transition border-b-2 ${
              activeTab === 'billing'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-gray-600 hover:text-indigo-600'
            }`}
          >
            💰 Billing & GST
          </button>
          <button
            onClick={() => setActiveTab('inventory')}
            className={`flex-1 px-6 py-4 text-center font-semibold transition border-b-2 ${
              activeTab === 'inventory'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-gray-600 hover:text-indigo-600'
            }`}
          >
            📦 Inventory
          </button>
        </div>
      </div>

      {/* Success Message */}
      {saved && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-6 py-4 rounded-lg animate-pulse">
          ✅ Settings saved successfully!
        </div>
      )}

      {/* General Settings Tab */}
      {activeTab === 'general' && (
        <div className="bg-white rounded-lg shadow p-6 space-y-6">
          <h2 className="text-2xl font-bold text-gray-800">👉 Shop ki Basic Identity</h2>

          {/* Logo Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6 border-b border-gray-200">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-4">
                🖼️ Upload Logo (Print hoga bill pe)
              </label>
              <div className="border-2 border-dashed border-indigo-300 rounded-lg p-6 text-center hover:border-indigo-500 transition">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleLogoChange}
                  className="hidden"
                  id="logo-input"
                />
                <label htmlFor="logo-input" className="cursor-pointer">
                  <MdUploadFile className="w-12 h-12 text-indigo-600 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Click to upload logo</p>
                  <p className="text-xs text-gray-500 mt-1">PNG, JPG up to 5MB</p>
                </label>
              </div>
            </div>

            {/* Logo Preview */}
            {settings.logoPreview && (
              <div>
                <p className="text-sm font-semibold text-gray-700 mb-4">Logo Preview</p>
                <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                  <img src={settings.logoPreview} alt="Logo" className="w-full h-32 object-contain" />
                  <button
                    onClick={() =>
                      setSettings(prev => ({ ...prev, logo: null, logoPreview: null }))
                    }
                    className="mt-3 w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg transition"
                  >
                    Remove Logo
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Shop Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Shop Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Shop Name *</label>
              <input
                type="text"
                name="shopName"
                value={settings.shopName}
                onChange={handleChange}
                placeholder="Enter shop name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Owner Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Owner Name *</label>
              <input
                type="text"
                name="ownerName"
                value={settings.ownerName}
                onChange={handleChange}
                placeholder="Enter owner name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Mobile Number */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Mobile Number *</label>
              <input
                type="tel"
                name="mobileNumber"
                value={settings.mobileNumber}
                onChange={handleChange}
                placeholder="10-digit mobile number"
                maxLength="10"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Email *</label>
              <input
                type="email"
                name="email"
                value={settings.email}
                onChange={handleChange}
                placeholder="shop@example.com"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* GST Number */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">GST Number</label>
              <input
                type="text"
                name="gstNumber"
                value={settings.gstNumber}
                onChange={handleChange}
                placeholder="e.g., 27ABCDE1234F1Z5"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* License Number */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">License Number (Drug License)</label>
              <input
                type="text"
                name="licenseNumber"
                value={settings.licenseNumber}
                onChange={handleChange}
                placeholder="Enter license number"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Shop Address - Full Width */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Shop Address *</label>
              <textarea
                name="shopAddress"
                value={settings.shopAddress}
                onChange={handleChange}
                placeholder="Enter complete shop address"
                rows="3"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>
        </div>
      )}

      {/* Billing & GST Settings Tab */}
      {activeTab === 'billing' && (
        <div className="bg-white rounded-lg shadow p-6 space-y-6">
          <h2 className="text-2xl font-bold text-gray-800">👉 Billing & GST Settings</h2>

          {/* GST Section */}
          <div className="border-l-4 border-blue-500 bg-blue-50 p-6 rounded-lg">
            <h3 className="text-lg font-bold text-gray-800 mb-4">GST Settings</h3>
            <div className="space-y-4">
              {/* GST Toggle */}
              <div className="flex items-center justify-between">
                <label className="font-semibold text-gray-700">GST Enabled</label>
                <input
                  type="checkbox"
                  name="gstEnabled"
                  checked={settings.gstEnabled}
                  onChange={handleChange}
                  className="w-6 h-6 cursor-pointer"
                />
              </div>

              {/* GST Percentage */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">GST Percentage (%)</label>
                <input
                  type="number"
                  name="gstPercentage"
                  value={settings.gstPercentage}
                  onChange={handleChange}
                  placeholder="e.g., 18"
                  min="0"
                  max="100"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
          </div>

          {/* Bill Format Section */}
          <div className="border-l-4 border-green-500 bg-green-50 p-6 rounded-lg">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Bill Format</h3>
            <div className="space-y-4">
              {/* Show Logo */}
              <div className="flex items-center justify-between">
                <label className="font-semibold text-gray-700">Show Logo on Bill</label>
                <input
                  type="checkbox"
                  name="showLogo"
                  checked={settings.showLogo}
                  onChange={handleChange}
                  className="w-6 h-6 cursor-pointer"
                />
              </div>

              {/* Show GST Number */}
              <div className="flex items-center justify-between">
                <label className="font-semibold text-gray-700">Show GST Number</label>
                <input
                  type="checkbox"
                  name="showGstNumber"
                  checked={settings.showGstNumber}
                  onChange={handleChange}
                  className="w-6 h-6 cursor-pointer"
                />
              </div>

              {/* Footer Message */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Footer Message 👉 "Thank you, visit again"</label>
                <textarea
                  name="footerMessage"
                  value={settings.footerMessage}
                  onChange={handleChange}
                  placeholder="Enter footer message"
                  rows="2"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
          </div>

          {/* Billing Options Section */}
          <div className="border-l-4 border-purple-500 bg-purple-50 p-6 rounded-lg">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Billing Options</h3>
            <div className="space-y-4">
              {/* Default Discount */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Default Discount (%)</label>
                <input
                  type="number"
                  name="defaultDiscount"
                  value={settings.defaultDiscount}
                  onChange={handleChange}
                  placeholder="e.g., 5"
                  min="0"
                  max="100"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Round Off */}
              <div className="flex items-center justify-between">
                <label className="font-semibold text-gray-700">Round Off Bill Amount</label>
                <input
                  type="checkbox"
                  name="roundOff"
                  checked={settings.roundOff}
                  onChange={handleChange}
                  className="w-6 h-6 cursor-pointer"
                />
              </div>

              {/* Auto Print */}
              <div className="flex items-center justify-between">
                <label className="font-semibold text-gray-700">Auto Print After Bill</label>
                <input
                  type="checkbox"
                  name="autoPrint"
                  checked={settings.autoPrint}
                  onChange={handleChange}
                  className="w-6 h-6 cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Inventory Settings Tab */}
      {activeTab === 'inventory' && (
        <div className="bg-white rounded-lg shadow p-6 space-y-6">
          <h2 className="text-2xl font-bold text-gray-800">👉 Inventory Stock Handling Control</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Low Stock Alert Limit */}
            <div className="border-l-4 border-orange-500 bg-orange-50 p-6 rounded-lg">
              <label className="block text-sm font-semibold text-gray-700 mb-4">Low Stock Alert Limit</label>
              <div className="flex items-center space-x-4">
                <input
                  type="number"
                  name="lowStockAlert"
                  value={settings.lowStockAlert}
                  onChange={handleChange}
                  placeholder="e.g., 10"
                  min="1"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <span className="text-sm text-gray-600">units</span>
              </div>
              <p className="text-xs text-gray-500 mt-2">Alert when stock &lt; this value</p>
            </div>

            {/* Expiry Alert Days */}
            <div className="border-l-4 border-red-500 bg-red-50 p-6 rounded-lg">
              <label className="block text-sm font-semibold text-gray-700 mb-4">Expiry Alert Days</label>
              <div className="flex items-center space-x-4">
                <input
                  type="number"
                  name="expiryAlertDays"
                  value={settings.expiryAlertDays}
                  onChange={handleChange}
                  placeholder="e.g., 30"
                  min="1"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <span className="text-sm text-gray-600">days</span>
              </div>
              <p className="text-xs text-gray-500 mt-2">Alert when expiry is within this many days</p>
            </div>

            {/* Allow Negative Stock */}
            <div className="border-l-4 border-yellow-500 bg-yellow-50 p-6 rounded-lg md:col-span-2">
              <div className="flex items-center justify-between">
                <div>
                  <label className="font-semibold text-gray-700">Allow Negative Stock</label>
                  <p className="text-xs text-gray-500 mt-1">Permit selling beyond available inventory</p>
                </div>
                <input
                  type="checkbox"
                  name="allowNegativeStock"
                  checked={settings.allowNegativeStock}
                  onChange={handleChange}
                  className="w-6 h-6 cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="bg-white rounded-lg shadow p-6 flex justify-end space-x-4">
        <button
          onClick={handleReset}
          className="flex items-center space-x-2 bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2.5 px-6 rounded-lg transition"
        >
          <MdRefresh className="w-5 h-5" />
          <span>Reset</span>
        </button>
        <button
          onClick={handleSave}
          className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 px-6 rounded-lg transition transform hover:scale-105"
        >
          <MdSave className="w-5 h-5" />
          <span>Save Settings</span>
        </button>
      </div>
    </div>
  )
}

export default Setting
