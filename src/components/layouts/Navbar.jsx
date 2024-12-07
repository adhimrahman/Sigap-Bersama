import PropTypes from "prop-types";
import Logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";

export default function Navbar({ menuItems, scrollHandler }) {
    const navigate = useNavigate();

    return (
        <nav className="flex items-center justify-between px-24 py-4 bg-ijoTua fixed top-0 w-full h-20 z-10 shadow-lg">
            <div className="flex items-center">
                <img src={Logo} alt="Logo OKFT" className="w-8 md:w-12 drop-shadow-2xl shadow-2xl" />
                <span className="ml-3 text-xl md:text-2xl font-bold text-white uppercase">sigap bersama</span>
            </div>

            <ul className="hidden md:flex space-x-8 text-white text-sm md:text-base font-medium">
                {menuItems.map((label, index) => (
                    <li key={index} className="relative cursor-pointer hover:text-red-400 transition duration-300"
                        onClick={() => {
                            if (label === "Home") navigate("/")
                            if (label === "My Event") navigate("/myEvent")
                            if (label === "Profil") navigate("/profil")
                            else scrollHandler(label) }}
                    >
                        {label}
                        <div className="absolute left-0 bottom-[-4px] h-[2px] w-0 bg-red-400 transition-all duration-300 hover:w-full"></div>
                    </li>
                ))}
            </ul>
        </nav>
    );
}

Navbar.propTypes = {
    menuItems: PropTypes.arrayOf(PropTypes.string).isRequired,
    scrollHandler: PropTypes.func.isRequired,
};