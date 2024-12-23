import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { firestore, auth } from "../../../api/firebaseConfig";
import { doc, collection, getDocs, setDoc, getDoc } from "firebase/firestore";
import { requestSnapToken } from "../../utils/midtransUtils";
import { onAuthStateChanged } from "firebase/auth";
import Swal from "sweetalert2";
import Navbar from "../../components/layouts/Navbar";

export default function DonationPage() {
    const { id, category } = useParams();
    const navigate = useNavigate();
    const [donationType, setDonationType] = useState("uang");
    const [donationDetails, setDonationDetails] = useState({ name: "", email: "", amount: "", paymentMethod: "", itemName: "", itemQuantity: "", kurir: "", });
    const [selectedKurir, setSelectedKurir] = useState("");
    const [message, setMessage] = useState("");
    const [isAgreed, setIsAgreed] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
                setDonationDetails((prev) => ({
                    ...prev,
                    name: currentUser.displayName || "User",
                    email: currentUser.email || "",
                }));

                const userDocRef = doc(firestore, "users", currentUser.uid);
                const userDoc = await getDoc(userDocRef);
                if (userDoc.exists()) {
                    const userData = userDoc.data();
                    if (userData.role === "komunitas") {
                        Swal.fire({ title: "Akses Ditolak", text: "Akun komunitas tidak diperbolehkan melakukan donasi.", icon: "error", confirmButtonColor: "#365E32", });
                        navigate(-1);
                    }
                }
            }
        });
    }, [navigate]);
    console.log(user)

    const handleKurirSelect = (kurir) => {
        setSelectedKurir(kurir);
        setDonationDetails((prev) => ({ ...prev, kurir }));
    };

    const confirmSubmission = () => {
        return Swal.fire({
            title: "Konfirmasi Donasi",
            text: "Apakah Anda yakin ingin mengirim donasi ini?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#28a745",
            cancelButtonColor: "#d33",
            confirmButtonText: "Ya, Lanjutkan",
            cancelButtonText: "Batal",
        });
    };

    const formatCurrency = (value) => { if (!value) return ""; return value.replace(/\B(?=(\d{3})+(?!\d))/g, ".") };    
    const handleAmountChange = (e) => {
        const rawValue = e.target.value.replace(/\./g, "");
        if (!isNaN(rawValue)) { setDonationDetails((prev) => ({ ...prev, amount: rawValue })) }
    };    

    const handleMidtransPayment = async () => {
        const confirmation = await confirmSubmission();
        if (!confirmation.isConfirmed) return;

        try {
            const orderId = `order-${Date.now()}`;
            const snapToken = await requestSnapToken({ orderId, amount: donationDetails.amount, name: donationDetails.name, email: donationDetails.email, });

            window.snap.pay(snapToken, {
                onSuccess: async () => {
                    await handleSubmit();
                    Swal.fire({ title: "Success!", text: "Pembayaran berhasil!", icon: "success", confirmButtonColor: "#365E32", });
                },
                onError: () => Swal.fire({title: "Error!", text:"Pembayaran gagal.", icon:"error", confirmButtonColor: "#365E32", }),
            });
        } catch (error) {
            console.error("Midtrans Error:", error);
            Swal.fire({title: "Error!", text: "Gagal memproses pembayaran.", icon: "error", confirmButtonColor: "#365E32",});
        }
    };

    const handleSubmit = async () => {
        const confirmation = await confirmSubmission();
        if (!confirmation.isConfirmed) return;
        if (!isAgreed) return Swal.fire({title: "Error!", text:"Harap menyetujui syarat dan ketentuan terlebih dahulu.", icon: "warning", confirmButtonColor: "#365E32", });

        try {
            const donationRef = collection(firestore, `${category}/${id}/donasi`);
            const snapshot = await getDocs(donationRef);
            const newId = snapshot.size + 1;
            const donationData = { id: newId, type: donationType, details: { ...donationDetails }, message: message, createdAt: new Date(), };
            const newDonationDoc = doc(donationRef, newId.toString());
            await setDoc(newDonationDoc, donationData);
            Swal.fire({ title: "Berhasil!", text: "Donasi Anda telah dikirim. Terima kasih!", icon: "success", confirmButtonColor: "#365E32", });
            navigate(`/${category}/${id}`);
        } catch (error) {
            console.error("Error submitting donation:", error);
            Swal.fire({title: "Error!", text: "Terjadi kesalahan saat mengirim donasi.", icon: "error", confirmButtonColor: "#365E32",});
        }
    };

    return (
        <div className="w-full bg-gray-300 min-h-screen">
            <Navbar />
            <div className="max-w-3xl mx-auto py-12 px-6 pt-24">
                <h1 className="text-3xl font-bold mb-6 text-center">
                    Donasi untuk {category === "bencana" ? "Bencana" : "Limbah"} {id}
                </h1>
                <form onSubmit={(e) => e.preventDefault()} className="bg-white p-6 rounded-lg shadow-xl">
                    {/* Switch antara Donasi Uang dan Barang */}
                    <div className="flex mb-6">
                        <button type="button" onClick={() => setDonationType("uang")} className={`flex-1 py-2 text-lg font-semibold ${
                            donationType === "uang" ? "bg-green-600 text-white" : "bg-gray-200"
                        } rounded-l`}>
                            Donasi Uang
                        </button>
                        <button type="button" onClick={() => setDonationType("barang")} className={`flex-1 py-2 text-lg font-semibold ${
                            donationType === "barang" ? "bg-green-600 text-white" : "bg-gray-200"
                        } rounded-r`}>
                            Donasi Barang
                        </button>
                    </div>

                    {/* Form Nama dan Email */}
                    <label>Nama Pengirim</label>
                    <input type="text" value={donationDetails.name} readOnly className="w-full p-2 border rounded mb-4 bg-gray-200" placeholder="Nama Anda"/>
                    <label>Email Pengirim</label>
                    <input type="email" value={donationDetails.email} readOnly className="w-full p-2 border rounded mb-4 bg-gray-200" placeholder="Email Anda"/>

                    {/* Donasi Uang */}
                    {donationType === "uang" ? (
                        <><label>Jumlah Donasi</label>
                        <input type="text" placeholder="Jumlah Donasi (Rp)" value={formatCurrency(donationDetails.amount)} onChange={handleAmountChange} className="w-full p-2 border rounded mb-4" required /></>
                    ) : (
                        <>
                        <label>Nama Barang</label>
                        <input type="text" placeholder="Nama Barang" value={donationDetails.itemName} onChange={(e) =>
                            setDonationDetails((prev) => ({ ...prev, itemName: e.target.value }))
                        } className="w-full p-2 border rounded mb-4" required/>

                        <label>Jumlah Barang</label>
                        <input type="number" placeholder="Jumlah Barang" value={donationDetails.itemQuantity} onChange={(e) =>
                            setDonationDetails((prev) => ({ ...prev, itemQuantity: e.target.value }))
                        } className="w-full p-2 border rounded mb-4" required />

                        <label>Jenis Ekspedisi</label>
                        <div className="flex justify-between mt-2 mb-4">
                            {["JNE", "J&T Express", "SiCepat", "Antar Langsung"].map((kurir) => (
                                <button key={kurir} type="button" className={`px-4 py-2 rounded ${
                                    selectedKurir === kurir ? "bg-green-600 text-white" : "bg-gray-200"
                                }`} onClick={() => handleKurirSelect(kurir)}>
                                    {kurir}
                                </button>
                            ))}
                        </div></>
                    )}

                    <label>Pesan</label>
                    <textarea placeholder="Pesan (Opsional)" value={message} onChange={(e) => setMessage(e.target.value)} className="w-full p-2 border rounded mb-4"></textarea>

                    <label className="flex items-center mb-4">
                        <input type="checkbox" checked={isAgreed} onChange={() => setIsAgreed(!isAgreed)} className="mr-2" />
                        Saya menyetujui syarat dan ketentuan.
                    </label>

                    <button type="button" onClick={donationType === "uang" ? handleMidtransPayment : handleSubmit} disabled={!isAgreed || (user?.role === "komunitas")} className={`w-full px-4 py-2 rounded ${
                        isAgreed && user?.role !== "komunitas" ? "bg-green-600 text-white hover:bg-green-700" : "bg-gray-400 text-gray-800"
                    }`}>
                        {user?.role === "komunitas" ? "Akun Komunitas Tidak Bisa Donasi" : "Kirim Donasi"}
                    </button>
                </form>
            </div>
        </div>
    );
}