export default function Limbah() {
    
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-4xl font-bold text-center mb-8">Bencana</h1>
            <div className="flex justify-center mb-8">
                <input type="text" className="w-full max-w-2xl p-4 rounded-lg shadow-md" placeholder="Search..." />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {Array.from({ length: 12 }).map((_, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-md">
                        <div className="h-40 bg-gray-200 rounded-t-lg"></div>
                        <div className="p-4">
                            <h2 className="text-lg font-bold">Nama Campaign</h2>
                            <p className="text-sm text-gray-600">Nama Komunitas</p>
                            <div className="mt-4">
                                <p className="flex items-center text-sm text-gray-600">
                                <svg className="w-4 h-4 text-gray-400 mr-2" fill="none" stroke="green" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                Tanggal</p>
                                <p className="flex items-center text-sm text-gray-600 mt-2">
                                <svg className="w-4 h-4 text-gray-400 mr-2" fill="none" stroke="green" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z"/><circle cx="12" cy="10" r="3"/>
                                </svg>
                                Lokasi</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};