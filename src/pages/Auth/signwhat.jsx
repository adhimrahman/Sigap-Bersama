import { useNavigate } from 'react-router-dom';

function SignWhat() {
    const navigate = useNavigate();

    const handleSelectRole = (role) => {
        navigate(`/signup/${role}`);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-[url('/bege.png')] bg-center bg-cover">
            <form className="flex flex-col items-center justify-center bg-[#282C34]/95 w-2/5 h-96 rounded-[16px] backdrop-blur-sm gap-3">
                <div className="description w-10/12 text-justify">
                    <h1 className="capitalize font-bold text-2xl mb-4">Registrasi</h1>
                    <p className="text-md">Bergabung dengan Sigap Bersama sebagai organisasi atau sebagai relawan</p>
                </div>

                <div className="flex flex-col w-10/12 gap-3 capitalize">
                    <button
                        type="button"
                        onClick={() => handleSelectRole('komunitas')}
                        className="mt-2 p-2 h-20 rounded-[12px] bg-[#008080] text-white font-bold capitalize hover:bg-[#008080]/40"
                    >
                        Komunitas
                    </button>
                    <button
                        type="button"
                        onClick={() => handleSelectRole('individu')}
                        className="mt-2 p-2 h-20 rounded-[12px] bg-[#008080] text-white font-bold capitalize hover:bg-[#008080]/40"
                    >
                        Individu
                    </button>
                </div>
            </form>
        </div>
    );
}

export default SignWhat;