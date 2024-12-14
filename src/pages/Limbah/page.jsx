import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../../api/firebaseConfig";

import Navbar from "../../components/layouts/Navbar";
import Footer from "../../components/layouts/Footer";
import CardEvent from "../../components/cards/cardEvent";
import SearchBar from "../../components/forms/SearchBar";
import Spinner from "../../components/Spinner";

export default function Limbah() {
    const [limbahData, setLimbahData] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchLimbah = async () => {
            try {
                const limbahCollection = collection(firestore, "limbah")
                const limbahSnapshot = await getDocs(limbahCollection)

                const limbahList = limbahSnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data()
                }))

                setLimbahData(limbahList)
            } catch(err) { console.log("tolong jangan error : ", err)
            } finally { setTimeout(() => setIsLoading(false), 350) }
        };
        fetchLimbah(); // call function saat komponen di-load
    }, []);  
    
        // Filter limbah data berdasarkan query pencarian
        const filteredLimbah = limbahData.filter((item) => {
            const query = searchQuery.toLowerCase();
            return (
                item.name.toLowerCase().includes(query) ||
                item.creator.toLowerCase().includes(query) ||
                item.locate.toLowerCase().includes(query)
            );
        });

    window.scrollTo({ top: 0, behavior: "smooth" });
    
    return (
        <>
        {isLoading ? ( <Spinner /> ) : (
            <>
            <Navbar pageKeys={['landingPage', 'navBencana', 'navLimbah', 'contactUs']} />

            <div className="w-full px-9 sm:px-12 md:px-12 lg:px-24 p-4 mt-20 mb-12">
                <h1 className="text-4xl font-bold tracking-wider text-center pt-9 mb-8 capitalize">limbah</h1>
            
            <SearchBar query={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />

                <div className="cards grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-9">
                    {filteredLimbah.map((item) => (
                        <CardEvent key={item.id} {...item} detailPath="limbahdetail" />
                    ))}
                </div>
            </div>

            <Footer />
            </>
        )} 
        </>
    );
};