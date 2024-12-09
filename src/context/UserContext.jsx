import { createContext, useState, useEffect } from 'react';
import { auth, firestore } from '../api/firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import PropTypes from 'prop-types';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null); // { uid, role } untuk user, atau `null` untuk guest

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                const userDocRef = doc(firestore, 'users', currentUser.uid);
                const userDoc = await getDoc(userDocRef);

                if (userDoc.exists()) {
                    setUser({ uid: currentUser.uid, role: userDoc.data().role });
                }
            } else {
                setUser(null); // Guest
            }
        });

        return () => unsubscribe(); // Cleanup listener
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

UserProvider.propTypes = {
    children: PropTypes.node.isRequired, // `children` harus ada dan merupakan node React
};

export default UserContext;