import { useNavigate } from "react-router-dom";
import Navbar from "../../components/layouts/Navbar";
import HomeImg from "../../assets/homeImg.png";

export default function NotFound() {
    const navigate = useNavigate();
    
    return (
        <div className="h-screen w-full bg-green-300 text-gray-900 flex justify-center items-center">
            <Navbar menuItems={['']} />

            <section className="home grid h-screen pt-32 pb-16">
                <div className="home__container container grid content-center gap-12 lg:max-w-5xl lg:grid-cols-2 lg:items-center">
                    <div className="home__data justify-self-center text-center lg:text-left">
                        <p className="pb-2 font-semibold">Error 404</p>
                        <h1 className="pb-4 text-5xl font-bold lg:text-6xl capitalize">Oopsss 🤪🤪</h1>
                        <p className="pb-8 font-semibold">We cant seem to find the page <br />you are looking for.</p>
                        <button className="inline-flex items-center justify-center rounded-full bg-gray-900 py-4 px-8 font-bold text-white hover:bg-gray-600" onClick={() => navigate("/")}>
                            Go Home
                        </button>
                    </div>

                    <div className="home__img justify-self-center">
                        <img src={HomeImg} className="w-64 animate-floting lg:w-[400px]" alt="home image"/>
                        <div className="home__shadow mx-auto h-8 w-36 animate-shadow rounded-[50%] bg-gray-900/30 blur-md lg:w-64"></div>
                    </div>
                </div>

                <div className="home__footer flex items-center justify-center gap-2 self-end text-sm font-semibold">
                    <p>Copyright © 2024 SIGMA - All rights reserved.</p>
                </div>
            </section>
        </div>
    );
}