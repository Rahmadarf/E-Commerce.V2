

function Banner() {
    return (
        <section className="py-12 bg-blue-600">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-3xl font-bold text-white mb-4">Summer Sale!</h2>
                <p className="text-blue-100 text-xl mb-6 max-w-2xl mx-auto">
                    Get 30% off on all electronics. Limited time offer.
                </p>
                <button className="bg-white text-blue-700 hover:bg-blue-50 px-8 py-3 rounded-lg font-bold text-lg transition-colors">
                    Shop the Sale
                </button>
            </div>
        </section>
    )
}

export default Banner;