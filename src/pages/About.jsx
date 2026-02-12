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
                            Tentang <span className="text-blue-700">EzShop</span>
                        </h1>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Destinasi terpercaya Anda untuk produk berkualitas dengan harga tak tertandingi.
                        </p>
                    </div>
                </div>
            </div>

            {/* Mission Section */}
            <div className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-6">Misi Kami</h2>
                            <p className="text-gray-600 mb-4">
                                Di EzShop, kami bersemangat untuk membuat belanja online menjadi sederhana,
                                aman, dan menyenangkan bagi semua orang. Kami percaya bahwa setiap orang berhak mendapatkan
                                akses ke produk berkualitas tinggi tanpa mengorbankan nilai.
                            </p>
                            <p className="text-gray-600">
                                Misi kami adalah menghubungkan pelanggan dengan produk terbaik dari
                                merek terpercaya sambil memberikan layanan pelanggan yang luar biasa dan
                                pengalaman berbelanja yang lancar.
                            </p>
                        </div>
                        <div className="bg-blue-100 rounded-xl p-8">
                            <div className="text-blue-800 text-5xl mb-4">🎯</div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">Pelanggan Nomor satu</h3>
                            <p className="text-gray-700">
                                Setiap keputusan yang kami buat berawal dari pelanggan kami. 
                                Mulai dari pemilihan produk hingga pengiriman, 
                                kami memprioritaskan kepuasan Anda di atas segalanya.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Values Section */}
            <div className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Prinsip yang Kami Pegang</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            {
                                icon: "🔒",
                                title: "Keamanan",
                                description: "Data dan transaksi Anda dilindungi dengan langkah-langkah keamanan terdepan di industri."
                            },
                            {
                                icon: "⚡",
                                title: "Kecepatan",
                                description: "Waktu pemuatan yang cepat dan proses pembayaran yang singkat untuk pengalaman berbelanja yang lancar."
                            },
                            {
                                icon: "🤝",
                                title: "Kepercayaan",
                                description: "Produk asli dari penjual terverifikasi dengan harga transparan."
                            },
                            {
                                icon: "🌍",
                                title: "Keberlanjutan",
                                description: "Kami bermitra dengan merek-merek yang peduli lingkungan dan meminimalkan dampak lingkungan kami."
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
                            { number: "10K+", label: "Pelanggan Yang Bahagia" },
                            { number: "500+", label: "Produk" },
                            { number: "99%", label: "Tingkat Kepuasan" },
                            { number: "24/7", label: "Layanan" }
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
                    <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Perkenalkan Tim Kami</h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { name: "Rahmad Arifin", role: "Founder & Developer", bio: "5+ years in e-commerce" },
                            { name: "GPT", role: "Developer Support", bio: "Tech enthusiast" },
                            { name: "Qwen", role: "Developer Support", bio: "UI/UX Expert" }
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
                    <h2 className="text-3xl font-bold text-white mb-4">Sudah siap untuk mulai berbelanja?</h2>
                    <p className="text-blue-100 text-xl mb-8 max-w-2xl mx-auto">
                        Bergabunglah dengan ribuan pelanggan yang puas dan temukan produk-produk luar biasa hari ini.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <a
                            href="/products"
                            className="bg-white text-blue-700 hover:bg-blue-50 px-8 py-3 rounded-lg font-bold text-lg transition-colors"
                        >
                            Lihat Produk
                        </a>
                        <a
                            href="/contact"
                            className="border border-white text-white hover:bg-white hover:text-blue-700 px-8 py-3 rounded-lg font-bold text-lg transition-colors"
                        >
                            Kontak kami
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;