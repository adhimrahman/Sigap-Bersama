import { useState } from "react";
import { requestSnapToken } from "../../utils/midtransUtils"; // Pastikan path sudah benar

export default function MidtransPayment() {
    const [amount, setAmount] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    const handlePayment = async () => {
        try {
            const orderId = `order-${Date.now()}`; // ID unik transaksi
            const response = await requestSnapToken({ orderId, amount, name, email });

            // Memuat Snap Midtrans
            window.snap.pay(response.token, {
                onSuccess: (result) => {
                    console.log("Payment Success:", result);
                    alert("Pembayaran berhasil!");
                },
                onPending: (result) => {
                    console.log("Payment Pending:", result);
                    alert("Menunggu pembayaran...");
                },
                onError: (error) => {
                    console.log("Payment Failed:", error);
                    alert("Pembayaran gagal!");
                },
            });
        } catch (error) {
            console.error("Payment Error:", error.message);
            alert("Terjadi kesalahan, silakan coba lagi.");
        }
    };

    return (
        <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded shadow">
            <h2 className="text-2xl font-bold mb-4">Form Pembayaran</h2>
            <input
                type="text"
                placeholder="Nama"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 border rounded mb-4"
            />
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border rounded mb-4"
            />
            <input
                type="number"
                placeholder="Jumlah Donasi (Rp)"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full p-2 border rounded mb-4"
            />
            <button
                onClick={handlePayment}
                className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700"
            >
                Bayar Sekarang
            </button>
        </div>
    );
}
