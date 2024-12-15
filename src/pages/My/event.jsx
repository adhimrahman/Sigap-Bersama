import { useEffect, useState } from "react";
import { collection, getDocs, setDoc, serverTimestamp, doc, query, where, getDoc } from "firebase/firestore";
import { firestore } from "../../api/firebaseConfig";
import useUser from "../../context/useUser"; // Gunakan hook untuk user context
import Navbar from "../../components/layouts/Navbar";
import Spinner from "../../components/Spinner";
import Footer from "../../components/layouts/Footer";
import { getCreatorName } from "../../utils/firestoreUtils";
import CardEvent from "../../components/cards/cardEvent";

export default function MyEvent() {
    const { user } = useUser();
    const [events, setEvents] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newEvent, setNewEvent] = useState({
        title: "",
        desc: "",
        date: "",
        locate: "",
        type: "",
        image: "",
        detailActivity: "",
        detailJob: {
            jobDesc: "",
            jobName: "",
            jobNeeded: 0,
        },
        embedMapLink: "",
        registUntil: "",
        relawanPerlengkapan: [],
    });

    useEffect(() => {
        if (user && user.communityType) {
            setNewEvent((prev) => ({
                ...prev,
                type: user.communityType === "bencana" ? "bencana" : "limbah",
            }));
        }
    }, [user]); // Update saat user tersedia

    useEffect(() => {
        console.log("User context data:", user);
    }, [user]);    

    useEffect(() => {
        const fetchUserData = async () => {
            if (!user?.uid) return;
    
            try {
                const userRef = doc(firestore, "users", user.uid);
                const userSnap = await getDoc(userRef);
    
                if (userSnap.exists()) {
                    const userData = userSnap.data();
                    console.log("User Firestore data:", userData);
    
                    setNewEvent((prev) => ({
                        ...prev,
                        type: userData.communityType === "bencana" ? "bencana" : "limbah",
                    }));
                } else {
                    console.warn("User document not found!");
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };
    
        fetchUserData();
    }, [user]);    

    // Fetch data bencana dan limbah berdasarkan creator
    useEffect(() => {
        if (!user) return; // Tunggu hingga user tersedia
    
        const fetchUserEvents = async () => {
            try {
                console.log("Fetching events for user:", user.uid);
    
                // Query untuk bencana
                const bencanaQuery = query(
                    collection(firestore, "bencana"),
                    where("creator", "==", doc(firestore, "users", user.uid)) // Cocokkan reference
                );
                const limbahQuery = query(
                    collection(firestore, "limbah"),
                    where("creator", "==", doc(firestore, "users", user.uid)) // Cocokkan reference
                );
    
                // Ambil snapshot dokumen
                const [bencanaSnapshot, limbahSnapshot] = await Promise.all([
                    getDocs(bencanaQuery),
                    getDocs(limbahQuery),
                ]);
    
                // Map data bencana dan limbah
                const bencanaEvents = await Promise.all(
                    bencanaSnapshot.docs.map(async (doc) => {
                        const data = doc.data();
                        const creatorName = await getCreatorName(data.creator); // Ambil nama creator
                        return {
                            id: doc.id,
                            ...data,
                            date: data.date?.toDate().toLocaleString(), // Konversi timestamp ke string
                            registUntil: data.registUntil?.toDate().toLocaleString(), // Konversi timestamp ke string
                            creatorName, // Tambahkan nama creator ke data event
                            type: "bencana",
                        };
                    })
                );
    
                const limbahEvents = await Promise.all(
                    limbahSnapshot.docs.map(async (doc) => {
                        const data = doc.data();
                        const creatorName = await getCreatorName(data.creator); // Ambil nama creator
                        return {
                            id: doc.id,
                            ...data,
                            date: data.date?.toDate().toLocaleString(), // Konversi timestamp ke string
                            registUntil: data.registUntil?.toDate().toLocaleString(), // Konversi timestamp ke string
                            creatorName, // Tambahkan nama creator ke data event
                            type: "limbah",
                        };
                    })
                );

                const kocak = user.communityType
                console.log("ini adalah aku dan kamu: ", kocak)
    
                // Gabungkan kedua data
                setEvents([...bencanaEvents, ...limbahEvents]);
            } catch (error) {
                console.error("Error fetching events:", error);
            } finally {
                setIsLoading(false);
            }
        };
    
        fetchUserEvents();
    }, [user]);

    // Handle tambah event
    const handleAddEvent = async () => {

        // Validasi input
        if (!newEvent.title || !newEvent.date || !newEvent.locate || !newEvent.type) {
            alert("Harap isi semua field yang dibutuhkan!");
            return;
        }

        // Validasi panjang karakter untuk nama event dan lokasi
        if (newEvent.title.length > 64) {
            alert("Nama event tidak boleh lebih dari 64 karakter!");
            return;
        }

        if (newEvent.locate.length > 64) {
            alert("Lokasi tidak boleh lebih dari 64 karakter!");
            return;
        }

        // Validasi bahwa batas registrasi harus sebelum tanggal event
        const registUntilDate = new Date(newEvent.registUntil);
        const eventDate = new Date(newEvent.date);
        if (registUntilDate >= eventDate) {
            alert("Batas registrasi harus sebelum tanggal event!");
            return;
        }

        // Validasi `communityType` sesuai dengan koleksi
        if (user.communityType === "bencana" && newEvent.type !== "bencana") {
            alert("Anda tidak memiliki izin untuk membuat event limbah!");
            return;
        }
        if (user.communityType === "lingkungan" && newEvent.type !== "limbah") {
            alert("Anda tidak memiliki izin untuk membuat event bencana!");
            return;
        }

        const eventImage = newEvent.image || "https://placehold.co/600x400";
    
        try {
            console.log("Preparing to add event:", newEvent);

            const collectionName = newEvent.type === "bencana" ? "bencana" : "limbah";

            // Cari ID dokumen terbesar di koleksi
            const collectionRef = collection(firestore, collectionName);
            const snapshot = await getDocs(collectionRef);

            let maxId = 0;
            snapshot.forEach((doc) => {
                const docId = parseInt(doc.id, 10);
                if (!isNaN(docId) && docId > maxId) {
                    maxId = docId;
                }
            });

            // Gunakan ID berikutnya
            const newId = (maxId + 1).toString();
            console.log(`Generated new document ID: ${newId}`);

            await setDoc(doc(firestore, collectionName, newId), {
                ...newEvent,
                image: eventImage,
                creator: doc(firestore, "users", user.uid),
                createdAt: serverTimestamp(),
            });     

            console.log("Event successfully added to Firestore");
            alert("Event berhasil ditambahkan!");
    
            // Tambahkan event baru ke state
            setEvents((prevEvents) => [
                ...prevEvents,
                {
                    id: newId,
                    title: newEvent.title,
                    desc: newEvent.desc,
                    date: newEvent.date,
                    locate: newEvent.locate,
                    type: user.communityType === "bencana" ? "bencana" : "limbah",
                    image: eventImage,
                    creator: user.communityName,
                    createdAt: new Date().toLocaleString(),
                },
            ]);            
    
            // Reset modal
            setIsModalOpen(false);
            setNewEvent({
                title: "",
                desc: "",
                date: "",
                locate: "",
                type: "bencana",
                image: "",
                detailActivity: "",
                detailJob: {
                    jobDesc: "",
                    jobName: "",
                    jobNeeded: 0,
                },
                embedMapLink: "",
                registUntil: "",
                relawanPerlengkapan: [],
            });
        } catch (error) {
            console.error("Error adding event:", error);
            alert("Gagal menambahkan event.");
        }
    };    

    return (
        <div className="w-full bg-gray-100">
            <Navbar pageKeys={['landingPage', 'myEvent', 'navLimbah', 'contactUs']} />
            <div className="max-w-7xl mx-auto py-12 px-6 pt-24">
                <h1 className="text-3xl font-bold mb-6">My Events</h1>
                <button
                    className="bg-green-500 text-white px-4 py-2 rounded mb-6 hover:bg-green-600"
                    onClick={() => setIsModalOpen(true)}
                >
                    Tambah Event
                </button>

                {isLoading ? (
                    <Spinner />
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {events.map((event) => (
                        <CardEvent
                        key={event.id}
                        id={event.id}
                        image={event.image || "https://placehold.co/600x400"}
                        title={event.title || "Nama tidak tersedia"}
                        creator={event.creatorName || event.creator || "Creator tidak diketahui"}
                        date={event.date || "Tanggal tidak tersedia"}
                        locate={event.locate || "Lokasi tidak tersedia"}
                        detailPath={event.type === "bencana" ? "bencanadetail" : "limbahdetail"}
                    />                    
                    ))}
                </div>
                )}
            </div>
            <Footer />

            {/* Modal Tambah Event */}
            {isModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                <div className="bg-white w-3/4 p-6 rounded-lg shadow-lg">
                    <h2 className="text-lg font-bold mb-4">Tambah Event ({user.communityType === "bencana" ? "Bencana" : user.communityType === "lingkungan" ? "limbah" : "NaN"})</h2>
                    <p>apa coba : ({user.communityType})</p>
                    <form className="flex gap-9">

                        <div className="leftSide flex flex-col w-1/2">
                            <div className="mb-4">
                                <label className="block text-sm mb-2">Nama Event</label>
                                <input type="text" value={newEvent.title} onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })} placeholder="Masukkan nama event (maks. 64 karakter)" maxLength={64} className="w-full p-2 border rounded" required />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm mb-2">Deskripsi</label>
                                <textarea value={newEvent.desc} onChange={(e) => setNewEvent({ ...newEvent, desc: e.target.value })} placeholder="Masukkan deskripsi singkat tentang event" className="w-full p-2 border rounded" required/>
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm mb-2">Tanggal Event</label>
                                <input type="date" value={newEvent.date} onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })} className="w-full p-2 border rounded" required />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm mb-2">Lokasi</label>
                                <input type="text" value={newEvent.locate} onChange={(e) => setNewEvent({ ...newEvent, locate: e.target.value })} placeholder="Masukkan lokasi event (maks. 64 karakter)" maxLength={64} className="w-full p-2 border rounded" required />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm mb-2">Detail Aktivitas</label>
                                <textarea value={newEvent.detailActivity} onChange={(e) => setNewEvent({ ...newEvent, detailActivity: e.target.value })} placeholder="Masukkan detail aktivitas" className="w-full p-2 border rounded" required/>
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm mb-2">URL Gambar</label>
                                <input type="text" value={newEvent.image} onChange={(e) => setNewEvent({ ...newEvent, image: e.target.value })} placeholder="Masukkan URL gambar event (Opsional, akan menggunakan default jika kosong)" className="w-full p-2 border rounded"/>
                                <p className="text-sm text-red-500 mt-1">Kosongkan jika ingin menggunakan gambar default.</p>
                            </div>
                        </div>

                        <div className="rightSide flex flex-col w-1/2">
                            <div className="mb-4">
                                <label className="block text-sm mb-2">Detail Pekerjaan</label>
                                <input type="text" value={newEvent.detailJob.jobDesc} onChange={(e) =>
                                    setNewEvent({ ...newEvent, detailJob: { ...newEvent.detailJob, jobDesc: e.target.value } })
                                } placeholder="Deskripsi pekerjaan" className="w-full p-2 border rounded" required/>
                                <input type="text" value={newEvent.detailJob.jobName} onChange={(e) =>
                                    setNewEvent({ ...newEvent, detailJob: { ...newEvent.detailJob, jobName: e.target.value } })
                                } placeholder="Nama pekerjaan" className="w-full p-2 border rounded mt-2" required />
                                <label className="block text-sm mt-2">Jumlah Relawan</label>
                                <input type="number" value={newEvent.detailJob.jobNeeded} onChange={(e) =>
                                    setNewEvent({ ...newEvent, detailJob: { ...newEvent.detailJob, jobNeeded: parseInt(e.target.value) } })
                                } placeholder="Jumlah relawan dibutuhkan" className="w-full p-2 border rounded mt-2" required />
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm mb-2">Link Embed Map</label>
                                <input type="text" value={newEvent.embedMapLink} onChange={(e) => setNewEvent({ ...newEvent, embedMapLink: e.target.value })} placeholder="Masukkan embed map link" className="w-full p-2 border rounded" required />
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm mb-2">Batas Registrasi</label>
                                <input type="date" value={newEvent.registUntil} onChange={(e) => setNewEvent({ ...newEvent, registUntil: e.target.value })} className="w-full p-2 border rounded" required />
                                <p className="text-sm text-red-500 mt-1">Batas registrasi harus sebelum tanggal event.</p>
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm mb-2">Perlengkapan Relawan</label>
                                <input type="text" onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); setNewEvent((prev) => ({
                                    ...prev, relawanPerlengkapan: [...prev.relawanPerlengkapan, e.target.value],
                                })); e.target.value = "" }
                                }} placeholder="Tekan Enter untuk menambahkan" className="w-full p-2 border rounded"/>
                                <ul className="list-disc mt-2 pl-5">{newEvent.relawanPerlengkapan.map((item, index) => (
                                    <li key={index} className="text-sm text-gray-600">{item}</li> ))}
                                </ul>
                            </div>
                            
                            <div className="button flex gap-9 w-full flex-row-reverse">
                                <button onClick={() => setIsModalOpen(false)} className="ml-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 w-28">Batal</button>
                                <button onClick={handleAddEvent} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-28">Simpan</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            )}
        </div>
    );
}