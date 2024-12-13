import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../../api/firebaseConfig";

import PageLayout from "../../components/layouts/PageLayout";
import SearchBar from "../../components/forms/SearchBar";
import CardEvent from "../../components/cards/cardEvent";

export default function Bencana() {
    const [bencanaData, setBencanaData] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const fetchBencana = async () => {
            try {
                const bencanaCollection = collection(firestore, "bencana");
                const bencanaSnapshot = await getDocs(bencanaCollection);
                const bencanaList = bencanaSnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setBencanaData(bencanaList);
            } catch (err) { console.log("tolong jangan error : ", err) }
        };
        fetchBencana(); // call function saat komponen di-load
    }, []);

    // Fungsi untuk menangani perubahan pada input pencarian
    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    // Filter bencana data berdasarkan query pencarian
    const filteredBencana = bencanaData.filter((item) => {
        const query = searchQuery.toLowerCase();
        return (
            item.name.toLowerCase().includes(query) ||
            item.creator.toLowerCase().includes(query) ||
            item.locate.toLowerCase().includes(query)
        );
    });

    window.scrollTo({ top: 0, behavior: "smooth" });

    return (
        <PageLayout>
            <h1 className="text-4xl font-bold tracking-wider text-center pt-9 mb-8 capitalize">Bencana</h1>
            
            <SearchBar query={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
            
            <div className="cards grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-9">
                {filteredBencana.map((item) => (
                    <CardEvent key={item.id} {...item} detailPath="bencanadetail" />
                ))}
            </div>
        </PageLayout>
    );
}