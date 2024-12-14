import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import { useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../../api/firebaseConfig";

import Logo from "../../assets/logo.png"
import Helper from "../../assets/helper.png"
import Navbar from "../../components/layouts/Navbar";
import MapAlerts from "../../components/cards/MapAlerts";
import Footer from '../../components/layouts/Footer';
import Spinner from '../../components/Spinner';
import BencanaSection from '../../components/cards/BencanaSection';
import LimbahSection from '../../components/cards/LimbahSection';

export default function LandingPage() {
    const [isLoading, setIsLoading] = useState(true);
    const [bencanaData, setBencanaData] = useState([])
    const [limbahData, setLimbahData] = useState([])
    const navigate = useNavigate();

    const scrollToDesc = () => {
        const heroElement = document.querySelector('.about');
        heroElement?.scrollIntoView({ behavior: 'smooth' });
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const bencanaCollection = collection(firestore, "bencana");
                const bencanaSnapshot = await getDocs(bencanaCollection);
                const bencanaList = bencanaSnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                })).sort((a, b) => a.id - b.id).slice(0, 4);
                setBencanaData(bencanaList);

                const limbahCollection = collection(firestore, "limbah");
                const limbahSnapshot = await getDocs(limbahCollection);
                const limbahList = limbahSnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                })).sort((a, b) => a.id - b.id).slice(0, 4);
                setLimbahData(limbahList);
            } catch (err) {
                console.error("Error fetching data:", err);
            } finally {
                setTimeout(() => setIsLoading(false), 350)
            }
        };
        fetchData();
    }, []);

    return(
        <div className="w-full bg-[#F0F0F0]">
            {isLoading ? ( <Spinner /> ) : (
                <>
                <Navbar pageKeys={['home', 'about', 'bencana', 'limbah', 'maps', 'contactUs']} />
    
                <main className="w-full flex flex-col bg-[#F0F0F0]">
                    <div className="header w-full h-screen bg-loginForm bg-center bg-cover flex flex-col justify-center items-center gap-y-12">
                        <div className="top w-full h-fit flex justify-center items-center">
                            <p className="text-white shine text-3xl sm:text-6xl md:text-6xl lg:text-8xl font-extrabold uppercase tracking-wider mt-36 text-shadow-green-400 text-shadow-x-xl">sigap bersama</p>
                        </div>
    
                        <div className="box w-2/3 h-fit bg-gray-100 rounded-xl flex flex-col lg:flex-row justify-center items-center shadow-2xl drop-shadow-2xl overflow-hidden py-3 lg:py-9 px-3 lg:px-9 lg:pl-20">
                            <div className="leftSide  lg:w-1/3 h-full flex">
                                <div className="leftSide w-1/3 h-full flex items-center"><img src={Logo} alt="logo" className="w-[80%]"></img></div>
                                <div className="rightSide w-2/3 h-full flex flex-col justify-center pl-1 capitalize text-2xl tracking-wide">
                                    <p className="font-bold">123.456</p><p>relawan</p>
                                </div>
                            </div>
    
                            <div className="middleSide lg:w-1/3 h-full flex">
                                <div className="leftSide w-1/3 h-full flex items-center"><img src={Logo} alt="logo" className="w-[80%]"></img></div>
                                <div className="rightSide w-2/3 h-full flex flex-col justify-center pl-1 capitalize text-2xl tracking-wide">
                                    <p className="font-bold">123.456</p><p>komunitas</p>
                                </div>
                            </div>
    
                            <div className="rightSide lg:w-1/3 h-full flex">
                                <div className="leftSide w-1/3 h-full flex items-center"><img src={Logo} alt="logo" className="w-[80%]"></img></div>
                                <div className="rightSide w-2/3 h-full flex flex-col justify-center pl-1 capitalize text-2xl tracking-wide">
                                    <p className="font-bold">123.456</p><p>event</p>
                                </div>
                            </div>
                        </div>
    
                        <div className="animate-bounce dark:bg-slate-800 p-2 w-14 h-14 ring-2 ring-slate-900/5 dark:ring-slate-200/20 shadow-lg rounded-full flex items-center justify-center mt-9 hover:cursor-pointer" onClick={scrollToDesc}>
                            <svg className="w-12 h-12 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>
                        </div>
                    </div>
    
                    <div className="about w-full bg-[#F0F0F0] flex flex-col lg:flex-row justify-center items-center gap-y-9 lg:py-32 lg:px-16">
                        <div className="leftSide lg:w-1/2 shadow-2xl">
                            <img src={Helper} alt="" />
                        </div>
                        <div className="rightSide px-7 lg:w-1/2 flex flex-col pl-6 gap-y-6 text-center leading-8 tracking-wide text-xs lg:text-lg text-[#5f6368]">
                            <p className="">
                                Dalam beberapa tahun terakhir, peningkatan jumlah bencana alam dan pencemaran lingkungan, telah menjadi tantangan utama di Indonesia. Meskipun berbagai organisasi dan masyarakat berusaha untuk berpartisipasi, masih ada keterbatasan dalam akses informasi dan koordinasi untuk relawan yang ingin terlibat. Sigap Bersama hadir untuk menghubungkan relawan dengan kegiatan tanggap bencana dan kampanye pembersihan lingkungan, menciptakan wadah yang efektif bagi masyarakat untuk berkontribusi.
                            </p>
                            <p className="">
                                Sigap Bersama bertemakan Sustainable Development Goals (SDGs), khususnya Sustainable Cities and Communities yang mendorong terciptanya kota dan komunitas yang tangguh serta siap menghadapi bencana, serta Climate Action yang bertujuan untuk menggerakkan aksi global dalam mengurangi dan mengatasi perubahan iklim. Dengan memfasilitasi kegiatan sukarela yang berkaitan dengan penanganan bencana dan kampanye kebersihan lingkungan, Sigap Bersama ingin menciptakan ruang bagi masyarakat untuk terlibat aktif dalam membangun komunitas yang lebih aman, sehat, dan berkelanjutan.
                            </p>
                        </div>
                    </div>
    
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
    
                <Footer />
                </>
            )}
        </div>
    )
}