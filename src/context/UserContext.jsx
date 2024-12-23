import { createContext, useState, useEffect } from 'react';
import { auth, firestore } from '../../api/firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import PropTypes from 'prop-types';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setLoading(true);
            if (currentUser) {
                console.log("Current User UID:", currentUser.uid); // Debug UID

                // Ambil data tambahan dari Firestore jika diperlukan
                try {
                    const userDocRef = doc(firestore, 'users', currentUser.uid);
                    const userDoc = await getDoc(userDocRef);

                    console.log("User Doc Data:", userDoc.data()); // Debug user data

                    setUser({
                        uid: currentUser.uid,
                        email: currentUser.email,
                        communityName: userDoc.data()?.communityName || "Unknown",
                        communityType: userDoc.data()?.communityType || "Undefined",
                        role: userDoc.exists() ? userDoc.data().role : "guest",
                    });                    
                } catch (error) {
                    console.error("Error fetching user data:", error);
                    setUser({ uid: currentUser.uid, email: currentUser.email, role: 'guest' });
                }
            } else {
                console.log("No user authenticated, setting guest mode.");
                setUser(null); // Guest mode
            }
            setLoading(false);
        });

        return () => unsubscribe(); // Cleanup listener saat komponen unmount
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser, loading }}>
            {children}
        </UserContext.Provider>
    );
};

UserProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default UserContext;
