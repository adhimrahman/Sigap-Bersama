import midtransClient from "midtrans-client";

export default async function handler(req, res) {
    if (req.method === "POST") {
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
            console.error("Midtrans Error:", error);
            res.status(500).json({ error: "Failed to create transaction", message: error.message });
        }
    } else {
        res.setHeader("Allow", ["POST"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
