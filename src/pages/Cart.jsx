// CartPage.js
import React, { useEffect, useState } from 'react';
import Navbar from '../component/Navbar';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import LoginRequiredNotification from '../component/Notify';


const Cart = () => {
    // Mock cart items

    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user, isLoaded } = useUser();

    useEffect(() => {
        if (!isLoaded || !user) {
            return;
        }

        const clerkId = user?.id


        axios.get(`https://rahmadarifin.my.id/api/cart/list.php?clerk_id=${clerkId}`)
            .then(res => {
                setCart(res.data);
            })
            .finally(() => setLoading(false))
            .catch(() => setLoading(false));
    }, [isLoaded, user]);

    if (loading || !user) {
        return (
            <LoginRequiredNotification />
            
        )
    }

    if (!isLoaded || !user) {
        return (
            <LoginRequiredNotification />
        );
    }

    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    const shipping = 5000;
    const tax = subtotal * 0.1; // 10% tax
    const total = subtotal + shipping + tax;

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-gray-900 mt-8 mb-8">Your Shopping Cart</h1>

                {cart.length > 0 ? (
                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Cart Items */}
                        <div className="lg:w-2/3">
                            <div className="bg-white rounded-xl shadow-sm border border-blue-100 overflow-hidden">
                                {cart.map((item) => (
                                    <div key={item.id} className="border-b border-blue-100 last:border-b-0">
                                        <div className="p-4 sm:p-6 flex flex-col sm:flex-row gap-4">
                                            {/* Product Image */}
                                            <div className="shrink-0">
                                                <img
                                                    src={item.product_image}
                                                    alt={item.name}
                                                    className="w-24 h-24 object-contain"
                                                />
                                            </div>

                                            {/* Product Info */}
                                            <div className="grow">
                                                <h3 className="font-semibold text-gray-900">{item.product_name}</h3>
                                                <p className="text-blue-700 font-bold mt-1">{new Intl.NumberFormat('id-ID', {
                                                    style: 'currency',
                                                    currency: 'IDR',
                                                    minimumFractionDigits: 2
                                                }).format(item.price)}</p>

                                                {/* Quantity Controls */}
                                                <div className="flex items-center mt-3">
                                                    <button className="w-8 h-8 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center hover:bg-blue-200">
                                                        -
                                                    </button>
                                                    <span className="mx-3 w-10 text-center">{item.qty}</span>
                                                    <button className="w-8 h-8 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center hover:bg-blue-200">
                                                        +
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Remove Button */}
                                            <div className="flex items-start sm:items-end">
                                                <button className="text-gray-500 hover:text-red-500 p-1">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Order Summary */}
                        <div className="lg:w-1/3">
                            <div className="bg-white rounded-xl shadow-sm border border-blue-100 p-6 sticky top-8">
                                <h2 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h2>

                                <div className="space-y-3 mb-6">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Subtotal</span>
                                        <span className="font-medium">{new Intl.NumberFormat('id-ID', {
                                            style: 'currency',
                                            currency: 'IDR',
                                            minimumFractionDigits: 2
                                        }).format(subtotal)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Shipping</span>
                                        <span className="font-medium">{new Intl.NumberFormat('id-ID', {
                                            style: 'currency',
                                            currency: 'IDR',
                                            minimumFractionDigits: 2
                                        }).format(shipping)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Tax</span>
                                        <span className="font-medium">{new Intl.NumberFormat('id-ID', {
                                            style: 'currency',
                                            currency: 'IDR',
                                            minimumFractionDigits: 2
                                        }).format(tax)}</span>
                                    </div>
                                    <div className="border-t border-blue-100 pt-3 flex justify-between">
                                        <span className="text-lg font-bold text-gray-900">Total</span>
                                        <span className="text-lg font-bold text-blue-700">{new Intl.NumberFormat('id-ID', {
                                            style: 'currency',
                                            currency: 'IDR',
                                            minimumFractionDigits: 2
                                        }).format(total)}</span>
                                    </div>
                                </div>

                                <button className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold text-lg transition-colors">
                                    Proceed to Checkout
                                </button>

                                <div className="mt-4 text-center text-sm text-gray-600">
                                    <p>Free shipping on orders over {new Intl.NumberFormat('id-ID', {
                                        style: 'currency',
                                        currency: 'IDR',
                                        minimumFractionDigits: 2
                                    }).format(shipping)}</p>
                                    <p className="mt-1">Secure checkout • 30-day returns</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    /* Empty Cart State */
                    <div className="bg-white rounded-xl shadow-sm border border-blue-100 p-12 text-center">
                        <div className="text-blue-800 text-5xl mb-4">🛒</div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
                        <p className="text-gray-600 mb-6 max-w-md mx-auto">
                            Looks like you haven't added anything to your cart yet. Start shopping to find amazing products!
                        </p>
                        <Link to="/products" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium">
                            Browse Products
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Cart;