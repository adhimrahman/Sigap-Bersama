// components/cards/Card.jsx
import { useNavigate } from "react-router-dom";

export default function CardEvent({ id, image, name, creator, date, locate, detailPath }) {
    const navigate = useNavigate();

    return (
        <div className="card bg-white rounded-lg shadow-2xl hover:cursor-pointer hover:scale-[1.01] capitalize"
        onClick={() => navigate(`/${detailPath}/${id}`)}>
            <div className="h-fit lg:h-56 bg-gray-200 rounded-t-lg overflow-hidden">
                <img src={image || "https://placehold.co/600x400"} alt={name} className="w-full h-full object-cover object-center" />
            </div>
            <div className="p-4">
                <h2 className="text-lg font-bold">{name}</h2>
                <p className="text-sm text-gray-600 mt-1">{creator}</p>
                <div className="mt-4">
                    <p className="flex items-center text-sm text-gray-600">
                        <svg className="w-4 h-4 text-gray-400 mr-2" fill="none" stroke="green" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                        {date}
                    </p>
                    <p className="flex items-center text-sm text-gray-600">
                        <svg className="w-4 h-4 text-gray-400 mr-2" fill="none" stroke="green" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z"/><circle cx="12" cy="10" r="3" /></svg>
                        {locate}
                    </p>
                </div>
            </div>
        </div>
    );
}