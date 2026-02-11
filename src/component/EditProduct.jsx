// EditProduct.js
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { NotfyContext } from "../context/Notfy";

const EditProduct = ({ isOpen, onClose, productId, onSuccess }) => {
    const [form, setForm] = useState({
        id: "",
        product_name: "",
        price: "",
        discount: "",
        stock: "",
        categorie: "",
        product_image: "",
    });


    const [gambarBaru, setGambarBaru] = useState(null);
    const [loading, setLoading] = useState(false);
    const { showNotification } = useContext(NotfyContext);

    // ambil data produk
    useEffect(() => {
        if (!productId || !isOpen) return;

        axios
            .get(`https://rahmadarifin.my.id/api/produk/detail.php?id=${productId}`)
            .then((res) => {
                const p = res.data.data;

                setForm({
                    id: p.id,
                    product_name: p.product_name,
                    price: p.price,
                    discount: p.discount,
                    stock: p.stock,
                    categorie: p.categorie,
                    product_image: p.product_image,
                });

                setGambarBaru(null);
            });
    }, [productId, isOpen]);


    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleImage = (file) => {
        if (!file || !file.type.startsWith('image/')) return;
        setGambarBaru(file);
    };

    const handleSubmit = async () => {
        setLoading(true);

        const fd = new FormData();
        Object.keys(form).forEach((key) => fd.append(key, form[key]));
        if (gambarBaru) fd.append("gambar_baru", gambarBaru);

        try {
            await axios.post(
                "https://rahmadarifin.my.id/api/produk/update.php",
                fd,
                { headers: { "Content-Type": "multipart/form-data" } }
            );

            showNotification("Produk berhasil diupdate", "success");
            onSuccess?.(); // refresh data
            onClose();
        } catch (err) {
            showNotification("Gagal mengupdate produk", "error");
            console.error("ERROR AXIOS:", err);
            console.log("RESPONSE:", err.response);

        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 backdrop-blur-sm bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white w-full max-w-md rounded-xl shadow-lg border border-blue-100 overflow-hidden">
                {/* Header */}
                <div className="flex justify-between items-center p-5 border-b border-blue-100">
                    <h2 className="font-bold text-lg text-gray-900">Edit Produk</h2>
                    <button
                        onClick={onClose}
                        className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                        aria-label="Close modal"
                    >
                        <span className="text-gray-600 text-lg">×</span>
                    </button>
                </div>

                {/* Body */}
                <div className="p-5 space-y-5">
                    {/* Product Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Nama Produk *
                        </label>
                        <input
                            name="product_name"
                            value={form.product_name}
                            onChange={handleChange}
                            placeholder="Masukkan nama produk"
                            className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    {/* Price */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Harga *
                        </label>
                        <input
                            name="price"
                            type="number"
                            value={form.price}
                            onChange={handleChange}
                            placeholder="0.00"
                            className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    {/* Discount */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Diskon (%)
                        </label>
                        <input
                            name="discount"
                            type="number"
                            min="0"
                            max="100"
                            value={form.discount}
                            onChange={handleChange}
                            placeholder="0"
                            className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    {/* Stock */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Stok *
                        </label>
                        <input
                            name="stock"
                            type="number"
                            min="0"
                            value={form.stock}
                            onChange={handleChange}
                            placeholder="0"
                            className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    {/* Category */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Kategori *
                        </label>
                        <select
                            name="categorie"
                            value={form.categorie}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
                        >
                            <option value="">Pilih kategori</option>
                            <option value="clothing">Clothing</option>
                            <option value="accessories">Accessories</option>
                            <option value="electronics">Electronics</option>
                        </select>
                    </div>

                    {/* Image Upload */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Gambar Produk
                        </label>

                        {/* Current Image Preview */}
                        {(form.product_image && !gambarBaru) && (
                            <div className="mb-3">
                                <img
                                    src={`https://rahmadarifin.my.id/uploads/image/${form.product_image}`}
                                    alt="Gambar saat ini"
                                    className="w-24 h-24 object-cover rounded-lg border border-blue-100"
                                />
                                <p className="text-xs text-gray-500 mt-1">Gambar saat ini</p>
                            </div>
                        )}

                        {/* New Image Preview */}
                        {gambarBaru && (
                            <div className="mb-3">
                                <img
                                    src={URL.createObjectURL(gambarBaru)}
                                    alt="Gambar baru"
                                    className="w-24 h-24 object-cover rounded-lg border border-blue-100"
                                />
                                <p className="text-xs text-gray-500 mt-1">Pratinjau gambar baru</p>
                            </div>
                        )}

                        {/* File Input */}
                        <div className="border-2 border-dashed border-blue-200 rounded-lg p-4 text-center cursor-pointer hover:bg-blue-50 transition-colors" onDragOver={e => e.preventDefault()}
                            onDrop={e => {
                                e.preventDefault();
                                handleImage(e.dataTransfer.files[0]);
                            }}>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => setGambarBaru(e.target.files[0])}
                                className="hidden"
                                id="gambar-upload"
                            />
                            <label htmlFor="gambar-upload" className="cursor-pointer">
                                <div className="flex flex-col items-center">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-8 w-8 text-blue-400 mb-2"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    <span className="text-blue-600 font-medium">Pilih gambar baru</span>
                                    <p className="text-xs text-gray-500 mt-1">PNG, JPG, GIF hingga 10MB</p>
                                </div>
                            </label>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="p-5 flex gap-3 border-t border-blue-100 bg-gray-50">
                    <button
                        onClick={onClose}
                        className="flex-1 py-2.5 px-4 bg-white border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-100 transition-colors"
                    >
                        Batal
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className={`flex-1 py-2.5 px-4 rounded-lg font-medium transition-colors ${loading
                            ? 'bg-blue-400 cursor-not-allowed'
                            : 'bg-blue-600 hover:bg-blue-700 text-white'
                            }`}
                    >
                        {loading ? "Menyimpan..." : "Simpan Perubahan"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditProduct;