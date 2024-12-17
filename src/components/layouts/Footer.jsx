import { FaTwitter, FaInstagram, FaYoutube, FaTiktok, FaLinkedin } from "react-icons/fa";
import { FaMapLocation } from "react-icons/fa6";
import Logo from "../../assets/logo.png";

export default function Footer() {
    return(
        <footer className="footer w-full bg-ijoTua text-white pt-20 pb-4 px-24 flex justify-center">
            <div className="container px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <div className="space-y-2">
                        <h2 className="text-lg font-bold text-white">Contact Info</h2>
                        <ul className="space-y-1 text-gray-200 flex flex-col gap-y-3">
                            <li>081234567890 (Partnership)</li>
                            <li>081234567890 (Organization & NGO)</li>
                            <li><a href="mailto:adhimrahaman@gmail.com" className="hover:text-green-500">sigapbersama@gmail.com</a></li>
                            <li><a href="https://maps.app.goo.gl/oEdKoWJWpxLNNyvg8" target="_blank" className="hover:text-green-500">
                                JKT48 THEATER FX Sudirman lantai 4 <br /> Jl. Jenderal Sudirman, Pintu Satu Senayan, Senayan,
                                <br />Kota Jakarta Pusat, Daerah Khusus Ibukota Jakarta 10270</a></li>
                        </ul>
                    </div>
                    <div className="flex flex-col items-center justify-center space-y-4">
                        <img src={Logo} alt="Logo" className="h-20 mb-4" />
                        <div className="text-center mt-10 uppercase">
                            <p className="text-white-200 font-bold">SIGAP BERSAMA adalah platform partisipasi relawan untuk tanggap bencana dan kampanye lingkungan.</p>
                        </div>
                        <div className="flex space-x-5">
                            {[
                                { href: "https://x.com/dhimrahman", icon: FaTwitter },
                                { href: "https://www.youtube.com/@adhimrahman3110", icon: FaYoutube },
                                { href: "https://www.linkedin.com/in/rudygunawanir/", icon: FaLinkedin },
                                { href: "https://www.instagram.com/coderinstitute/", icon: FaInstagram },
                                { href: "https://www.tiktok.com/@jkt48.official", icon: FaTiktok },
                                { href: "https://maps.app.goo.gl/xgRjFcm8f2kyztT39", icon: FaMapLocation },
                            ].map(({ href, icon: Icon }, index) => (
                                <a key={index} href={href} target="_blank" rel="noopener noreferrer"
                                    className="w-10 h-10 bg-black text-white flex items-center justify-center rounded-md hover:bg-green-600">
                                    <Icon size={25} />
                                </a>
                            ))}
                        </div>
                    </div>
                    <div className="flex justify-center items-center flex-col">
                        <h2 className="text-lg font-bold text-white mb-3">Kantor Sigap Bersama</h2>
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4713.59270622438!2d119.41330137572015!3d-5.1521618520732915!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dbf1d5825c4e9fb%3A0x8c84b829a29f0bcb!2sJl.%20Kasuari%20No.24%2C%20Kunjung%20Mae%2C%20Kec.%20Mariso%2C%20Kota%20Makassar%2C%20Sulawesi%20Selatan%2090113!5e1!3m2!1sid!2sid!4v1734415695418!5m2!1sid!2sid"
                            width="350"
                            height="250"
                            style={{ border: "0" }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Lokasi Event"
                        ></iframe>
                    </div>
                </div>
                <div className="text-center mt-10 uppercase">
                    <p className="text-white font-bold">Ubah niat baik jadi aksi baik hari ini.</p>
                </div>
                <div className="text-center mt-6 text-gray-200 border-t border-gray-200 pt-4">
                    <p>Copyright © 2024 SIGMA (Sigap Bersama) Foundation - All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}