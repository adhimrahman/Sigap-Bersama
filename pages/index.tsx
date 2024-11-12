import { useRouter } from 'next/router';
import Image from 'next/image';
// import { logo } from "../public/logo.png"

export default function Home() {
    const router = useRouter();
    
    return (
        <div className="flex flex-row items-center justify-center min-h-screen px-44 gap-[75px]">

            <div className="leftside w-3/5 flex flex-col gap-4 text-justify">
                <h1 className="flex text-6xl uppercase font-bold mb-3 mb-md-5 gap-[20px] tracking-wider">
                    {/* <span className='text-[#00d8ff]'>#</span> */}
                    <span className='text-[#2E7D32]'>sigap</span>
                    <span className='text-[#00d8ff]'>bersama</span>
                </h1>
                
                <p className='tracking-wide'>Dalam beberapa tahun terakhir, peningkatan jumlah bencana alam dan pencemaran lingkungan, telah menjadi tantangan utama di Indonesia. Meskipun berbagai organisasi dan masyarakat berusaha untuk berpartisipasi, masih ada keterbatasan dalam akses informasi dan koordinasi untuk relawan. Sigap Bersama hadir untuk menghubungkan relawan dengan kegiatan tanggap bencana dan kampanye pembersihan lingkungan, menciptakan wadah yang efektif bagi masyarakat untuk berkontribusi.</p>
                
                <p className='tracking-wide'>Sigap Bersama bertemakan Sustainable Development Goals (SDGs), khususnya Sustainable Cities and Communities yang mendorong terciptanya kota dan komunitas yang tangguh serta siap menghadapi bencana, serta Climate Action yang bertujuan untuk menggerakkan aksi global dalam mengurangi dan mengatasi perubahan iklim. Dengan memfasilitasi kegiatan sukarela yang berkaitan dengan penanganan bencana dan kampanye kebersihan lingkungan, Sigap Bersama ingin menciptakan ruang bagi masyarakat untuk terlibat aktif dalam membangun komunitas yang aman dan berkelanjutan.</p>

                <div className="buttonNav flex gap-6 mt-6">
                    <button
                        className='w-28 p-2 bg-blue-500 text-white font-bold'
                        onClick={ () => router.push('/signin') }>
                            Sign In
                    </button>
                    <button
                        className='w-28 p-2 bg-green-500 text-white font-bold'
                        onClick={ () => router.push('/signwhat') }>
                            Sign Up
                    </button>
                </div>
            </div>

            <div className="rightside flex items-center justify-center w-2/5">
                <Image src="/logo.png" alt="logo" width={550} height={550} />
            </div>
        </div>
    );
}