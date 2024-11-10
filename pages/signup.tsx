import { useState, useEffect } from 'react';
import { auth } from '../firebase/firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/router';

export default function Signup() {
	const [role, setRole] = useState<'individu' | 'komunitas' | ''>('');
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [confirmPassword, setConfirmPassword] = useState<string>('');
	
	const [fullName, setFullName] = useState<string>('');
	const [contactName, setContactName] = useState<string>('');
	const [phone, setPhone] = useState<string>('');
	const [communityName, setCommunityName] = useState<string>('');
	const [communityType, setCommunityType] = useState<string>('');
	const router = useRouter();

	useEffect(() => {
		// Mengambil parameter 'role' dari URL
		const { role } = router.query;
		if (role === 'individu' || role === 'komunitas') {
			setRole(role);
		}
	}, [router.query]);

	// Fungsi untuk menangani submit form
	const handleSignup = async (event: React.FormEvent): Promise<void> => {
		event.preventDefault();
		
		if (password !== confirmPassword) { return alert("Passwords do not match") }

		try {
			const userCredential = await createUserWithEmailAndPassword(auth, email, password);
			const user = userCredential.user;

			// Navigasi ke halaman yang sesuai berdasarkan role
			if (role === 'komunitas') {
				router.push('/komunitas');
			} else if (role === 'individu') {
				router.push('/individu');
			}
			} catch (error) {
			console.error(error);
		}
	};

	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-[url('/bege.png')] bg-center bg-cover">
			<form className="flex flex-col items-center justify-center bg-[#282C34]/95 w-2/5 h-[900px] rounded-[16px] backdrop-blur-sm gap-3"
			onSubmit={handleSignup}>

				<h2 className="text-white text-xl mb-4">{role === 'komunitas' ? 'Pendaftaran Komunitas' : 'Pendaftaran Individu'}</h2>

				<div className='flex flex-col w-10/12 gap-3 capitalize'>
				
					{/* Field Umum (Email dan Password) */}
					<label htmlFor="email">Email</label>
					<input type="email" placeholder="example@gmail.com" value={email} name='email' onChange={(e) => setEmail(e.target.value)}
						className="p-6 h-10 focus:outline-none bg-[#CDF5FD] rounded-[12px] text-black" required />

					<label htmlFor="password" className='mt-2'>password</label>
					<input type="password" placeholder="password" value={password} name='password' onChange={(e) => setPassword(e.target.value)}
						className="p-6 h-10 focus:outline-none bg-[#CDF5FD] rounded-[12px] text-black" required />
					
					<label htmlFor="confirmPassword" className='mt-2'>confirm password</label>
					<input type="password" placeholder="Confirm Password" value={confirmPassword} name='confirmPassword'
						onChange={(e) => setConfirmPassword(e.target.value)}
						className="p-6 h-10 focus:outline-none bg-[#CDF5FD] rounded-[12px] text-black" required />

					{/* Form untuk Individu */}
					{role === 'individu' && (
						<>
							<label htmlFor="fullName" className='mt-2'>nama lengkap</label>
							<input type="text" placeholder="Nama Lengkap" value={fullName} name='fullName' onChange={(e) => setFullName(e.target.value)}
								className="p-6 h-10 focus:outline-none bg-[#CDF5FD] rounded-[12px] text-black" required />
						</>
					)}

					{/* Form untuk Komunitas */}
					{role === 'komunitas' && (
						<>
							<label htmlFor="contactPerson">nama narahubung</label>
							<input type="text" placeholder="Nama Narahubung" value={contactName} name='contactPerson'
								onChange={(e) => setContactName(e.target.value)}
								className="p-6 h-10 focus:outline-none bg-[#CDF5FD] rounded-[12px] text-black" required />

							<label htmlFor="noTelp">nomor telpon</label>
							<input type="text" placeholder="Nomor Telepon" value={phone} name='noTelp'
								onChange={(e) => setPhone(e.target.value)}
								className="p-6 h-10 focus:outline-none bg-[#CDF5FD] rounded-[12px] text-black" required />

							<label htmlFor="communityName">nama komunitas</label>
							<input type="text" placeholder="Nama Komunitas" value={communityName} name='communityName'
								onChange={(e) => setCommunityName(e.target.value)}
								className="p-6 h-10 focus:outline-none bg-[#CDF5FD] rounded-[12px] text-black" required />

							<label htmlFor="communityType">jenis komunitas</label>
							<select value={communityType} name='communityType'
								onChange={(e) => setCommunityType(e.target.value)}
								className="p-6 h-13 focus:outline-none bg-[#CDF5FD] rounded-[12px] text-black/30 font-semibold" required >
									<option value="" className='text-black/30' disabled>Example Placeholder</option>
									<option className='text-black' value="limbah">Limbah</option>
									<option className='text-black' value="bencana">Bencana</option>
							</select>
						</>
					)}

					<button type="submit" className="p-2 w-full mt-4 bg-[#008080] text-white font-bold rounded-[12px]">Daftar</button>

				</div>
			
				<p onClick={() => router.push('/signin')} className="mt-4 text-blue-500 cursor-pointer">
					Sudah punya akun? Login
				</p>
			</form>
		</div>
	);
}
