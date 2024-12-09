import Navbar from "../../components/layouts/Navbar";
import React from 'react'; 

export default function Profile() {
    const [isEditing, setIsEditing] = React.useState(false);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = () => {
        setIsEditing(false);
    };
    
    return (
        <div>
            <Navbar menuItems={['Home', 'About', 'Bencana', 'Limbah', 'Testimoni', 'Maps', 'Contact Us', 'My Event', 'Profil']}
                scrollHandler={(label) => {
                    const targetClass =
                        label === 'About' ? 'about' : label === 'Bencana' ? 'bencana' :
                        label === 'Limbah' ? 'limbah' : label === 'Testimoni' ? 'testimoni' :
                        label === 'Maps' ? 'maps' : label === 'Contact Us' ? 'footer' : 'hero';
                    const targetElement = document.querySelector(`.${targetClass}`);
                    targetElement?.scrollIntoView({behavior: 'smooth' });
                }}
            />
            <main className="p-8 mt-16 bg-[#f0f0f0]">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white p-4 rounded-lg shadow-md">
                        <h2 className="text-lg font-extrabold mb-4">Profil</h2>
                        <div className="flex flex-col items-center">
                            <div className="w-24 h-24 bg-[#d9d9d9] rounded-full mb-2"></div>
                            <p className="text-center m-3">Nama</p>
                        </div>
                        <div className="mt-4">
                            <div className="flex justify-between border-t border-black py-5 px-2">
                                <span>Aktivitas yang telah diikuti</span>
                                <span>10</span>
                            </div>
                            <div className="flex justify-between border-t border-black py-5 px-2">
                                <span>Lencana</span>
                                <span>10</span>
                            </div>
                            <div className="flex justify-between border-y border-black py-5 px-2">
                                <span>Poin</span>
                                <span>10</span>
                            </div>
                        </div>
                    </div>
                    <div className="md:col-span-2 bg-white p-4 rounded-lg shadow-md">
                        <h2 className="text-lg font-extrabold mb-4">Data Pribadi</h2>
                        <form>
                            <div className="mb-4">
                                <label className="block mb-2">Nama</label>
                                <input type="text" className="w-full p-2 border rounded" disabled={!isEditing} />
                            </div>
                            <div className="mb-4">
                                <label className="block mb-2">Email</label>
                                <input type="email" className="w-full p-2 border rounded" disabled={!isEditing} />
                            </div>
                            <div className="mb-4">
                                <label className="block mb-2">No Handphone</label>
                                <input type="tel" className="w-full p-2 border rounded" disabled={!isEditing} />
                            </div>
                            {isEditing ? (
                                <button type="button" className="bg-green-700 text-white px-4 py-2 rounded" onClick={handleSaveClick}>save</button>
                            ) : (
                                <button type="button" className="bg-green-700 text-white px-4 py-2 rounded" onClick={handleEditClick}>edit</button>
                            )}
                        </form>
                    </div>
                </div>
                <div className="mt-8 bg-white p-4 rounded-lg shadow-md">
                    <h2 className="text-lg font-extrabold mb-4">Lencana</h2>
                    <div className="h-64"></div>
                </div>
            </main>
        </div>
    );
};