import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../../api/firebaseConfig";

import Navbar from "../../components/layouts/Navbar";

export default function Bencana() {
    const [bencanaData, setBencanaData] = useState([]);
    const navigate = useNavigate()

    useEffect(() => {
        const fetchBencana = async () => {
            try {
                const bencanaCollection = collection(firestore, "bencana")
                const bencanaSnapshot = await getDocs(bencanaCollection)

                const bencanaList = bencanaSnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data()
                }))

                setBencanaData(bencanaList)
            } catch(err) {
                console.log("tolong jangan error : ", err)
            }
        };
        fetchBencana(); // call function saat komponen di-load
    }, []);  

    window.scrollTo({ top: 0, behavior: "smooth" });
    
    return (
        <>
        <Navbar menuItems={['Home', 'About', 'Bencana', 'Limbah', 'Testimoni', 'Maps', 'Contact Us', 'My Event', 'Profil']}
            scrollHandler={(label) => {
                const targetClass =
                    label === 'About' ? 'about' : label === 'Bencana' ? 'bencana' :
                    label === 'Limbah' ? 'limbah' : label === 'Testimoni' ? 'testimoni' :
                    label === 'Maps' ? 'maps' : label === 'Contact Us' ? 'footer' : 'hero';
                const targetElement = document.querySelector(`.${targetClass}`);
                targetElement?.scrollIntoView({behavior: 'smooth' });
            }}
        />

        <div className="w-full px-9 sm:px-12 md:px-12 lg:px-32 p-4 bg-[#F0F0F0] mt-20">
            <h1 className="text-4xl font-bold tracking-wider text-center pt-9 mb-8 capitalize">bencana</h1>
            <div className="flex justify-center mb-8">
                <input type="text" className="w-full max-w-2xl p-4 rounded-lg shadow-md outline-none" placeholder="Search..." />
            </div>
            <div className="cards grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {bencanaData.map((item) => (
                    <div key={item.id} className="card bg-white rounded-lg shadow-2xl hover:cursor-pointer hover:scale-[1.01]"
                        onClick={() => navigate(`/bencanadetail/${item.id}`)}>
                        <div className="h-fit lg:h-56 bg-gray-200 rounded-t-lg overflow-hidden">
                            <img src={item.image || "https://placehold.co/600x400"} alt="" className="w-full h-full object-cover object-center" />
                        </div>
                        <div className="p-4">
                            <h2 className="text-lg font-bold">{item.name}</h2>
                            <p className="text-sm text-gray-600">{item.creator}</p>

                            <div className="mt-4">
                                    <p className="flex items-center text-sm text-gray-600">
                                        <svg className="w-4 h-4 text-gray-400 mr-2" fill="none" stroke="green" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        {item.date}
                                    </p>
                                    <p className="flex items-center text-sm text-gray-600">
                                        <svg className="w-4 h-4 text-gray-400 mr-2" fill="none" stroke="green" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z"/><circle cx="12" cy="10" r="3"/>
                                        </svg>
                                        {item.locate}
                                    </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
        </>
    );
};