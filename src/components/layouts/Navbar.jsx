import PropTypes from "prop-types";
import Logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import useUser from '../../context/useUser';
import { signOut } from 'firebase/auth';
import { auth } from '../../api/firebaseConfig';

export default function Navbar({ scrollHandler, menuItems = [] }) {
    const navigate = useNavigate();
    const { user } = useUser();
    const { setUser } = useUser();

    const handleSignout = async () => {
        try {
            await signOut(auth); // Sign out dari Firebase
            setUser(null); // Hapus data user dari context
            navigate('/'); // Arahkan kembali ke halaman utama
        } catch (error) { console.error("Error signing out:", error) }
    }

    return (
        <nav className="flex items-center justify-between px-24 py-4 bg-ijoTua fixed top-0 w-full h-20 z-10 shadow-lg">
            <div className="logo flex items-center hover:cursor-pointer" onClick={() => navigate('/')}>
                <img src={Logo} alt="Logo OKFT" className="w-8 md:w-12 drop-shadow-2xl shadow-2xl" />
                <span className="ml-3 text-xl md:text-2xl font-bold text-white uppercase">sigap bersama</span>
            </div>

            <ul className="hidden md:flex space-x-8 text-white text-sm md:text-base font-medium">
                {menuItems.map((item, index) => (
                    <li key={index} className="relative cursor-pointer hover:text-red-400 transition duration-300"
                    onClick={() => {
                        if (['Home', 'About', 'Bencana', 'Limbah', 'Testimoni', 'Maps', 'Contact Us'].includes(item)) { scrollHandler(item) }
                        else if (item === 'My Event') { navigate('/myEvent') }
                    }}>{item}
                    </li>
                ))}
                {user ? (
                    <>
                    <li onClick={() => navigate('/profile')} className="relative cursor-pointer hover:text-red-400 transition duration-300">
                        Profil {/* Profil Menu */}
                    </li>
                    <li onClick={handleSignout} className="relative cursor-pointer hover:text-red-400 transition duration-300">
                        Sign Out {/* Sign Out Menu */}
                    </li>
                    </>
                ) : (
                    <li onClick={() => navigate('/signin')} className="relative cursor-pointer hover:text-red-400 transition duration-300">
                        Sign In     {/*Sign In Menu for Guest*/}
                    </li>
                )}
            </ul>
        </nav>
    );
}

Navbar.propTypes = {
    menuItems: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.object])),
    scrollHandler: PropTypes.func.isRequired,
};