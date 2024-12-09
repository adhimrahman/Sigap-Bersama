export default function Voucher() {
    const vouchers = [
    { id: 1, name: "Amazon Gift Card", points: 500, image: "https://placehold.co/100x100?text=Amazon+Gift+Card" },
    { id: 2, name: "Starbucks Voucher", points: 300, image: "https://placehold.co/100x100?text=Starbucks+Voucher" },
    { id: 3, name: "Netflix Subscription", points: 700, image: "https://placehold.co/100x100?text=Netflix+Subscription" },
    { id: 4, name: "Spotify Premium", points: 400, image: "https://placehold.co/100x100?text=Spotify+Premium" },
    { id: 5, name: "Google Play Credit", points: 600, image: "https://placehold.co/100x100?text=Google+Play+Credit" },
    { id: 6, name: "Apple iTunes Gift Card", points: 550, image: "https://placehold.co/100x100?text=Apple+iTunes+Gift+Card" },
    { id: 7, name: "Uber Ride Credit", points: 450, image: "https://placehold.co/100x100?text=Uber+Ride+Credit" },
    { id: 8, name: "Walmart Gift Card", points: 500, image: "https://placehold.co/100x100?text=Walmart+Gift+Card" },
    { id: 9, name: "Target Gift Card", points: 350, image: "https://placehold.co/100x100?text=Target+Gift+Card" },
    { id: 10, name: "Best Buy Gift Card", points: 650, image: "https://placehold.co/100x100?text=Best+Buy+Gift+Card" },
    { id: 11, name: "Sephora Gift Card", points: 400, image: "https://placehold.co/100x100?text=Sephora+Gift+Card" },
    { id: 12, name: "Nike Gift Card", points: 500, image: "https://placehold.co/100x100?text=Nike+Gift+Card" },
    { id: 13, name: "Adidas Gift Card", points: 450, image: "https://placehold.co/100x100?text=Adidas+Gift+Card" },
    { id: 14, name: "Airbnb Credit", points: 800, image: "https://placehold.co/100x100?text=Airbnb+Credit" },
    { id: 15, name: "Disney+ Subscription", points: 600, image: "https://placehold.co/100x100?text=Disney+Subscription" }
];

    return (
        <div className="min-h-screen bg-gray-100 p-4">
            <header className="bg-white shadow p-4 mb-6">
                <h1 className="text-2xl font-bold text-center">Redeem Points for Vouchers</h1>
            </header>
            <main className="container mx-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {vouchers.map(voucher => (
                        <div key={voucher.id} className="bg-white p-4 rounded-lg shadow">
                            <img src={voucher.image} alt={`Image of ${voucher.name}`} className="w-full h-32 object-cover mb-4 rounded" />
                            <h2 className="text-xl font-bold mb-2">{voucher.name}</h2>
                            <p className="text-gray-700 mb-4">Points: {voucher.points}</p>
                            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Redeem</button>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}