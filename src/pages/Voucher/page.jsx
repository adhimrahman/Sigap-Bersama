import { collection, getDocs, doc, getDoc, addDoc, increment, runTransaction } from "firebase/firestore";
import { useEffect, useState } from "react";
import { firestore } from "../../../api/firebaseConfig";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Navbar from "../../components/layouts/Navbar";
import Footer from "../../components/layouts/Footer";
import Swal from "sweetalert2";

const generateVoucherCode = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let code = "";
    for (let i = 0; i < 10; i++) { code += chars.charAt(Math.floor(Math.random() * chars.length)) }
    return code;
};

export default function Voucher() {
    const [vouchers, setVouchers] = useState([]);
    const [userPoints, setUserPoints] = useState(0);

    const fetchUserPoints = () => {
        const auth = getAuth(); 
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                try {
                    const userRef = doc(firestore, "users", user.uid);
                    const userSnap = await getDoc(userRef);
                    if (userSnap.exists()) { setUserPoints(userSnap.data().points || 0);
                    } else { console.error("User data tidak ditemukan di Firestore!") }
                } catch (error) { console.error("Error fetching user points:", error.message) }
            } else { console.error("User belum login!"); setUserPoints(0) }
        });
    };

    useEffect(() => {
        const fetchVouchers = async () => {
            const querySnapshot = await getDocs(collection(firestore, "voucher"));
            const voucherList = querySnapshot.docs.map(doc => {
                const data = doc.data();
                const validFrom = data.validFrom?.toDate().toLocaleDateString("id-ID", { day: "2-digit", month: "long", year: "numeric", });
                const validUntil = data.validUntil?.toDate().toLocaleDateString("id-ID", { day: "2-digit", month: "long", year: "numeric", });
                return { id: doc.id, ...data, validFrom, validUntil, };
            });
            setVouchers(voucherList);
        };
        fetchVouchers();
        fetchUserPoints();
    }, []);

    const handleRedeem = async (voucher) => {
        const auth = getAuth();
        const user = auth.currentUser;
    
        if (!user) return Swal.fire({ icon: "warning", title: "Login Diperlukan!", text: "Anda harus login terlebih dahulu untuk redeem voucher.", confirmButtonColor: "#365E32", scrollbarPadding: false, });
    
        const userRef = doc(firestore, "users", user.uid);
        const voucherRef = doc(firestore, "voucher", voucher.id);
        const redeemedVouchersRef = collection(userRef, "redeemedVouchers");
    
        try {
            const confirmResult = await Swal.fire({
                title: `Redeem ${voucher.name}?`,
                text: `Poin yang dibutuhkan: ${voucher.points}. Lanjutkan?`,
                icon: "question",
                showCancelButton: true,
                confirmButtonColor: "#365E32",
                cancelButtonColor: "#d33",
                confirmButtonText: "Ya, Redeem!",
                cancelButtonText: "Batal",
                scrollbarPadding: false,
            });
    
            if (!confirmResult.isConfirmed) { return; }
    
            await runTransaction(firestore, async (transaction) => {
                const userSnap = await transaction.get(userRef);
                const voucherSnap = await transaction.get(voucherRef);

                if (!userSnap.exists()) throw new Error("User data tidak ditemukan!");
                if (!voucherSnap.exists()) throw new Error("Voucher data tidak ditemukan!");
    
                const userData = userSnap.data();
                const voucherData = voucherSnap.data();
                const userPoints = userData.points || 0;
    
                if (userPoints < voucher.points) { throw new Error("Poin Anda tidak mencukupi untuk redeem voucher ini!") }
                if (voucherData.totalVoucher <= 0) { throw new Error("Voucher telah habis!") }
    
                const voucherCode = generateVoucherCode();

                transaction.update(userRef, { points: increment(-voucher.points), });
                transaction.update(voucherRef, { totalVoucher: increment(-1), redemption: increment(1), });
    
                await addDoc(redeemedVouchersRef, { name: voucher.name, voucherId: voucher.id, redeemedAt: new Date().toISOString(), code: voucherCode, });
            });
    
            setUserPoints(prevPoints => prevPoints - voucher.points);
            setVouchers(prevVouchers =>
                prevVouchers.map(item => item.id === voucher.id ? { ...item, totalVoucher: item.totalVoucher - 1 } : item )
            );
    
            Swal.fire({ icon: "success", title: "Redeem Berhasil!", text: `Anda berhasil redeem ${voucher.name}.`, confirmButtonColor: "#365E32", scrollbarPadding: false, });
        } catch (error) {
            console.error("Error redeem voucher:", error.message);
            Swal.fire({ icon: "error", title: "Redeem Gagal", text: error.message || "Terjadi kesalahan, silakan coba lagi.", scrollbarPadding: false, confirmButtonColor: "#365E32", });
        }
    };
    
    window.scrollTo({ top: 0, behavior: "smooth" });
    return (
        <div>
            <Navbar pageKeys={['landingPage', 'navBencana', 'navLimbah', 'contactUs']} />
            <div className="w-full min-h-screen bg-gray-50 mt-20 px-16">
                <header className="p-6 mb-8">
                    <h1 className="text-3xl font-extrabold text-center">Redeem Points for Vouchers</h1>
                    <p className="text-center text-lg font-medium mt-2">
                        Total Poin Anda: <span className="font-bold text-blue-700">{userPoints} Poin</span>
                    </p>
                </header>
                <main className="container mx-auto px-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                        {vouchers.map(voucher => (
                            <div key={voucher.id} className={`bg-white rounded-lg shadow-lg overflow-hidden transition transform`}>
                                <div className="relative">
                                    <img src={voucher.image}  alt={voucher.name}  className="w-full h-40 object-cover" />
                                    {!voucher.isActive && (
                                        <div className="absolute top-0 left-0 w-full h-full bg-gray-600 bg-opacity-70 flex items-center justify-center">
                                            <span className="text-white text-lg font-bold">Unavailable</span>
                                        </div>
                                    )}
                                </div>
                                <div className="p-5">
                                    <h2 className="text-xl font-bold text-gray-800 mb-2">{voucher.name}</h2>
                                    <p className="text-sm text-gray-700 mb-1">
                                        Poin yang dibutuhkan: <span className="font-semibold text-blue-600">{voucher.points} Poin</span>
                                    </p>
                                    <p className="text-sm text-gray-700 mb-1">
                                        Voucher Tersisa: <span className="font-semibold">{voucher.totalVoucher}</span>
                                    </p>
                                    <p className="text-sm text-gray-500 mt-3">
                                        Berlaku Sampai: <span className="font-semibold">{voucher.validUntil}</span>
                                    </p>
                                    <button
                                        onClick={() => handleRedeem(voucher)}
                                        disabled={!voucher.isActive || voucher.totalVoucher <= 0}
                                        className={`mt-2 w-full px-4 py-2 text-white font-medium text-sm rounded-md transition 
                                        ${ voucher.isActive && voucher.totalVoucher > 0 ? "bg-ijoTua hover:bg-green-700" : "bg-gray-400 cursor-not-allowed"}`}>
                                        {voucher.isActive && voucher.totalVoucher > 0 ? "Redeem Now" : "Not Available"}
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