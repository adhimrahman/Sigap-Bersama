import { UserIcon, HeartIcon, PencilIcon } from '@heroicons/react/20/solid';
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc, collection, setDoc, getDocs, serverTimestamp, increment, updateDoc } from "firebase/firestore";
import { firestore } from "../../../api/firebaseConfig";
import { getCreatorName } from "../../utils/firestoreUtils";

import Swal from "sweetalert2";
import Navbar from "../../components/layouts/Navbar";
import Spinner from "../../components/Spinner";
import Footer from "../../components/layouts/Footer";
import useUser from "../../context/useUser";

export default function LimbahDetail() {
    const navigate = useNavigate();
    const { id } = useParams();
    const { user } = useUser();
    const [limbah, setLimbah] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isJoined, setIsJoined] = useState(false);
    const [userPoints, setUserPoints] = useState(0);

    useEffect(() => {
        const fetchLimbahDetail = async () => {
            try {
                const limbahDocRef = doc(firestore, "limbah", id);
                const limbahDoc = await getDoc(limbahDocRef);
    
                if (limbahDoc.exists()) {
                    const data = limbahDoc.data();
                    const creatorName = await getCreatorName(data.creator);

                    setLimbah({
                        ...data,
                        creator: creatorName,
                        date: data.date?.toDate().toLocaleString(),
                        registUntil: data.registUntil?.toDate().toLocaleString(),
                        isCreator: data.creator?.id === user?.uid,
                    })
                    
                    if (user) {
                        // Cek apakah user sudah join
                        const relawanRef = collection(firestore, "limbah", id, "relawan");
                        const snapshot = await getDocs(relawanRef);
                        const joined = snapshot.docs.some((doc) => doc.data().userId === user.uid);
                        setIsJoined(joined);

                        // Ambil points user
                        const userDocRef = doc(firestore, "users", user.uid);
                        const userDoc = await getDoc(userDocRef);
                        if (userDoc.exists()) {
                            setUserPoints(userDoc.data().points || 0);
                        }
                    }
                } else { console.error("Data tidak ditemukan!") }
            } catch (error) { console.error("Error fetching detail:", error)
            } finally { setIsLoading(false) }
        };
        fetchLimbahDetail();
    }, [id, user]);

    const handleJoinRelawan = async () => {
        if (!id) {
            console.error("Event ID not found.");
            Swal.fire("Error", "ID event tidak ditemukan.", "error");
            return;
        }

        if (!user) {
            Swal.fire("Tidak Diizinkan", "Anda harus login terlebih dahulu.", "warning");
            return;
        }

        try {
            // Ambil data user dari Firestore
            const userDocRef = doc(firestore, "users", user.uid);
            const userDoc = await getDoc(userDocRef);
            const userData = userDoc.exists() ? userDoc.data() : null;

            if (!userData || userData.role !== "individu") {
                Swal.fire("Tidak Diizinkan", "Hanya akun individu yang bisa menjadi relawan.", "warning");
                return;
            }

            // Referensi koleksi relawan
            const relawanRef = collection(firestore, "limbah", id, "relawan");

            // Ambil jumlah dokumen untuk ID baru
            const snapshot = await getDocs(relawanRef);
            const newId = (snapshot.size + 1).toString();

            // SweetAlert konfirmasi
            const result = await Swal.fire({
                title: "Gabung Sebagai Relawan?",
                text: "Anda yakin ingin menjadi relawan untuk event ini?",
                icon: "question",
                showCancelButton: true,
                confirmButtonText: "Ya, Gabung!",
                cancelButtonText: "Batal",
            });

            if (result.isConfirmed) {
                // Simpan data relawan ke Firestore
                await setDoc(doc(relawanRef, newId), {
                    userId: user.uid,
                    fullName: userData?.fullName || "Relawan Tanpa Nama",
                    joinedAt: serverTimestamp(),
                });

                await updateDoc(userDocRef, {
                    points: increment(100),
                });
                console.log(userPoints)

                Swal.fire("Berhasil!", "Anda telah bergabung sebagai relawan dan mendapatkan 100 points.", "success");
                setIsJoined(true);
                setUserPoints((prev) => prev + 100); // Update state points
            }
        } catch (error) {
            console.error("Error joining event:", error);
            Swal.fire("Gagal!", "Terjadi kesalahan saat mendaftar sebagai relawan.", "error");
        }
    };

    window.scrollTo({ top: 0, behavior: "smooth" });
    
    return (
            <div className="w-full bg-gray-100">
    
            {isLoading ? ( <Spinner /> ) : (
                <><Navbar pageKeys={['landingPage', 'navBencana', 'navLimbah', 'shop', 'contactUs']} />
    
                <section className="max-w-6xl mx-auto py-12 pt-24 px-6">
                    <div className="flex gap-6 p-5">
    
                        <div className="leftContainer flex-2 w-2/3">
                            <div className="event-cover mb-4 rounded-t-lg overflow-hidden">
                                <img src={limbah.image} alt="Event Cover" className="w-full h-auto" />
                            </div>
                            <div className="event-description mb-6 px-3 py-5 h-fit bg-gray-300 rounded-b-lg">
                                <p className="text-m">{limbah.desc}</p>                     
                            </div>
                            <p className="mt-4"><strong>Detail Aktivitas:</strong> {limbah.detailActivity}</p>
                            <p className="mt-4"><strong>Kriteria Relawan:</strong> {limbah.relawanKriteria}</p>
                            <div className="event-details mt-4">
                                <h3 className="text-lg font-semibold text-gray-700">Detail Pekerjaan</h3>
                                <ul className="list-disc pl-5 text-gray-600">
                                    <li>Deskripsi Pekerjaan: {limbah.detailJob?.jobDesc}</li>
                                    <li>Nama Pekerjaan: {limbah.detailJob?.jobName}</li>
                                    <li>Relawan Dibutuhkan: {limbah.detailJob?.jobNeeded} orang</li>
                                </ul>
                            </div>
                            <h3 className="text-lg mt-3 font-semibold text-gray-700">Perlengkapan Relawan</h3>
                            <ul className="list-disc pl-5 text-gray-600">{limbah.perlengkapanRelawan?.map((item, index) => ( <li key={index}>{item}</li> ))}</ul>
                            <div className="mt-4 border-lg overflow-hidden">
                                <h3 className="text-lg font-semibold text-gray-700 mb-3">Peta Lokasi</h3>
                                <iframe src={limbah.embedMapLink} width="100%" height="400" style={{ border: 0 }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                            </div>
                        </div>
                        
                        <div className="rightContainer flex-1 border border-gray-300 p-6 rounded-lg bg-gray-50 h-fit sticky top-24">
                            <h3 className="text-2xl font-bold text-gray-800">{limbah.title}</h3>
                            <p className="mt-4"><strong>Oleh:</strong> {limbah.creator}</p>
                            <p className="mt-4"><strong>Jadwal:</strong> {limbah.date}</p>
                            <p className="mt-4"><strong>Lokasi:</strong> {limbah.locate}</p>
                            <p className="mt-4"><strong>Batas Registrasi:</strong> {limbah.registUntil}</p>
                            <p className="mt-4 font-bold">Point : <span className="text-blue-600">100</span></p>
                            
                            <button
                            onClick={handleJoinRelawan}
                            className={`w-full mt-6 px-6 py-2 ${isJoined ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"} text-white font-bold rounded-lg flex items-center justify-center gap-2`}
                            disabled={isJoined}
                        >
                            <UserIcon className="h-5 w-5 text-white" />
                            {isJoined ? "Joined" : "Jadi Relawan"}
                        </button>
                        
                        <button
                            className="w-full mt-2 px-6 py-2 bg-red-500 text-white font-bold rounded-lg flex items-center justify-center gap-2 hover:bg-red-600"
                            onClick={() => navigate(`/limbahdetail/${id}/donate/`)}
                        >
                            <HeartIcon className="h-5 w-5 text-white" />Donasi
                        </button>
                        {limbah.isCreator && (
                            <button
                                className="w-full mt-2 px-6 py-2 bg-ijoTua text-white font-bold rounded-lg flex items-center justify-center gap-2 hover:bg-green-800"
                                onClick={() => navigate(`/editEvent/limbah/${id}`)}
                            >
                                <PencilIcon className="h-5 w-5 text-white" />
                                Edit
                            </button>
                        )}
                        </div>
                    </div>
                </section>
                <Footer /></>
            )}
            </div>
        );
}
