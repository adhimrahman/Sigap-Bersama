import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../../api/firebaseConfig";
import { getCreatorName } from '../../utils/firestoreUtils';

import Navbar from "../../components/layouts/Navbar";
import Footer from "../../components/layouts/Footer";
import SearchBar from "../../components/forms/SearchBar";
import CardEvent from "../../components/cards/cardEvent";
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

                const limbahList = await Promise.all(
                    limbahSnapshot.docs.map(async (doc) => {
                        const data = doc.data();
                        const date = data.date instanceof Date
                            ? data.date.toLocaleString()
                            : data.date?.toDate?.()?.toLocaleString() || "Tanggal tidak valid";
                        const creatorName = await getCreatorName(data.creator);
        
                        return { id: doc.id, ...data, date,
                            registUntil: data.registUntil?.toDate().toLocaleString(),
                            creator: creatorName,
                        };
                    })
                )
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
            (item.name?.toLowerCase()?.includes(query) || false) ||
            (item.creator?.toLowerCase()?.includes(query) || false) ||
            (item.locate?.toLowerCase()?.includes(query) || false)
        );
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
    
    return (
        <>
        {isLoading ? ( <Spinner /> ) : (
            <><Navbar pageKeys={['landingPage', 'navBencana', 'navLimbah', 'shop', 'contactUs']} />
            <div className="w-full px-9 sm:px-12 md:px-12 lg:px-24 p-4 mt-20 mb-12">
                <h1 className="text-4xl font-bold tracking-wider text-center pt-9 mb-8 capitalize">limbah</h1>
            
                <SearchBar query={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />

                <div className="cards grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-9">
                    {filteredLimbah.map((item) => (
                        <CardEvent key={item.id} {...item} detailPath="limbahdetail" />
                    ))}
                </div>
            </div>
            <Footer /></>
        )} 
        </>
    );
};