import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { doc, getDoc, setDoc, collection, getDocs } from "firebase/firestore";
import { firestore, auth, storage } from "../../../api/firebaseConfig";
import { updatePassword, signOut, deleteUser } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

import Swal from "sweetalert2";
import Navbar from "../../components/layouts/Navbar";
import Spinner from "../../components/Spinner";
import useUser from "../../context/useUser";

export default function ProfilePage() {
    const { user } = useUser();
    const [profileData, setProfileData] = useState(null);
    const [editedData, setEditedData] = useState({});
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [points, setPoints] = useState(0);
    const [redeemedVouchers, setRedeemedVouchers] = useState([]);
    const [joinedEventCount, setJoinedEventCount] = useState(0);
    const [createdEventCount, setCreatedEventCount] = useState(0);
    const fileInputRef = useRef(null);

    const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate('/signin');
        } else {
            const fetchProfileData = async () => {
                try {
                    const userDocRef = doc(firestore, "users", user.uid);
                    const userDoc = await getDoc(userDocRef);
    
                    if (userDoc.exists()) {
                        const data = userDoc.data();
                        setProfileData(data);
                        setEditedData(data);
                        setPoints(data.points || 0);
    
                        // Ambil data voucher yang di-redeem
                        const redeemedVouchersRef = collection(userDocRef, "redeemedVouchers");
                        const vouchersSnapshot = await getDocs(redeemedVouchersRef);
                        const vouchers = vouchersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                        setRedeemedVouchers(vouchers);
    
                        let eventCount = 0;
    
                        // Hitung jumlah event yang diikuti dari koleksi "bencana"
                        if (data.role === "individu") {
                            const bencanaRef = collection(firestore, "bencana");
                            const bencanaSnapshot = await getDocs(bencanaRef);
    
                            for (const bencanaDoc of bencanaSnapshot.docs) {
                                const relawanRef = collection(bencanaDoc.ref, "relawan");
                                const relawanSnapshot = await getDocs(relawanRef);
    
                                const isUserJoined = relawanSnapshot.docs.some(
                                    (relawanDoc) => relawanDoc.data().userId === user.uid
                                );
    
                                if (isUserJoined) {
                                    eventCount += 1;
                                }
                            }
    
                            // Hitung jumlah event yang diikuti dari koleksi "limbah"
                            const limbahRef = collection(firestore, "limbah");
                            const limbahSnapshot = await getDocs(limbahRef);
    
                            for (const limbahDoc of limbahSnapshot.docs) {
                                const relawanRef = collection(limbahDoc.ref, "relawan");
                                const relawanSnapshot = await getDocs(relawanRef);
    
                                const isUserJoined = relawanSnapshot.docs.some(
                                    (relawanDoc) => relawanDoc.data().userId === user.uid
                                );
    
                                if (isUserJoined) {
                                    eventCount += 1;
                                }
                            }
    
                            setJoinedEventCount(eventCount);
                        }
    
                        // Hitung jumlah event yang dibuat (untuk komunitas)
                        if (data.role === "komunitas") {
                            const bencanaRef = collection(firestore, "bencana");
                            const limbahRef = collection(firestore, "limbah");
    
                            let createdCount = 0;
    
                            // Periksa koleksi bencana
                            const bencanaSnapshot = await getDocs(bencanaRef);
                            createdCount += bencanaSnapshot.docs.filter(
                                (doc) => doc.data().creator?.path === `users/${user.uid}`
                            ).length;
    
                            // Periksa koleksi limbah
                            const limbahSnapshot = await getDocs(limbahRef);
                            createdCount += limbahSnapshot.docs.filter(
                                (doc) => doc.data().creator?.path === `users/${user.uid}`
                            ).length;
    
                            setCreatedEventCount(createdCount);
                        }
                    } else {
                        console.error("User profile not found");
                    }
                } catch (error) {
                    console.error("Error fetching profile:", error);
                } finally {
                    setLoading(false);
                }
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

    const handleProfileImageClick = () => {
        // Trigger input file saat gambar di-klik
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (!file) {
            Swal.fire("Error", "No file selected.", "error");
            return;
        }

        if (file.size > MAX_FILE_SIZE) {
            Swal.fire("Error", "File size exceeds 5 MB. Please upload a smaller image.", "error");
            return;
        }

        try {
            // Upload gambar ke Firebase Storage
            const imageRef = ref(storage, `profile-images/${user.uid}`);
            const uploadTask = uploadBytesResumable(imageRef, file);

            const downloadUrl = await new Promise((resolve, reject) => {
                uploadTask.on(
                    "state_changed",
                    null,
                    reject,
                    () => {
                        getDownloadURL(uploadTask.snapshot.ref).then(resolve);
                    }
                );
            });

            // Update Firestore dengan URL gambar baru
            const userDocRef = doc(firestore, "users", user.uid);
            await setDoc(userDocRef, { image: downloadUrl }, { merge: true });

            setProfileData((prev) => ({ ...prev, image: downloadUrl }));

            Swal.fire("Success", "Profile picture updated successfully!", "success");
        } catch (error) {
            console.error("Error updating profile picture:", error);
            Swal.fire("Error", "Failed to update profile picture. Please try again.", "error");
        }
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

    const handleSignOut = async () => {
        const confirmation = await Swal.fire({
            title: "Konfirmasi Logout",
            text: "Apakah Anda yakin ingin logout?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#365E32",
            cancelButtonColor: "#d33",
            confirmButtonText: "Ya, Logout",
        });
    
        if (confirmation.isConfirmed) {
            try {
                await signOut(auth);
                Swal.fire({
                    title: "Logout Berhasil",
                    text: "Anda telah logout.",
                    icon: "success",
                    confirmButtonColor: "#365E32",
                    confirmButtonText: "OK",
                });
                navigate("/");
            } catch (error) {
                console.error("Error saat logout:", error);
                Swal.fire("Error", "Gagal logout. Silakan coba lagi.", "error");
            }
        }
    };
    
    const handleDeleteAccount = async () => {
        const confirmation = await Swal.fire({
            title: "Konfirmasi Hapus Akun",
            text: "Apakah Anda yakin ingin menghapus akun? Tindakan ini tidak dapat dibatalkan.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#365E32",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Ya, Hapus Akun",
        });
    
        if (confirmation.isConfirmed) {
            try {
                const currentUser = auth.currentUser;
                const userDocRef = doc(firestore, "users", currentUser.uid);
    
                await deleteUser(currentUser); 
                await setDoc(userDocRef, {}, { merge: true });
    
                Swal.fire({
                    title: "Akun Dihapus",
                    text: "Akun Anda telah dihapus.",
                    icon: "success",
                    confirmButtonColor: "#365E32",
                    confirmButtonText: "OK",
                });
                navigate("/");
            } catch (error) {
                console.error("Error saat menghapus akun:", error);
                Swal.fire("Error", "Gagal menghapus akun. Silakan coba lagi.", "error");
            }
        }
    };

    return (
        <div>
            <Navbar pageKeys={['landingPage', 'navBencana', 'navLimbah', 'shop',]} />
            <main className="p-8 mt-16 bg-gray-200 flex flex-col gap-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Card Profil */}
                    <div className="bg-white p-4 rounded-lg shadow-md">
                        <h2 className="text-lg font-extrabold mb-4">
                            {profileData.role === 'komunitas' ? 'Profil Komunitas' : 'Profil Individu'}
                        </h2>
                        <div className="flex flex-col items-center">
                            <div className="w-24 h-24 bg-[#d9d9d9] rounded-full mb-2">
                                <img
                                    src={profileData.image || "https://via.placeholder.com/150"}
                                    className="w-24 h-24 rounded-full mb-2 cursor-pointer bg-gray-200"
                                    onClick={handleProfileImageClick}
                                />
                                <input
                                    type="file"
                                    accept="image/*"
                                    ref={fileInputRef}
                                    className="hidden"
                                    onChange={handleImageChange}
                                />
                            </div>
                            <p className="text-center m-3">
                                {profileData.role === 'komunitas' ? profileData.communityName || 'Nama Komunitas' : profileData.fullName || 'No Name'}
                            </p>
                        </div>
                        <div className="mt-4">
                            <div className="flex justify-between border-t border-black py-5 px-2">
                                <span>{profileData.role === 'komunitas' ? 'Aktivitas yang telah dibuat' : 'Aktivitas yang telah diikuti'}</span>
                                <span>{profileData.role === 'komunitas' ? createdEventCount : joinedEventCount}</span>
                            </div>
                            <div className="flex justify-between border-t border-black py-5 px-2">
                                <span>Lencana</span>
                                <span>{profileData.badge === 'komunitas' ? '-' : 'soon'}</span>
                            </div>
                            <div className="flex justify-between border-y border-black py-5 px-2">
                                <span>Points</span>
                                <span>{points}</span>
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

                            <div className="flex justify-between h-12 mt-9">
                                <div className="left flex gap-4">
                                    {isEditing ? (
                                    <div className="flex gap-4">
                                        <button type="button" className="w-32 bg-green-700 text-white px-4 py-2 rounded" onClick={handleSaveClick} >
                                            Save
                                        </button>
                                        <button type="button" className="w-32 bg-red-500 text-white px-4 py-2 rounded" onClick={handleCancelClick} >
                                            Cancel
                                        </button>
                                    </div>
                                    ) : (
                                    <button type="button" className="w-32 bg-green-700 text-white px-4 py-2 rounded" onClick={handleEditClick} >Edit</button>
                                    )}
                                </div>
                                <div className="right flex gap-4">
                                    <button type="button" className="w-32 bg-blue-500 text-white px-4 py-2 rounded" onClick={handleSignOut} >
                                        Sign Out
                                    </button>
                                    <button type="button" className="w-36 bg-red-500 text-white px-4 py-2 rounded" onClick={handleDeleteAccount}>
                                        Delete Account
                                    </button>
                                </div>
                            </div>
                        </form>

                    </div>
                </div>
                <div className="grid gap-4">
                    <div className="redeemed w-full h-fit rounded-lg bg-white shadow-lg px-9 pt-9 pb-16">
                        <h2 className="text-2xl font-extrabold mb-4">My Voucher</h2>
                        {redeemedVouchers.length > 0 ? (
                            <ul className="space-y-3">
                                {redeemedVouchers.map((voucher) => (
                                    <li key={voucher.id} className="p-4 border rounded-lg bg-gray-300">
                                        <p className="text-lg font-semibold">{voucher.name}</p>
                                        <p>Kode Voucher: <span className="font-mono text-blue-600">{voucher.code}</span></p>
                                        <p>Redeemed At: {new Date(voucher.redeemedAt).toLocaleString()}</p>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-gray-500">Belum ada voucher yang di-redeem.</p>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}