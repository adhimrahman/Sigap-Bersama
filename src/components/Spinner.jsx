export default function Spinner() {
    return (
        <div className="w-full h-screen flex justify-center items-center bg-gray-100">
            <div className="w-16 h-16 border-4 border-t-green-500 border-gray-300 rounded-full animate-spin"></div>
        </div>
    );
}