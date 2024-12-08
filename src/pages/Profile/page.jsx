export default function Profile() {
    
    return (
            <div className="flex min-h-screen">
                <main className="flex-1 p-6">
                    <div className="bg-white p-8 rounded-lg shadow-md">
                        <div className="flex items-center mb-6">
                            <div className="w-16 h-16 bg-gray-300 rounded-full"></div>
                            <div className="ml-4">
                                <h3 className="text-xl font-semibold">Nama</h3>
                                <p className="text-gray-600">gmail@gmail.com</p>
                            </div>
                        </div>
                        <form>
                            <div className="mb-4">
                                <label className="block text-gray-700 mb-2">Nama</label>
                                <input type="text" className="w-full p-3 border border-gray-300 rounded-lg bg-gray-200" />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 mb-2">Email</label>
                                <input type="email" className="w-full p-3 border border-gray-300 rounded-lg bg-gray-200" />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 mb-2">No Handphone</label>
                                <input type="text" className="w-full p-3 border border-gray-300 rounded-lg bg-gray-200" />
                            </div>
                            <div className="mb-6">
                                <label className="block text-gray-700 mb-2">Alamat Domisili</label>
                                <input type="text" className="w-full p-3 border border-gray-300 rounded-lg bg-gray-200" />
                            </div>
                            <button type="submit" className="bg-teal-600 text-white px-6 py-3 rounded-lg">Simpan</button>
                        </form>
                    </div>
                </main>
            </div>
        );
    }