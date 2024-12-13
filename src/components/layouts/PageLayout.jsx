import Navbar from "./Navbar";
import Footer from "./Footer";

export default function PageLayout({ children }) {
    return (
        <>
            <Navbar pageKeys={['landingPage', 'navBencana', 'navLimbah', 'contactUs']} />
            <div className="w-full px-9 sm:px-12 md:px-12 lg:px-24 p-4 mt-20 mb-12">{children}</div>
            <Footer />
        </>
    );
}
