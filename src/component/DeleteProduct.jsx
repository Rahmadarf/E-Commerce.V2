// LogoutAlert.js
import React from 'react';
import { Trash } from 'lucide-react';
import { useState, useContext } from 'react';
import axios from 'axios';
import { NotfyContext } from '../context/Notfy';
import { CartContext } from '../context/CartContext';

const LogoutAlert = ({ isOpen, onSuccess, onCancel, productId }) => {
    if (!isOpen) return null;

    const [loading, setLoading] = useState(false);
    const { showNotification } = useContext(NotfyContext);
    const { fetchCart } = useContext(CartContext);

    const handleDelete = async () => {
        setLoading(true);

        const fd = new FormData();
        fd.append('id', productId);
        
        try {
            await axios.post('https://rahmadarifin.my.id/api/produk/delete.php', 
                fd);

                fetchCart();
                showNotification("Produk berhasil dihapus", "success");
                onSuccess?.();
                onCancel();
        } catch (error) {
            showNotification("Gagal menghapus produk", "error");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 backdrop-blur-sm bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-lg border border-red-100 max-w-md w-full overflow-hidden">
                {/* Header */}
                <div className="p-5 border-b border-red-100">
                    <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center mr-3">
                            <Trash className="h-6 w-6 text-red-700" />
                        </div>
                        <h2 className="text-lg font-bold text-gray-900">Konfirmasi Hapus Produk</h2>
                    </div>
                </div>

                {/* Content */}
                <div className="p-5">
                    <p className="text-gray-600">
                        Apakah Anda yakin ingin menghapus produk ini? Tindakan ini tidak dapat dibatalkan.
                    </p>
                </div>

                {/* Actions */}
                <div className="bg-blue-50 px-5 py-4 flex justify-end space-x-3">
                    <button
                        onClick={onCancel}
                        className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg font-medium transition-colors"
                    >
                        Batal
                    </button>
                    <button
                        onClick={handleDelete}
                        disabled={loading}
                        className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50"
                    >
                        {loading ? 'Menghapus...' : 'Hapus'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LogoutAlert;