import Bege from "../../assets/bege.png";

import Navbar from "../../components/layouts/Navbar";

export default function LimbahDetail() {

    return (
        <div className="w-full bg-gray-100">

            <Navbar pageKeys={['landingPage', 'bencana', 'limbah', 'contactUs']} />

            {/* Event Details Section */}
            <section className="max-w-6xl mx-auto py-12 pt-24 px-6">
                <div className="flex gap-6 p-5">
                    {/* Left Container */}
                    <div className="flex-2 w-2/3">
                        {/* Event Cover */}
                        <div className="event-cover mb-4">
                            <img src={Bege} alt="Event Cover" className="w-full h-auto" />
                        </div>
                        {/* Event Description */}
                        <div className="event-description mb-4 p-2 h-fit bg-gray-300">
                            <p className="text-m">
                                Generation of Leaders (GenLeaders) adalah platform pengembangan generasi muda Indonesia yang berfokus pada pembentukan karakter kepemimpinan yang bertanggung jawab, berintegritas, berpikir kritis, dan inovatif.
                            </p>                                
                            <p className="mt-4"><strong>Ikuti media sosial kami:</strong></p>
                            <p className="mt-2">Instagram: <a href="https://www.instagram.com/genleaders.id" className="text-blue-500">genleaders.id</a></p>
                            <p>Tiktok: <a href="https://tiktok.com/@genleaders.id" className="text-blue-500">genleaders.id</a></p>
                            <p>Youtube: <span className="text-blue-500">GenLeaders Indonesia</span></p>
                        </div>
                        {/* Event Details */}
                        <div className="event-details mt-4">
                            <div className="detail-aktivitas p2 mb-4">
                              <h3 className="text-lg font-bold text-gray-700 mb-2">Detail Aktivitas</h3>
                                <p><strong>Metode Briefing:</strong> Peserta seleksi yang dinyatakan lolos diberi 2 pilihan (opsional) untuk mengikuti PO selempang bertuliskan "Part of GenLeaders Indonesia", dan mentoring.</p>
                            </div>
                            <hr></hr>
                            <div className="detail-pekerjaan p2">
                                <h3 className="text-lg font-semibold text-gray-700 mt-4">Detail Pekerjaan</h3>
                                <ul className="list-disc pl-5 text-gray-600">
                                    <li>Nama Pekerjaan: Pengurus</li>
                                    <li>Relawan Dibutuhkan: 35 orang</li>
                                    <li>Total Jam Kerja: 1 jam</li>
                                    <li>Tugas Relawan: Mengelola program, membimbing anggota, memfasilitasi pengembangan diri.</li>
                                </ul>
                                <h3 className="text-lg font-semibold text-gray-700 mt-4">Kriteria Relawan</h3>
                                <ul className="list-disc pl-5 text-gray-600">
                                    <li>Berintegritas, berjiwa kepemimpinan, inovatif, berpikir kritis, komunikatif, berdedikasi.</li>
                                </ul>
                                <h3 className="text-lg font-semibold text-gray-700 mt-4">Perlengkapan Relawan</h3>
                                <ul className="list-disc pl-5 text-gray-600">
                                    <li>Mengisi Link Pendaftaran: Pastikan data diisi lengkap dan benar.</li>
                                    <li>Assessment: Siapkan perangkat (laptop/ponsel), koneksi internet stabil, dan alat tulis.</li>
                                    <li>Dokumen Pendukung: CV, motivasi, dan semacamnya.</li>
                                    <li>Fokus dan percaya diri saat mengikuti seleksi.</li>
                                </ul>

                            </div>
                        </div>
                    </div>
                    
                    {/* Right Container */}
                    <div className="flex-1 border border-gray-300 p-6 rounded-lg bg-gray-50 h-fit sticky top-24">
                        <h3 className="text-2xl font-bold text-gray-800">Open Recruitment GenLeaders Indonesia | Batch 1</h3>
                        <p className="mt-4 text-gray-600"><strong>Jadwal:</strong> 01 Januari 2024 - 15 Januari 2024</p>
                        <p className="mt-4 text-gray-600"><strong>Lokasi:</strong> Jakarta, Indonesia</p>
                        <p className="mt-4 text-gray-600"><strong>Batas Registrasi:</strong> 31 Desember 2023</p>
                        <button className="w-full mt-6 px-6 py-2 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700">Jadi Relawan</button>
                        <button className="w-full mt-4 px-6 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700">Kontak Organisasi</button>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="footer w-full bg-black flex">
                <p className="text-white">footer</p>
            </footer>

        </div>
    );
}
