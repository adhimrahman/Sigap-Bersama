import { useNavigate } from 'react-router-dom';
import useUser from '../../context/useUser';
import PropTypes from 'prop-types';
import Logo from '../../assets/logo.png';
import { auth } from '../../api/firebaseConfig';
import { toast } from 'react-toastify';

export default function Navbar({ pageKeys }) {
    const navigate = useNavigate();
    const { user } = useUser();

    // Mapping semua label dengan aksi terkait
    const menuMapping = {
        home: { label: 'Home', onClick: () => document.querySelector('.header')?.scrollIntoView({ behavior: 'smooth' }) },
        about: { label: 'About', onClick: () => document.querySelector('.about')?.scrollIntoView({ behavior: 'smooth' }) },
        bencana: { label: 'Bencana', onClick: () => document.querySelector('.bencana')?.scrollIntoView({ behavior: 'smooth' }) },
        limbah: { label: 'Limbah', onClick: () => document.querySelector('.limbah')?.scrollIntoView({ behavior: 'smooth' }) },
        maps: { label: 'Maps', onClick: () => document.querySelector('.maps')?.scrollIntoView({ behavior: 'smooth' }) },
        contactUs: { label: 'Contact Us', onClick: () => document.querySelector('.footer')?.scrollIntoView({ behavior: 'smooth' }) },

        landingPage: { label: 'Home', onClick: () => navigate('/') },
        navBencana: { label: 'Bencana', onClick: () => navigate('/bencana') },
        navLimbah: { label: 'Limbah', onClick: () => navigate('/limbah') },
        myEvent: { label: 'My Event', onClick: () => navigate('/myevent') },
        myInterest: { label: 'My Interest', onClick: () => navigate('/myinterest') },
        profile: { label: 'Profile', onClick: () => navigate('/profile') },
        signIn: { label: 'Sign In', onClick: () => navigate('/signin') },
        signOut: { label: 'Sign Out', onClick: () => { auth.signOut().then(() => {
            toast.success('Logout successful!', {
                position: 'bottom-right', autoClose: 3000, hideProgressBar: false, closeOnClick: true,
                pauseOnHover: true, draggable: true, progress: undefined, theme: 'light',
            }); navigate('/');
        })}},
    };

    const roleMenuKeys =
        user?.role === 'komunitas' ? ['myEvent', 'profile', 'signOut'] :
        user?.role === 'individu' ? ['myInterest', 'profile', 'signOut'] :
        ['signIn'];

    // merge menu role dan page-specific
    const menuKeys = [...pageKeys, ...roleMenuKeys];
    const menuItems = menuKeys.map((key) => menuMapping[key]);

    return (
        <nav className="flex items-center justify-between px-24 py-4 bg-ijoTua fixed top-0 w-full h-16 z-10 shadow-lg">
            <div className="logo flex items-center cursor-pointer">
                <img src={Logo} alt="Logo" className="w-10 drop-shadow-xl" />
                <span className="ml-3 text-lg font-bold text-white uppercase">Sigap Bersama</span>
            </div>
            <ul className="flex space-x-6 text-white text-sm font-medium">
                {menuItems.map((item, index) => (
                    <li key={index} className="cursor-pointer hover:text-red-400 transition duration-300" onClick={item.onClick}>{item.label}</li>
                ))}
            </ul>
        </nav>
    );
}

Navbar.propTypes = {
    pageKeys: PropTypes.arrayOf(PropTypes.string), // Memastikan pageKeys adalah array string
};

Navbar.defaultProps = {
    pageKeys: [], // Default-nya tidak ada menu tambahan
};