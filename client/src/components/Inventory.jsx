import React, { useState } from 'react';

const getStatus = (quantity, expiry) => {
	const now = new Date();
	const exp = new Date(expiry);
	if (quantity < 10) return 'Low';
	if (exp < new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000)) return 'Expiry';
	return 'Normal';
};

const initialMedicines = [
	// Example data
	{
		name: 'Paracetamol',
		category: 'Tablet',
		quantity: 50,
		unit: 'strip',
		mrp: 25,
		purchasePrice: 20,
		discount: 0,
		batchNo: 'B123',
		expiry: '2026-12-31',
		supplier: 'ABC Pharma',
		status: 'Normal',
	},
	{
		name: 'Cough Syrup',
		category: 'Syrup',
		quantity: 5,
		unit: 'bottle',
		mrp: 60,
		purchasePrice: 50,
		discount: 5,
		batchNo: 'C456',
		expiry: '2026-05-20',
		supplier: 'XYZ Meds',
		status: 'Low',
	},
];

const statusColor = {
	Normal: 'bg-green-100 text-green-700',
	Low: 'bg-yellow-100 text-yellow-700',
	Expiry: 'bg-red-100 text-red-700',
};

const Inventory = () => {
	const [medicines, setMedicines] = useState(
		initialMedicines.map(med => ({ ...med, history: [] }))
	);
		const [editIdx, setEditIdx] = useState(null);
		const [editForm, setEditForm] = useState({ quantity: '', expiry: '' });
		const [editError, setEditError] = useState('');
	const [search, setSearch] = useState('');
	const [filter, setFilter] = useState('all');
	const [sort, setSort] = useState('');
	const [showModal, setShowModal] = useState(false);
	const [form, setForm] = useState({
		name: '',
		category: '',
		quantity: '',
		unit: '',
		mrp: '',
		purchasePrice: '',
		discount: '',
		batchNo: '',
		expiry: '',
		supplier: '',
	});
	const [formError, setFormError] = useState('');

	// Derived filtered/sorted data
	let filtered = medicines.filter(med =>
		med.name.toLowerCase().includes(search.toLowerCase())
	);
	if (filter === 'low') filtered = filtered.filter(med => getStatus(med.quantity, med.expiry) === 'Low');
	if (filter === 'expiry') filtered = filtered.filter(med => getStatus(med.quantity, med.expiry) === 'Expiry');
	if (sort === 'expiry') filtered = [...filtered].sort((a, b) => new Date(a.expiry) - new Date(b.expiry));
	if (sort === 'quantity') filtered = [...filtered].sort((a, b) => a.quantity - b.quantity);

	// Inventory summary
	const totalMedicines = medicines.length;
	const lowStockCount = medicines.filter(med => getStatus(med.quantity, med.expiry) === 'Low').length;
	const expiringSoonCount = medicines.filter(med => getStatus(med.quantity, med.expiry) === 'Expiry').length;

	// Add medicine handler
	const handleAddMedicine = (e) => {
		e.preventDefault();
		if (!form.name || !form.category || !form.quantity || !form.unit || !form.mrp || !form.purchasePrice || !form.batchNo || !form.expiry || !form.supplier) {
			setFormError('Please fill all required fields');
			return;
		}
		setMedicines([
			...medicines,
			{
				...form,
				quantity: parseInt(form.quantity),
				mrp: parseFloat(form.mrp),
				purchasePrice: parseFloat(form.purchasePrice),
				discount: form.discount ? parseFloat(form.discount) : 0,
				history: [{
					type: 'Purchase',
					quantity: parseInt(form.quantity),
					date: new Date().toISOString(),
					note: 'Initial stock',
				}],
			},
		]);
		setShowModal(false);
		setForm({ name: '', category: '', quantity: '', unit: '', mrp: '', purchasePrice: '', discount: '', batchNo: '', expiry: '', supplier: '' });
		setFormError('');
	};

	// Edit/Update stock handler
	const openEditModal = (idx) => {
		setEditIdx(idx);
		setEditForm({ quantity: medicines[idx].quantity, expiry: medicines[idx].expiry });
		setEditError('');
	};

	const handleEditMedicine = (e) => {
		e.preventDefault();
		if (editForm.quantity === '' || editForm.expiry === '') {
			setEditError('Please fill all fields');
			return;
		}
		setMedicines(meds => meds.map((med, idx) => {
			if (idx !== editIdx) return med;
			const oldQty = med.quantity;
			const newQty = parseInt(editForm.quantity);
			let movementType = 'Update';
			let qtyChange = newQty - oldQty;
			if (qtyChange > 0) movementType = 'Add Stock';
			if (qtyChange < 0) movementType = 'Reduce Stock';
			const newHistory = [
				...med.history,
				{
					type: movementType,
					quantity: qtyChange,
					date: new Date().toISOString(),
					note: movementType + (qtyChange !== 0 ? ` (${qtyChange > 0 ? '+' : ''}${qtyChange})` : ''),
				},
				med.expiry !== editForm.expiry ? {
					type: 'Update Expiry',
					quantity: 0,
					date: new Date().toISOString(),
					note: `Expiry changed to ${editForm.expiry}`,
				} : null,
			].filter(Boolean);
			return {
				...med,
				quantity: newQty,
				expiry: editForm.expiry,
				history: newHistory,
			};
		}));
		setEditIdx(null);
		setEditForm({ quantity: '', expiry: '' });
		setEditError('');
	};

	return (
		<div className="p-4 md:p-8">
			{/* Inventory Heading */}
			<h1 className="text-2xl font-bold text-gray-800 mb-4">Inventory</h1>

			{/* Inventory Summary */}
			<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
				<div className="bg-white rounded-lg shadow p-4 flex flex-col items-center">
					<span className="text-2xl font-bold text-indigo-600">{totalMedicines}</span>
					<span className="text-gray-600 mt-1">Total Medicines</span>
				</div>
				<div className="bg-white rounded-lg shadow p-4 flex flex-col items-center">
					<span className="text-2xl font-bold text-red-500">{lowStockCount}</span>
					<span className="text-gray-600 mt-1">Low Stock</span>
				</div>
				<div className="bg-white rounded-lg shadow p-4 flex flex-col items-center">
					<span className="text-2xl font-bold text-orange-500">{expiringSoonCount}</span>
					<span className="text-gray-600 mt-1">Expiring Soon</span>
				</div>
			</div>

			{/* Search, Filter, Sort, Add Button Row */}
			<div className="flex flex-col md:flex-row md:items-center mb-6 gap-4">
				<div className="flex flex-1 flex-col md:flex-row gap-4 items-stretch md:items-center">
					<input
						type="text"
						placeholder="Search by medicine name..."
						value={search}
						onChange={e => setSearch(e.target.value)}
						className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full md:w-1/3"
					/>
					<select value={filter} onChange={e => setFilter(e.target.value)} className="px-4 py-2 border rounded-lg">
						<option value="all">All Medicines</option>
						<option value="low">Low Stock</option>
						<option value="expiry">Expiry Near</option>
					</select>
					<select value={sort} onChange={e => setSort(e.target.value)} className="px-4 py-2 border rounded-lg">
						<option value="">Sort By</option>
						<option value="expiry">Expiry Date</option>
						<option value="quantity">Quantity</option>
					</select>
					<div className="flex-1 flex justify-end">
						<button
							onClick={() => setShowModal(true)}
							className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-lg shadow transition whitespace-nowrap"
						>
							+ Add Medicine
						</button>
					</div>
				</div>
			</div>

			{/* Inventory Table */}
			<div className="overflow-x-auto rounded-lg shadow bg-white">
				<table className="min-w-full divide-y divide-gray-200">
					<thead className="bg-[#f6fafd]">
						<tr>
							<th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Medicine Name</th>
							<th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Batch No</th>
							<th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Expiry Date</th>
							<th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Quantity</th>
							<th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">MRP</th>
							<th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Purchase Price</th>
							<th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Supplier</th>
							<th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
							<th className="px-4 py-3"></th>
						</tr>
					</thead>
					<tbody className="bg-white divide-y divide-gray-100">
						{filtered.length === 0 ? (
							<tr>
								<td colSpan={9} className="text-center py-8 text-gray-400">No medicines found.</td>
							</tr>
						) : (
							filtered.map((med, idx) => {
								const status = getStatus(med.quantity, med.expiry);
								return (
									<tr key={idx} className={
										status === 'Low' ? 'bg-red-50' : status === 'Expiry' ? 'bg-orange-50' : 'hover:bg-[#f6fafd]'}>
										<td className="px-4 py-3 font-medium text-gray-800">{med.name}</td>
										<td className="px-4 py-3">{med.batchNo}</td>
										<td className="px-4 py-3">{med.expiry}</td>
										<td className="px-4 py-3">{med.quantity} {med.unit}</td>
										<td className="px-4 py-3">₹{med.mrp}</td>
										<td className="px-4 py-3">₹{med.purchasePrice}</td>
										<td className="px-4 py-3">{med.supplier}</td>
										<td className="px-4 py-3">
											<span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColor[status]}`}>{status}</span>
										</td>
										<td className="px-4 py-3">
											<button
												className="text-indigo-600 hover:text-indigo-900 font-semibold text-sm"
												onClick={() => openEditModal(idx)}
											>Edit</button>
										</td>
									</tr>
								);
							})
						)}
					</tbody>
				</table>
			</div>

			{/* Add Medicine Modal */}
			{showModal && (
				<div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-transparent">
					<div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-lg relative">
						<button onClick={() => setShowModal(false)} className="absolute top-3 right-3 text-gray-400 hover:text-red-500 text-xl">&times;</button>
						<h2 className="text-xl font-bold mb-4 text-gray-800">Add Medicine</h2>
						{formError && <div className="mb-3 text-red-500 text-sm">{formError}</div>}
						<form onSubmit={handleAddMedicine} className="space-y-4">
							{/* ...existing form fields... */}
							<div className="flex gap-4">
								<div className="flex-1">
									<label className="block text-sm font-medium mb-1">Medicine Name *</label>
									<input type="text" className="w-full border rounded px-3 py-2" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
								</div>
								<div className="flex-1">
									<label className="block text-sm font-medium mb-1">Category *</label>
									<input type="text" className="w-full border rounded px-3 py-2" value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} placeholder="Tablet, Syrup, etc." />
								</div>
							</div>
							<div className="flex gap-4">
								<div className="flex-1">
									<label className="block text-sm font-medium mb-1">Quantity *</label>
									<input type="number" className="w-full border rounded px-3 py-2" value={form.quantity} onChange={e => setForm(f => ({ ...f, quantity: e.target.value }))} />
								</div>
								<div className="flex-1">
									<label className="block text-sm font-medium mb-1">Unit *</label>
									<input type="text" className="w-full border rounded px-3 py-2" value={form.unit} onChange={e => setForm(f => ({ ...f, unit: e.target.value }))} placeholder="strip, bottle, piece" />
								</div>
							</div>
							<div className="flex gap-4">
								<div className="flex-1">
									<label className="block text-sm font-medium mb-1">MRP *</label>
									<input type="number" className="w-full border rounded px-3 py-2" value={form.mrp} onChange={e => setForm(f => ({ ...f, mrp: e.target.value }))} />
								</div>
								<div className="flex-1">
									<label className="block text-sm font-medium mb-1">Purchase Price *</label>
									<input type="number" className="w-full border rounded px-3 py-2" value={form.purchasePrice} onChange={e => setForm(f => ({ ...f, purchasePrice: e.target.value }))} />
								</div>
								<div className="flex-1">
									<label className="block text-sm font-medium mb-1">Discount</label>
									<input type="number" className="w-full border rounded px-3 py-2" value={form.discount} onChange={e => setForm(f => ({ ...f, discount: e.target.value }))} />
								</div>
							</div>
							<div className="flex gap-4">
								<div className="flex-1">
									<label className="block text-sm font-medium mb-1">Batch Number *</label>
									<input type="text" className="w-full border rounded px-3 py-2" value={form.batchNo} onChange={e => setForm(f => ({ ...f, batchNo: e.target.value }))} />
								</div>
								<div className="flex-1">
									<label className="block text-sm font-medium mb-1">Expiry Date *</label>
									<input type="date" className="w-full border rounded px-3 py-2" value={form.expiry} onChange={e => setForm(f => ({ ...f, expiry: e.target.value }))} />
								</div>
							</div>
							<div>
								<label className="block text-sm font-medium mb-1">Supplier Name *</label>
								<input type="text" className="w-full border rounded px-3 py-2" value={form.supplier} onChange={e => setForm(f => ({ ...f, supplier: e.target.value }))} />
							</div>
							<button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg mt-2">Add Medicine</button>
						</form>
					</div>
				</div>
			)}

			{/* Edit/Update Stock Modal */}
			{editIdx !== null && (
				<div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-transparent">
					<div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md relative">
						<button onClick={() => setEditIdx(null)} className="absolute top-3 right-3 text-gray-400 hover:text-red-500 text-xl">&times;</button>
						<h2 className="text-xl font-bold mb-4 text-gray-800">Edit/Update Stock</h2>
						{editError && <div className="mb-3 text-red-500 text-sm">{editError}</div>}
						<form onSubmit={handleEditMedicine} className="space-y-4">
							<div>
								<label className="block text-sm font-medium mb-1">Quantity</label>
								<input type="number" className="w-full border rounded px-3 py-2" value={editForm.quantity} onChange={e => setEditForm(f => ({ ...f, quantity: e.target.value }))} />
							</div>
							<div>
								<label className="block text-sm font-medium mb-1">Expiry Date</label>
								<input type="date" className="w-full border rounded px-3 py-2" value={editForm.expiry} onChange={e => setEditForm(f => ({ ...f, expiry: e.target.value }))} />
							</div>
							<button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg mt-2">Update</button>
						</form>
						{/* Stock Movement History */}
						<div className="mt-6">
							<h3 className="font-semibold mb-2 text-gray-700">Stock Movement History</h3>
							<ul className="text-xs text-gray-600 max-h-32 overflow-y-auto">
								{medicines[editIdx]?.history?.length === 0 ? (
									<li className="text-gray-400">No history yet.</li>
								) : (
									medicines[editIdx]?.history?.slice().reverse().map((h, i) => (
										<li key={i} className="mb-1">
											<span className="font-semibold">{h.type}</span> — {h.note} <span className="text-gray-400">({new Date(h.date).toLocaleString()})</span>
										</li>
									))
								)}
							</ul>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default Inventory;
