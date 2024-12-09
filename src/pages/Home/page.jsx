import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube, FaTiktok, FaLinkedin } from "react-icons/fa";
import { FaMapLocation } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';

import Logo from "../../assets/logo.png"
import Bege from "../../assets/bege.png"
import Helper from "../../assets/helper.png"
import Navbar from "../../components/layouts/Navbar";
import MapAlerts from "../../components/cards/MapAlerts";

import { useState } from "react";
import { useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../../api/firebaseConfig";

export default function LandingPage() {
    const navigate = useNavigate();

    const scrollToDesc = () => {
        const heroElement = document.querySelector('.about');
        heroElement?.scrollIntoView({ behavior: 'smooth' });
    }

    const [bencanaData, setBencanaData] = useState([])
    const [limbahData, setLimbahData] = useState([])

    useEffect(() => {
        const fetchBencana = async () => {
            try {
                const bencanaCollection = collection(firestore, "bencana")
                const bencanaSnapshot = await getDocs(bencanaCollection)

                const bencanaList = bencanaSnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data()
                }))

                .sort((a, b) => a.id - b.id)
                .slice(0,4);

                setBencanaData(bencanaList)
            } catch(err) {
                console.log("tolong jangan error : ", err)
            }
        };
        fetchBencana(); // call function saat komponen di-load
    }, []);  

    useEffect(() => {
        const fetchLimbah = async () => {
            try {
                const limbahCollection = collection(firestore, "limbah")
                const limbahSnapshot = await getDocs(limbahCollection)

                const limbahList = limbahSnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data()
                }))

                .sort((a, b) => a.id - b.id)
                .slice(0,4);

                setLimbahData(limbahList)
            } catch(err) {
                console.log("tolong jangan error : ", err)
            }
        };
        fetchLimbah(); // call function saat komponen di-load
    }, []);

    return(
        <div className="w-full bg-[#F0F0F0]">

            <Navbar menuItems={['About', 'Bencana', 'Limbah', 'Testimoni', 'Maps', 'Contact Us', 'My Event']}
            scrollHandler={(label) => {
                const targetClass =
                    label === 'About' ? 'about' : label === 'Bencana' ? 'bencana' :
                    label === 'Limbah' ? 'limbah' : label === 'Testimoni' ? 'testimoni' :
                    label === 'Maps' ? 'maps' : label === 'Contact Us' ? 'footer' : 'header'
                const targetElement = document.querySelector(`.${targetClass}`);
                targetElement?.scrollIntoView({ behavior: 'smooth' });
            }}/>

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
                    <div className="bencana w-full h-fit bg-ijoMuda flex flex-col pt-14 pb-10 justify-center items-center"
                    style={{ background: "linear-gradient(to bottom, #F0F0F0 30%, #9ed3a0 20%)", }}>
                        <div className="topSide w-4/5 h-fit lg:h-56 rounded-lg overflow-hidden flex flex-col lg:flex-row shadow-[19px_-15px_45px_5px_rgba(0,_0,_0,_0.2)]">
                            <div className="leftSide h-full w-fit">
                                <img alt="" src={Bege} className="h-full w-fit"></img>
                            </div>
                            <div className="rightSide h-full lg:w-3/4 px-8 py-6 bg-white">
                                <div className="title">
                                    <p className="lg:text-xl font-bold uppercase">sigap bencana</p>
                                </div>
                                <div className="caption mt-4 normal-case text-justify text-xs lg:text-base">
                                    <p>
                                        LIMBAH LEMBAH LUMBA LUMBA LIMBAH LEMBAH LUMBA LUMBA LIMBAH LEMBAH LUMBA LUMBA LIMBAH LEMBAH LUMBA LUMBA LIMBAH LEMBAH LUMBA LUMBA LIMBAH LEMBAH LUMBA LUMBA LIMBAH LEMBAH LUMBA LUMBA LIMBAH LEMBAH LUMBA LUMBA LIMBAH LEMBAH LUMBA LUMBA LIMBAH LEMBAH LUMBA LUMBA LIMBAH LEMBAH LUMBA LUMBA LIMBAH LEMBAH LUMBA LUMBA LIMBAH LEMBAH LUMBA LUMBA LIMBAH LEMBAH LUMBA LUMBA LIMBAH 
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bottomSide w-4/5 pt-5 rounded-b-lg hidden lg:grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 overflow-hidden gap-6">
                        {bencanaData.map((item) => (
                            <div key={item.id} className="card bg-white rounded-lg shadow-2xl drop-shadow-2xl hover:cursor-pointer hover:scale-[1.01]">
                                <div className="h-40 bg-gray-200 rounded-t-lg overflow-hidden">
                                    <img src={item.image} alt="" className="h-full w-full object-cover" />
                                </div>
                                <div className="p-4">
                                    <h2 className="text-lg font-bold capitalize">{item.name}</h2>
                                    <p className="text-sm text-gray-600 capitalize">{item.creator}</p>

                                    <div className="mt-4">
                                        <div className="top flex">
                                            <svg className="w-4 h-4 text-gray-400 mr-2" fill="none" stroke="green" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                            <p className="flex items-center text-sm text-gray-600">{item.date}</p>
                                        </div>
                                        <div className="bottom flex mt-2 pb-2">
                                            <svg className="w-4 h-4 text-gray-400 mr-2" fill="none" stroke="green" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z"/><circle cx="12" cy="10" r="3"/>
                                            </svg>
                                            <p className="flex items-center text-sm text-gray-600">{item.locate}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                
                        </div>
                        <button className="w-44 h-11 rounded-lg bg-ijoTua hover:opacity-80 text-white capitalize mt-7"
                            onClick={() => navigate('/bencana')}>
                            lihat aktivitas lain
                        </button>
                    </div>

                    <div className="limbah w-full h-fit bg-ijoMuda flex flex-col pt-14 pb-10 justify-center items-center"
                    style={{ background: "linear-gradient(to bottom, #F0F0F0 30%, #9ed3a0 20%)", }}>
                        <div className="topSide w-4/5 h-fit lg:h-56 rounded-lg overflow-hidden flex flex-col lg:flex-row shadow-[19px_-15px_45px_5px_rgba(0,_0,_0,_0.2)]">
                            <div className="leftSide h-full w-fit">
                                <img alt="" src={Bege} className="h-full w-fit"></img>
                            </div>
                            <div className="rightSide h-full lg:w-3/4 px-8 py-6 bg-white">
                                <div className="title">
                                    <p className="lg:text-xl font-bold uppercase">sigap lingkungan</p>
                                </div>
                                <div className="caption mt-4 normal-case text-justify text-xs lg:text-base">
                                    <p>
                                        LIMBAH LEMBAH LUMBA LUMBA LIMBAH LEMBAH LUMBA LUMBA LIMBAH LEMBAH LUMBA LUMBA LIMBAH LEMBAH LUMBA LUMBA LIMBAH LEMBAH LUMBA LUMBA LIMBAH LEMBAH LUMBA LUMBA LIMBAH LEMBAH LUMBA LUMBA LIMBAH LEMBAH LUMBA LUMBA LIMBAH LEMBAH LUMBA LUMBA LIMBAH LEMBAH LUMBA LUMBA LIMBAH LEMBAH LUMBA LUMBA LIMBAH LEMBAH LUMBA LUMBA LIMBAH LEMBAH LUMBA LUMBA LIMBAH LEMBAH LUMBA LUMBA LIMBAH 
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bottomSide w-4/5 pt-5 rounded-b-lg hidden lg:grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 overflow-hidden gap-6">
                        {limbahData.map((item) => (
                            <div key={item.id} className="card bg-white rounded-lg shadow-2xl drop-shadow-2xl hover:cursor-pointer hover:scale-[1.01]">
                                <div className="h-40 bg-gray-200 rounded-t-lg overflow-hidden">
                                    <img src={item.image} alt="" className="h-full w-full object-cover" />
                                </div>
                                <div className="p-4">
                                    <h2 className="text-lg font-bold capitalize">{item.name}</h2>
                                    <p className="text-sm text-gray-600 capitalize">{item.creator}</p>

                                    <div className="mt-4">
                                        <div className="top flex">
                                            <svg className="w-4 h-4 text-gray-400 mr-2" fill="none" stroke="green" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                            <p className="flex items-center text-sm text-gray-600">{item.date}</p>
                                        </div>
                                        <div className="bottom flex mt-2 pb-2">
                                            <svg className="w-4 h-4 text-gray-400 mr-2" fill="none" stroke="green" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z"/><circle cx="12" cy="10" r="3"/>
                                            </svg>
                                            <p className="flex items-center text-sm text-gray-600">{item.locate}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                
                        </div>
                        <button className="w-44 h-11 rounded-lg bg-ijoTua hover:opacity-80 text-white capitalize mt-7"
                            onClick={() => navigate('/limbah')}>
                            lihat aktivitas lain
                        </button>
                    </div>
                </div>

                <div className="testimoni w-full h-fit flex flex-col justify-center items-center pt-20 pb-24">
                    <div className="title w-3/4 h-40 flex flex-col justify-center items-center gap-4 pb-5">
                        <p className="text-5xl font-extrabold uppercase tracking-wider">testimoni</p>
                        <p className="text-xs lg:text-lg font-semibold capitalize tracking-wide leading-10">mereka yang pernah menggunakan sigap bersama</p>
                    </div>

                    <div className="cards w-3/4 h-96 flex flex-col lg:flex-row flex-nowrap justify-start py-4 gap-9 overflow-x-auto">
                        <div className="card lg:w-1/4 h-full bg-yellow-300 flex-shrink-0 rounded-xl"></div>
                        <div className="card lg:w-1/4 h-full bg-yellow-300 flex-shrink-0 rounded-xl"></div>
                        <div className="card lg:w-1/4 h-full bg-yellow-300 flex-shrink-0 rounded-xl"></div>
                        <div className="card lg:w-1/4 h-full bg-yellow-300 flex-shrink-0 rounded-xl"></div>
                        <div className="card lg:w-1/4 h-full bg-yellow-300 flex-shrink-0 rounded-xl"></div>
                    </div>
                </div>

                <div className="maps w-full h-fit flex flex-col justify-center items-center pt-9 pb-24 bg-[#9ed3a0]">
                    <div className="title w-3/4 h-40 flex flex-col justify-center items-center">
                        <p className="text-5xl font-extrabold uppercase tracking-wider">map alerts</p>
                        <p className="text-xs lg:text-lg font-semibold capitalize tracking-wide leading-10 mt-2">sigap tanggap bencana</p>
                    </div>

                    <MapAlerts />
                </div>
            </main>

            <footer className="footer w-full bg-ijoTua text-white pt-20 pb-4 px-24">
                <div className="container px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                        <div className="space-y-2">
                            <h2 className="text-lg font-bold text-green-500">Quick Links</h2>
                            <ul className="space-y-1 text-gray-400">
                                <li><a href="#" className="hover:text-green-500">High Achiever</a></li>
                                <li><a href="#" className="hover:text-green-500">Competition</a></li>
                                <li><a href="#" className="hover:text-green-500">Scholarship</a></li>
                            </ul>
                        </div>
                        <div className="flex flex-col items-center justify-center space-y-4">
                            <img src={Logo} alt="Logo" className="h-14 mb-4" />
                            <div className="text-center mt-10 uppercase">
                                <p className="text-white-200 font-bold">SIGAP BERSAMA adalah platform partisipasi relawan untuk tanggap bencana dan kampanye lingkungan.</p>
                            </div>
                            <div className="flex space-x-5">
                                {[
                                    { href: "https://twitter.com/okftunhas?lang=en", icon: FaTwitter },
                                    { href: "https://www.youtube.com/@OKFTUNHAS", icon: FaYoutube },
                                    { href: "https://id.linkedin.com/company/okft-uh", icon: FaLinkedin },
                                    { href: "https://www.instagram.com/p/CkDB3nipkFH/", icon: FaInstagram },
                                    { href: "https://www.facebook.com/okft09", icon: FaFacebookF },
                                    { href: "https://www.tiktok.com", icon: FaTiktok },
                                    { href: "https://maps.app.goo.gl/MntNLKuqeJ3L26ny9", icon: FaMapLocation },
                                ].map(({ href, icon: Icon }, index) => (
                                    <a key={index} href={href} target="_blank" rel="noopener noreferrer"
                                        className="w-10 h-10 bg-black text-white flex items-center justify-center rounded-md hover:bg-green-600">
                                        <Icon size={25} />
                                    </a>
                                ))}
                            </div>
                        </div>
                        <div className="space-y-2">
                            <h2 className="text-lg font-bold text-white">Contact Info</h2>
                            <ul className="space-y-1 text-gray-200">
                                <li>08xxxxxxxxxx (Partnership)</li>
                                <li>08xxxxxxxxxx (Organization & NGO)</li>
                                <li><a href="mailto:okftunhas@gmail.com" className="hover:text-green-500">okftunhas@gmail.com</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="text-center mt-10 uppercase">
                        <p className="text-white font-bold">Ubah niat baik jadi aksi baik hari ini.</p>
                    </div>
                    <div className="text-center mt-6 text-gray-200 border-t border-gray-200 pt-4">
                        <p>Copyright © 2024 SIGMA - All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    )
}