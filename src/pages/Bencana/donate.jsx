import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { firestore } from "../../api/firebaseConfig";
import { doc, collection, getDocs, setDoc } from "firebase/firestore";
import Swal from "sweetalert2";
import Navbar from "../../components/layouts/Navbar";

export default function BencanaDonatePage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [donationType, setDonationType] = useState("uang");
    const [donationDetails, setDonationDetails] = useState({
        amount: "",
        paymentMethod: "",
        itemName: "",
        itemQuantity: "",
    });
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const result = await Swal.fire({
                title: "Konfirmasi Donasi",
                text: "Apakah Anda yakin ingin mengirim donasi ini?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#365E32",
                cancelButtonColor: "#d33",
                confirmButtonText: "Ya, Kirim!",
                cancelButtonText: "Batal",
            });
            if (!result.isConfirmed) return;

            const donationRef = collection(firestore, `bencana/${id}/donasi`);
            const snapshot = await getDocs(donationRef);

            // Hitung ID baru berdasarkan jumlah dokumen di koleksi
            const newId = snapshot.size + 1;

            // Siapkan data donasi
            const donationData = {
                id: newId,
                type: donationType,
                details: { ...donationDetails },
                message: message,
                createdAt: new Date(),
            };

            // Simpan donasi ke Firestore
            const newDonationDoc = doc(donationRef, newId.toString());
            await setDoc(newDonationDoc, donationData);

            await Swal.fire({
                title: "Berhasil!",
                text: "Donasi berhasil dikirim. Terima kasih atas kontribusi Anda.",
                icon: "success",
                confirmButtonColor: "#365E32",
            });

            // Reset form dan kembali ke halaman detail
            setDonationDetails({ amount: "", paymentMethod: "", itemName: "", itemQuantity: "" });
            setMessage("");
            navigate(`/bencanadetail/${id}`);
        } catch (error) {
            console.error("Error submitting donation:", error);
            await Swal.fire({
                title: "Error!",
                text: "Terjadi kesalahan saat mengirim donasi.",
                icon: "error",
                confirmButtonColor: "#d33",
            });
        }
    };

    return (
        <div className="w-full bg-gray-300 min-h-screen">
            <Navbar />
            <button
                onClick={() => navigate(-1)}
                className="fixed top-28 left-9 bg-ijoTua text-white w-12 h-12 flex items-center justify-center rounded-full shadow-lg hover:bg-green-600 transition duration-300"
            >
                <img
                    src="https://img.icons8.com/external-freebies-bomsymbols-/91/external-audio-doodle-audio-video-game-freebies-bomsymbols--33.png"
                    alt="Back"
                />
            </button>
            <div className="max-w-3xl mx-auto py-12 px-6 pt-24">
                <h1 className="text-3xl font-bold mb-6">Donasi untuk Bencana #{id}</h1>
                <form onSubmit={handleSubmit} className="bg-[#F0F0F0] p-6 rounded-lg md:grid-cols-2 gap-6 shadow-2xl">
                    <div>
                        <label>Jenis Donasi</label>
                        <select
                            value={donationType}
                            onChange={(e) => setDonationType(e.target.value)}
                            className="w-full p-2 border border-ijoTua rounded mb-4"
                        >
                            <option value="uang">Uang</option>
                            <option value="barang">Barang</option>
                        </select>

                        {donationType === "uang" && (
                            <>
                                <label>Jumlah Uang</label>
                                <input
                                    type="number"
                                    value={donationDetails.amount}
                                    onChange={(e) => setDonationDetails({ ...donationDetails, amount: e.target.value })}
                                    className="w-full p-2 border rounded mb-4"
                                    placeholder="Masukkan jumlah uang"
                                    required
                                />

                                <label>Metode Pembayaran</label>
                                <select
                                    value={donationDetails.paymentMethod}
                                    onChange={(e) => setDonationDetails({ ...donationDetails, paymentMethod: e.target.value })}
                                    className="w-full p-2 border rounded mb-4"
                                    required
                                >
                                    <option value="">Pilih Metode</option>
                                    <option value="Transfer Bank">Transfer Bank</option>
                                    <option value="QRIS">QRIS</option>
                                    <option value="Gopay">Gopay</option>
                                    <option value="OVO">OVO</option>
                                </select>
                            </>
                        )}

                        {donationType === "barang" && (
                            <>
                                <label>Nama Barang</label>
                                <input
                                    type="text"
                                    value={donationDetails.itemName}
                                    onChange={(e) => setDonationDetails({ ...donationDetails, itemName: e.target.value })}
                                    className="w-full p-2 border rounded mb-4"
                                    placeholder="Masukkan nama barang"
                                    required
                                />

                                <label>Jumlah Barang</label>
                                <input
                                    type="number"
                                    value={donationDetails.itemQuantity}
                                    onChange={(e) => setDonationDetails({ ...donationDetails, itemQuantity: e.target.value })}
                                    className="w-full p-2 border rounded mb-4"
                                    placeholder="Masukkan jumlah barang"
                                    required
                                />

                                <label>Metode Pengiriman</label>
                                <select
                                    value={donationDetails.paymentMethod}
                                    onChange={(e) => setDonationDetails({ ...donationDetails, paymentMethod: e.target.value })}
                                    className="w-full p-2 border rounded mb-4"
                                    required
                                >
                                    <option value="">Pilih Metode Pengiriman</option>
                                    <option value="JNE">JNE</option>
                                    <option value="TIKI">TIKI</option>
                                    <option value="POS Indonesia">POS Indonesia</option>
                                    <option value="GoSend">GoSend</option>
                                    <option value="GrabExpress">GrabExpress</option>
                                    <option value="Antar Langsung">Antar Langsung</option>
                                    <option value="Ambil di Tempat">Ambil di Tempat</option>
                                </select>
                            </>
                        )}

                        <label>Pesan (Opsional)</label>
                        <textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className="w-full p-2 border rounded mb-4"
                            rows="3"
                            placeholder="Tambahkan pesan untuk donasi Anda"
                        ></textarea>
                    </div>
                    <div className="col-span-2 text-right">
                        <button type="submit" className="bg-ijoTua text-white px-4 py-2 rounded hover:bg-green-600">
                            Kirim Donasi
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
