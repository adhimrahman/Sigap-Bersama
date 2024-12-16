import axios from "axios";

export const requestSnapToken = async ({ orderId, amount, name, email }) => {
    try {
        // Ubah ke URL API Routes di Vercel
        const response = await axios.post("/api/midtrans", { orderId, amount, name, email });
        console.log("Snap Token:", response.data.token);
        return response.data.token;
    } catch (error) {
        console.error("Error fetching Snap Token:", error);
        throw error;
    }
};