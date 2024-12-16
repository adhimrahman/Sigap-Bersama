import express from "express";
import midtransClient from "midtrans-client";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();

// Tambahkan middleware CORS
app.use(cors({
    origin: "http://localhost:5173",
    // origin: "https://sigap-bersama.vercel.app/",
    methods: "POST",
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

app.post("/api/midtrans", async (req, res) => {
    try {
        const { orderId, amount, name, email } = req.body;

        const snap = new midtransClient.Snap({
            isProduction: false,
            // eslint-disable-next-line no-undef
            serverKey: process.env.MIDTRANS_SERVER_KEY,
        });

        const parameter = {
            transaction_details: { order_id: orderId, gross_amount: parseInt(amount) },
            customer_details: { first_name: name, email: email },
        };

        const transaction = await snap.createTransaction(parameter);
        res.status(200).json({ token: transaction.token });
    } catch (error) {
        console.error("Midtrans Error Stack:", error);
        res.status(500).json({ error: "Failed to create transaction", message: error.message });
    }
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});
