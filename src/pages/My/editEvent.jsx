import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { firestore } from "../../../api/firebaseConfig";
import Swal from "sweetalert2";
import Navbar from "../../components/layouts/Navbar";

export default function EditEvent() {
    const { id, type } = useParams();
    const navigate = useNavigate();
    const [eventData, setEventData] = useState(null);
    const [currentPerlengkapan, setCurrentPerlengkapan] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEventData = async () => {
            try {
                const docRef = doc(firestore, type, id);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const data = docSnap.data();
                    setEventData({
                        ...data,
                        date: data.date?.toDate().toISOString().split("T")[0],
                        time: data.date?.toDate().toISOString().split("T")[1]?.slice(0, 5),
                        registUntilDate: data.registUntil?.toDate().toISOString().split("T")[0],
                        registUntilTime: data.registUntil?.toDate().toISOString().split("T")[1]?.slice(0, 5),
                    });
                } else { console.error("Event tidak ditemukan") }
            } catch (error) { console.error("Error fetching event data:", error);
            } finally { setLoading(false) }
        };
        fetchEventData();
    }, [id, type]);

    const handleEditEvent = async (e) => {
        e.preventDefault();
        try {
            const result = await Swal.fire({
                title: "Konfirmasi Edit Event",
                text: "Apakah Anda yakin ingin menyimpan perubahan?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#365E32",
                cancelButtonColor: "#d33",
                confirmButtonText: "Ya, Simpan!",
            });
            if (!result.isConfirmed) return;

            const updatedEvent = { ...eventData, date: new Date(`${eventData.date}T${eventData.time}`), registUntil: new Date(`${eventData.registUntilDate}T${eventData.registUntilTime}`), updatedAt: serverTimestamp(), };
            const docRef = doc(firestore, type, id);
            await setDoc(docRef, updatedEvent, { merge: true });

            await Swal.fire({title: "Berhasil!", text: "Event berhasil diperbarui.", icon: "success", confirmButtonColor: "#365E32", });
            navigate(`/${type}/detail/${id}`);
        } catch (error) {
            console.error("Error updating event:", error);
            Swal.fire({title: "Error!", text: "Terjadi kesalahan saat memperbarui event.", icon: "error", confirmButtonColor: "#365E32",});
        }
    };

    const addPerlengkapanItem = () => {
        if (currentPerlengkapan.trim()) {
            setEventData((prev) => ({ ...prev, perlengkapanRelawan: [...prev.perlengkapanRelawan, currentPerlengkapan], }));
            setCurrentPerlengkapan("");
        }
    };

    const extractGoogleMapsLink = (input) => {
        const regex = /<iframe[^>]+src=["']([^"']+)["']/i;
        const match = input.match(regex); 
        if (match) { console.log("Ditemukan dalam iframe:", match[1]); return match[1]; }
        if (input.startsWith("https://www.google.com/maps/embed")) { console.log("Input berupa URL langsung:", input.trim()); return input.trim() }
        
        console.log("Input sebelum diproses:", input);
        console.warn("Input tidak valid untuk link embed Google Maps");
        return "";
    };
    if (loading) return <p>Loading...</p>;

    return (
        <div className="w-full bg-gray-300 min-h-screen">
            <Navbar />
            <div className="max-w-7xl mx-auto py-12 px-6 pt-24">
                <h1 className="text-3xl font-bold mb-6">Edit Event ({type === "limbah" ? "lingkungan" : "bencana"})</h1>
                <form onSubmit={handleEditEvent} className="bg-[#F0F0F0] p-6 rounded-lg grid grid-cols-1 md:grid-cols-2 gap-6 shadow-2xl">
                    <div>
                        <label>Nama Event</label>
                        <input type="text" value={eventData.title} onChange={(e) => setEventData({ ...eventData, title: e.target.value })} className="w-full p-2 border border-ijoTua rounded mb-4" required />

                        <label>Deskripsi</label>
                        <textarea value={eventData.desc} onChange={(e) => setEventData({ ...eventData, desc: e.target.value })} className="w-full p-2 border border-ijoTua rounded mb-4" required />

                        <label>Tanggal Event</label>
                        <div className="flex gap-2 mb-4">
                            <input type="date" value={eventData.date} onChange={(e) => setEventData({ ...eventData, date: e.target.value })} className="w-1/2 p-2 border border-ijoTua rounded" required />

                            <input type="time" value={eventData.time} onChange={(e) => setEventData({ ...eventData, time: e.target.value })} className="w-1/2 p-2 border border-ijoTua rounded" required />
                        </div>

                        <label>Batas Registrasi</label>
                        <div className="flex gap-2 mb-4">
                            <input type="date" value={eventData.registUntilDate} onChange={(e) => setEventData({ ...eventData, registUntilDate: e.target.value })} className="w-1/2 border-ijoTua p-2 border rounded" required />

                            <input type="time" value={eventData.registUntilTime} onChange={(e) => setEventData({ ...eventData, registUntilTime: e.target.value })} className="w-1/2 border-ijoTua p-2 border rounded" required />
                        </div>

                        <label>Lokasi</label>
                        <input type="text" value={eventData.locate} onChange={(e) => setEventData({ ...eventData, locate: e.target.value })} className="w-full border-ijoTua p-2 border rounded mb-4" required />

                        <label>URL Gambar</label>
                        <input type="text" value={eventData.image} onChange={(e) => setEventData({ ...eventData, image: e.target.value })} className="w-full border-ijoTua p-2 border rounded mb-4" />
                    </div>

                    <div>
                        <label>Link Embed Map</label>
                        <input type="text" value={eventData.embedMapLink} onChange={(e) => { const cleanedLink = extractGoogleMapsLink(e.target.value);
                            setEventData({ ...eventData, embedMapLink: cleanedLink });
                        }} className="w-full border-ijoTua p-2 border rounded mb-4" required />

                        <label>Detail Aktivitas</label>
                        <textarea value={eventData.detailActivity} onChange={(e) => setEventData({ ...eventData, detailActivity: e.target.value })} className="w-full border-ijoTua p-2 border rounded mb-4" required />

                        <label>Kriteria Relawan</label>
                        <textarea value={eventData.relawanKriteria} onChange={(e) => setEventData({ ...eventData, relawanKriteria: e.target.value })} className="w-full border-ijoTua p-2 border rounded mb-4" required />

                        <label>Perlengkapan Relawan</label>
                        <div className="flex gap-2 mb-4">
                            <input type="text" value={currentPerlengkapan} onChange={(e) => setCurrentPerlengkapan(e.target.value)} placeholder="Tambahkan perlengkapan" className="w-full border-ijoTua p-2 border rounded" />
                            <button type="button" onClick={addPerlengkapanItem} className="bg-ijoTua text-white px-4 rounded hover:bg-green-600">
                                Tambah
                            </button>
                        </div>
                        <ul className="list-disc pl-5 mb-4">
                            {eventData.perlengkapanRelawan?.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>

                        <label>Detail Pekerjaan</label>
                        <input type="text" placeholder="Nama Pekerjaan" value={eventData.detailJob?.jobName} onChange={(e) =>
                            setEventData({ ...eventData, detailJob: { ...eventData.detailJob, jobName: e.target.value } })
                        } className="w-full p-2 border rounded mb-2 border-ijoTua" required />

                        <input type="text" placeholder="Deskripsi Pekerjaan" value={eventData.detailJob?.jobDesc} onChange={(e) =>
                            setEventData({ ...eventData, detailJob: { ...eventData.detailJob, jobDesc: e.target.value } })
                        } className="w-full p-2 border rounded mb-2 border-ijoTua" required />

                        <input type="number" placeholder="Jumlah Relawan" value={eventData.detailJob?.jobNeeded || 0} onChange={(e) =>
                            setEventData({ ...eventData, detailJob: { ...eventData.detailJob, jobNeeded: parseInt(e.target.value) || 0 } })
                        } className="w-full p-2 border rounded border-ijoTua" required />
                    </div>

                    <div className="col-span-2 text-right">
                        <button type="submit" className="bg-ijoTua text-white px-4 py-2 rounded hover:bg-green-600">Simpan Perubahan</button>
                    </div>
                </form>
            </div>
        </div>
    );
}