// AdminPanel.js
import React, { useState } from 'react';
import { useUser, useClerk } from '@clerk/clerk-react';
import LogoutAlert from '../../component/LogOutAlert';
import AdminHeader from './component/AdminHeader';
import { useNavigate } from 'react-router-dom';

const AdminPanel = () => {
    const [activeTab, setActiveTab] = useState('products');
    const [products, setProducts] = useState([
        { id: 1, name: 'Wireless Headphones', price: 129.99, category: 'Electronics', stock: 45 },
        { id: 2, name: 'Cotton T-Shirt', price: 19.99, category: 'Clothing', stock: 120 },
        { id: 3, name: 'Coffee Maker', price: 89.99, category: 'Home & Kitchen', stock: 30 }
    ]);

    const [categories] = useState(['Electronics', 'Clothing', 'Home & Kitchen', 'Beauty', 'Sports']);
    const [newProduct, setNewProduct] = useState({
        name: '',
        price: '',
        category: '',
        stock: ''
    });

    const [message, setMessage] = useState({ type: '', text: '' });
    const [showLogoutAlert, setShowLogoutAlert] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        signOut.signOut(() => navigate('/login'));
        setShowLogoutAlert(false);
    }

    const { user } = useUser();
    const signOut = useClerk();

    // Add new product
    const handleAddProduct = (e) => {
        e.preventDefault();
        if (!newProduct.name || !newProduct.price || !newProduct.category || !newProduct.stock) {
            setMessage({ type: 'error', text: 'Please fill all fields' });
            return;
        }

        const product = {
            id: products.length + 1,
            name: newProduct.name,
            price: parseFloat(newProduct.price),
            category: newProduct.category,
            stock: parseInt(newProduct.stock)
        };

        setProducts([...products, product]);
        setNewProduct({ name: '', price: '', category: '', stock: '' });
        setMessage({ type: 'success', text: 'Product added successfully!' });
        setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    };

    // Delete product
    const handleDeleteProduct = (id) => {
        setProducts(products.filter(product => product.id !== id));
        setMessage({ type: 'success', text: 'Product deleted successfully!' });
        setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    };

    // Update product stock
    const handleUpdateStock = (id, newStock) => {
        setProducts(products.map(product =>
            product.id === id ? { ...product, stock: parseInt(newStock) } : product
        ));
        setMessage({ type: 'success', text: 'Stock updated successfully!' });
        setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <AdminHeader />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Navigation Tabs */}
                <div className="border-b border-blue-100 mb-8">
                    <nav className="-mb-px flex space-x-8">
                        {['products', 'add-product', 'account'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`py-2 px-1 border-b-2 font-medium text-sm ${activeTab === tab
                                    ? 'border-blue-600 text-blue-700'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }`}
                            >
                                {tab === 'products' && 'All Products'}
                                {tab === 'add-product' && 'Add Product'}
                                {tab === 'account' && 'Account Settings'}
                            </button>
                        ))}
                    </nav>
                </div>

                {/* Messages */}
                {message.text && (
                    <div className={`mb-6 p-4 rounded-lg ${message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
                        }`}>
                        {message.text}
                    </div>
                )}

                {/* Tab Content */}
                <div className="bg-white rounded-xl shadow-sm border border-blue-100 overflow-hidden">
                    {/* Products List */}
                    {activeTab === 'products' && (
                        <div className="p-6">
                            <h2 className="text-xl font-bold text-gray-900 mb-6">All Products</h2>
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-blue-100">
                                    <thead>
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-blue-100">
                                        {products.map((product) => (
                                            <tr key={product.id} className="hover:bg-blue-50">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="font-medium text-gray-900">{product.name}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-gray-700">{product.category}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-gray-700">${product.price.toFixed(2)}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <input
                                                        type="number"
                                                        min="0"
                                                        value={product.stock}
                                                        onChange={(e) => handleUpdateStock(product.id, e.target.value)}
                                                        className="w-20 px-2 py-1 border border-blue-200 rounded text-center"
                                                    />
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                    <button
                                                        onClick={() => handleDeleteProduct(product.id)}
                                                        className="text-red-600 hover:text-red-900 font-medium"
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* Add Product Form */}
                    {activeTab === 'add-product' && (
                        <div className="p-6">
                            <h2 className="text-xl font-bold text-gray-900 mb-6">Add New Product</h2>
                            <form onSubmit={handleAddProduct} className="space-y-6 max-w-2xl">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Product Name *
                                    </label>
                                    <input
                                        type="text"
                                        value={newProduct.name}
                                        onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                                        className="w-full px-3 py-2 border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Price ($) *
                                        </label>
                                        <input
                                            type="number"
                                            step="0.01"
                                            min="0"
                                            value={newProduct.price}
                                            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                                            className="w-full px-3 py-2 border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Stock Quantity *
                                        </label>
                                        <input
                                            type="number"
                                            min="0"
                                            value={newProduct.stock}
                                            onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                                            className="w-full px-3 py-2 border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Category *
                                    </label>
                                    <select
                                        value={newProduct.category}
                                        onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                                        className="w-full px-3 py-2 border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                    >
                                        <option value="">Select a category</option>
                                        {categories.map(category => (
                                            <option key={category} value={category}>{category}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="pt-4">
                                    <button
                                        type="submit"
                                        className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                                    >
                                        Add Product
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}

                    {/* Account Settings */}
                    {activeTab === 'account' && (
                        <div className="p-6">
                            <h2 className="text-xl font-bold text-gray-900 mb-6">Admin Account Settings</h2>

                            <div className="space-y-6 max-w-2xl">
                                <div>
                                    <h3 className="text-lg font-medium text-gray-900 mb-3">Profile Information</h3>
                                    <div className="bg-blue-50 p-4 rounded-lg">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div>
                                                <span className="text-sm text-gray-500">Full Name</span>
                                                <p className="font-medium">Admin User</p>
                                            </div>
                                            <div>
                                                <span className="text-sm text-gray-500">Email</span>
                                                <p className="font-medium">admin@example.com</p>
                                            </div>
                                            <div>
                                                <span className="text-sm text-gray-500">Role</span>
                                                <p className="font-medium">Administrator</p>
                                            </div>
                                            <div>
                                                <span className="text-sm text-gray-500">Last Login</span>
                                                <p className="font-medium">Today, 10:30 AM</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-lg font-medium text-gray-900 mb-3">Security</h3>
                                    <div className="space-y-4">
                                        <button className="w-full text-left p-4 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors">
                                            <div className="font-medium text-gray-900">Change Password</div>
                                            <p className="text-sm text-gray-600 mt-1">Update your account password</p>
                                        </button>

                                        <button className="w-full text-left p-4 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors">
                                            <div className="font-medium text-gray-900">Two-Factor Authentication</div>
                                            <p className="text-sm text-gray-600 mt-1">Enable extra security for your account</p>
                                        </button>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-lg font-medium text-gray-900 mb-3">Danger Zone</h3>
                                    <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                                        <h4 className="font-medium text-red-800 mb-2">Log out</h4>
                                        <p className="text-sm text-red-700 mb-3">
                                            Keluar secara permanen dari akun admin.
                                        </p>
                                        <button onClick={() => setShowLogoutAlert(true)} className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors">
                                            Log Out
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <LogoutAlert isOpen={showLogoutAlert} onConfirm={() => handleLogout()} onCancel={() => setShowLogoutAlert(false)} />

        </div>
    );
};

export default AdminPanel;