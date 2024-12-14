import Helper from "../../../assets/helper.png"

export default function AboutSection() {
    return(
        <div className="about w-full bg-[#F0F0F0] flex flex-col lg:flex-row justify-center items-center gap-y-9 lg:py-32 lg:px-16">
            <div className="leftSide lg:w-1/2 shadow-2xl">
                <img src={Helper} alt="" />
            </div>
            <div className="rightSide px-7 lg:w-1/2 flex flex-col pl-6 gap-y-6 text-center leading-8 tracking-wide text-xs lg:text-lg text-[#5f6368]">
                <p className="">
                    Dalam beberapa tahun terakhir, peningkatan jumlah bencana alam dan pencemaran lingkungan, telah menjadi tantangan utama di Indonesia. Meskipun berbagai organisasi dan masyarakat berusaha untuk berpartisipasi, masih ada keterbatasan dalam akses informasi dan koordinasi untuk relawan yang ingin terlibat. Sigap Bersama hadir untuk menghubungkan relawan dengan kegiatan tanggap bencana dan kampanye pembersihan lingkungan, menciptakan wadah yang efektif bagi masyarakat untuk berkontribusi.
                </p>
                <p className="">
                    Sigap Bersama bertemakan Sustainable Development Goals (SDGs), khususnya Sustainable Cities and Communities yang mendorong terciptanya kota dan komunitas yang tangguh serta siap menghadapi bencana, serta Climate Action yang bertujuan untuk menggerakkan aksi global dalam mengurangi dan mengatasi perubahan iklim. Dengan memfasilitasi kegiatan sukarela yang berkaitan dengan penanganan bencana dan kampanye kebersihan lingkungan, Sigap Bersama ingin menciptakan ruang bagi masyarakat untuk terlibat aktif dalam membangun komunitas yang lebih aman, sehat, dan berkelanjutan.
                </p>
            </div>
        </div>
    )
}