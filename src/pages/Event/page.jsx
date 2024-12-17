import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../../../api/firebaseConfig";
import { useParams } from "react-router-dom";
import { getCreatorName } from "../../utils/firestoreUtils";

import Navbar from "../../components/layouts/Navbar";
import Footer from "../../components/layouts/Footer";
import SearchBar from "../../components/forms/SearchBar";
import CardEvent from "../../components/cards/cardEvent";
import Spinner from "../../components/Spinner";

export default function EventPage() {
    const { eventType } = useParams();
    const [eventData, setEventData] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const eventCollection = collection(firestore, eventType);
                const eventSnapshot = await getDocs(eventCollection);

                const eventList = await Promise.all(
                    eventSnapshot.docs.map(async (doc) => {
                        const data = doc.data();
                        const creatorName = await getCreatorName(data.creator);
                        const date = data.date?.toDate?.()?.toLocaleString() || "Tanggal tidak valid";

                        return { id: doc.id, ...data, date, creator: creatorName };
                    })
                );
                setEventData(eventList);
            } catch (err) { console.error("Error fetching data:", err);
            } finally { setTimeout(() => setIsLoading(false), 350) }
        };
        fetchEvents();
    }, [eventType]);

    const filteredEvents = eventData.filter((item) => {
        const query = searchQuery.toLowerCase();
        return (
            item.title?.toLowerCase().includes(query) ||
            item.creator?.toLowerCase().includes(query) ||
            item.locate?.toLowerCase().includes(query)
        );
    });

    window.scrollTo({ top: 0, behavior: "smooth" });

    return (
        <>
            {isLoading ? ( <Spinner /> ) : (
                <><Navbar pageKeys={['landingPage', 'navBencana', 'navLimbah', 'shop', 'contactUs']} />
                <div className="w-full px-9 sm:px-12 md:px-12 lg:px-24 p-4 mt-20 mb-16">
                    <h1 className="text-4xl font-bold tracking-wider text-center pt-9 mb-8 capitalize">
                        {eventType === "bencana" ? "Kegiatan Bencana" : "Kegiatan Lingkungan"}
                    </h1>
                    <SearchBar query={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                    {filteredEvents.length === 0 ? (
                        <div className="cards min-h-96 text-center">
                            <p className="text-lg text-gray-500">Tidak ada data kegiatan {eventType === "limbah" ? "lingkungan" : "bencana"} yang cocok dengan pencarian Anda.</p>
                        </div>
                    ) : (
                        <div className="cards grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-9 min-h-96">
                            {filteredEvents.map((item) => (
                                <CardEvent key={item.id} {...item} detailPath={`/${eventType}/detail/${item.id}`} />
                            ))}
                        </div>
                    )}
                </div>
                <Footer /></>
            )}
        </>
    );
}
