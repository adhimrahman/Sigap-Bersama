import { useEffect, useState } from 'react';

const MapAlerts = () => {
    const [data, setData] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("https://data.bmkg.go.id/DataMKG/TEWS/autogempa.xml");
                const text = await response.text();
                const parser = new DOMParser();
                const xmlDoc = parser.parseFromString(text, "application/xml");

                const gempa = xmlDoc.getElementsByTagName("gempa")[0];
                const gempaData = {
                    tanggal: gempa.getElementsByTagName("Tanggal")[0]?.textContent,
                    jam: gempa.getElementsByTagName("Jam")[0]?.textContent,
                    datetime: gempa.getElementsByTagName("DateTime")[0]?.textContent,
                    magnitude: gempa.getElementsByTagName("Magnitude")[0]?.textContent,
                    kedalaman: gempa.getElementsByTagName("Kedalaman")[0]?.textContent,
                    koordinat: gempa.getElementsByTagName("point")[0]?.getElementsByTagName("coordinates")[0]?.textContent,
                    lintang: gempa.getElementsByTagName("Lintang")[0]?.textContent,
                    bujur: gempa.getElementsByTagName("Bujur")[0]?.textContent,
                    wilayah: gempa.getElementsByTagName("Wilayah")[0]?.textContent,
                    potensi: gempa.getElementsByTagName("Potensi")[0]?.textContent,
                    dirasakan: gempa.getElementsByTagName("Dirasakan")[0]?.textContent,
                    shakemap: gempa.getElementsByTagName("Shakemap")[0]?.textContent,
                };
                setData(gempaData);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    const handleModalOpen = () => {
        setIsModalOpen(true);
        document.body.style.overflow = "hidden";
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
        document.body.style.overflow = "auto";
    };

    if (!data) {
        return <p>Loading...</p>;
    }

    return (
        <div className="cards lg:w-3/5 lg:h-fit flex flex-col lg:flex-row rounded-lg shadow-md p-3 bg-gray-200 mb-9">
            <div className="leftside lg:w-2/3 h-100 py-9 pl-9 flex flex-col gap-y-2">
                <p><strong>Tanggal:</strong> {data.tanggal}</p>
                <p><strong>Jam:</strong> {data.jam}</p>
                <p><strong>DateTime:</strong> {data.datetime}</p>
                <p><strong>Magnitude:</strong> {data.magnitude}</p>
                <p><strong>Kedalaman:</strong> {data.kedalaman}</p>
                <p><strong>Koordinat:</strong> {data.koordinat}</p>
                <p><strong>Lintang:</strong> {data.lintang}</p>
                <p><strong>Bujur:</strong> {data.bujur}</p>
                <p><strong>Wilayah:</strong> {data.wilayah}</p>
                <p><strong>Potensi:</strong> {data.potensi}</p>
                <p><strong>Dirasakan:</strong> {data.dirasakan}</p>
            </div>
            
            <div className="rightSide lg:w-1/3 h-100 flex justify-center hover:cursor-pointer">
                <div className="shakemap h-full">
                    <img src={`https://data.bmkg.go.id/DataMKG/TEWS/${data.shakemap}`} alt="Shakemap" className="h-full" onClick={handleModalOpen} />
                </div>
            </div>

            {isModalOpen && (
                <div
                    className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
                    onClick={handleModalClose}
                >
                    <div className="relative bg-white p-5 rounded-lg shadow-lg max-w-3xl">
                        {/* Modal Content */}
                        <button
                            className="absolute top-2 right-2 text-gray-600 hover:text-black"
                            onClick={handleModalClose}
                        >
                            &#x2715; {/* Close Icon */}
                        </button>
                        <img
                            src={`https://data.bmkg.go.id/DataMKG/TEWS/${data.shakemap}`}
                            alt="Shakemap"
                            className="w-full h-auto"
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default MapAlerts;