import Logo from "../../assets/logo.png"
import Bege from "../../assets/bege.png"

import Navbar from "../../components/layouts/Navbar";
// (role ? individu : kelompok )
{/* input dan output param harus jelas, metode jg harus jelas: apa yg akan dilakukan utk solve prob */}

export default function LandingPage() {

    const scrollToDesc = () => {
        const heroElement = document.querySelector('.about');
        heroElement?.scrollIntoView({ behavior: 'smooth' });
    }

    return(
        <div className="w-full bg-[#F0F0F0]">

            <Navbar menuItems={['Home', 'About', 'Bencana', 'Limbah', 'Testimoni', 'Maps', 'Contact Us', 'My Event', 'Profil']}
                scrollHandler={(label) => {
                    const targetClass =
                        label === 'About' ? 'about' : label === 'Bencana' ? 'bencana' :
                        label === 'Limbah' ? 'limbah' : label === 'Testimoni' ? 'testimoni' :
                        label === 'Maps' ? 'maps' : label === 'Contact Us' ? 'footer' : 'hero';
                    const targetElement = document.querySelector(`.${targetClass}`);
                    targetElement?.scrollIntoView({ behavior: 'smooth' });
                }}
            />

            <main className="w-full flex flex-col bg-[#F0F0F0]">

                <div className="header w-full h-screen bg-loginForm bg-center bg-cover flex flex-col">
                    <div className="hero w-full h-2/3 flex flex-col justify-center items-center">
                        <div className="top w-full h-fit flex justify-center items-center py-12">
                            <p className="text-white shine text-3xl md:text-5xl lg:text-8xl font-extrabold uppercase tracking-wider shadow-2xl drop-shadow-2xl mt-20">sigap bersama</p>
                        </div>
                    </div>

                    <div className="infoAll w-full lg:flex flex-col hidden justify-center items-center  bg-center">
                        <div className="box w-2/3 h-1/3 bg-gray-100 rounded-xl flex justify-center items-center shadow-2xl drop-shadow-2xl overflow-hidden py-16 px-9 pl-20">
                            <div className="leftSide w-1/3 h-full flex">
                                <div className="leftSide w-1/3 h-full flex items-center">
                                    <img src={Logo} alt="logo" className="w-[80%]"></img>
                                </div>
                                <div className="rightSide w-2/3 h-full flex flex-col justify-center pl-1 capitalize text-2xl tracking-wide">
                                    <p className="font-bold">123.456</p><p>relawan</p>
                                </div>
                            </div>

                            <div className="middleSide w-1/3 h-full flex">
                                <div className="leftSide w-1/3 h-full flex items-center">
                                    <img src={Logo} alt="logo" className="w-[80%]"></img>
                                </div>
                                <div className="rightSide w-2/3 h-full flex flex-col justify-center pl-1 capitalize text-2xl tracking-wide">
                                    <p className="font-bold">123.456</p><p>komunitas</p>
                                </div>
                            </div>

                            <div className="rightSide w-1/3 h-full flex">
                                <div className="leftSide w-1/3 h-full flex items-center">
                                    <img src={Logo} alt="logo" className="w-[80%]"></img>
                                </div>
                                <div className="rightSide w-2/3 h-full flex flex-col justify-center pl-1 capitalize text-2xl tracking-wide">
                                    <p className="font-bold">123.456</p><p>event</p>
                                </div>
                            </div>
                        </div>
                        {/* <button  onClick={scrollToHero} className=" bg-blue-500 text-white rounded-full hover:bg-blue-700 transition duration-300 animate-bounce w-12 h-12"></button> */}
                        <div className="animate-bounce bg-white dark:bg-slate-800 p-2 w-12 h-12 ring-1 ring-slate-900/5 dark:ring-slate-200/20 shadow-lg rounded-full flex items-center justify-center mt-10 hover:cursor-pointer" onClick={scrollToDesc}>
                            <svg className="w-9 h-9 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>
                        </div>
                    </div>
                </div>

                <div className="about w-full bg-ijoTua flex flex-col justify-center items-center gap-y-9">
                    <p className="text-white px-4 lg:px-56 pt-12 text-center tracking-wide text-xs lg:text-base leading-7">
                        Dalam beberapa tahun terakhir, peningkatan jumlah bencana alam dan pencemaran lingkungan, telah menjadi tantangan utama di Indonesia. Meskipun berbagai organisasi dan masyarakat berusaha untuk berpartisipasi, masih ada keterbatasan dalam akses informasi dan koordinasi untuk relawan yang ingin terlibat. Sigap Bersama hadir untuk menghubungkan relawan dengan kegiatan tanggap bencana dan kampanye pembersihan lingkungan, menciptakan wadah yang efektif bagi masyarakat untuk berkontribusi.
                    </p>
                    <p className="text-white px-4 lg:px-56 pb-12 text-center tracking-wide text-xs lg:text-base leading-7">
                        Sigap Bersama bertemakan Sustainable Development Goals (SDGs), khususnya Sustainable Cities and Communities yang mendorong terciptanya kota dan komunitas yang tangguh serta siap menghadapi bencana, serta Climate Action yang bertujuan untuk menggerakkan aksi global dalam mengurangi dan mengatasi perubahan iklim. Dengan memfasilitasi kegiatan sukarela yang berkaitan dengan penanganan bencana dan kampanye kebersihan lingkungan, Sigap Bersama ingin menciptakan ruang bagi masyarakat untuk terlibat aktif dalam membangun komunitas yang lebih aman, sehat, dan berkelanjutan.
                    </p>
                </div>

                <div className="events w-full h-full flex flex-col gap-y-12">

                    <div className="bencana w-full h-1/4 bg-ijoMuda flex flex-col justify-center items-center"
                    style={{ background: "linear-gradient(to bottom, #F0F0F0 30%, #9ed3a0 20%)", }}>
                        <div className="topSide w-3/4 h-2/5 rounded-lg overflow-hidden flex shadow-[19px_-15px_45px_5px_rgba(0,_0,_0,_0.2)]">
                            <div className="leftSide h-full w-1/3">
                                <img alt="" src={Bege} className="h-full w-fit"></img>
                            </div>
                            <div className="rightSide h-full w-2/3 px-8 py-6 bg-white">
                                <div className="title">
                                    <p className="text-xl font-bold uppercase">limbah lembah lumba lumba</p>
                                </div>
                                <div className="caption mt-4 normal-case text-justify">
                                    <p>
                                        LIMBAH LEMBAH LUMBA LUMBA LIMBAH LEMBAH LUMBA LUMBA LIMBAH LEMBAH LUMBA LUMBA LIMBAH LEMBAH LUMBA LUMBA LIMBAH LEMBAH LUMBA LUMBA LIMBAH LEMBAH LUMBA LUMBA LIMBAH LEMBAH LUMBA LUMBA LIMBAH LEMBAH LUMBA LUMBA LIMBAH LEMBAH LUMBA LUMBA LIMBAH LEMBAH LUMBA LUMBA LIMBAH LEMBAH LUMBA LUMBA LIMBAH LEMBAH LUMBA LUMBA LIMBAH LEMBAH LUMBA LUMBA LIMBAH LEMBAH LUMBA LUMBA LIMBAH 
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bottomSide w-3/4 h-2/5 pt-5 rounded-b-lg flex justify-between overflow-hidden">
                            <div className="card w-1/6 h-full bg-white rounded-lg"></div>
                            <div className="card w-1/6 h-full bg-white rounded-lg"></div>
                            <div className="card w-1/6 h-full bg-white rounded-lg"></div>
                            <div className="card w-1/6 h-full bg-white rounded-lg"></div>
                            <div className="card w-1/6 h-full bg-white rounded-lg"></div>
                        </div>
                    </div>

                    <div className="limbah w-full h-1/4 bg-ijoMuda flex flex-col justify-center items-center"
                    style={{ background: "linear-gradient(to bottom, #F0F0F0 30%, #9ed3a0 20%)", }}>
                        <div className="topSide w-3/4 h-2/5 rounded-lg overflow-hidden flex shadow-[19px_-15px_45px_5px_rgba(0,_0,_0,_0.2)]">
                            <div className="leftSide h-full w-1/3">
                                <img alt="" src={Bege} className="h-full w-fit"></img>
                            </div>
                            <div className="rightSide h-full w-2/3 px-8 py-6 bg-white">
                                <div className="title">
                                    <p className="text-xl font-bold uppercase">limbah lembah lumba lumba</p>
                                </div>
                                <div className="caption mt-4 normal-case text-justify">
                                    <p>
                                        LIMBAH LEMBAH LUMBA LUMBA LIMBAH LEMBAH LUMBA LUMBA LIMBAH LEMBAH LUMBA LUMBA LIMBAH LEMBAH LUMBA LUMBA LIMBAH LEMBAH LUMBA LUMBA LIMBAH LEMBAH LUMBA LUMBA LIMBAH LEMBAH LUMBA LUMBA LIMBAH LEMBAH LUMBA LUMBA LIMBAH LEMBAH LUMBA LUMBA LIMBAH LEMBAH LUMBA LUMBA LIMBAH LEMBAH LUMBA LUMBA LIMBAH LEMBAH LUMBA LUMBA LIMBAH LEMBAH LUMBA LUMBA LIMBAH LEMBAH LUMBA LUMBA LIMBAH 
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bottomSide w-3/4 h-2/5 pt-5 rounded-b-lg flex justify-between overflow-hidden">
                            <div className="card w-1/6 h-full bg-white rounded-lg"></div>
                            <div className="card w-1/6 h-full bg-white rounded-lg"></div>
                            <div className="card w-1/6 h-full bg-white rounded-lg"></div>
                            <div className="card w-1/6 h-full bg-white rounded-lg"></div>
                            <div className="card w-1/6 h-full bg-white rounded-lg"></div>
                        </div>
                    </div>

                    <div className="testimoni w-full h-1/4 flex flex-col justify-center items-center">
                        <div className="title w-3/4 h-1/5 flex flex-col justify-center items-center">
                            <p className="text-5xl font-extrabold uppercase tracking-wider">testimoni</p>
                            <p className="text-lg font-semibold capitalize tracking-wide leading-10">mereka yang pernah menggunakan sigap bersama</p>
                        </div>

                        <div className="cards w-3/4 h-3/5 flex flex-nowrap justify-start py-5 gap-9 overflow-x-auto">
                            <div className="card w-1/4 h-full bg-yellow-300 flex-shrink-0 rounded-xl">

                            </div>
                            <div className="card w-1/4 h-full bg-yellow-300 flex-shrink-0 rounded-xl">

                            </div>
                            <div className="card w-1/4 h-full bg-yellow-300 flex-shrink-0 rounded-xl">

                            </div>
                            <div className="card w-1/4 h-full bg-yellow-300 flex-shrink-0 rounded-xl">

                            </div>
                            <div className="card w-1/4 h-full bg-yellow-300 flex-shrink-0 rounded-xl">

                            </div>
                            <div className="card w-1/4 h-full bg-yellow-300 flex-shrink-0 rounded-xl">

                            </div>
                        </div>
                    </div>
                    <div className="maps w-full h-1/4 flex flex-col justify-center items-center bg-pink-200">
                        <div className="title">
                            <p>testimoni</p>
                            <p>mereka yang pernah menggunakan sigap bersama</p>
                        </div>

                        <div className="cards">
                            <div className="card">

                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <footer className="footer w-full bg-black flex">
                <p className="text-white">footer</p>
            </footer>

        </div>
    )
}