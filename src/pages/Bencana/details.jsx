import { UserIcon, EnvelopeIcon, HeartIcon } from '@heroicons/react/20/solid';
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../../api/firebaseConfig";
import { getCreatorName } from "../../utils/firestoreUtils";

import Navbar from "../../components/layouts/Navbar";
import Spinner from "../../components/Spinner";
import Footer from "../../components/layouts/Footer";

export default function BencanaDetail() {
    const { id } = useParams(); // Ambil ID dari URL
    const [bencana, setBencana] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchBencanaDetail = async () => {
            try {
                const bencanaDocRef = doc(firestore, "bencana", id);
                const bencanaDoc = await getDoc(bencanaDocRef);
    
                if (bencanaDoc.exists()) {
                    const data = bencanaDoc.data();

                    const creatorName = await getCreatorName(data.creator);
    
                    const formattedData = {
                        ...data,
                        creator: creatorName,
                        date: data.date?.toDate().toLocaleString(), // Konversi Timestamp ke string
                        registUntil: data.registUntil?.toDate().toLocaleString(), // Konversi Timestamp ke string
                    };

                    setBencana(formattedData);
                } else {
                    console.error("Data tidak ditemukan!");
                }
            } catch (error) {
                console.error("Error fetching detail:", error);
            } finally {
                setIsLoading(false);
            }
        };
    
        fetchBencanaDetail();
    }, [id]);    

    window.scrollTo({ top: 0, behavior: "smooth" });

    return (
        <div className="w-full bg-gray-100">

        {isLoading ? (
            <Spinner />
        ) : (
            <>    
            <Navbar pageKeys={['landingPage', 'navBencana', 'navLimbah', 'contactUs']} />

            {/* Event Details Section */}
            <section className="max-w-6xl mx-auto py-12 pt-24 px-6">
                <div className="flex gap-6 p-5">

                    {/* Left Container */}
                    <div className="flex-2 w-2/3">
                        {/* Event Cover */}
                        <div className="event-cover mb-4">
                            <img src={bencana.image} alt="Event Cover" className="w-full h-auto" />
                        </div>
                        {/* Event Description */}
                        <div className="event-description mb-4 p-2 h-fit bg-gray-300">
                            <p className="text-m">{bencana.desc}</p>                     
                            
                        </div>
                        {/* Detail Job */}
                        <p className="mt-4"><strong>Detail Aktivitas:</strong> {bencana.detailActivity}</p>
                        <p className="mt-4"><strong>Kriteria Relawan:</strong> {bencana.relawanKriteria}</p>
                        <p className="mt-4"><strong>Perlengkapan Relawan:</strong></p>
                        <ul className="list-disc pl-5 text-gray-600">
                            {bencana.relawanPerlengkapan?.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                        <div className="event-details mt-4">
                            <h3 className="text-lg font-semibold text-gray-700">Detail Pekerjaan</h3>
                            <ul className="list-disc pl-5 text-gray-600">
                                <li>Deskripsi Pekerjaan: {bencana.detailJob?.jobDesc}</li>
                                <li>Nama Pekerjaan: {bencana.detailJob?.jobName}</li>
                                <li>Relawan Dibutuhkan: {bencana.detailJob?.jobNeeded} orang</li>
                            </ul>
                        </div>
                        <div className="mt-4">
                            <h3 className="text-lg font-semibold text-gray-700 mb-3">Peta Lokasi</h3>
                            <iframe src={bencana.embedMapLink} width="100%" height="400" style={{ border: 0 }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                        </div>
                    </div>
                    
                    {/* Right Container */}
                    <div className="flex-1 border border-gray-300 p-6 rounded-lg bg-gray-50 h-fit sticky top-24">
                        <h3 className="text-2xl font-bold text-gray-800">{bencana.title}</h3>
                        <p className="mt-4"><strong>Oleh:</strong> {bencana.creator}</p>
                        <p className="mt-4"><strong>Jadwal:</strong> {bencana.date}</p>
                        <p className="mt-4"><strong>Lokasi:</strong> {bencana.locate}</p>
                        <p className="mt-4"><strong>Batas Registrasi:</strong> {bencana.registUntil}</p>
                        
                        <button className="w-full mt-6 px-6 py-2 bg-green-600 text-white font-bold rounded-lg flex items-center justify-center gap-2 hover:bg-green-700">
                            <UserIcon className="h-5 w-5 text-white" />
                            Jadi Relawan
                        </button>
                        
                        <button className="w-full mt-2 px-6 py-2 bg-blue-600 text-white font-bold rounded-lg flex items-center justify-center gap-2 hover:bg-blue-700">
                            <EnvelopeIcon className="h-5 w-5 text-white" />
                            Kontak Organisasi
                        </button>
                        
                        <button className="w-full mt-2 px-6 py-2 bg-red-600 text-white font-bold rounded-lg flex items-center justify-center gap-2 hover:bg-red-700">
                            <HeartIcon className="h-5 w-5 text-white" />
                            Donasi
                        </button>
                    </div>
                </div>
            </section>

            <Footer />
            </>
        )}
        </div>
    );
}
