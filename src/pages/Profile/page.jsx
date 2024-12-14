import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { firestore, auth } from "../../api/firebaseConfig"; // Import Firestore
import { updatePassword } from "firebase/auth";

import Navbar from "../../components/layouts/Navbar";
import Spinner from "../../components/Spinner";
import useUser from "../../context/useUser";

export default function ProfilePage() {
    const { user } = useUser(); // Ambil data user dari UserContext
    const [profileData, setProfileData] = useState(null);
    const [editedData, setEditedData] = useState({});
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) { navigate('/signin') }
        else {
            const fetchProfileData = async () => {
                try {
                    const userDocRef = doc(firestore, "users", user.uid); // Ambil dokumen user dari Firestore
                    const userDoc = await getDoc(userDocRef);

                    if (userDoc.exists()) {
                        const data = userDoc.data();
                        setProfileData(data);
                        setEditedData(data);
                    } else { console.error("User profile not found") }
                } catch (error) { console.error("Error fetching profile:", error)
                } finally { setLoading(false) }
            };
            fetchProfileData();
        }
    }, [user, navigate]);

    if (!user || loading) return <Spinner />
    const handleEditClick = () => { setIsEditing(true) }
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSaveClick = async () => {
        try {
            const userDocRef = doc(firestore, "users", user.uid);

            // Update data Firestore
            const { password, ...updatedData } = editedData;
            await setDoc(userDocRef, updatedData, { merge: true });
            setProfileData(updatedData);

            // Update password di Firebase Auth (jika diubah)
            if (password && password !== "********") {
                const currentUser = auth.currentUser;
                await updatePassword(currentUser, password);
                alert("Password updated successfully!");
            }

            setIsEditing(false);
            alert("Profile updated successfully!");
        } catch (error) {
            console.error("Error updating profile:", error);
            alert("Failed to update profile. Please try again.");
        }
    };

    const handleCancelClick = () => {
        setIsEditing(false);
        setEditedData(profileData);
    };    

    return (
        <div>
            <Navbar pageKeys={['landingPage', 'navBencana', 'navLimbah']} />
            <main className="p-8 mt-16 bg-[#f0f0f0]">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Card Profil */}
                    <div className="bg-white p-4 rounded-lg shadow-md">
                        <h2 className="text-lg font-extrabold mb-4">
                            {profileData.role === 'komunitas' ? 'Profil Komunitas' : 'Profil Individu'}
                        </h2>
                        <div className="flex flex-col items-center">
                            <div className="w-24 h-24 bg-[#d9d9d9] rounded-full mb-2"></div>
                            <p className="text-center m-3">
                                {profileData.role === 'komunitas' ? profileData.communityName || 'Nama Komunitas' : profileData.fullName || 'No Name'}
                            </p>
                        </div>
                        <div className="mt-4">
                            <div className="flex justify-between border-t border-black py-5 px-2">
                                <span>{profileData.role === 'komunitas' ? 'Aktivitas yang telah dibuat' : 'Aktivitas yang telah diikuti'}</span>
                                <span>10</span>
                            </div>
                            <div className="flex justify-between border-t border-black py-5 px-2">
                                <span>Lencana</span>
                                <span>{profileData.badge === 'komunitas' ? '-' : 'soon'}</span>
                            </div>
                            <div className="flex justify-between border-y border-black py-5 px-2">
                                <span>Poin</span>
                                <span>soon</span>
                            </div>
                        </div>
                    </div>

                    {/* Card Data */}
                    <div className="md:col-span-2 bg-white p-4 rounded-lg shadow-md">
                        <h2 className="text-lg font-extrabold mb-4">
                            {profileData.role === 'komunitas' ? 'Data Komunitas' : 'Data Pribadi'}
                        </h2>
                        <form>
                            {profileData.role === 'komunitas' && (
                                <div className="mb-4">
                                    <label className="block mb-2">Nama Komunitas</label>
                                    <input type="text" name="communityName" className="w-full p-2 border rounded" value={editedData.communityName || ''} onChange={handleInputChange} disabled={!isEditing} />
                                </div>
                            )}

                            {editedData.role === 'individu' && (
                                <div className="mb-4">
                                    <label className="block mb-2">Nama Pengguna</label>
                                    <input type="text" name="fullName" className="w-full p-2 border rounded" value={editedData.fullName || ''} onChange={handleInputChange} disabled={!isEditing} />
                                </div>
                            )}

                            {editedData.role === 'komunitas' && (
                                <div className="mb-4">
                                    <label className="block mb-2">Jenis Komunitas</label>
                                    <input type="text" name="communityType" className="w-full p-2 border rounded" value={editedData.communityType || ''} disabled />
                                </div>
                            )}

                            <div className="mb-4">
                                <label className="block mb-2">Email</label>
                                <input type="email" name="email" className="w-full p-2 border rounded" value={editedData.email || ''} onChange={handleInputChange} disabled={!isEditing} />
                            </div>

                            {editedData.role === 'komunitas' && (
                                <div className="mb-4">
                                    <label className="block mb-2">Nama Kontak</label>
                                    <input type="text" name="fullName" className="w-full p-2 border rounded" value={editedData.fullName || ''} onChange={handleInputChange} disabled={!isEditing} />
                                </div>
                            )}

                            <div className="mb-4">
                                <label className="block mb-2">Nomor Kontak</label>
                                <input type="tel" name="phone" className="w-full p-2 border rounded" value={editedData.phone || ''} onChange={handleInputChange} disabled={!isEditing} />
                            </div>

                            <div className="mb-4">
                                <label className="block mb-2">Password</label>
                                <input type="password" name="password" className="w-full p-2 border rounded" value={editedData.password || "********"} onChange={handleInputChange} disabled={!isEditing} />
                            </div>

                            {isEditing ? (
                            <div className="flex gap-4">
                                <button type="button" className="w-32 bg-green-700 text-white px-4 py-2 rounded" onClick={handleSaveClick} >Save</button>
                                <button type="button" className="w-32 bg-red-500 text-white px-4 py-2 rounded" onClick={handleCancelClick} >Cancel</button>
                            </div>
                            ) : (
                            <button type="button" className="w-32 bg-green-700 text-white px-4 py-2 rounded" onClick={handleEditClick} >Edit</button>
                            )}
                        </form>
                    </div>
                </div>
            </main>
        </div>
    );
}