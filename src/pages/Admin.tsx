import React, { useState, useEffect } from 'react';
import { fetchProducts, addProduct, updateProduct, deleteProduct } from '../api';

// Fetch orders from backend
async function fetchOrders() {
  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
  const res = await fetch(`${apiUrl}/api/orders`);
  if (!res.ok) throw new Error('Failed to fetch orders');
  return res.json();
}

// Fetch appointments from backend
async function fetchAppointments() {
  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
  const res = await fetch(`${apiUrl}/api/appointments`);
  if (!res.ok) throw new Error('Failed to fetch appointments');
  return res.json();
}

// Update appointment status
async function updateAppointmentStatus(id: number, status: string) {
  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
  const token = localStorage.getItem('token');
  const res = await fetch(`${apiUrl}/api/appointments/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ status }),
  });
  if (!res.ok) throw new Error('Failed to update appointment');
  return res.json();
}

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
};

const Admin = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [activeTab, setActiveTab] = useState<'products' | 'orders' | 'customers' | 'appointments'>('products');
  const [orders, setOrders] = useState<any[]>([]);
  const [appointments, setAppointments] = useState<any[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    image: '',
    description: '',
  });

  useEffect(() => {
    fetchProducts().then(setProducts).catch(console.error);
  }, []);

  useEffect(() => {
    if (activeTab === 'orders') {
      fetchOrders().then(setOrders).catch(() => setOrders([]));
    }
    if (activeTab === 'appointments') {
      fetchAppointments().then(setAppointments).catch(() => setAppointments([]));
    }
  }, [activeTab]);

  const handleAddProduct = async () => {
    try {
      const product = await addProduct({
        name: newProduct.name,
        price: Number(newProduct.price),
        image: newProduct.image,
        description: newProduct.description,
      });
      setProducts((prev) => [...prev, product]);
      alert('✅ Product added successfully!');
      setShowAddForm(false);
      setNewProduct({ name: '', price: '', image: '', description: '' });
    } catch (err) {
      alert('Failed to add product');
    }
  };

  const handleDeleteProduct = async (id: number) => {
    if (confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(id);
        setProducts((prev) => prev.filter((p) => p.id !== id));
        alert('🗑️ Product deleted successfully!');
      } catch (err) {
        alert('Failed to delete product');
      }
    }
  };

  const handleEditProduct = async (id: number, updated: typeof newProduct) => {
    try {
      const product = await updateProduct(id, {
        name: updated.name,
        price: Number(updated.price),
        image: updated.image,
        description: updated.description,
      });
      setProducts((prev) => prev.map((p) => (p.id === id ? product : p)));
      alert('✏️ Product updated!');
    } catch (err) {
      alert('Failed to update product');
    }
  };

  return (
    <div className="py-12 px-4 min-h-[70vh] bg-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-80 h-80 bg-purple-200 opacity-20 blur-3xl rounded-tl-[5rem] rounded-br-[5rem]"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-pink-200 opacity-20 blur-3xl rounded-tr-[4rem] rounded-bl-[4rem]"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-8 text-center drop-shadow">
          Admin Dashboard
        </h2>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-pink-400 to-rose-600 rounded-3xl p-8 text-white shadow-2xl transform hover:scale-105 transition-all cursor-pointer">
            <div className="flex justify-between items-start mb-4">
              <div className="text-5xl">📦</div>
              <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-semibold">+12%</span>
            </div>
            <h3 className="text-3xl font-bold mb-2">{products.length}</h3>
            <p className="text-pink-100">Total Products</p>
          </div>
          <div className="bg-gradient-to-br from-purple-400 to-indigo-600 rounded-tl-[3rem] rounded-br-[3rem] p-8 text-white shadow-2xl transform hover:scale-105 transition-all cursor-pointer">
            <div className="flex justify-between items-start mb-4">
              <div className="text-5xl">🛒</div>
              <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-semibold">+8%</span>
            </div>
            <h3 className="text-3xl font-bold mb-2">{orders.length}</h3>
            <p className="text-purple-100">Orders Today</p>
          </div>
          <div className="bg-gradient-to-br from-blue-400 to-cyan-600 rounded-tr-[3rem] rounded-bl-[3rem] p-8 text-white shadow-2xl transform hover:scale-105 transition-all cursor-pointer">
            <div className="flex justify-between items-start mb-4">
              <div className="text-5xl">📅</div>
              <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-semibold">+15%</span>
            </div>
            <h3 className="text-3xl font-bold mb-2">{appointments.length}</h3>
            <p className="text-blue-100">Appointments</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setActiveTab('products')}
            className={`px-6 py-3 rounded-full font-bold transition-all ${
              activeTab === 'products'
                ? 'bg-purple-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-purple-50'
            }`}
          >
            📦 Products
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-6 py-3 rounded-full font-bold transition-all ${
              activeTab === 'orders'
                ? 'bg-purple-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-purple-50'
            }`}
          >
            🛒 Orders
          </button>
          <button
            onClick={() => setActiveTab('customers')}
            className={`px-6 py-3 rounded-full font-bold transition-all ${
              activeTab === 'customers'
                ? 'bg-purple-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-purple-50'
            }`}
          >
            👥 Customers
          </button>
          <button
            onClick={() => setActiveTab('appointments')}
            className={`px-6 py-3 rounded-full font-bold transition-all ${
              activeTab === 'appointments'
                ? 'bg-purple-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-purple-50'
            }`}
          >
            📅 Appointments
          </button>
        </div>

        {/* Products Tab */}
        {activeTab === 'products' && (
          <div className="bg-white rounded-3xl shadow-2xl p-8 border-2 border-purple-100">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900">Product Management</h3>
              <button
                onClick={() => setShowAddForm(!showAddForm)}
                className="bg-gradient-to-r from-purple-500 to-pink-600 text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:from-purple-600 hover:to-pink-700 transition-all transform hover:scale-105"
              >
                ➕ Add New Product
              </button>
            </div>

            {showAddForm && (
              <div className="bg-purple-50 rounded-2xl p-6 mb-6 border-2 border-purple-200">
                <h4 className="text-xl font-bold text-gray-900 mb-4">Add New Product</h4>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Product Name"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                    className="px-4 py-3 rounded-xl border-2 border-purple-200 focus:border-purple-400 focus:outline-none"
                  />
                  <input
                    type="number"
                    placeholder="Price"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                    className="px-4 py-3 rounded-xl border-2 border-purple-200 focus:border-purple-400 focus:outline-none"
                  />
                  <input
                    type="text"
                    placeholder="Image URL"
                    value={newProduct.image}
                    onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                    className="px-4 py-3 rounded-xl border-2 border-purple-200 focus:border-purple-400 focus:outline-none col-span-2"
                  />
                  <textarea
                    placeholder="Description"
                    value={newProduct.description}
                    onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                    className="px-4 py-3 rounded-xl border-2 border-purple-200 focus:border-purple-400 focus:outline-none col-span-2 h-24"
                  />
                </div>
                <div className="flex gap-3 mt-4">
                  <button
                    onClick={handleAddProduct}
                    className="bg-purple-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-purple-700 transition-all"
                  >
                    ✅ Save Product
                  </button>
                  <button
                    onClick={() => setShowAddForm(false)}
                    className="bg-gray-200 text-gray-700 px-6 py-2 rounded-full font-semibold hover:bg-gray-300 transition-all"
                  >
                    ❌ Cancel
                  </button>
                </div>
              </div>
            )}

            <div className="space-y-4">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center gap-6 p-4 bg-gray-50 rounded-2xl border-2 border-gray-200 hover:border-purple-300 transition-colors"
                >
                  <img src={product.image} alt={product.name} className="w-20 h-20 object-cover rounded-xl shadow" />
                  <div className="flex-1">
                    <h4 className="font-bold text-lg text-gray-900">{product.name}</h4>
                    <p className="text-gray-600 text-sm">{product.description}</p>
                    <p className="text-purple-600 font-bold mt-1">${product.price}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      className="bg-blue-500 text-white px-4 py-2 rounded-full font-semibold hover:bg-blue-600 transition-all"
                      onClick={() => {
                        const updated = window.prompt('Edit name,price,image,description (comma separated):', `${product.name},${product.price},${product.image},${product.description}`);
                        if (updated) {
                          const [name, price, image, description] = updated.split(',');
                          handleEditProduct(product.id, { name, price, image, description });
                        }
                      }}
                    >
                      ✏️ Edit
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(product.id)}
                      className="bg-red-500 text-white px-4 py-2 rounded-full font-semibold hover:bg-red-600 transition-all"
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <div className="bg-white rounded-3xl shadow-2xl p-8 border-2 border-purple-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Recent Orders</h3>
            <div className="space-y-4">
              {orders.length === 0 && <div className="text-gray-500">No orders found.</div>}
              {orders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-6 bg-gray-50 rounded-2xl border-2 border-gray-200">
                  <div>
                    <p className="font-bold text-lg">Order #{order.id}</p>
                    <p className="text-gray-600">Customer: {order.customer?.name || 'N/A'}</p>
                    <p className="text-sm text-gray-500">Placed: {order.date || 'N/A'}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-purple-600">${order.total}</p>
                    <span className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold mt-2">
                      ✅ Completed
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Customers Tab */}
        {activeTab === 'customers' && (
          <div className="bg-white rounded-3xl shadow-2xl p-8 border-2 border-purple-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Customer List</h3>
            <div className="space-y-4">
              {['Sarah Johnson', 'Michael Chen', 'Aisha Patel'].map((name, idx) => (
                <div key={idx} className="flex items-center gap-4 p-6 bg-gray-50 rounded-2xl border-2 border-gray-200">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                    {name[0]}
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-lg">{name}</p>
                    <p className="text-gray-600">customer{idx + 1}@email.com</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Total Orders</p>
                    <p className="text-2xl font-bold text-purple-600">{5 + idx * 3}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Appointments Tab */}
        {activeTab === 'appointments' && (
          <div className="bg-white rounded-3xl shadow-2xl p-8 border-2 border-purple-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Appointment Bookings</h3>
            <div className="space-y-4">
              {appointments.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                  <div className="text-6xl mb-4">📅</div>
                  <p className="text-lg">No appointments booked yet</p>
                </div>
              )}
              {appointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="p-6 bg-gray-50 rounded-2xl border-2 border-gray-200 hover:border-purple-300 transition-colors"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-bold text-xl text-gray-900">
                          {appointment.service}
                        </h4>
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-semibold ${
                            appointment.status === 'confirmed'
                              ? 'bg-green-100 text-green-700'
                              : appointment.status === 'cancelled'
                              ? 'bg-red-100 text-red-700'
                              : appointment.status === 'pending_payment'
                              ? 'bg-orange-100 text-orange-700'
                              : 'bg-yellow-100 text-yellow-700'
                          }`}
                        >
                          {appointment.status === 'pending_payment' && '💳 Awaiting Payment'}
                          {appointment.status === 'pending' && '⏳ Pending Confirmation'}
                          {appointment.status === 'confirmed' && '✅ Confirmed'}
                          {appointment.status === 'cancelled' && '❌ Cancelled'}
                          {appointment.status === 'completed' && '✨ Completed'}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                        <div>
                          <p className="font-semibold text-gray-700">📅 Date & Time</p>
                          <p>{new Date(appointment.date).toLocaleDateString()} at {appointment.time}</p>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-700">👤 Customer</p>
                          <p>{appointment.customerName}</p>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-700">📧 Email</p>
                          <p>{appointment.customerEmail}</p>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-700">📱 Phone</p>
                          <p>{appointment.customerPhone}</p>
                        </div>
                      </div>
                      {appointment.notes && (
                        <div className="mt-3 p-3 bg-purple-50 rounded-lg">
                          <p className="font-semibold text-gray-700 text-sm">📝 Notes:</p>
                          <p className="text-sm text-gray-600">{appointment.notes}</p>
                        </div>
                      )}
                      {appointment.depositPaid && (
                        <div className="mt-3 p-3 bg-green-50 rounded-lg">
                          <p className="font-semibold text-green-700 text-sm">
                            ✅ Deposit Paid: ${appointment.depositAmount?.toFixed(2) || '0.00'}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2 pt-4 border-t-2 border-gray-200">
                    {appointment.status !== 'pending_payment' && (
                      <>
                    <button
                      onClick={async () => {
                        try {
                          await updateAppointmentStatus(appointment.id, 'confirmed');
                          const updated = await fetchAppointments();
                          setAppointments(updated);
                          alert('✅ Appointment confirmed!');
                        } catch {
                          alert('Failed to update appointment');
                        }
                      }}
                      className="px-4 py-2 bg-green-500 text-white rounded-full font-semibold hover:bg-green-600 transition-all text-sm"
                    >
                      ✅ Confirm
                    </button>
                    <button
                      onClick={async () => {
                        try {
                          await updateAppointmentStatus(appointment.id, 'completed');
                          const updated = await fetchAppointments();
                          setAppointments(updated);
                          alert('✨ Marked as completed!');
                        } catch {
                          alert('Failed to update appointment');
                        }
                      }}
                      className="px-4 py-2 bg-blue-500 text-white rounded-full font-semibold hover:bg-blue-600 transition-all text-sm"
                    >
                      ✨ Complete
                    </button>
                    <button
                      onClick={async () => {
                        try {
                          await updateAppointmentStatus(appointment.id, 'cancelled');
                          const updated = await fetchAppointments();
                          setAppointments(updated);
                          alert('❌ Appointment cancelled');
                        } catch {
                          alert('Failed to update appointment');
                        }
                      }}
                      className="px-4 py-2 bg-red-500 text-white rounded-full font-semibold hover:bg-red-600 transition-all text-sm"
                    >
                      ❌ Cancel
                    </button>
                    </>
                    )}
                    {appointment.status === 'pending_payment' && (
                      <p className="text-sm text-orange-600 font-semibold">
                        ⚠️ Waiting for customer payment...
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
