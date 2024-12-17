import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { firestore } from "../../../api/firebaseConfig";
import { collection, setDoc, getDocs, doc, serverTimestamp, updateDoc, increment } from "firebase/firestore";

import Swal from "sweetalert2";
import useUser from "../../context/useUser";
import Navbar from "../../components/layouts/Navbar";

export default function AddEvent() {
    const navigate = useNavigate();
    const { user } = useUser();
    const [newEvent, setNewEvent] = useState({ title: "", desc: "", date: "", time: "", locate: "", image: "", detailActivity: "", embedMapLink: "",
        registUntil: "", registUntilTime: "", relawanKriteria: "", detailJob: { jobDesc: "", jobName: "", jobNeeded: 0 }, perlengkapanRelawan: [],
    });

    const [currentPerlengkapan, setCurrentPerlengkapan] = useState("");
    const addPerlengkapanItem = () => {
        if (currentPerlengkapan.trim()) {
            setNewEvent((prev) => ({ ...prev, perlengkapanRelawan: [...prev.perlengkapanRelawan, currentPerlengkapan], }));
            setCurrentPerlengkapan("");
        }
    };

    const extractGoogleMapsLink = (input) => {
        console.log("Input sebelum diproses:", input);
        const regex = /<iframe[^>]+src=["']([^"']+)["']/i;
        const match = input.match(regex);
    
        if (match) { console.log("Ditemukan dalam iframe:", match[1]); return match[1] }
        if (input.startsWith("https://www.google.com/maps/embed")) { console.log("Input berupa URL langsung:", input.trim()); return input.trim() }
    
        console.warn("Input tidak valid untuk link embed Google Maps");
        return "";
    };
        

    const handleAddEvent = async (e) => {
        e.preventDefault();
        if (!user) return;

        try {
            const result = await Swal.fire({
                title: "Konfirmasi Tambah Event",
                text: "Apakah Anda yakin ingin menambahkan event ini?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#365E32",
                cancelButtonColor: "#d33",
                confirmButtonText: "Ya, Tambahkan!",
                cancelButtonText: "Batal",
            });
            if (!result.isConfirmed) return;

            // Tentukan koleksi berdasarkan communityType
            const collectionName = user.communityType === "lingkungan" ? "limbah" : "bencana";
            const collectionRef = collection(firestore, collectionName);

            // Hitung ID baru berdasarkan jumlah dokumen di koleksi
            const snapshot = await getDocs(collectionRef);
            const newId = (snapshot.docs.length + 1).toString();
            const eventDate = new Date(`${newEvent.date}T${newEvent.time}`);
            const registUntil = new Date(`${newEvent.registUntilDate}T${newEvent.registUntilTime}`);
            const eventData = { ...newEvent, date: eventDate, registUntil: registUntil, creator: doc(firestore, "users", user.uid), createdAt: serverTimestamp(), };

            // Simpan data ke Firestore
            await setDoc(doc(collectionRef, newId), eventData);
            await Swal.fire({ title: "Berhasil!", text: "Event berhasil ditambahkan.", icon: "success", confirmButtonColor: "#365E32", });

            // Tambahkan 100 points ke user komunitas
            const userRef = doc(firestore, "users", user.uid);
            await updateDoc(userRef, { points: increment(100),});
            navigate("/myevent");
        } catch (error) {
            console.error("Error adding event:", error);
            Swal.fire({ title: "Error!", text: "Terjadi kesalahan saat menambahkan event.", icon: "error", confirmButtonColor: "#d33", });
        }
    };

    return (
        <div className="w-full bg-gray-300 min-h-screen">
            <Navbar />
            <button onClick={() => navigate(-1)} className="fixed top-28 left-9 bg-ijoTua text-white w-12 h-12 flex items-center justify-center rounded-full shadow-lg hover:bg-green-600 transition duration-300">
                <img src="https://img.icons8.com/external-freebies-bomsymbols-/91/external-audio-doodle-audio-video-game-freebies-bomsymbols--33.png" alt="" />
            </button>
            <div className="max-w-7xl mx-auto py-12 px-6 pt-24">
                <h1 className="text-3xl font-bold mb-6">Tambah Event ({user?.communityType || ""})</h1>
                <form onSubmit={handleAddEvent} className="bg-[#F0F0F0] p-6 rounded-lg grid grid-cols-1 md:grid-cols-2 gap-6 shadow-2xl">
                    <div>
                        <label>Nama Event</label>
                        <input type="text" value={newEvent.title} onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })} className="w-full p-2 border border-ijoTua rounded mb-4" placeholder="Nama Kegiatan (Maks. 64 karakter)" maxLength={64} required />

                        <label>Deskripsi</label>
                        <textarea value={newEvent.desc} onChange={(e) => setNewEvent({ ...newEvent, desc: e.target.value })} className="w-full p-2 border border-ijoTua rounded mb-4" placeholder="Deskripsi Kegiatan" required />

                        <label>Tanggal Event</label>
                        <div className="flex gap-2 mb-4">
                            <input type="date" value={newEvent.date} onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })} className="w-1/2 p-2 border border-ijoTua rounded" required />
                            <input type="time" value={newEvent.time} onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })} className="w-1/2 p-2 border border-ijoTua rounded" required />
                        </div>

                        <label>Batas Registrasi</label>
                        <div className="flex gap-2 mb-4">
                            <input type="date" value={newEvent.registUntilDate} onChange={(e) => setNewEvent({ ...newEvent, registUntilDate: e.target.value })} className="w-1/2 border-ijoTua p-2 border rounded" required />
                            <input type="time" value={newEvent.registUntilTime} onChange={(e) => setNewEvent({ ...newEvent, registUntilTime: e.target.value })} className="w-1/2 border-ijoTua p-2 border rounded" required />
                        </div>
                        <p className="mb-4 text-red-600 text-xs mt-1">*Harus sebelum tanggal acara</p>

                        <label>Lokasi</label>
                        <input type="text" value={newEvent.locate} onChange={(e) => setNewEvent({ ...newEvent, locate: e.target.value })} className="w-full border-ijoTua p-2 border rounded mb-4" placeholder="Lokasi Kegiatan (Maks. 32 karakter)" maxLength={24} required />
                        
                        <label>URL Gambar</label>
                        <input type="text" value={newEvent.image} onChange={(e) => setNewEvent({ ...newEvent, image: e.target.value })} className="w-full border-ijoTua p-2 border rounded mb-4" placeholder="Link Cover Kegiatan" />
                    </div>
                    <div>
                        <label>Link Embed Map</label>
                        <input
                            type="text"
                            value={newEvent.embedMapLink}
                            onChange={(e) => {
                                const cleanedLink = extractGoogleMapsLink(e.target.value);
                                setNewEvent({ ...newEvent, embedMapLink: cleanedLink });
                            }}
                            className="w-full border-ijoTua p-2 border rounded mb-4"
                            required
                            placeholder="Masukkan Link Embed Google Maps"
                        />


                        <label>Detail Aktivitas</label>
                        <textarea value={newEvent.detailActivity} onChange={(e) => setNewEvent({ ...newEvent, detailActivity: e.target.value })} className="w-full border-ijoTua p-2 border rounded mb-4" required placeholder="Deskripsi Kegiatan" />

                        <label>Kriteria Relawan</label>
                        <textarea value={newEvent.relawanKriteria} onChange={(e) => setNewEvent({ ...newEvent, relawanKriteria: e.target.value })} className="w-full border-ijoTua p-2 border rounded mb-4" required placeholder="Kriteria Relawan yang Dibutuhkan" />

                        <label>Perlengkapan Relawan</label>
                        <div className="flex gap-2 mb-4">
                            <input type="text" value={currentPerlengkapan} onChange={(e) => setCurrentPerlengkapan(e.target.value)} placeholder="Tambahkan perlengkapan" className="w-full border-ijoTua p-2 border rounded" />
                            <button type="button" onClick={addPerlengkapanItem} className="bg-ijoTua text-white hover:bg-green-600 px-4 rounded">Tambah</button>
                        </div>
                        <ul className="list-disc pl-5 mb-4">
                            {newEvent.perlengkapanRelawan.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>

                        <label>Detail Pekerjaan</label>
                        <input type="text" placeholder="Nama Pekerjaan" value={newEvent.detailJob.jobName} onChange={(e) => setNewEvent({ ...newEvent, detailJob: { ...newEvent.detailJob, jobName: e.target.value } })} className="w-full p-2 border rounded mb-2 border-ijoTua" required />
                        <input type="text" placeholder="Deskripsi Pekerjaan" value={newEvent.detailJob.jobDesc} onChange={(e) => setNewEvent({ ...newEvent, detailJob: { ...newEvent.detailJob, jobDesc: e.target.value } })} className="w-full p-2 border rounded mb-2 border-ijoTua" required />
                        <input type="number" placeholder="Jumlah Relawan" value={newEvent.detailJob.jobNeeded} onChange={(e) => setNewEvent({ ...newEvent, detailJob: { ...newEvent.detailJob, jobNeeded: parseInt(e.target.value) || 0 } })} className="w-full p-2 border rounded border-ijoTua" required />
                    </div>
                    <div className="col-span-2 text-right">
                        <button type="submit" className="bg-ijoTua text-white px-4 py-2 rounded hover:bg-green-600">
                            Tambah Event
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}