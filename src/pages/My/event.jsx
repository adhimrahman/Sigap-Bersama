import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { firestore } from "../../../api/firebaseConfig";
import { getCreatorName } from "../../utils/firestoreUtils";
import { collection, getDocs, doc, query, where } from "firebase/firestore";

import useUser from "../../context/useUser";
import Navbar from "../../components/layouts/Navbar";
import Spinner from "../../components/Spinner";
import CardEvent from "../../components/cards/cardEvent";

export default function MyEvent() {
    const { user } = useUser();
    const [events, setEvents] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        
        const fetchUserEvents = async () => {
            if (!user) return;
            try {
                const bencanaQuery = query(
                    collection(firestore, "bencana"),
                    where("creator", "==", doc(firestore, "users", user.uid))
                );
                const limbahQuery = query(
                    collection(firestore, "limbah"),
                    where("creator", "==", doc(firestore, "users", user.uid))
                );
    
                const [bencanaSnapshot, limbahSnapshot] = await Promise.all([
                    getDocs(bencanaQuery),
                    getDocs(limbahQuery),
                ]);
    
                const bencanaEvents = await Promise.all(
                    bencanaSnapshot.docs.map(async (doc) => {
                        const data = doc.data();
                        const creatorName = await getCreatorName(data.creator);
                        return { id: doc.id, ...data,
                            date: data.date?.toDate().toLocaleString(),
                            registUntil: data.registUntil?.toDate().toLocaleString(),
                            creatorName, type: "bencana",
                        };
                    })
                );
    
                const limbahEvents = await Promise.all(
                    limbahSnapshot.docs.map(async (doc) => {
                        const data = doc.data();
                        const creatorName = await getCreatorName(data.creator);
                        return { id: doc.id, ...data,
                            date: data.date?.toDate().toLocaleString(),
                            registUntil: data.registUntil?.toDate().toLocaleString(),
                            creatorName, type: "limbah",
                        };
                    })
                );
                setEvents([...bencanaEvents, ...limbahEvents]);
            } catch (error) { console.error("Error fetching events:", error)
            } finally { setIsLoading(false) }
        };
        fetchUserEvents();
    }, [user]);

    window.scrollTo({ top: 0, behavior: "smooth" });

    return (
        <div className="w-full bg-gray-100">
            <Navbar pageKeys={['landingPage', 'navBencana', 'navLimbah', 'shop', 'contactUs']} />
            <button onClick={() => navigate(-1)} className="fixed top-28 left-9 bg-ijoTua text-white w-12 h-12 flex items-center justify-center rounded-full shadow-lg hover:bg-green-600 transition duration-300">
                <img src="https://img.icons8.com/external-freebies-bomsymbols-/91/external-audio-doodle-audio-video-game-freebies-bomsymbols--33.png" alt="" />
            </button>
            <div className="max-w-7xl mx-auto py-12 px-6 pt-24">
                <h1 className="text-3xl font-bold mb-6">My Events</h1>
                <button onClick={() => navigate("/addEvent")}
                className="bg-ijoTua text-white px-4 py-2 rounded mb-6 hover:bg-green-700">Tambah Event</button>

                {isLoading ? ( <Spinner /> ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {events.map((event) => (
                        <CardEvent key={event.id} id={event.id} image={event.image || "https://placehold.co/600x400"}
                        title={event.title || "Nama tidak tersedia"}
                        creator={event.creatorName || event.creator || "Creator tidak diketahui"}
                        date={event.date || "Tanggal tidak tersedia"}
                        locate={event.locate || "Lokasi tidak tersedia"}
                        detailPath={event.type === "bencana" ? "bencanadetail" : "limbahdetail"}/>                    
                    ))}
                    </div>
                )}
            </div>
        </div>
    );
}