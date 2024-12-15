import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { firestore } from "../../api/firebaseConfig";
import { doc, collection, getDocs, setDoc } from "firebase/firestore";

export default function BencanaDonatePage() {
    const { id } = useParams();
    const navigate = useNavigate(); // Untuk navigasi
    const [donationType, setDonationType] = useState("uang");
    const [donationValue, setDonationValue] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const donationRef = collection(firestore, `bencana/${id}/donasi`);
            const snapshot = await getDocs(donationRef);

            // Hitung ID baru berdasarkan jumlah dokumen di koleksi
            const newId = snapshot.size + 1;

            // Simpan donasi dengan ID baru
            const newDonationDoc = doc(donationRef, newId.toString());
            await setDoc(newDonationDoc, {
                id: newId,
                type: donationType,
                value: donationValue,
                message: message,
                createdAt: new Date(),
            });

            alert("Donasi berhasil dikirim! Terima kasih atas kontribusi Anda.");
            setDonationValue("");
            setMessage("");

            // Navigasi kembali ke halaman detail
            navigate(`/bencanadetail/${id}`);
        } catch (error) {
            console.error("Error submitting donation:", error);
            alert("Terjadi kesalahan saat mengirim donasi.");
        }
    };

    return (
        <div className="max-w-3xl mx-auto py-12">
            <h1 className="text-2xl font-bold mb-6">Donasi untuk Bencana #{id}</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Jenis Donasi</label>
                    <select
                        value={donationType}
                        onChange={(e) => setDonationType(e.target.value)}
                        className="w-full p-2 border rounded"
                    >
                        <option value="uang">Uang</option>
                        <option value="barang">Barang</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Jumlah / Barang</label>
                    <input
                        type="text"
                        value={donationValue}
                        onChange={(e) => setDonationValue(e.target.value)}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Pesan (Opsional)</label>
                    <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="w-full p-2 border rounded"
                        rows="3"
                    ></textarea>
                </div>
                <button
                    type="submit"
                    className="px-6 py-2 bg-green-600 text-white font-bold rounded hover:bg-green-700"
                >
                    Kirim Donasi
                </button>
            </form>
        </div>
    );
}
