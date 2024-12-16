import PropTypes from "prop-types"
import Logo from "../../../assets/logo.png"

export default function HeaderSection({ relawanCount, komunitasCount, eventCount }) {
    const scrollToDesc = () => {
        const heroElement = document.querySelector('.about');
        heroElement?.scrollIntoView({ behavior: 'smooth' });
    }

    return (
        <div className="header w-full h-screen bg-loginForm bg-center bg-cover flex flex-col justify-center items-center gap-y-12">
            <div className="top w-full h-fit flex justify-center items-center">
                <p className="text-white shine text-3xl sm:text-6xl md:text-6xl lg:text-8xl font-extrabold uppercase tracking-wider mt-36 text-shadow-green-400 text-shadow-x-xl">sigap bersama</p>
            </div>

            <div className="box w-2/3 h-fit bg-gray-100 rounded-xl flex flex-col lg:flex-row justify-center items-center shadow-2xl drop-shadow-2xl overflow-hidden py-3 lg:py-9 px-3 lg:px-9 lg:pl-20">
                <div className="leftSide  lg:w-1/3 h-full flex">
                    <div className="leftSide w-1/3 h-full flex items-center"><img src={Logo} alt="logo" className="w-[80%]"></img></div>
                    <div className="rightSide w-2/3 h-full flex flex-col justify-center pl-1 capitalize text-2xl tracking-wide">
                        <p className="font-bold">{relawanCount.toLocaleString()}</p><p>relawan</p>
                    </div>
                </div>

                <div className="middleSide lg:w-1/3 h-full flex">
                    <div className="leftSide w-1/3 h-full flex items-center"><img src={Logo} alt="logo" className="w-[80%]"></img></div>
                    <div className="rightSide w-2/3 h-full flex flex-col justify-center pl-1 capitalize text-2xl tracking-wide">
                        <p className="font-bold">{komunitasCount.toLocaleString()}</p><p>komunitas</p>
                    </div>
                </div>

                <div className="rightSide lg:w-1/3 h-full flex">
                    <div className="leftSide w-1/3 h-full flex items-center"><img src={Logo} alt="logo" className="w-[80%]"></img></div>
                    <div className="rightSide w-2/3 h-full flex flex-col justify-center pl-1 capitalize text-2xl tracking-wide">
                        <p className="font-bold">{eventCount.toLocaleString()}</p><p>event</p>
                    </div>
                </div>
            </div>

            <div className="animate-bounce dark:bg-slate-800 p-2 w-14 h-14 ring-2 ring-slate-900/5 dark:ring-slate-200/20 shadow-lg rounded-full flex items-center justify-center mt-9 hover:cursor-pointer" onClick={scrollToDesc}>
                <svg className="w-12 h-12 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>
            </div>
        </div>
    )
}

HeaderSection.propTypes = {
    relawanCount: PropTypes.number.isRequired,
    komunitasCount: PropTypes.number.isRequired,
    eventCount: PropTypes.number.isRequired,
}