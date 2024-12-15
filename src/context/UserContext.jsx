import { createContext, useState, useEffect } from 'react';
import { auth, firestore } from '../api/firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import PropTypes from 'prop-types';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
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
                setUser(null); // Guest mode
            }
        });

        return () => unsubscribe(); // Cleanup listener saat komponen unmount
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

UserProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default UserContext;
