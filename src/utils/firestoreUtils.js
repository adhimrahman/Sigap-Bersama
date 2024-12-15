import { getDoc } from "firebase/firestore";

/**
 * Mengambil nama komunitas atau pengguna dari Firestore berdasarkan referensi dokumen.
 * @param {DocumentReference} creatorRef - Reference ke dokumen pengguna di Firestore.
 * @returns {Promise<string>} - Nama komunitas/pengguna atau "Unknown" jika terjadi error.
 */

export const getCreatorName = async (creatorRef) => {
    try {
        const creatorDoc = await getDoc(creatorRef);
        if (creatorDoc.exists()) {
            return creatorDoc.data().communityName || "Unknown";
        }
        return "Unknown";
    } catch (error) {
        console.error("Error fetching creator name:", error);
        return "Unknown";
    }
};