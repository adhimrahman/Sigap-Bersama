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
                const addedEventKeys = new Set(); // Set untuk memastikan ID unik berdasarkan eventType

                // Fetch data dari koleksi "bencana" dan "limbah"
                const eventCollections = ["bencana", "limbah"];
                for (const collectionName of eventCollections) {
                    const eventRef = collection(firestore, collectionName);
                    const eventSnapshot = await getDocs(eventRef);

                    for (const eventDoc of eventSnapshot.docs) {
                        const data = eventDoc.data();
                        const eventKey = `${collectionName}-${eventDoc.id}`; // ID unik dengan prefix jenis koleksi

                        // Periksa apakah user bergabung di subkoleksi "relawan"
                        const relawanRef = collection(eventDoc.ref, "relawan");
                        const relawanSnapshot = await getDocs(relawanRef);

                        const isUserJoined = relawanSnapshot.docs.some(
                            (relawanDoc) => relawanDoc.data().userId === user.uid
                        );

                        // Hanya tambahkan jika belum ada di Set dan user berpartisipasi
                        if (isUserJoined && !addedEventKeys.has(eventKey)) {
                            addedEventKeys.add(eventKey); // Tambahkan ke Set
                            const creatorName = await getCreatorName(data.creator);

                            joinedEvents.push({
                                id: eventDoc.id,
                                title: data.title || "No Title",
                                image: data.image || "https://placehold.co/600x400",
                                date: data.date?.toDate?.()?.toLocaleString("id-ID") || "No Date",
                                locate: data.locate || "Unknown Location",
                                creator: creatorName,
                                eventType: collectionName,
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
                    <div className="w-full px-4 sm:px-12 md:px-12 lg:px-24 p-4 mt-20 mb-16">
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
                            <div className="min-h-96 text-center flex items-center justify-center">
                                <p className="text-lg text-gray-500">
                                    Tidak ada event yang cocok dengan pencarian Anda.
                                </p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                {filteredEvents.map((item) => (
                                    <CardEvent
                                        key={`${item.eventType}-${item.id}`} // Key unik
                                        id={item.id}
                                        title={item.title}
                                        image={item.image}
                                        creator={item.creator}
                                        date={item.date}
                                        locate={item.locate}
                                        detailPath={`/${item.eventType}/detail/${item.id}`}
                                        className="w-full h-auto"
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
