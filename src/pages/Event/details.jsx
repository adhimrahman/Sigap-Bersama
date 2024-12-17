import { UserIcon, HeartIcon, PencilIcon } from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc, collection, getDocs, setDoc, increment, serverTimestamp, updateDoc } from "firebase/firestore";
import { firestore } from "../../../api/firebaseConfig";
import { getCreatorName } from "../../utils/firestoreUtils";

import Swal from "sweetalert2";
import Navbar from "../../components/layouts/Navbar";
import Footer from "../../components/layouts/Footer";
import Spinner from "../../components/Spinner";
import useUser from "../../context/useUser";

export default function EventDetail() {
    const navigate = useNavigate();
    const { id, eventType } = useParams();
    const { user } = useUser();
    const [eventDetail, setEventDetail] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isJoined, setIsJoined] = useState(false);
    const [userPoints, setUserPoints] = useState(0);
    const [relawanCount, setRelawanCount] = useState(0);

    useEffect(() => {
        const fetchEventDetail = async () => {
            try {
                const eventRef = doc(firestore, eventType, id);
                const eventDoc = await getDoc(eventRef);

                if (eventDoc.exists()) {
                    const data = eventDoc.data();
                    const creatorName = await getCreatorName(data.creator);

                    setEventDetail({
                        ...data,
                        creator: creatorName,
                        date: data.date?.toDate()?.toLocaleString(),
                        registUntil: data.registUntil?.toDate()?.toLocaleString(),
                        isCreator: data.creator?.id === user?.uid,
                    });

                    const relawanRef = collection(firestore, eventType, id, "relawan");
                    const snapshot = await getDocs(relawanRef);
                    setRelawanCount(snapshot.size);

                    if (user) {
                        // Cek apakah user sudah join
                        const joined = snapshot.docs.some((doc) => doc.data().userId === user.uid);
                        setIsJoined(joined);

                        // Ambil points user
                        const userDocRef = doc(firestore, "users", user.uid);
                        const userDoc = await getDoc(userDocRef);
                        if (userDoc.exists()) {
                            setUserPoints(userDoc.data().points || 0);
                        }
                    }
                }
            } catch (error) { console.error("Error fetching event details:", error);
            } finally { setIsLoading(false) }
        };
        fetchEventDetail();
    }, [eventType, id, user]);

    const handleJoinRelawan = async () => {
        if (!id) return Swal.fire({ title: "Error", text: "ID event tidak ditemukan.", icon: "error", confirmButtonColor: "#365E32", });

        if (!user) return Swal.fire("Tidak Diizinkan", "Anda harus login terlebih dahulu.", "warning");

        try {
            const userDocRef = doc(firestore, "users", user.uid);
            const userDoc = await getDoc(userDocRef);
            const userData = userDoc.exists() ? userDoc.data() : null;

            if (!userData || userData.role !== "individu") return Swal.fire({ title: "Tidak Diizinkan", text: "Hanya akun relawan yang bisa menjadi relawan.", icon: "warning", confirmButtonColor: "#365E32", });

            const relawanRef = collection(firestore, eventType, id, "relawan");
            const snapshot = await getDocs(relawanRef);
            const newId = (snapshot.size + 1).toString();

            const result = await Swal.fire({
                title: "Gabung Sebagai Relawan?",
                text: "Anda yakin ingin menjadi relawan untuk event ini?",
                icon: "question",
                showCancelButton: true,
                confirmButtonText: "Ya, Gabung!",
                confirmButtonColor: "#365E32",
                cancelButtonText: "Batal",
            });

            if (result.isConfirmed) {
                await setDoc(doc(relawanRef, newId), {
                    userId: user.uid,
                    fullName: userData?.fullName || "Relawan Tanpa Nama",
                    joinedAt: serverTimestamp(),
                });

                await updateDoc(userDocRef, { points: increment(100) });
                console.log(userPoints)

                Swal.fire({
                    title: "Berhasil!", 
                    text: "Anda telah bergabung dan mendapatkan 100 points.",
                    icon: "success",
                    confirmButtonColor: "#365E32",
                });
                setIsJoined(true);
                setRelawanCount((prev) => prev + 1);
                setUserPoints((prev) => prev + 100);
            }
        } catch (error) {
            console.error("Error joining as relawan:", error);
            Swal.fire({
                title: "Gagal!", 
                text: "Terjadi kesalahan saat bergabung sebagai relawan.",
                icon: "error",
                confirmButtonColor: "#365E32",
            });
        }
    };

    return (
        <div className="w-full bg-gray-100">

        {isLoading ? ( <Spinner /> ) : (
            <><Navbar pageKeys={['landingPage', 'navBencana', 'navLimbah', 'shop', 'contactUs']} />

            <section className="max-w-6xl mx-auto py-12 pt-24 px-6">
                <div className="flex gap-6 p-5">

                    <div className="leftContainer flex-2 w-2/3">
                        <div className="event-cover mb-4 rounded-t-lg overflow-hidden">
                            <img src={eventDetail.image} alt="Event Cover" className="w-full h-auto" />
                        </div>
                        <div className="event-description mb-6 px-3 py-5 h-fit bg-gray-300 rounded-b-lg">
                            <p className="text-m">{eventDetail.desc}</p>                     
                        </div>
                        <p className="mt-4"><strong>Detail Aktivitas:</strong> {eventDetail.detailActivity}</p>
                        <p className="mt-4"><strong>Kriteria Relawan:</strong> {eventDetail.relawanKriteria}</p>
                        <div className="event-details mt-4">
                            <h3 className="text-lg font-semibold text-gray-700">Detail Pekerjaan</h3>
                            <ul className="list-disc pl-5 text-gray-600">
                                <li>Deskripsi Pekerjaan: {eventDetail.detailJob?.jobDesc}</li>
                                <li>Nama Pekerjaan: {eventDetail.detailJob?.jobName}</li>
                                <li>Relawan Dibutuhkan: {eventDetail.detailJob?.jobNeeded} orang</li>
                            </ul>
                        </div>
                        <h3 className="text-lg mt-3 font-semibold text-gray-700">Perlengkapan Relawan</h3>
                        <ul className="list-disc pl-5 text-gray-600">{eventDetail.perlengkapanRelawan?.map((item, index) => ( <li key={index}>{item}</li> ))}</ul>
                        <div className="mt-4 border-lg overflow-hidden">
                            <h3 className="text-lg font-semibold text-gray-700 mb-3">Peta Lokasi</h3>
                            <iframe src={eventDetail.embedMapLink} width="100%" height="400" style={{ border: 0 }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                        </div>
                    </div>
                    
                    <div className="rightContainer flex-1 border border-gray-300 p-6 rounded-lg bg-gray-50 h-fit sticky top-24">
                        <h3 className="text-2xl font-bold text-gray-800">{eventDetail.title}</h3>
                        <p className="mt-4"><strong>Oleh:</strong> {eventDetail.creator}</p>
                        <p className="mt-4"><strong>Relawan:</strong> {relawanCount} / {eventDetail.detailJob?.jobNeeded || 0}</p>
                        <p className="mt-4"><strong>Jadwal:</strong> {eventDetail.date}</p>
                        <p className="mt-4"><strong>Lokasi:</strong> {eventDetail.locate}</p>
                        <p className="mt-4"><strong>Batas Registrasi:</strong> {eventDetail.registUntil}</p>
                        <p className="mt-4 font-bold">Point : <span className="text-blue-600">100</span></p>
                        
                        <button onClick={handleJoinRelawan} className={`w-full mt-6 px-6 py-2 ${isJoined ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"} text-white font-bold rounded-lg flex items-center justify-center gap-2`} disabled={isJoined}>
                            <UserIcon className="h-5 w-5 text-white" />{isJoined ? "Joined" : "Jadi Relawan"}
                        </button>
                        
                        <button className={`w-full mt-2 px-6 py-2 bg-red-500 hover:bg-red-600 text-white font-bold rounded-lg flex items-center justify-center gap-2`}
                        onClick={() => {
                            if (!user) {
                                Swal.fire({title: "Tidak Diizinkan", text:"Anda harus login terlebih dahulu.", icon:"warning", confirmButtonColor: "#365E32",});
                            } else if (user?.role === "komunitas") {
                                Swal.fire({title: "Akses Ditolak", text: "Akun komunitas tidak diperbolehkan untuk melakukan donasi.", icon: "error", confirmButtonColor: "#365E32",});
                            } else if (user?.role === "individu") { navigate(`/donate/${eventType}/${id}`);
                        }}}>
                            <HeartIcon className="h-5 w-5 text-white" />Donasi
                        </button>
                        <p className='text-red-600 text-xs ml-2 mt-2'>*hanya akun relawan</p>
                        {eventDetail.isCreator && (
                            <button className="w-full mt-2 px-6 py-2 bg-ijoTua text-white font-bold rounded-lg flex items-center justify-center gap-2 hover:bg-green-800" onClick={() => navigate(`/editEvent/${eventType}/${id}`)}>
                                <PencilIcon className="h-5 w-5 text-white" />Edit
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
