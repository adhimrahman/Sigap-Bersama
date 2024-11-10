// pages/signup.tsx
import { useState } from 'react';
import { auth } from '../firebase/firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/router';

export default function Signup() {
  const [role, setRole] = useState('individu');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const router = useRouter();

  const handleSignup = async () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log(user.email);
      if (role === 'komunitas') {
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
      <h2>Sign Up</h2>
      <button onClick={() => setRole('individu')} className="p-2 mb-2 bg-blue-200">
        Individu
      </button>
      <button onClick={() => setRole('komunitas')} className="p-2 mb-2 bg-green-200">
        Komunitas
      </button>
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
      <input
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        className="p-2 mb-2"
      />
      <button onClick={handleSignup} className="p-2 bg-blue-500 text-white">
        Sign Up
      </button>
      <p onClick={() => router.push('/signin')} className="mt-2 text-blue-500 cursor-pointer">
        Sudah punya akun? Login
      </p>
    </div>
  );
}
