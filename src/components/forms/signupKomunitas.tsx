// import { useState } from 'react';
import { useRouter } from 'next/router';

export default function SignupKomunitas({ handleSignup, setEmail, setPassword, setConfirmPassword, setContactName, setPhone, setCommunityName, setCommunityType,
    email, password, confirmPassword, contactName, phone, communityName, communityType,
}: SignupKomunitasProps) {
    const router = useRouter();
    return (
        <form className="flex flex-col items-center justify-center bg-[#282C34]/95 w-3/5 h-fit rounded-[16px] backdrop-blur-sm gap-5"
        onSubmit={handleSignup}>

            <h2 className="text-white text-xl mb-4 mt-8 font-bold tracking-wider">Pendaftaran Komunitas</h2>

            <div className="twoSide flex w-11/12 justify-between capitalize">
                <div className="leftSide flex flex-col">
                    <label htmlFor="contactPerson">nama narahubung</label>
                    <input type="text" placeholder="Nama Narahubung" value={contactName} name='contactPerson'
                        onChange={(e) => setContactName(e.target.value)}
                        className="p-6 h-10 focus:outline-none bg-[#CDF5FD] rounded-[12px] text-black w-96" required />

                    <label htmlFor="noTelp" className='mt-5'>nomor telpon</label>
                    <input type="text" placeholder="Nomor Telepon" value={phone} name='noTelp'
                        onChange={(e) => setPhone(e.target.value)}
                        className="p-6 h-10 focus:outline-none bg-[#CDF5FD] rounded-[12px] text-black" required />

                    <label htmlFor="email" className='mt-5'>email</label>
                    <input type="email" placeholder="example@gmail.com" value={email} name='email' onChange={(e) => setEmail(e.target.value)}
                        className="p-6 h-10 focus:outline-none bg-[#CDF5FD] rounded-[12px] text-black" required />

                    <label htmlFor="communityName" className='mt-5'>nama komunitas</label>
                    <input type="text" placeholder="Nama Komunitas" value={communityName} name='communityName'
                        onChange={(e) => setCommunityName(e.target.value)}
                        className="p-6 h-10 focus:outline-none bg-[#CDF5FD] rounded-[12px] text-black" required />
                </div>

                <div className="rightSide flex flex-col">
                    <label htmlFor="communityType">jenis komunitas</label>
                    <select value={communityType} name='communityType'
                        onChange={(e) => setCommunityType(e.target.value)}
                        className="px-6 h-12 focus:outline-none bg-[#CDF5FD] rounded-[12px] text-black w-96" required >
                            <option value="" className='text-black/30' disabled>Choose Type</option>
                            <option className='text-black' value="limbah">Limbah</option>
                            <option className='text-black' value="bencana">Bencana</option>
                    </select>

                    <label htmlFor="password"  className='mt-5'>password</label>
                    <input type="password" placeholder="password" value={password} name='password' onChange={(e) => setPassword(e.target.value)}
                        className="p-6 h-10 focus:outline-none bg-[#CDF5FD] rounded-[12px] text-black" required />
                    
                    <label htmlFor="confirmPassword" className='mt-5'>confirm password</label>
                    <input type="password" placeholder="Confirm Password" value={confirmPassword} name='confirmPassword'
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="p-6 h-10 focus:outline-none bg-[#CDF5FD] rounded-[12px] text-black" required />

                    <button type="submit"
                    className="p-2 h-14 w-full mt-11 bg-[#008080] text-white font-bold rounded-[12px] hover:bg-[#008080]/40">Daftar</button>
                </div>
            </div>

            <p className="mt-1 mb-8">Sudah punya akun? 
                <span onClick={() => router.push('/signin')} className='text-blue-500 ml-3 cursor-pointer hover:font-bold'>Login</span>
            </p>
        </form>        
    );
}

interface SignupKomunitasProps {
    handleSignup: (event: React.FormEvent) => Promise<void>;
    setEmail: (value: string) => void;
    setPassword: (value: string) => void;
    setConfirmPassword: (value: string) => void;
    setContactName: (value: string) => void;
    setPhone: (value: string) => void;
    setCommunityName: (value: string) => void;
    setCommunityType: (value: string) => void;
    email: string;
    password: string;
    confirmPassword: string;
    contactName: string;
    phone: string;
    communityName: string;
    communityType: string;
}