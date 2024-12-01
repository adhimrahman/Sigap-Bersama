import { useState } from 'react';
import { auth } from '../../lib/firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/router';
import Image from 'next/image';

export default function Signin() {
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const router = useRouter();

	const handleSignin = async (event: React.FormEvent): Promise<void> => {
		event.preventDefault();
		try {
			const userCredential = await signInWithEmailAndPassword(auth, email, password);
			const user = userCredential.user;

			// Contoh pengecekan role dari database atau kondisi
			if (user.email === 'komunitas@example.com') { router.push('/komunitas');
			} else { router.push('/landingPage'); }
		} catch (error) { console.error(error); }
  	};

	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-loginForm bg-center bg-cover">
			<form className="flex flex-col items-center justify-center bg-[#282C34]/95 w-2/5 max-h-fit rounded-[16px] backdrop-blur-sm gap-3"
			onSubmit={handleSignin} >

				<div className="flex items-center justify-center w-3/12 mt-8">
					<Image src="/logo.png" alt="logo" width={550} height={550} />
				</div>

				<div className='flex flex-col w-10/12 gap-3 capitalize'>
					<label htmlFor="email">Email</label>
					<input type="email" placeholder="example@gmail.com" value={email} name='email' onChange={(e) => setEmail(e.target.value)}
						className="p-6 h-10 focus:outline-none bg-[#CDF5FD] rounded-[12px] text-black" required />

					<label htmlFor="password" className='mt-2'>password</label>
					<input type="password" placeholder="password" value={password} name='password' onChange={(e) => setPassword(e.target.value)}
						className="p-6 h-10 focus:outline-none bg-[#CDF5FD] rounded-[12px] text-black" required/>

					<button type="submit"
					className="mt-4 p-2 h-14 rounded-[12px] bg-[#008080] text-white font-bold hover:bg-[#008080]/40">Sign In</button>
				</div>

				<p className="mt-2 mb-8">Belum punya akun? 
					<span onClick={() => router.push('/signwhat')} className='text-blue-500 ml-3 cursor-pointer hover:font-bold'>Daftar</span>
				</p>
			</form>
		</div>
	);
}

