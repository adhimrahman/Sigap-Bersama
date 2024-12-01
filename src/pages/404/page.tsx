import Image from 'next/image';

export default function Custom404() {
    return (
        <div className="min-h-screen bg-[url('/bege.png')] bg-center bg-cover">
            <div className='flex flex-col items-center justify-center min-h-screen bg-[#282C34]/80'>
                <div className="flex items-center justify-center w-3/12 mt-8">
                        <Image src="/logo.png" alt="logo" width={550} height={550} />
                </div>

                <h1 className='text-7xl text-green-600 font-bold tracking-wide mt-5'>404 page not found lol</h1>
            </div>
        </div>
    )
}