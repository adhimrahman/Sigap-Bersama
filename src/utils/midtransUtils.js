import axios from "axios";

export const requestSnapToken = async ({ orderId, amount, name, email }) => {
    try {
        const response = await axios.post("http://localhost:5000/api/midtrans", {
            orderId,
            amount,
            name,
            email,
        });

        console.log("Snap Token:", response.data.token);
        return response.data.token;
    } catch (error) {
        console.error("Error fetching Snap Token:", error);
        throw error;
    }
};
