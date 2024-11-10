// pages/signin.tsx
import { useState } from 'react';
import { auth } from '../firebase/firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/router';

export default function Signin() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const router = useRouter();

	const handleSignin = async () => {
		try {
			const userCredential = await signInWithEmailAndPassword(auth, email, password);
			const user = userCredential.user;

			// Contoh pengecekan role dari database atau kondisi
			if (user.email === 'komunitas@example.com') {
				router.push('/komunitas');
			} else {
				router.push('/individu');
			}
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div className="flex flex-col items-center justify-center min-h-screen">
			<h2>Sign In</h2>
			<input
				type="email"
				placeholder="Email"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
				className="p-2 mb-2"
			/>
			<input
				type="password"
				placeholder="Password"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				className="p-2 mb-2"
			/>
			<button onClick={handleSignin} className="p-2 bg-blue-500 text-white">
				Sign In
			</button>
			<p onClick={() => router.push('/signup')} className="mt-2 text-blue-500 cursor-pointer">
				Belum punya akun? Daftar
			</p>
		</div>
	);
}
