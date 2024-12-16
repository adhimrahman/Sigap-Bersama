import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { firestore, auth } from "../../../api/firebaseConfig";
import { doc, collection, getDocs, setDoc } from "firebase/firestore";
import { requestSnapToken } from "../../utils/midtransUtils";
import { onAuthStateChanged } from "firebase/auth";
import Swal from "sweetalert2";
import Navbar from "../../components/layouts/Navbar";

export default function LimbahDonatePage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [donationType, setDonationType] = useState("uang");
    const [donationDetails, setDonationDetails] = useState({
        name: "",
        email: "",
        amount: "",
        paymentMethod: "",
        itemName: "",
        itemQuantity: "",
        kurir: "",
    });
    const [selectedKurir, setSelectedKurir] = useState("");
    const [message, setMessage] = useState("");
    const [isAgreed, setIsAgreed] = useState(false);
    const [user, setUser] = useState(null);

    // Ambil user dari Firebase Authentication
    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
                setDonationDetails((prev) => ({
                    ...prev,
                    name: currentUser.displayName || "User",
                    email: currentUser.email || "",
                }));
            }
        });
    }, []);
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

    const handleMidtransPayment = async () => {
        const confirmation = await confirmSubmission();
        if (!confirmation.isConfirmed) return;

        try {
            const orderId = `order-${Date.now()}`;
            const snapToken = await requestSnapToken({
                orderId,
                amount: donationDetails.amount,
                name: donationDetails.name,
                email: donationDetails.email,
            });

            window.snap.pay(snapToken, {
                onSuccess: async () => {
                    await handleSubmit();
                    Swal.fire("Success!", "Pembayaran berhasil!", "success");
                },
                onError: () => {
                    Swal.fire("Error!", "Pembayaran gagal.", "error");
                },
            });
        } catch (error) {
            console.error("Midtrans Error:", error);
            Swal.fire("Error!", "Gagal memproses pembayaran.", "error");
        }
    };

    const handleSubmit = async () => {
        const confirmation = await confirmSubmission();
        if (!confirmation.isConfirmed) return;

        if (!isAgreed) {
            Swal.fire("Error!", "Harap menyetujui ketentuan terlebih dahulu.", "warning");
            return;
        }

        try {
            const donationRef = collection(firestore, `limbah/${id}/donasi`);
            const snapshot = await getDocs(donationRef);
            const newId = snapshot.size + 1;

            const donationData = {
                id: newId,
                type: donationType,
                details: { ...donationDetails },
                message: message,
                createdAt: new Date(),
            };

            const newDonationDoc = doc(donationRef, newId.toString());
            await setDoc(newDonationDoc, donationData);

            Swal.fire({
                title: "Berhasil!",
                text: "Donasi Anda telah dikirim. Terima kasih!",
                icon: "success",
            });

            navigate(`/limbah/${id}`);
        } catch (error) {
            console.error("Error submitting donation:", error);
            Swal.fire("Error!", "Terjadi kesalahan saat mengirim donasi.", "error");
        }
    };

    return (
        <div className="w-full bg-gray-300 min-h-screen">
            <Navbar />
            <div className="max-w-3xl mx-auto py-12 px-6 pt-24">
                <h1 className="text-3xl font-bold mb-6 text-center">Donasi untuk Limbah #{id}</h1>
                <form onSubmit={(e) => e.preventDefault()} className="bg-white p-6 rounded-lg shadow-xl">
                    {/* Switch antara Donasi Uang dan Barang */}
                    <div className="flex mb-6">
                        <button
                            type="button"
                            onClick={() => setDonationType("uang")}
                            className={`flex-1 py-2 text-lg font-semibold ${
                                donationType === "uang" ? "bg-green-600 text-white" : "bg-gray-200"
                            } rounded-l`}
                        >
                            Donasi Uang
                        </button>
                        <button
                            type="button"
                            onClick={() => setDonationType("barang")}
                            className={`flex-1 py-2 text-lg font-semibold ${
                                donationType === "barang" ? "bg-green-600 text-white" : "bg-gray-200"
                            } rounded-r`}
                        >
                            Donasi Barang
                        </button>
                    </div>

                    {/* Form Nama dan Email */}
                    <input
                        type="text"
                        value={donationDetails.name}
                        readOnly
                        className="w-full p-2 border rounded mb-4 bg-gray-200"
                        placeholder="Nama Anda"
                    />
                    <input
                        type="email"
                        value={donationDetails.email}
                        readOnly
                        className="w-full p-2 border rounded mb-4 bg-gray-200"
                        placeholder="Email Anda"
                    />

                    {/* Donasi Uang */}
                    {donationType === "uang" ? (
                        <>
                            <input
                                type="number"
                                placeholder="Jumlah Donasi (Rp)"
                                value={donationDetails.amount}
                                onChange={(e) =>
                                    setDonationDetails((prev) => ({ ...prev, amount: e.target.value }))
                                }
                                className="w-full p-2 border rounded mb-4"
                                required
                            />
                        </>
                    ) : (
                        <>
                            {/* Donasi Barang */}
                            <input
                                type="text"
                                placeholder="Nama Barang"
                                value={donationDetails.itemName}
                                onChange={(e) =>
                                    setDonationDetails((prev) => ({ ...prev, itemName: e.target.value }))
                                }
                                className="w-full p-2 border rounded mb-4"
                                required
                            />
                            <input
                                type="number"
                                placeholder="Jumlah Barang"
                                value={donationDetails.itemQuantity}
                                onChange={(e) =>
                                    setDonationDetails((prev) => ({ ...prev, itemQuantity: e.target.value }))
                                }
                                className="w-full p-2 border rounded mb-4"
                                required
                            />
                            <div className="flex justify-between mb-4">
                                {["JNE", "J&T Express", "SiCepat", "Antar Langsung"].map((kurir) => (
                                    <button
                                        key={kurir}
                                        type="button"
                                        className={`px-4 py-2 rounded ${
                                            selectedKurir === kurir ? "bg-green-600 text-white" : "bg-gray-200"
                                        }`}
                                        onClick={() => handleKurirSelect(kurir)}
                                    >
                                        {kurir}
                                    </button>
                                ))}
                            </div>
                        </>
                    )}

                    {/* Pesan */}
                    <textarea
                        placeholder="Pesan (Opsional)"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="w-full p-2 border rounded mb-4"
                    ></textarea>

                    {/* Checkbox Setuju */}
                    <label className="flex items-center mb-4">
                        <input
                            type="checkbox"
                            checked={isAgreed}
                            onChange={() => setIsAgreed(!isAgreed)}
                            className="mr-2"
                        />
                        Saya menyetujui syarat dan ketentuan.
                    </label>

                    {/* Tombol Submit */}
                    <div className="text-right">
                        <button
                            type="button"
                            disabled={!isAgreed}
                            onClick={donationType === "uang" ? handleMidtransPayment : handleSubmit}
                            className={`px-4 py-2 rounded ${
                                isAgreed ? "bg-green-600 text-white hover:bg-green-700" : "bg-gray-400 text-gray-800"
                            }`}
                        >
                            Kirim Donasi
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
