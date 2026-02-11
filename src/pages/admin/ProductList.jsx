// AdminProductList.js
import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Delete, Edit, Plus } from 'lucide-react';
import Tooltip from '@mui/material/Tooltip';
import AddProductModal from '../../component/AddProduct';
import DeleteProductModal from '../../component/DeleteProduct';
import EditProduct from '../../component/EditProduct';
import { NotfyContext } from '../../context/Notfy';
import ProductAddedNotification from '../../component/Notif';

const AdminProductList = ({ showNotification }) => {
    const [products, setProducts] = useState([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const [showEditModal, setShowEditModal] = useState(false);
    const [editingProductId, setEditingProductId] = useState(null);
    const [deleteId, setDeleteId] = useState(null);
    const { notification } = useContext(NotfyContext)

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = () => {
        axios.get('https://rahmadarifin.my.id/api/produk/list.php')
            .then(res => {
                setProducts(res.data);
            })
            .catch(err => console.error(err));
    };




    return (
        <div className="bg-white rounded-xl shadow-sm border border-blue-100 overflow-hidden">
            {/* Header */}
            <div className="px-6 py-4 border-b border-blue-100 justify-between flex items-center">
                <h2 className="text-xl font-bold text-gray-900">Product Management</h2>
                <Tooltip title="Add a New Product" placement='left' arrow>
                    <Plus className="h-6 w-6 text-blue-600 mt-2 cursor-pointer" onClick={() => setShowAddModal(true)} />
                </Tooltip>
            </div>

            {/* Product Table */}
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-blue-100">
                    <thead>
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Gambar</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nama Produk</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Harga</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Diskon</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stok</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Kategori</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Harga Akhir</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Aksi</th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-blue-100">
                        {products.map((product, index) => (
                            <tr key={product.id} className="hover:bg-blue-50">
                                <td className="px-6 py-4">
                                    <img
                                        src={`https://rahmadarifin.my.id/uploads/image/${product.product_image}`}
                                        alt={product.product_name}
                                        className="w-12 h-12 object-contain rounded border border-blue-100"
                                    />
                                </td>
                                <td className="px-6 py-4 font-medium text-gray-900">
                                    {product.product_name}
                                </td>
                                <td className="px-6 py-4 text-gray-700">
                                    {new Intl.NumberFormat('id-ID', {
                                        style: 'currency',
                                        currency: 'IDR',
                                        minimumFractionDigits: 2
                                    }).format(product.price)}
                                </td>
                                <td className="px-6 py-4 text-gray-700">
                                    {product.discount}%
                                </td>
                                <td className="px-6 py-4 text-gray-700">
                                    {product.stock}
                                </td>
                                <td className="px-6 py-4 text-gray-700">
                                    {product.categorie &&
                                        product.categorie.charAt(0).toUpperCase() +
                                        product.categorie.slice(1)
                                    }
                                </td>
                                <td className="px-6 py-4 text-gray-700">
                                    {new Intl.NumberFormat('id-ID', {
                                        style: 'currency',
                                        currency: 'IDR',
                                        minimumFractionDigits: 2
                                    }).format(product.price - (product.price * (product.discount / 100)))}
                                </td>
                                <td className="px-6 py-4 text-sm">
                                    <div className="flex space-x-3">
                                        <button
                                            onClick={() => {
                                                setEditingProductId(product.id);
                                                setShowEditModal(true);
                                            }}
                                            className="text-blue-600 hover:text-blue-900 font-medium">
                                            Edit
                                        </button>
                                        <button onClick={() => {setDeleteId(product.id); setShowDeleteModal(true)}} className="text-red-600 hover:text-red-900 font-medium">
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Empty State */}
            <div className="px-6 py-12 text-center hidden">
                <div className="text-blue-800 text-5xl mb-4">📦</div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-600">Get started by adding your first product.</p>
            </div>
            <DeleteProductModal isOpen={showDeleteModal} onCancel={() => setShowDeleteModal(false)} productId={deleteId} onSuccess={fetchProducts}/>

            <AddProductModal isOpen={showAddModal} onCancel={() => setShowAddModal(false)} onAdd={fetchProducts}/>

            <EditProduct isOpen={showEditModal} onClose={() => setShowEditModal(false)} productId={editingProductId} onSuccess={fetchProducts} />

            {notification && (
                <ProductAddedNotification />
            )}
        </div>

    );
};

export default AdminProductList;