import { useNavigate } from 'react-router-dom';
import useUser from '../../context/useUser';
import Logo from '../../assets/logo.png';
import { auth } from "../../api/firebaseConfig";
import { toast } from 'react-toastify';

function Navbar() {
    const navigate = useNavigate();
    const { user } = useUser(); // Mendapatkan data user dari UserContext

    const scrollToElement = (className) => {
        const targetElement = document.querySelector(`.${className}`);
        if (targetElement) { targetElement.scrollIntoView({ behavior: 'smooth' }) }
    };

    const template = [
        { label: 'Home', onClick: () => scrollToElement('header') },
        { label: 'About', onClick: () => scrollToElement('about') },
        { label: 'Bencana', onClick: () => scrollToElement('bencana') },
        { label: 'Limbah', onClick: () => scrollToElement('limbah') },
        { label: 'Maps', onClick: () => scrollToElement('maps') },
        { label: 'Contact Us', onClick: () => scrollToElement('footer') },
    ]

    const guestMenu = [
        ...template,
        { label: 'Sign In', onClick: () => navigate('/signin') },
    ];

    const komunitasMenu = [
        ...template,
        { label: 'My Event', onClick: () => navigate('/myevent') },
        { label: 'Profile', onClick: () => navigate('/profile') },
        { label: 'Sign Out', onClick: handleSignOut },
    ];
    
    const individuMenu = [
        ...template,
        { label: 'My Interest', onClick: () => navigate('/myinterest') },
        { label: 'Profile', onClick: () => navigate('/profile') },
        { label: 'Sign Out', onClick: handleSignOut },
    ];

    function handleSignOut() {
        auth.signOut()
            .then(() => {
                toast.success('Logout successful!', {
                    position: 'bottom-right', autoClose: 3000, hideProgressBar: false, closeOnClick: true,
                    pauseOnHover: true, draggable: true, progress: undefined, theme: 'light',
                }); navigate('/');
            })
            .catch((error) => {
                console.error('Error signing out:', error);
                toast.error('Logout failed. Please try again.', {
                    position: 'bottom-right', autoClose: 3000, hideProgressBar: false, closeOnClick: true,
                    pauseOnHover: true, draggable: true, progress: undefined, theme: 'light',
                });
            });
    }

    const menuItems =
        user?.role === 'komunitas' ? komunitasMenu :
        user?.role === 'individu' ? individuMenu : guestMenu;

    return (
        <nav className="flex items-center justify-between px-24 py-4 bg-ijoTua fixed top-0 w-full h-16 z-10 shadow-lg">
            <div className="logo flex items-center cursor-pointer" onClick={() => scrollToElement('home')}>  
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

export default Navbar;