import { useState, useEffect } from 'react';
import { auth } from '../../api/firebaseConfig'; // Sesuaikan path sesuai struktur proyek Anda
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate, useParams } from 'react-router-dom';
import SignupIndividu from '../../components/forms/signupIndividu';
import SignupKomunitas from '../../components/forms/signupKomunitas';

function Signup() {
    const [role, setRole] = useState<'individu' | 'komunitas' | ''>('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [contactName, setContactName] = useState('');
    const [phone, setPhone] = useState('');
    const [communityName, setCommunityName] = useState('');
    const [communityType, setCommunityType] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);

    const navigate = useNavigate();
    const { role: paramRole } = useParams();

    useEffect(() => {
        if (paramRole === 'individu' || paramRole === 'komunitas') {
            setRole(paramRole);
        }
    }, [paramRole, setRole]);

    const handleSignup = async (event) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            return setErrorMessage('Passwords do not match');
        }
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            navigate('/individu'); // Ganti rute sesuai kebutuhan Anda
        } catch (error) {
            setErrorMessage(error.message);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-[url('/bege.png')] bg-center bg-cover">
            {role === 'individu' && (
                <SignupIndividu
                    handleSignup={handleSignup}
                    setEmail={setEmail}
                    setPassword={setPassword}
                    setConfirmPassword={setConfirmPassword}
                    setFullName={setFullName}
                    email={email}
                    password={password}
                    confirmPassword={confirmPassword}
                    fullName={fullName}
                />
            )}

            {role === 'komunitas' && (
                <SignupKomunitas
                    handleSignup={handleSignup}
                    setEmail={setEmail}
                    setPassword={setPassword}
                    setConfirmPassword={setConfirmPassword}
                    setContactName={setContactName}
                    setPhone={setPhone}
                    setCommunityName={setCommunityName}
                    setCommunityType={setCommunityType}
                    email={email}
                    password={password}
                    confirmPassword={confirmPassword}
                    contactName={contactName}
                    phone={phone}
                    communityName={communityName}
                    communityType={communityType}
                />
            )}
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        </div>
    );
}

export default Signup;
