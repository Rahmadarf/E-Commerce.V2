// AddProductModal.js
import React, { useState, useContext } from 'react';
import axios from 'axios';
import { NotfyContext } from '../context/Notfy';

const AddProductModal = ({ onCancel, isOpen, onAdd }) => {
    const { showNotification } = useContext(NotfyContext);

    const [form, setForm] = useState({
        nama: '',
        harga: '',
        diskon: '',
        stok: '',
        kategori: ''
    });

    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);

    const handleImage = (file) => {
        if (!file || !file.type.startsWith('image/')) return;
        setImage(file);
        setPreview(URL.createObjectURL(file));
    };

    const resetForm = () => {
        setForm({
            nama: '',
            harga: '',
            diskon: '',
            stok: '',
            kategori: ''
        });
        setImage(null);
        setPreview(null);
    }

    const handleAddProduct = async () => {
        if (!form.nama || !form.harga || !form.stok || !form.kategori) {
            showNotification("Lengkapi data wajib!", "error");
            return;
        }

        const formData = new FormData();
        Object.keys(form).forEach(key => {
            formData.append(key, form[key]);
        });
        formData.append('image', image);

        try {
            await axios.post(
                'https://rahmadarifin.my.id/api/produk/add.php',
                formData
            );

            showNotification("Product added successfully!", "success");
            onAdd?.();
            resetForm();
            onCancel();
        } catch (error) {
            showNotification("Gagal menambahkan produk", "error");
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 backdrop-blur-sm bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-lg border border-blue-100 w-full max-w-md overflow-hidden">

                {/* Header */}
                <div className="p-5 border-b border-blue-100 flex justify-between items-center">
                    <h2 className="text-xl font-bold text-gray-900">Add New Product</h2>
                    <button
                        onClick={() => {
                            resetForm();
                            onCancel();
                        }}
                        className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                        aria-label="Close modal"
                    >
                        <span className="text-gray-600 text-lg">×</span>
                    </button>
                </div>

                {/* Form */}
                <div className="p-5 space-y-5">
                    {/* Product Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Nama Produk *
                        </label>
                        <input
                            placeholder="Enter product name"
                            className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            onChange={e => setForm({ ...form, nama: e.target.value })}
                            value={form.nama}
                        />
                    </div>

                    {/* Price */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Harga *
                        </label>
                        <input
                            type="number"
                            placeholder="0.00"
                            className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            onChange={e => setForm({ ...form, harga: e.target.value })}
                            value={form.harga}
                        />
                    </div>

                    {/* Discount */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Diskon (%)
                        </label>
                        <input
                            type="number"
                            min="0"
                            max="100"
                            placeholder="0"
                            className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            onChange={e => setForm({ ...form, diskon: e.target.value })}
                            value={form.diskon}
                        />
                    </div>

                    {/* Stock */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Stok *
                        </label>
                        <input
                            type="number"
                            min="0"
                            placeholder="0"
                            className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            onChange={e => setForm({ ...form, stok: e.target.value })}
                            value={form.stok}
                        />
                    </div>

                    {/* Category */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Kategori *
                        </label>
                        <select
                            className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
                            onChange={e => setForm({ ...form, kategori: e.target.value })}
                            value={form.kategori}
                        >
                            <option value="" disabled>Pilih Kategori</option>
                            <option value={'clothing'}>Clothing</option>
                            <option value={'accessories'}>Accessories</option>
                            <option value={'electronics'}>Electronics</option>
                            <option value={'home'}>Rumah & Dapur</option>
                            <option value={'beauty'}>Kecantikan</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                            </svg>
                        </div>
                    </div>

                    {/* Upload Image */}
                    <div className="mt-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Product Image
                        </label>
                        <div
                            className="border-2 border-dashed border-blue-200 rounded-xl p-6 text-center cursor-pointer transition-colors hover:border-blue-300 hover:bg-blue-50"
                            onDragOver={e => e.preventDefault()}
                            onDrop={e => {
                                e.preventDefault();
                                handleImage(e.dataTransfer.files[0]);
                            }}
                        >
                            <input
                                type="file"
                                hidden
                                id="image"
                                accept="image/*"
                                onChange={e => handleImage(e.target.files[0])}
                            />
                            <label htmlFor="image" className="cursor-pointer">
                                <div className="flex flex-col items-center justify-center">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-12 w-12 text-blue-400 mb-3"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    <p className="text-gray-600">
                                        <span className="text-blue-600 font-medium">Click to upload</span> or drag and drop
                                    </p>
                                    <p className="text-xs text-gray-500 mt-1">PNG, JPG, GIF up to 10MB</p>
                                </div>
                            </label>

                            {preview && (
                                <div className="mt-4">
                                    <img
                                        src={preview}
                                        alt="Preview"
                                        className="mx-auto rounded-lg shadow-sm border border-blue-100 max-h-40 object-contain"
                                    />
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 pt-2">
                        <button
                            onClick={() => {
                                resetForm();
                                onCancel();
                            }}
                            className="flex-1 py-2.5 px-4 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg font-medium transition-colors"
                        >
                            Batal
                        </button>
                        <button
                            onClick={handleAddProduct}
                            className="flex-1 py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                        >
                            Tambah Produk
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddProductModal;