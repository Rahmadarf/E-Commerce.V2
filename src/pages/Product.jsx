// ProductsPage.js
import React, { useContext, useEffect, useState } from 'react';
import Navbar from '../component/Navbar';
import Footer from '../component/Footer';
import axios from 'axios';
import { useUser } from '@clerk/clerk-react';
import { CartContext } from '../context/CartContext';
import { NotfyContext } from '../context/Notfy';
import ProductAddedNotification from '../component/Notif';

const ProductsPage = () => {
    // Filter states
    const [priceRange, setPriceRange] = useState([0, 1000000]);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [inStockOnly, setInStockOnly] = useState(false);
    const [sortBy, setSortBy] = useState('featured');
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { isLoaded, user } = useUser();
    const { fetchCart } = useContext(CartContext)
    const { showNotification } = useContext(NotfyContext)

    // Mock data (replace with API call)
    const categories = [
        { id: 'all', name: 'Semua Kategori' },
        { id: 'electronics', name: 'Elektronik' },
        { id: 'clothing', name: 'Pakaian' },
        { id: 'home', name: 'Rumah & Dapur' },
        { id: 'accessories', name: 'Aksesori' },
        { id: 'beauty', name: 'Kecantikan' }
    ];

    useEffect(() => {
        axios.get('https://rahmadarifin.my.id/api/produk/list.php')
            .then(res => {
                setProducts(res.data);
                setLoading(false);

            })
            .catch(() => setLoading(false));
    }, [isLoaded, user]);


    const addToCart = async (productId) => {

        try {
            const formData = new FormData();
            formData.append("clerk_id", user.id);
            formData.append("product_id", productId);

            const res = await axios.post(
                "https://rahmadarifin.my.id/api/cart/addToCart.php",
                formData
            );

            if (res.data.status === "success") {
                showNotification("Produk berhasil ditambahkan ke keranjang!", "success");
                fetchCart();  // Refresh cart count
            }

        } catch (err) {
            console.error(err);
            showNotification("Terjadi kesalahan!", "error");
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="animate-pulse text-blue-600">Memuat...</div>
            </div>
        )
    }

    if (!isLoaded) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="animate-pulse text-blue-600">Memuat...</div>
            </div>
        );
    }

    // Apply filters
    const filteredProducts = products.filter(product => {
        const price = Number(product.price);
        const stock = Number(product.stock);

        const matchesCategory =
            selectedCategory === 'all' ||
            product.categorie === selectedCategory;

        const matchesPrice =
            price >= priceRange[0] && price <= priceRange[1];

        const matchesStock =
            !inStockOnly || stock > 0;

        return matchesCategory && matchesPrice && matchesStock;
    });



    // Sort products
    const sortedProducts = [...filteredProducts].sort((a, b) => {
        if (sortBy === 'price-low') {
            return Number(a.price) - Number(b.price);
        }

        if (sortBy === 'price-high') {
            return Number(b.price) - Number(a.price);
        }

        return 0;
    });



    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Filters Sidebar */}
                    <div className="w-full lg:w-64 shrink-0">
                        <div className="bg-white rounded-xl shadow-sm border border-blue-100 p-5 sticky top-6">
                            <h2 className="font-bold text-gray-900 mb-4">Filter</h2>

                            {/* Category Filter */}
                            <div className="mb-6">
                                <h3 className="font-medium text-gray-900 mb-2">Kategori</h3>
                                <ul className="space-y-2">
                                    {categories.map(category => (
                                        <li key={category.id}>
                                            <label className="flex items-center cursor-pointer">
                                                <input
                                                    type="radio"
                                                    name="category"
                                                    checked={selectedCategory === category.id}
                                                    onChange={() => setSelectedCategory(category.id)}
                                                    className="text-blue-600 focus:ring-blue-500"
                                                />
                                                <span className="ml-2 text-gray-700">{category.name}</span>
                                            </label>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Price Range */}
                            <div className="mb-6">
                                <h3 className="font-medium text-gray-900 mb-2">
                                    Harga: {new Intl.NumberFormat('id-ID', {
                                        style: 'currency',
                                        currency: 'IDR',
                                        minimumFractionDigits: 0
                                    }).format(priceRange[0])} - {new Intl.NumberFormat('id-ID', {
                                        style: 'currency',
                                        currency: 'IDR',
                                        minimumFractionDigits: 0
                                    }).format(priceRange[1])}
                                </h3>
                                <div className="space-y-2">
                                    <input
                                        type="range"
                                        min="0"
                                        max="1000000"
                                        value={priceRange[1]}
                                        onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                                        className="w-full accent-blue-600"
                                    />
                                    <div className="flex justify-between text-sm text-gray-600">
                                        <span>Rp. 0</span>
                                        <span>Rp. 100.000</span>
                                    </div>
                                </div>
                            </div>

                            {/* Stock Filter */}
                            <div className="mb-6">
                                <label className="flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={inStockOnly}
                                        onChange={(e) => setInStockOnly(e.target.checked)}
                                        className="text-blue-600 rounded focus:ring-blue-500"
                                    />
                                    <span className="ml-2 text-gray-700">Hanya yang stok</span>
                                </label>
                            </div>

                            {/* Reset Button */}
                            <button
                                onClick={() => {
                                    setPriceRange([0, 100000]);
                                    setSelectedCategory('all');
                                    setInStockOnly(false);
                                    setSortBy('featured');
                                }}
                                className="w-full py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg font-medium transition-colors"
                            >
                                Reset Filters
                            </button>
                        </div>
                    </div>

                    {/* Products Grid */}
                    <div className="flex-1">
                        {/* Sort Controls */}
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                            <div className="text-gray-700">
                                Menampilkan <span className="font-medium">{sortedProducts.length}</span> produk
                            </div>
                            <div className="flex items-center">
                                <span className="mr-2 text-gray-700">Sort by:</span>
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="border border-blue-200 rounded-lg px-3 py-1 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="featured">Featured</option>
                                    <option value="price-low">Price: Low to High</option>
                                    <option value="price-high">Price: High to Low</option>
                                    <option value="rating">Top Rated</option>
                                </select>
                            </div>
                        </div>

                        {/* Products Grid */}
                        {sortedProducts.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
                                {sortedProducts.map((produk) => (
                                    <div
                                        key={produk.id}
                                        className="bg-white rounded-xl shadow-sm border border-blue-100 overflow-hidden hover:shadow-md transition-shadow duration-300"
                                    >
                                        {/* Image Container */}
                                        <div className="aspect-square bg-blue-50 flex items-center justify-center p-4">
                                            <img
                                                src={
                                                    produk.product_image
                                                        ? `https://rahmadarifin.my.id/uploads/image/${produk.product_image.trim()}`
                                                        : 'https://rahmadarifin.my.id/uploads/image/NoImage.png'
                                                }
                                                alt={produk.product_name}
                                                className="w-full h-full object-contain"
                                            />
                                        </div>

                                        {/* Product Info */}
                                        <div className="p-4">
                                            {/* Product Name */}
                                            <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 min-h-[40px]">
                                                {produk.product_name}
                                            </h3>

                                            {/* Price & Button */}
                                            <div className="flex justify-between items-center">
                                                <span className="text-lg font-bold text-blue-700">
                                                    {new Intl.NumberFormat('id-ID', {
                                                        style: 'currency',
                                                        currency: 'IDR',
                                                        minimumFractionDigits: 0 // Removed decimals for cleaner look
                                                    }).format(produk.price - (produk.price * (produk.discount / 100)))}
                                                </span>

                                                <button
                                                    onClick={() => addToCart(produk.id)}
                                                    disabled={produk.stock === 1}
                                                    className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors duration-200 whitespace-nowrap ${produk.stock > 1
                                                        ? 'bg-blue-600 hover:bg-blue-700 text-white'
                                                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                                        }`}
                                                >
                                                    {produk.stock > 1 ? 'Add to cart' : 'Barang habis'}
                                                </button>
                                            </div>

                                            {/* Discount Badge (if applicable) */}
                                            <div className='flex gap-x-2'>
                                                {produk.discount > 0 && (
                                                    <div className="mt-2">
                                                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                                            Diskon {produk.discount}%
                                                        </span>
                                                    </div>
                                                )}
                                                <div className="mt-2">
                                                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                        {produk.categorie
                                                            ?.toLowerCase()
                                                            .replace(/\b\w/g, c => c.toUpperCase())
                                                        }
                                                    </span>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="bg-white rounded-xl border border-blue-100 p-12 text-center">
                                <div className="text-blue-800 text-5xl mb-4">🛒</div>
                                <h3 className="text-xl font-medium text-gray-900 mb-2">Produk tidak ditemukan</h3>
                                <p className="text-gray-600 mb-4">
                                    Coba sesuaikan filter Anda atau hapus beberapa untuk melihat lebih banyak produk.
                                </p>
                                <button
                                    onClick={() => {
                                        setPriceRange([0, 100000]);
                                        setSelectedCategory('all');
                                        setInStockOnly(false);
                                    }}
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium"
                                >
                                    Reset Filters
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <ProductAddedNotification />
        </div>
    );
};

export default ProductsPage;