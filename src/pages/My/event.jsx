import { useEffect, useState } from "react";
import { collection, getDocs, doc, query, where } from "firebase/firestore";
import { firestore } from "../../api/firebaseConfig";
import useUser from "../../context/useUser"; // Gunakan hook untuk user context
import Navbar from "../../components/layouts/Navbar";
import Spinner from "../../components/Spinner";
import Footer from "../../components/layouts/Footer";
import { getCreatorName } from "../../utils/firestoreUtils";
import CardEvent from "../../components/cards/cardEvent";
import { useNavigate } from "react-router-dom";

export default function MyEvent() {
    const { user } = useUser();
    const [events, setEvents] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        
        const fetchUserEvents = async () => {
            if (!user) return; // Tunggu hingga user tersedia
            try {
                console.log("Fetching events for user:", user.uid);
    
                // Query untuk bencana
                const bencanaQuery = query(
                    collection(firestore, "bencana"),
                    where("creator", "==", doc(firestore, "users", user.uid)) // Cocokkan reference
                );
                const limbahQuery = query(
                    collection(firestore, "limbah"),
                    where("creator", "==", doc(firestore, "users", user.uid)) // Cocokkan reference
                );
    
                // Ambil snapshot dokumen
                const [bencanaSnapshot, limbahSnapshot] = await Promise.all([
                    getDocs(bencanaQuery),
                    getDocs(limbahQuery),
                ]);
    
                // Map data bencana dan limbah
                const bencanaEvents = await Promise.all(
                    bencanaSnapshot.docs.map(async (doc) => {
                        const data = doc.data();
                        const creatorName = await getCreatorName(data.creator); // Ambil nama creator
                        return {
                            id: doc.id,
                            ...data,
                            date: data.date?.toDate().toLocaleString(), // Konversi timestamp ke string
                            registUntil: data.registUntil?.toDate().toLocaleString(), // Konversi timestamp ke string
                            creatorName, // Tambahkan nama creator ke data event
                            type: "bencana",
                        };
                    })
                );
    
                const limbahEvents = await Promise.all(
                    limbahSnapshot.docs.map(async (doc) => {
                        const data = doc.data();
                        const creatorName = await getCreatorName(data.creator); // Ambil nama creator
                        return {
                            id: doc.id,
                            ...data,
                            date: data.date?.toDate().toLocaleString(), // Konversi timestamp ke string
                            registUntil: data.registUntil?.toDate().toLocaleString(), // Konversi timestamp ke string
                            creatorName, // Tambahkan nama creator ke data event
                            type: "limbah",
                        };
                    })
                );

                const kocak = user.communityType
                console.log("ini adalah aku dan kamu: ", kocak)
    
                // Gabungkan kedua data
                setEvents([...bencanaEvents, ...limbahEvents]);
            } catch (error) {
                console.error("Error fetching events:", error);
            } finally {
                setIsLoading(false);
            }
        };
    
        fetchUserEvents();
    }, [user]);

    return (
        <div className="w-full bg-gray-100">
            <Navbar pageKeys={['landingPage', 'myEvent', 'navLimbah', 'contactUs']} />
            <div className="max-w-7xl mx-auto py-12 px-6 pt-24">
                <h1 className="text-3xl font-bold mb-6">My Events</h1>
                <button onClick={() => navigate("/addEvent")}
                    className="bg-green-500 text-white px-4 py-2 rounded mb-6 hover:bg-green-600"
                >
                    Tambah Event
                </button>

                {isLoading ? (
                    <Spinner />
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {events.map((event) => (
                        <CardEvent
                        key={event.id}
                        id={event.id}
                        image={event.image || "https://placehold.co/600x400"}
                        title={event.title || "Nama tidak tersedia"}
                        creator={event.creatorName || event.creator || "Creator tidak diketahui"}
                        date={event.date || "Tanggal tidak tersedia"}
                        locate={event.locate || "Lokasi tidak tersedia"}
                        detailPath={event.type === "bencana" ? "bencanadetail" : "limbahdetail"}
                    />                    
                    ))}
                </div>
                )}
            </div>
            <Footer />
        </div>
    );
}