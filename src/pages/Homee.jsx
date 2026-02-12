import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import Notfy from "../context/Notfy";
import { User } from "lucide-react";
import { NotfyContext } from "../context/Notfy";
import React from "react";
import ProductAddedNotification from "../component/Notif";
import { CartContext } from "../context/CartContext";

function Home() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { isLoaded } = useUser();
    const { user } = useUser();
    const { showNotification } = useContext(NotfyContext)
    const { fetchCart } = useContext(CartContext);

    useEffect(() => {
        axios.get('https://rahmadarifin.my.id/api/produk/list.php')
            .then(res => {
                setProducts(res.data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [isLoaded]);


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



    return (
        <div >

            <section className="bg-linear-to-r from-blue-50 to-white py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                            Selamat datang di <span className="text-blue-700">EzShop</span>
                        </h1>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                            Temukan produk-produk menakjubkan dengan harga yang tidak biasa. Gratis ongkir untuk pesanan di atas Rp. 5.000,00!
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <Link to="/products" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors">
                                Shop Now
                            </Link>
                            <Link to="/deals" className="border border-blue-600 text-blue-700 hover:bg-blue-50 px-8 py-3 rounded-lg font-medium transition-colors">
                                View Deals
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Products */}
            <section className="py-12 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-2xl font-bold text-gray-900">Featured Products</h2>
                        <Link to="/products" className="text-blue-700 hover:text-blue-900 font-medium">
                            View All →
                        </Link>
                    </div>

                    {products && <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {products.map((produk) => (
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
                                            disabled={produk.stock === 1 }
                                            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors duration-200 whitespace-nowrap ${produk.stock > 1
                                                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                                                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                                }`}
                                        >
                                            {produk.stock > 1 ? '+ Keranjang' : 'Barang habis'}
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
                    </div>}

                    {!products.length && <p className="text-center text-gray-600">No products available.</p>}
                </div>
            </section>

            {/* Promo Banner */}

            <ProductAddedNotification />
        </div>
    );
}

export default Home;
