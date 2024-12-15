import PropTypes from "prop-types";
import Bege from "../../../assets/bege.png"

export default function BencanaSection({ data, navigate }) {
    return (
        <div className="bencana w-full h-fit bg-ijoMuda flex flex-col pt-14 pb-10 justify-center items-center"
            style={{ background: "linear-gradient(to bottom, #F0F0F0 30%, #9ed3a0 20%)" }}>
            <div className="topSide w-4/5 h-fit lg:h-56 rounded-lg overflow-hidden flex flex-col lg:flex-row shadow-[19px_-15px_45px_5px_rgba(0,_0,_0,_0.2)]">
                <div className="leftSide h-full w-fit">
                    <img alt="" src={Bege} className="h-full w-fit"></img>
                </div>
                <div className="rightSide h-full lg:w-3/4 px-8 py-6 bg-white">
                    <div className="title">
                        <p className="lg:text-xl font-bold uppercase">sigap bencana</p>
                    </div>
                    <div className="caption mt-4 normal-case text-justify text-xs lg:text-base">
                        <p>
                        Sigap Bencana adalah ruang bagi komunitas untuk memposting dan mengelola kegiatan relawan yang bertujuan membantu masyarakat yang terdampak bencana alam. Melalui inisiatif ini, relawan dapat berkolaborasi dalam berbagai aksi kemanusiaan seperti distribusi bantuan, pendampingan korban, hingga pemulihan pasca-bencana. Sigap Bencana hadir sebagai langkah nyata untuk memperkuat solidaritas dan kesiapsiagaan dalam menghadapi situasi darurat.
                        </p>
                    </div>
                </div>
            </div>

            <div className="bottomSide w-4/5 pt-5 rounded-b-lg hidden lg:grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 overflow-hidden gap-6">
                {data.map((item) => (
                    <div key={item.id} className="card bg-white rounded-lg shadow-2xl drop-shadow-2xl hover:cursor-pointer hover:scale-[1.01] capitalize"
                    onClick={() => navigate(`/bencanadetail/${item.id}`)}>
                        <div className="h-40 bg-gray-200 rounded-t-lg overflow-hidden">
                            <img src={item.image} alt="" className="h-full w-full object-cover" />
                        </div>
                        <div className="p-4">
                            <h2 className="text-lg font-bold capitalize">{item.title}</h2>
                            <p className="text-sm text-gray-600 capitalize">{item.creator}</p>

                            <div className="mt-4">
                                <div className="top flex">
                                    <svg className="w-4 h-4 text-gray-400 mr-2" fill="none" stroke="green" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    <p className="flex items-center text-sm text-gray-600">{item.date}</p>
                                </div>
                                <div className="bottom flex mt-2 pb-2">
                                    <svg className="w-4 h-4 text-gray-400 mr-2" fill="none" stroke="green" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z"/><circle cx="12" cy="10" r="3"/>
                                    </svg>
                                    <p className="flex items-center text-sm text-gray-600">{item.locate}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <button className="w-44 h-11 rounded-lg bg-ijoTua hover:opacity-80 text-white capitalize mt-7"
                onClick={() => navigate('/bencana')}>
                lihat aktivitas lain
            </button>
        </div>
    );
}

BencanaSection.propTypes = {
    data: PropTypes.array.isRequired,
    navigate: PropTypes.func.isRequired,
};