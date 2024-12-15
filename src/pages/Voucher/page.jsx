import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../../api/firebaseConfig";
import Navbar from "../../components/layouts/Navbar";
import Footer from "../../components/layouts/Footer";

export default function Voucher() {
    const [vouchers, setVouchers] = useState([]);

    useEffect(() => {
        const fetchVouchers = async () => {
            const querySnapshot = await getDocs(collection(firestore, "voucher"));
            const voucherList = querySnapshot.docs.map(doc => {
                const data = doc.data();
    
                // Format validFrom dan validUntil ke hanya tanggal (tanpa waktu)
                const validFrom = data.validFrom?.toDate().toLocaleDateString("id-ID", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                });
                const validUntil = data.validUntil?.toDate().toLocaleDateString("id-ID", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                });
    
                return {
                    id: doc.id,
                    ...data,
                    validFrom, // Tanggal saja
                    validUntil, // Tanggal saja
                };
            });
            setVouchers(voucherList);
        };
    
        fetchVouchers();
    }, []);
    

    return (
        <div>
            <Navbar pageKeys={['landingPage', 'navBencana', 'navLimbah', 'contactUs']} />
            <div className="min-h-screen bg-gray-50 mt-20">
                <header className="bg-gradient-to-r from-blue-500 to-blue-700 text-white shadow p-6 mb-8">
                    <h1 className="text-3xl font-extrabold text-center">🎁 Redeem Points for Vouchers 🎁</h1>
                </header>
                <main className="container mx-auto px-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                        {vouchers.map(voucher => (
                            <div
                                key={voucher.id}
                                className={`bg-white rounded-lg shadow-lg overflow-hidden transition transform hover:scale-105 hover:shadow-2xl 
                                    ${voucher.isActive ? "border-t-4 border-blue-500" : "border-t-4 border-gray-400"}`}
                            >
                                {/* Gambar Voucher */}
                                <div className="relative">
                                    <img 
                                        src={voucher.image} 
                                        alt={voucher.name} 
                                        className="w-full h-40 object-cover"
                                    />
                                    {!voucher.isActive && (
                                        <div className="absolute top-0 left-0 w-full h-full bg-gray-600 bg-opacity-70 flex items-center justify-center">
                                            <span className="text-white text-lg font-bold">Unavailable</span>
                                        </div>
                                    )}
                                </div>
    
                                {/* Konten Voucher */}
                                <div className="p-5">
                                    <h2 className="text-xl font-bold text-gray-800 mb-2">{voucher.name}</h2>
                                    <p className="text-sm text-gray-700 mb-1">
                                        Points Required: <span className="font-semibold text-blue-600">{voucher.points}</span>
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        Valid Until: <span className="font-semibold">{voucher.validUntil}</span>
                                    </p>
                                    <button
                                        disabled={!voucher.isActive}
                                        className={`mt-4 w-full px-4 py-2 text-white font-medium text-sm rounded-md transition 
                                            ${voucher.isActive 
                                                ? "bg-blue-500 hover:bg-blue-600" 
                                                : "bg-gray-400 cursor-not-allowed"}`}
                                    >
                                        {voucher.isActive ? "Redeem Now" : "Not Available"}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </main>
            </div>
            <Footer />
        </div>
    );
}    