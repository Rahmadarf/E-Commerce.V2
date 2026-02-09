import React from 'react';

const AddProductModal = ({ onCancel, isOpen, onConfirm }) => {

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 backdrop-blur-sm bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-lg border border-blue-100 w-full max-w-md max-h-[90vh] overflow-y-auto">

                {/* Header */}
                <div className="p-5 border-b border-blue-100 flex justify-between items-center">
                    <h2 className="text-xl font-bold text-gray-900">Add New Product</h2>
                    <button onClick={onCancel} className="text-gray-500 hover:text-gray-700 cursor-pointer">
                        ✕
                    </button>
                </div>

                {/* Form */}
                <div className="p-5 space-y-4">

                    {/* Product Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Nama Produk*
                        </label>
                        <input
                            type="text"
                            placeholder="Enter product name"
                            className="w-full px-3 py-2 border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Price */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Harga (Rp) *
                        </label>
                        <input
                            type="number"
                            placeholder="0.00"
                            className="w-full px-3 py-2 border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Diskon */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Diskon (%)
                        </label>
                        <input
                            type="number"
                            placeholder="0.00"
                            className="w-full px-3 py-2 border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Quantity */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Stok *
                        </label>
                        <input
                            type="number"
                            placeholder="0"
                            className="w-full px-3 py-2 border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Category */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Kategori *
                        </label>
                        <select
                            className="w-full px-3 py-2 border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option>Select category</option>
                            <option>Clothing</option>
                            <option>Accessories</option>
                            <option>Electronics</option>
                        </select>
                    </div>

                    {/* Image URL */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Link Gambar (Optional)
                        </label>
                        <input
                            type="url"
                            placeholder="https://example.com/image.jpg"
                            className="w-full px-3 py-2 border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <p className="mt-1 text-xs text-gray-500">
                            Leave blank to use placeholder image
                        </p>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 pt-4">
                        <button
                            className="flex-1 py-2 px-4 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg font-medium"
                            onClick={onCancel}
                        >
                            Cancel
                        </button>
                        <button
                            className="flex-1 py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium"
                        >
                            Add Product
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default AddProductModal;
