import { useState, useEffect } from 'react';
import { auth } from '../firebase/firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/router';
import SignupIndividu from '@/components/signupIndividu';
import SignupKomunitas from '@/components/signupKomunitas';

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

	const [errorMessage, setErrorMessage] = useState<string | null>(null);
	const router = useRouter();

	useEffect(() => {
		const { role } = router.query;
		if (role === 'individu' || role === 'komunitas') {
			setRole(role);
		}
	}, [router.query]);

	const handleSignup = async (event: React.FormEvent): Promise<void> => {
		event.preventDefault();
		if (password !== confirmPassword) { return setErrorMessage("Passwords do not match") }
		try {
			await createUserWithEmailAndPassword(auth, email, password);
			router.push('/individu'); // Atau alihkan ke halaman lain
		  } catch (error) {
			setErrorMessage((error as Error).message);
		  }
	};

	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-[url('/bege.png')] bg-center bg-cover">
			{role === 'individu' && (
				<SignupIndividu handleSignup={handleSignup} setEmail={setEmail} setPassword={setPassword} setConfirmPassword={setConfirmPassword}
				setFullName={setFullName} email={email} password={password} confirmPassword={confirmPassword} fullName={fullName} />
			)}

			{role === 'komunitas' && (
				<SignupKomunitas handleSignup={handleSignup} setEmail={setEmail} setPassword={setPassword} setConfirmPassword={setConfirmPassword}
				setContactName={setContactName} setPhone={setPhone} setCommunityName={setCommunityName} setCommunityType={setCommunityType} email={email}
				password={password} confirmPassword={confirmPassword} contactName={contactName} phone={phone} communityName={communityName} communityType={communityType}
				/>
			)}
		</div>
	);
}