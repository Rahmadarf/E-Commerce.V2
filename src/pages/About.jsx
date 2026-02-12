// AboutPage.js
import React from 'react';

const About = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-blue-50 to-white py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                            About <span className="text-blue-700">ShopEase</span>
                        </h1>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Your trusted destination for quality products at unbeatable prices
                        </p>
                    </div>
                </div>
            </div>

            {/* Mission Section */}
            <div className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
                            <p className="text-gray-600 mb-4">
                                At ShopEase, we're passionate about making online shopping simple,
                                secure, and enjoyable for everyone. We believe that everyone deserves
                                access to high-quality products without compromising on value.
                            </p>
                            <p className="text-gray-600">
                                Our mission is to connect customers with the best products from
                                trusted brands while providing exceptional customer service and
                                a seamless shopping experience.
                            </p>
                        </div>
                        <div className="bg-blue-100 rounded-xl p-8">
                            <div className="text-blue-800 text-5xl mb-4">🎯</div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">Customer First</h3>
                            <p className="text-gray-700">
                                Every decision we make starts with our customers. From product
                                selection to delivery, we prioritize your satisfaction above all.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Values Section */}
            <div className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Our Core Values</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            {
                                icon: "🔒",
                                title: "Security",
                                description: "Your data and transactions are protected with industry-leading security measures."
                            },
                            {
                                icon: "⚡",
                                title: "Speed",
                                description: "Fast loading times and quick checkout process for a smooth shopping experience."
                            },
                            {
                                icon: "🤝",
                                title: "Trust",
                                description: "Authentic products from verified sellers with transparent pricing."
                            },
                            {
                                icon: "🌍",
                                title: "Sustainability",
                                description: "We partner with eco-conscious brands and minimize our environmental impact."
                            }
                        ].map((value, index) => (
                            <div key={index} className="bg-gray-50 rounded-xl p-6 border border-blue-100 hover:shadow-md transition-shadow">
                                <div className="text-3xl mb-4">{value.icon}</div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">{value.title}</h3>
                                <p className="text-gray-600">{value.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Stats Section */}
            <div className="py-16 bg-blue-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">By The Numbers</h2>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        {[
                            { number: "10K+", label: "Happy Customers" },
                            { number: "500+", label: "Products" },
                            { number: "99%", label: "Satisfaction Rate" },
                            { number: "24/7", label: "Support" }
                        ].map((stat, index) => (
                            <div key={index}>
                                <div className="text-4xl font-bold text-blue-700 mb-2">{stat.number}</div>
                                <div className="text-gray-600">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Team Section */}
            <div className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Meet Our Team</h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { name: "Sarah Johnson", role: "Founder & CEO", bio: "10+ years in e-commerce" },
                            { name: "Mike Chen", role: "Head of Product", bio: "Tech enthusiast & UX expert" },
                            { name: "Aisha Patel", role: "Customer Success", bio: "Your satisfaction is her priority" }
                        ].map((member, index) => (
                            <div key={index} className="text-center">
                                <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
                                    <span className="text-blue-800 text-xl font-bold">
                                        {member.name.split(' ').map(n => n[0]).join('')}
                                    </span>
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900">{member.name}</h3>
                                <p className="text-blue-700 font-medium mb-2">{member.role}</p>
                                <p className="text-gray-600 text-sm">{member.bio}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="py-16 bg-gradient-to-r from-blue-600 to-blue-700">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold text-white mb-4">Ready to Start Shopping?</h2>
                    <p className="text-blue-100 text-xl mb-8 max-w-2xl mx-auto">
                        Join thousands of satisfied customers and discover amazing products today
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <a
                            href="/products"
                            className="bg-white text-blue-700 hover:bg-blue-50 px-8 py-3 rounded-lg font-bold text-lg transition-colors"
                        >
                            Browse Products
                        </a>
                        <a
                            href="/contact"
                            className="border border-white text-white hover:bg-white hover:text-blue-700 px-8 py-3 rounded-lg font-bold text-lg transition-colors"
                        >
                            Contact Us
                        </a>
                    </div>
                </div>
            </div>

            {/* Footer Note */}
            <div className="py-8 border-t border-blue-100 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-600">
                    <p>© 2026 ShopEase. All rights reserved.</p>
                </div>
            </div>
        </div>
    );
};

export default About;