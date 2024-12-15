import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import { useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../../api/firebaseConfig";
import { getCreatorName } from '../../utils/firestoreUtils';

import Navbar from "../../components/layouts/Navbar";
import MapAlerts from "../../components/cards/MapAlerts";
import Footer from '../../components/layouts/Footer';
import Spinner from '../../components/Spinner';
import BencanaSection from '../../components/cards/home/BencanaSection';
import LimbahSection from '../../components/cards/home/LimbahSection';
import AboutSection from '../../components/cards/home/AboutSection';
import HeaderSection from '../../components/cards/home/HeaderSection';

export default function LandingPage() {
    const [isLoading, setIsLoading] = useState(true);
    const [bencanaData, setBencanaData] = useState([])
    const [limbahData, setLimbahData] = useState([])
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const bencanaCollection = collection(firestore, "bencana");
                const bencanaSnapshot = await getDocs(bencanaCollection);
                const bencanaList = await Promise.all(
                    bencanaSnapshot.docs.map(async (doc) => {
                        const data = doc.data();
                        const date = data.date instanceof Date
                            ? data.date.toLocaleString()
                            : data.date?.toDate?.()?.toLocaleString() || "Tanggal tidak valid";
                        const creatorName = await getCreatorName(data.creator);
                        return { id: doc.id, ...data, date, creator: creatorName };
                    })
                )
                const sortedBencana = bencanaList.filter((item) => item !== null).sort((a, b) => a.id - b.id).slice(0, 4);
                setBencanaData(sortedBencana);
                
                const limbahCollection = collection(firestore, "limbah");
                const limbahSnapshot = await getDocs(limbahCollection);
                const limbahList = await Promise.all(
                    limbahSnapshot.docs.map(async (doc) => {
                        const data = doc.data();
                        const date = data.date instanceof Date
                            ? data.date.toLocaleString()
                            : data.date?.toDate?.()?.toLocaleString() || "Tanggal tidak valid";
                        const creatorName = await getCreatorName(data.creator);
                        return { id: doc.id, ...data, date, creator: creatorName };
                    })
                )
                const sortedLimbah = limbahList.filter((item) => item !== null).sort((a, b) => a.id - b.id).slice(0, 4);
                setLimbahData(sortedLimbah);

            } catch (err) { console.error("Error fetching data:", err);
            } finally { setTimeout(() => setIsLoading(false), 350) }
        };
        fetchData();
    }, []);

    return(
        <div className="w-full bg-[#F0F0F0]">
            {isLoading ? ( <Spinner /> ) : (
                <><Navbar pageKeys={['home', 'about', 'bencana', 'limbah', 'maps', 'shop', 'contactUs']} />
                <main className="w-full flex flex-col bg-[#F0F0F0]">
                    <HeaderSection />
                    <AboutSection />
    
                    <div className="events w-full h-fit flex flex-col">
                        <BencanaSection data={bencanaData} navigate={navigate} />
                        <LimbahSection data={limbahData} navigate={navigate} />
                    </div>
    
                    <div className="maps w-full h-fit flex flex-col justify-center items-center pt-9 pb-24 bg-[#F0F0F0]">
                        <div className="title w-3/4 h-40 flex flex-col justify-center items-center">
                            <p className="text-5xl font-extrabold uppercase tracking-wider">map alerts</p>
                            <p className="text-xs lg:text-lg font-semibold capitalize tracking-wide leading-10 mt-2">by. BMKG (Badan Meteorologi, Klimatologi, dan Geofisika)</p>
                        </div>
                        <MapAlerts />
                    </div>
                </main>
                <Footer /></>
            )}
        </div>
    )
}