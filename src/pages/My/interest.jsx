import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../../../api/firebaseConfig";
import { getAuth } from "firebase/auth";
import { getCreatorName } from "../../utils/firestoreUtils";

import Navbar from "../../components/layouts/Navbar";
import Footer from "../../components/layouts/Footer";
import SearchBar from "../../components/forms/SearchBar";
import CardEvent from "../../components/cards/cardEvent";
import Spinner from "../../components/Spinner";

export default function MyInterest() {
    const [isLoading, setIsLoading] = useState(true);
    const [eventData, setEventData] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const fetchJoinedEvents = async () => {
            const auth = getAuth();
            const user = auth.currentUser;

            if (!user) {
                console.error("User not logged in");
                return;
            }

            try {
                setIsLoading(true);
                const joinedEvents = [];

                // Fetch data dari koleksi "bencana" dan "limbah"
                const eventCollections = ["bencana", "limbah"];
                for (const collectionName of eventCollections) {
                    const eventRef = collection(firestore, collectionName);
                    const eventSnapshot = await getDocs(eventRef);

                    for (const eventDoc of eventSnapshot.docs) {
                        const data = eventDoc.data();

                        // Periksa apakah user berpartisipasi di subkoleksi "relawan"
                        const relawanRef = collection(eventDoc.ref, "relawan");
                        const relawanSnapshot = await getDocs(relawanRef);

                        const isUserJoined = relawanSnapshot.docs.some(
                            (relawanDoc) => relawanDoc.data().userId === user.uid
                        );

                        if (isUserJoined) {
                            const creatorName = await getCreatorName(data.creator);
                            const date = data.date?.toDate?.()?.toLocaleString("id-ID") || "No Date";

                            joinedEvents.push({
                                id: eventDoc.id,
                                title: data.title || "No Title",
                                image: data.image || "https://placehold.co/600x400",
                                date,
                                locate: data.locate || "Unknown Location",
                                creator: creatorName,
                                eventType: collectionName, // Tambahkan jenis event
                            });
                        }
                    }
                }

                setEventData(joinedEvents);
            } catch (error) {
                console.error("Error fetching joined events:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchJoinedEvents();
    }, []);

    // Filter data berdasarkan query pencarian
    const filteredEvents = eventData.filter((item) => {
        const query = searchQuery.toLowerCase();
        return (
            item.title?.toLowerCase().includes(query) ||
            item.creator?.toLowerCase().includes(query) ||
            item.locate?.toLowerCase().includes(query)
        );
    });

    return (
        <>
            {isLoading ? (
                <Spinner />
            ) : (
                <>
                    <Navbar pageKeys={['landingPage', 'navBencana', 'navLimbah', 'shop', 'contactUs']} />
                    <div className="w-full px-9 sm:px-12 md:px-12 lg:px-24 p-4 mt-20 mb-16">
                        <h1 className="text-4xl font-bold tracking-wider text-center pt-9 mb-8 capitalize">
                            Event yang Diikuti
                        </h1>

                        {/* Search Bar */}
                        <SearchBar
                            query={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />

                        {/* Event Cards */}
                        {filteredEvents.length === 0 ? (
                            <div className="cards min-h-96 text-center">
                                <p className="text-lg text-gray-500">
                                    Tidak ada event yang cocok dengan pencarian Anda.
                                </p>
                            </div>
                        ) : (
                            <div className="cards grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-9 min-h-96">
                                {filteredEvents.map((item) => (
                                    <CardEvent
                                        key={item.id}
                                        {...item}
                                        detailPath={`/${item.eventType}/detail/${item.id}`}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                    <Footer />
                </>
            )}
        </>
    );
}
