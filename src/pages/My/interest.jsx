import { useEffect, useState } from "react";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { firestore } from "../../../api/firebaseConfig";
import { getAuth } from "firebase/auth";

import Navbar from "../../components/layouts/Navbar";
import Footer from "../../components/layouts/Footer";
import SearchBar from "../../components/forms/SearchBar";
import CardEvent from "../../components/cards/cardEvent";
import Spinner from "../../components/Spinner";

export default function MyInterest() {
    const [isLoading, setIsLoading] = useState(true);
    const [bencanaEvents, setBencanaEvents] = useState([]);
    const [filteredBencana, setFilteredBencana] = useState([]);
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
                const bencanaRef = collection(firestore, "bencana");
                const bencanaSnapshot = await getDocs(bencanaRef);

                const joinedEvents = [];

                for (const bencanaDoc of bencanaSnapshot.docs) {
                    const relawanRef = collection(bencanaDoc.ref, "relawan");
                    const relawanSnapshot = await getDocs(relawanRef);

                    // Periksa apakah userId ada di subkoleksi relawan
                    const isUserJoined = relawanSnapshot.docs.some(
                        (relawanDoc) => relawanDoc.data().userId === user.uid
                    );

                    if (isUserJoined) {
                        const eventData = bencanaDoc.data();
                        let creatorName = "Unknown Creator";

                        // Ambil nama creator dari referensi
                        if (eventData.creator) {
                            try {
                                const creatorDoc = await getDoc(eventData.creator);
                                if (creatorDoc.exists()) {
                                    creatorName = creatorDoc.data().communityName || "Unknown Creator";
                                }
                            } catch (error) {
                                console.error(`Error fetching creator for ${bencanaDoc.id}:`, error);
                            }
                        }

                        joinedEvents.push({
                            id: bencanaDoc.id,
                            title: eventData.title || "No Title",
                            image: eventData.image || "https://placehold.co/600x400",
                            date: eventData.date
                                ? eventData.date.toDate().toLocaleDateString("id-ID")
                                : "No Date",
                            locate: eventData.locate || "Unknown Location",
                            creator: creatorName,
                        });
                    }
                }

                setBencanaEvents(joinedEvents);
                setFilteredBencana(joinedEvents); // Set data yang difilter
            } catch (error) {
                console.error("Error fetching joined events:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchJoinedEvents();
    }, []);

    // Filter data berdasarkan search query
    useEffect(() => {
        setFilteredBencana(
            bencanaEvents.filter((item) =>
                item.title.toLowerCase().includes(searchQuery.toLowerCase())
            )
        );
    }, [searchQuery, bencanaEvents]);

    return (
        <>
            {isLoading ? (
                <Spinner />
            ) : (
                <>
                    <Navbar pageKeys={['landingPage', 'navBencana', 'navLimbah', 'shop', 'contactUs']} />
                    <div className="w-full px-9 sm:px-12 md:px-12 lg:px-24 p-4 mt-20 mb-12">
                        <h1 className="text-4xl font-bold tracking-wider text-center pt-9 mb-8 capitalize">
                            Event yang Diikuti
                        </h1>

                        {/* Search Bar */}
                        <SearchBar
                            query={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />

                        {/* Cards */}
                        <div className="cards grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-9">
                            {filteredBencana.map((item) => (
                                <CardEvent key={item.id} {...item} detailPath="bencanadetail" />
                            ))}
                        </div>
                    </div>
                    <Footer />
                </>
            )}
        </>
    );
}
