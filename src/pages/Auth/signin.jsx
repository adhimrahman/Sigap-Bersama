import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, firestore } from '../../api/firebaseConfig';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';

import Logo from "../../assets/logo.png"
import useUser from '../../context/useUser';

export default function Signin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const { setUser } = useUser();
    const navigate = useNavigate();

    const handleSignin = async (event) => {
        event.preventDefault();
        setLoading(true);
        setErrorMessage('');
    
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            if (!user.emailVerified) {
                return setErrorMessage('Please verify your email before logging in.')
            }
    
            const userDocRef = doc(firestore, 'users', user.uid);
            const userDoc = await getDoc(userDocRef);
    
            if (userDoc.exists()) {
                const userData = userDoc.data();

                if (!userData.verified) { await setDoc( userDocRef, { verified: true }, { merge: true } ) }

                setUser({ uid: user.uid, role: userData.role }); // Update UserContext
                navigate('/');
            } else {
                setErrorMessage('User role not found!');
            }
        } catch (error) {
            setErrorMessage('Login failed. Please check your credentials.');
            console.error('Sign-in error:', error);
        } finally {
            setLoading(false);
        }
    };    

    const handleGoogleSignin = async () => {
        setLoading(true);
        setErrorMessage('');
        const provider = new GoogleAuthProvider();

        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
    
            const userDocRef = doc(firestore, 'users', user.uid);
            const userDoc = await getDoc(userDocRef);
    
            let userData
            if (!userDoc.exists()) {
                userData = {
                    fullName: user.displayName || '',
                    email: user.email,
                    role: 'individu',
                    createdAt: serverTimestamp(),
                    verified: true,
                };
                await setDoc(userDocRef, userData);
            } else {
                userData = userDoc.data()
            }
            setUser({ uid: user.uid, role: userData.role });
            navigate('/');
        } catch (error) {
            setErrorMessage('Google sign-in failed. Please try again.');
            console.error('Google sign-in error:', error);
        } finally {
            setLoading(false);
        }
    };    

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-loginForm bg-center bg-cover text-white">
            <form className="flex flex-col items-center justify-center bg-[#282C34]/95 w-2/5 max-h-fit rounded-[16px] backdrop-blur-sm gap-3" onSubmit={handleSignin}>
                <div className="flex items-center justify-center w-3/12 mt-8">
                    <img src={Logo} alt="logo" width={550} height={550} />
                </div>

                <div className="flex flex-col w-10/12 gap-3 capitalize">
                    <label htmlFor="email">Email</label>
                    <input type="email" placeholder="example@gmail.com" onChange={(e) => setEmail(e.target.value)} name="email" value={email} required
                        className="p-6 h-10 focus:outline-none bg-[#CDF5FD] rounded-[12px] text-black"
                    />

                    <label htmlFor="password" className="mt-2">Password</label>
                    <input type="password" placeholder="password" value={password} required name="password" onChange={(e) => setPassword(e.target.value)}
                        className="p-6 h-10 focus:outline-none bg-[#CDF5FD] rounded-[12px] text-black"
                    />

                    {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}

                    <button type="submit" disabled={loading} className={`mt-4 p-2 h-14 rounded-[12px] text-white font-bold ${
                        loading ? 'bg-gray-400' : 'bg-[#008080] hover:bg-[#008080]/40'
                    }`}>
                        {loading ? 'Loading...' : 'Sign In'}
                    </button>

                    <button onClick={handleGoogleSignin} disabled={loading} className={`w-full h-12 inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors border border-input border-[#008080] shadow-sm px-4 py-2 mt-3`}>
                        <svg className='h-5 w-fit' role="img" viewBox="0 0 24 24"><path fill="currentColor" d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"></path></svg>
                        {loading ? 'Loading...' : 'Sign in with Google'}
                    </button>
                </div>

                <p className="mt-2 mb-8">Belum punya akun?
                    <span onClick={() => navigate('/signwhat')}  className="text-blue-500 ml-3 cursor-pointer hover:font-bold">Daftar</span>
                </p>
            </form>
        </div>
    );
}