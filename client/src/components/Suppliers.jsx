
import React, { useState } from 'react';

const initialSuppliers = [
  {
    id: 1,
    name: 'Medico Pvt Ltd',
    contact: 'Amit Sharma',
    phone: '9876543210',
    city: 'Delhi',
    totalPurchase: 50000,
    pendingPayment: 10000,
    status: 'Active',
  },
  {
    id: 2,
    name: 'HealthCare Inc',
    contact: 'Priya Singh',
    phone: '9123456780',
    city: 'Mumbai',
    totalPurchase: 75000,
    pendingPayment: 0,
    status: 'Inactive',
  },
];

const Suppliers = () => {
  const [suppliers, setSuppliers] = useState(initialSuppliers);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  const [sort, setSort] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    name: '',
    contact: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    state: '',
    gst: '',
    drugLicense: '',
    status: 'Active',
  });

  // Filter, Search, Sort logic
  let filtered = suppliers.filter(sup =>
    (sup.name.toLowerCase().includes(search.toLowerCase()) ||
      sup.phone.includes(search)) &&
    (filter === 'All' || sup.status === filter)
  );
  if (sort === 'pending') {
    filtered = [...filtered].sort((a, b) => b.pendingPayment - a.pendingPayment);
  } else if (sort === 'purchase') {
    filtered = [...filtered].sort((a, b) => b.totalPurchase - a.totalPurchase);
  }

  const handleFormChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddSupplier = e => {
    e.preventDefault();
    setSuppliers([
      ...suppliers,
      {
        id: suppliers.length + 1,
        name: form.name,
        contact: form.contact,
        phone: form.phone,
        city: form.city,
        totalPurchase: 0,
        pendingPayment: 0,
        status: form.status,
        email: form.email,
        address: form.address,
        state: form.state,
        gst: form.gst,
        drugLicense: form.drugLicense,
      },
    ]);
    setForm({
      name: '', contact: '', phone: '', email: '', address: '', city: '', state: '', gst: '', drugLicense: '', status: 'Active',
    });
    setShowForm(false);
  };



  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="bg-white rounded-2xl shadow p-6">
        <h2 className="text-2xl font-bold mb-6">Suppliers</h2>

        {/* Search, Filter, Sort, Add Supplier Button */}
        <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
          <div className="flex flex-1 flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="Search by name or phone"
              className="border px-3 py-2 rounded w-full md:w-1/3"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <select
              className="border px-3 py-2 rounded w-full md:w-1/6"
              value={filter}
              onChange={e => setFilter(e.target.value)}
            >
              <option value="All">All</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
            <select
              className="border px-3 py-2 rounded w-full md:w-1/6"
              value={sort}
              onChange={e => setSort(e.target.value)}
            >
              <option value="">Sort By</option>
              <option value="pending">Pending Payment</option>
              <option value="purchase">Total Purchase</option>
            </select>
          </div>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 whitespace-nowrap"
            onClick={() => setShowForm(true)}
          >
            + Add Supplier
          </button>
        </div>

        {/* Cards Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-8 text-gray-400">No suppliers found.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(sup => (
              <div key={sup.id} className="bg-gray-50 rounded-xl shadow p-5 flex flex-col gap-2 border border-gray-100 hover:shadow-lg transition">
                <div className="mb-2">
                  <h3 className="text-lg font-bold text-gray-800">{sup.name}</h3>
                </div>
                <div className="text-sm text-gray-600"><span className="font-semibold">Contact:</span> {sup.contact}</div>
                <div className="text-sm text-gray-600"><span className="font-semibold">Phone:</span> {sup.phone}</div>
                <div className="text-sm text-gray-600"><span className="font-semibold">City:</span> {sup.city}</div>
                <div className="text-sm text-gray-600"><span className="font-semibold">Total Purchase:</span> <span className="text-gray-800">₹{sup.totalPurchase.toLocaleString()}</span></div>
                <div className="text-sm text-gray-600"><span className="font-semibold">Pending Payment:</span> <span className="text-gray-800">₹{sup.pendingPayment.toLocaleString()}</span></div>
                {sup.email && <div className="text-sm text-gray-600"><span className="font-semibold">Email:</span> {sup.email}</div>}
                {sup.address && <div className="text-sm text-gray-600"><span className="font-semibold">Address:</span> {sup.address}</div>}
                {sup.state && <div className="text-sm text-gray-600"><span className="font-semibold">State:</span> {sup.state}</div>}
                {sup.gst && <div className="text-sm text-gray-600"><span className="font-semibold">GST:</span> {sup.gst}</div>}
                {sup.drugLicense && <div className="text-sm text-gray-600"><span className="font-semibold">Drug License:</span> {sup.drugLicense}</div>}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add Supplier Modal */}
      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm bg-black/10">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-8 relative">
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-2xl"
              onClick={() => setShowForm(false)}
            >&times;</button>
            <h3 className="text-xl font-bold mb-4">Add Supplier</h3>
            <form onSubmit={handleAddSupplier} className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium">Supplier Name</label>
                  <input name="name" required value={form.name} onChange={handleFormChange} className="border px-3 py-2 rounded w-full" />
                </div>
                <div>
                  <label className="block text-sm font-medium">Contact Person Name</label>
                  <input name="contact" required value={form.contact} onChange={handleFormChange} className="border px-3 py-2 rounded w-full" />
                </div>
                <div>
                  <label className="block text-sm font-medium">Phone Number</label>
                  <input name="phone" required value={form.phone} onChange={handleFormChange} className="border px-3 py-2 rounded w-full" />
                </div>
                <div>
                  <label className="block text-sm font-medium">Email</label>
                  <input name="email" type="email" value={form.email} onChange={handleFormChange} className="border px-3 py-2 rounded w-full" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium">Address</label>
                  <input name="address" value={form.address} onChange={handleFormChange} className="border px-3 py-2 rounded w-full" />
                </div>
                <div>
                  <label className="block text-sm font-medium">City</label>
                  <input name="city" value={form.city} onChange={handleFormChange} className="border px-3 py-2 rounded w-full" />
                </div>
                <div>
                  <label className="block text-sm font-medium">State</label>
                  <input name="state" value={form.state} onChange={handleFormChange} className="border px-3 py-2 rounded w-full" />
                </div>
                <div>
                  <label className="block text-sm font-medium">GST Number (optional)</label>
                  <input name="gst" value={form.gst} onChange={handleFormChange} className="border px-3 py-2 rounded w-full" />
                </div>
                <div>
                  <label className="block text-sm font-medium">Drug License (optional)</label>
                  <input name="drugLicense" value={form.drugLicense} onChange={handleFormChange} className="border px-3 py-2 rounded w-full" />
                </div>
                <div>
                  <label className="block text-sm font-medium">Status</label>
                  <select name="status" value={form.status} onChange={handleFormChange} className="border px-3 py-2 rounded w-full">
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end pt-2">
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Add Supplier</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Suppliers;