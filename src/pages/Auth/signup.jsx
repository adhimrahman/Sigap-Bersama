import { useState } from 'react';
import { auth, firestore  } from '../../api/firebaseConfig'; // Sesuaikan path sesuai struktur proyek Anda
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { useNavigate, useParams } from 'react-router-dom';
import SignupIndividu from '../../components/forms/signupIndividu';
import SignupKomunitas from '../../components/forms/signupKomunitas';

import useUser from '../../context/useUser';

function Signup() {
    const { role } = useParams();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [contactName, setContactName] = useState('');
    const [phone, setPhone] = useState('');
    const [communityName, setCommunityName] = useState('');
    const [communityType, setCommunityType] = useState('');
    const [setErrorMessage] = useState(null);
    const { setUser } = useUser();

    const navigate = useNavigate();

    const handleSignup = async (event) => {
        event.preventDefault();
    
        if (password !== confirmPassword) { 
            return setErrorMessage('Passwords do not match'); 
        }
    
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
    
            const userDocRef = doc(firestore, 'users', user.uid);
            const userData = {
                fullName: role === 'individu' ? fullName : contactName,
                email: user.email,
                role: role,
                phone: role === 'komunitas' ? phone : null,
                communityName: role === 'komunitas' ? communityName : null,
                communityType: role === 'komunitas' ? communityType : null,
                createdAt: serverTimestamp(),
            };
    
            await setDoc(userDocRef, userData);
    
            setUser({ uid: user.uid, role }); // Update UserContext
            navigate('/'); // Redirect ke home
        } catch (error) {
            setErrorMessage(error.message);
        }
    };    

    if (role === "individu") {
        return (
            <SignupIndividu handleSignup={handleSignup} setEmail={setEmail} setPassword={setPassword} setConfirmPassword={setConfirmPassword} setFullName={setFullName} email={email} password={password} confirmPassword={confirmPassword} fullName={fullName}/>
        );
    } else if (role === "komunitas") {
        return (
            <SignupKomunitas handleSignup={handleSignup} setEmail={setEmail} setPassword={setPassword} setConfirmPassword={setConfirmPassword} setContactName={setContactName} setPhone={setPhone} setCommunityName={setCommunityName} setCommunityType={setCommunityType} email={email} password={password} confirmPassword={confirmPassword} contactName={contactName} phone={phone} communityName={communityName} communityType={communityType}/>
        );
    } else {
        return <div>Role not found</div>;
    }
}

export default Signup;