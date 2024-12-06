import Logo from "../../assets/logo.png"
import Bege from "../../assets/bege.png"
// (role ? individu : kelompok )
{/* input dan output param harus jelas, metode jg harus jelas: apa yg akan dilakukan utk solve prob */}

export default function LandingPage() {

    const menuNavItems = [
        { label: 'About', target: 'about'},
        { label: 'Bencana', target: 'bencana'},
        { label: 'Limbah', target: 'limbah' },
        { label: 'Testimoni', target: 'testimoni' },
        { label: 'Maps', target: 'maps' },
        { label: 'Contact Us', target: 'footer' },
        { label: 'My Event', href: '/myEvent' },
        { label: 'Profil', href: '/profil' },
    ];

    const handleNavScroll = () => {
        const targetElement = document.getElementById();
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return(
        <div className="w-full h-screen bg-[#F0F0F0]">

            <nav className="w-full bg-ijoTua flex px-8 md:px-20 py-3 items-center fixed top-0 z-50 drop-shadow-2xl shadow-2xl">
                <div className="leftSide w-full lg:w-1/3 h-full flex items-center hover:cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                    <img alt="logo" src={Logo} className="w-8 md:w-12 drop-shadow-2xl shadow-2xl"></img>
                    <p className="font-bold capitalize tracking-wider text-lg sm:text-2xl md:text-2xl text-white ml-5">sigap bersama</p>
                </div>

                <div className="rightSide w-2/3 h-full hidden lg:flex items-center justify-center">
                    <ul className="flex w-full justify-around capitalize text-white font-bold text-sm md:text-lg">
                        {menuNavItems.map((item, index) => (
                            <li key={index} className="relative cursor-pointer hover:text-slate-400 hover:underline transition duration-300"
                                onClick={() => item.target && handleNavScroll(item.target)}>
                                {item.href ? ( <a href={item.href}>{item.label}</a> ) : ( item.label )}
                                <div className="absolute left-0 bottom-[-4px] h-[2px] w-0 bg-slate-400 transition-all duration-300 hover:w-full"></div>
                            </li>
                        ))}
                    </ul>
                </div>
            </nav>

            <main className="w-full h-[300%] lg:h-[500%] flex flex-col pt-[3%] bg-[#F0F0F0]">
                <div className="header w-full h-[25%] flex flex-col">
                    <div className="hero bg-loginForm bg-center bg-cover w-full h-1/2 lg:h-1/2 flex flex-col justify-center items-center">
                        <div className="top w-full h-fit flex justify-center items-center py-12">
                            <p className="text-white shine text-3xl md:text-5xl lg:text-8xl font-extrabold uppercase tracking-wider shadow-2xl drop-shadow-2xl">sigap bersama</p>
                        </div>
                    </div>

                    <div className="infoAll w-full h-1/2 lg:flex hidden justify-center items-center bg-wotah bg-center">
                        <div className="box w-2/3 h-2/3 bg-gray-100 rounded-xl flex justify-center items-center shadow-2xl drop-shadow-2xl overflow-hidden py-16 px-9 pl-20">
                            <div className="leftSide w-1/3 h-full flex">
                                <div className="leftSide w-1/3 h-full flex items-center">
                                    <img src={Logo} alt="logo" className="w-[80%]"></img>
                                </div>
                                <div className="rightSide w-2/3 h-full flex flex-col justify-center pl-1 capitalize text-2xl tracking-wide">
                                    <p className="font-bold">123.456</p>
                                    <p>relawan</p>
                                </div>
                            </div>

                            <div className="middleSide w-1/3 h-full flex">
                                <div className="leftSide w-1/3 h-full flex items-center">
                                    <img src={Logo} alt="logo" className="w-[80%]"></img>
                                </div>
                                <div className="rightSide w-2/3 h-full flex flex-col justify-center pl-1 capitalize text-2xl tracking-wide">
                                    <p className="font-bold">123.456</p>
                                    <p>komunitas</p>
                                </div>
                            </div>

                            <div className="rightSide w-1/3 h-full flex">
                                <div className="leftSide w-1/3 h-full flex items-center">
                                    <img src={Logo} alt="logo" className="w-[80%]"></img>
                                </div>
                                <div className="rightSide w-2/3 h-full flex flex-col justify-center pl-1 capitalize text-2xl tracking-wide">
                                    <p className="font-bold">123.456</p>
                                    <p>event</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div id="about" className="desc w-full bg-ijoTua flex flex-col justify-center items-center gap-y-9">
                    <p className="text-white px-4 lg:px-56 pt-12 text-center tracking-wide text-xs lg:text-lg leading-7">
                        Dalam beberapa tahun terakhir, peningkatan jumlah bencana alam dan pencemaran lingkungan, telah menjadi tantangan utama di Indonesia. Meskipun berbagai organisasi dan masyarakat berusaha untuk berpartisipasi, masih ada keterbatasan dalam akses informasi dan koordinasi untuk relawan yang ingin terlibat. Sigap Bersama hadir untuk menghubungkan relawan dengan kegiatan tanggap bencana dan kampanye pembersihan lingkungan, menciptakan wadah yang efektif bagi masyarakat untuk berkontribusi.
                    </p>
                    <p className="text-white px-4 lg:px-56 pb-12 text-center tracking-wide text-xs lg:text-lg leading-7">
                        Sigap Bersama bertemakan Sustainable Development Goals (SDGs), khususnya Sustainable Cities and Communities yang mendorong terciptanya kota dan komunitas yang tangguh serta siap menghadapi bencana, serta Climate Action yang bertujuan untuk menggerakkan aksi global dalam mengurangi dan mengatasi perubahan iklim. Dengan memfasilitasi kegiatan sukarela yang berkaitan dengan penanganan bencana dan kampanye kebersihan lingkungan, Sigap Bersama ingin menciptakan ruang bagi masyarakat untuk terlibat aktif dalam membangun komunitas yang lebih aman, sehat, dan berkelanjutan.
                    </p>
                </div>

                <div className="events w-full h-[65%] flex flex-col gap-y-12">

                    <div id="bencana" className="bencana w-full h-1/4 bg-ijoMuda flex flex-col justify-center items-center"
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

                    <div id="limbah" className="limbah w-full h-1/4 bg-ijoMuda flex flex-col justify-center items-center"
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

                    <div id="testimoni" className="testimoni w-full h-1/4 flex flex-col justify-center items-center">
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
                    <div id="maps" className="maps w-full h-1/4 flex flex-col justify-center items-center bg-pink-200">
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

            <footer id="footer" className="w-full bg-black flex">
                <p className="text-white">footer</p>
            </footer>

        </div>
    )
}