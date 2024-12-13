import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube, FaTiktok, FaLinkedin } from "react-icons/fa";
import { FaMapLocation } from "react-icons/fa6";
import Logo from "../../assets/logo.png";

export default function Footer() {
    return(
        <footer className="footer w-full bg-ijoTua text-white pt-20 pb-4 px-24 flex justify-center">
            <div className="container px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                    <div className="space-y-2">
                        <h2 className="text-lg font-bold text-green-500">Quick Links</h2>
                        <ul className="space-y-1 text-gray-400">
                            <li><a href="#" className="hover:text-green-500">High Achiever</a></li>
                            <li><a href="#" className="hover:text-green-500">Competition</a></li>
                            <li><a href="#" className="hover:text-green-500">Scholarship</a></li>
                        </ul>
                    </div>
                    <div className="flex flex-col items-center justify-center space-y-4">
                        <img src={Logo} alt="Logo" className="h-14 mb-4" />
                        <div className="text-center mt-10 uppercase">
                            <p className="text-white-200 font-bold">SIGAP BERSAMA adalah platform partisipasi relawan untuk tanggap bencana dan kampanye lingkungan.</p>
                        </div>
                        <div className="flex space-x-5">
                            {[
                                { href: "https://twitter.com/okftunhas?lang=en", icon: FaTwitter },
                                { href: "https://www.youtube.com/@OKFTUNHAS", icon: FaYoutube },
                                { href: "https://id.linkedin.com/company/okft-uh", icon: FaLinkedin },
                                { href: "https://www.instagram.com/p/CkDB3nipkFH/", icon: FaInstagram },
                                { href: "https://www.facebook.com/okft09", icon: FaFacebookF },
                                { href: "https://www.tiktok.com", icon: FaTiktok },
                                { href: "https://maps.app.goo.gl/MntNLKuqeJ3L26ny9", icon: FaMapLocation },
                            ].map(({ href, icon: Icon }, index) => (
                                <a key={index} href={href} target="_blank" rel="noopener noreferrer"
                                    className="w-10 h-10 bg-black text-white flex items-center justify-center rounded-md hover:bg-green-600">
                                    <Icon size={25} />
                                </a>
                            ))}
                        </div>
                    </div>
                    <div className="space-y-2">
                        <h2 className="text-lg font-bold text-white">Contact Info</h2>
                        <ul className="space-y-1 text-gray-200">
                            <li>08xxxxxxxxxx (Partnership)</li>
                            <li>08xxxxxxxxxx (Organization & NGO)</li>
                            <li><a href="mailto:okftunhas@gmail.com" className="hover:text-green-500">okftunhas@gmail.com</a></li>
                        </ul>
                    </div>
                </div>
                <div className="text-center mt-10 uppercase">
                    <p className="text-white font-bold">Ubah niat baik jadi aksi baik hari ini.</p>
                </div>
                <div className="text-center mt-6 text-gray-200 border-t border-gray-200 pt-4">
                    <p>Copyright © 2024 SIGMA - All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}