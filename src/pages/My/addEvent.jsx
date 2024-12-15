import { useState } from "react";
import { collection, setDoc, getDocs, doc, serverTimestamp } from "firebase/firestore";
import { firestore } from "../../api/firebaseConfig";
import useUser from "../../context/useUser";
import Navbar from "../../components/layouts/Navbar";
import { useNavigate } from "react-router-dom";

export default function AddEvent() {
    const { user } = useUser();
    const navigate = useNavigate();

    const [newEvent, setNewEvent] = useState({
        title: "",
        desc: "",
        date: "",
        locate: "",
        image: "",
        detailActivity: "",
        embedMapLink: "",
        registUntil: "",
        relawanKriteria: "",
        detailJob: { jobDesc: "", jobName: "", jobNeeded: 0 },
        perlengkapanRelawan: [],
    });

    const [currentPerlengkapan, setCurrentPerlengkapan] = useState("");

    const addPerlengkapanItem = () => {
        if (currentPerlengkapan.trim()) {
            setNewEvent((prev) => ({
                ...prev,
                perlengkapanRelawan: [...prev.perlengkapanRelawan, currentPerlengkapan],
            }));
            setCurrentPerlengkapan(""); // Reset input
        }
    };

    const handleAddEvent = async (e) => {
        e.preventDefault();
        if (!user) return;

        try {
            // Tentukan koleksi berdasarkan communityType
            const collectionName = user.communityType === "lingkungan" ? "limbah" : "bencana";
            const collectionRef = collection(firestore, collectionName);

            // Hitung ID baru berdasarkan jumlah dokumen di koleksi
            const snapshot = await getDocs(collectionRef);
            const newId = (snapshot.docs.length + 1).toString();

            // Persiapkan data event
            const eventData = {
                ...newEvent,
                date: new Date(newEvent.date), // Format tanggal Firestore
                registUntil: new Date(newEvent.registUntil), // Format tanggal Firestore
                creator: doc(firestore, "users", user.uid), // Reference ke users/{uid}
                createdAt: serverTimestamp(),
            };

            // Simpan data ke Firestore
            await setDoc(doc(collectionRef, newId), eventData);
            alert("Event berhasil ditambahkan!");

            // Redirect ke halaman event
            navigate("/myevent");
        } catch (error) {
            console.error("Error adding event:", error);
            alert("Terjadi kesalahan saat menambahkan event.");
        }
    };

    return (
        <div className="w-full bg-gray-100 min-h-screen">
            <Navbar />
            <div className="max-w-7xl mx-auto py-12 px-6 pt-24">
                <h1 className="text-3xl font-bold mb-6">Tambah Event ({user?.communityType || "bencana"})</h1>
                <form onSubmit={handleAddEvent} className="bg-[#F0F0F0] p-6 rounded-lg grid grid-cols-1 md:grid-cols-2 gap-6 shadow-2xl">
                    <div>
                        <label>Nama Event</label>
                        <input type="text" value={newEvent.title} onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })} className="w-full p-2 border rounded mb-4" placeholder="Nama Kegiatan (Maks. 64 karakter)" maxLength={64} required />

                        <label>Deskripsi</label>
                        <textarea value={newEvent.desc} onChange={(e) => setNewEvent({ ...newEvent, desc: e.target.value })} className="w-full p-2 border rounded mb-4" placeholder="Deskripsi Kegiatan" required />

                        <label>Tanggal Event</label>
                        <input type="date" value={newEvent.date} onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })} className="w-full p-2 border rounded mb-4" required />

                        <label>Batas Registrasi</label>
                        <input type="date" value={newEvent.registUntil} onChange={(e) => setNewEvent({ ...newEvent, registUntil: e.target.value })} className="w-full p-2 border rounded" required />
                        <p className="mb-4 text-red-600 text-xs mt-1">*Harus sebelum tanggal acara</p>

                        <label>Lokasi</label>
                        <input type="text" value={newEvent.locate} onChange={(e) => setNewEvent({ ...newEvent, locate: e.target.value })} className="w-full p-2 border rounded mb-4" placeholder="Lokasi Kegiatan" required />
                        
                        <label>URL Gambar</label>
                        <input type="text" value={newEvent.image} onChange={(e) => setNewEvent({ ...newEvent, image: e.target.value })} className="w-full p-2 border rounded mb-4" placeholder="Link Cover Kegiatan" />
                    </div>
                    <div>
                        <label>Link Embed Map</label>
                        <input type="text" value={newEvent.embedMapLink} onChange={(e) => setNewEvent({ ...newEvent, embedMapLink: e.target.value })} className="w-full p-2 border rounded mb-4" required placeholder="Masukkan Link Embeded Google Maps" />

                        <label>Detail Aktivitas</label>
                        <textarea value={newEvent.detailActivity} onChange={(e) => setNewEvent({ ...newEvent, detailActivity: e.target.value })} className="w-full p-2 border rounded mb-4" required placeholder="Deskripsi Kegiatan" />

                        <label>Kriteria Relawan</label>
                        <textarea value={newEvent.relawanKriteria} onChange={(e) => setNewEvent({ ...newEvent, relawanKriteria: e.target.value })} className="w-full p-2 border rounded mb-4" required placeholder="Kriteria Relawan yang Dibutuhkan" />

                        <label>Perlengkapan Relawan</label>
                        <div className="flex gap-2 mb-4">
                            <input type="text" value={currentPerlengkapan} onChange={(e) => setCurrentPerlengkapan(e.target.value)} placeholder="Tambahkan perlengkapan" className="w-full p-2 border rounded" />
                            <button type="button" onClick={addPerlengkapanItem} className="bg-ijoTua text-white px-4 rounded">Tambah</button>
                        </div>
                        <ul className="list-disc pl-5 mb-4">
                            {newEvent.perlengkapanRelawan.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>

                        <label>Detail Pekerjaan</label>
                        <input type="text" placeholder="Nama Pekerjaan" value={newEvent.detailJob.jobName} onChange={(e) => setNewEvent({ ...newEvent, detailJob: { ...newEvent.detailJob, jobName: e.target.value } })} className="w-full p-2 border rounded mb-2" required />
                        <input type="text" placeholder="Deskripsi Pekerjaan" value={newEvent.detailJob.jobDesc} onChange={(e) => setNewEvent({ ...newEvent, detailJob: { ...newEvent.detailJob, jobDesc: e.target.value } })} className="w-full p-2 border rounded mb-2" required />
                        <input type="number" placeholder="Jumlah Relawan" value={newEvent.detailJob.jobNeeded} onChange={(e) => setNewEvent({ ...newEvent, detailJob: { ...newEvent.detailJob, jobNeeded: parseInt(e.target.value) || 0 } })} className="w-full p-2 border rounded" required />
                    </div>
                    <div className="col-span-2 text-right">
                        <button type="submit" className="bg-ijoTua text-white px-4 py-2 rounded hover:bg-blue-600">
                            Tambah Event
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
