import PropTypes from "prop-types";

const SignupIndividu = ({
    handleSignup, setEmail, setPassword, setConfirmPassword, setFullName, email, password, confirmPassword, fullName, errorMessage
}) => {
    return (
        <div className="flex flex-col w-full items-center justify-center min-h-screen bg-loginForm bg-center bg-cover text-white">
            {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}
            <form onSubmit={handleSignup} className="flex flex-col justify-center bg-[#282C34]/95 w-1/3 rounded-[16px] backdrop-blur-sm gap-6 p-11 pb-14">              
                <div className="flex items-center justify-center w-full mt-8">
                    <h2 className="text-2xl font-bold mb-8">Daftar Sebagai Individu</h2>
                </div>

                <label>Nama Lengkap
                    <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} className="border text-black p-2 w-full rounded-md" placeholder="Nama Lengkap" required />
                </label>

                <label>Email
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="border text-black p-2 w-full rounded-md" placeholder="Email" required />
                </label>

                <label>Password
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="border text-black p-2 w-full rounded-md" placeholder="Password" required/>
                </label>

                <label> Konfirmasi Password
                    <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="border text-black p-2 w-full rounded-md" placeholder="Konfirmasi Password" required/>
                </label>

                <button className="bg-[#008080] text-white py-2 rounded-md hover:bg-[#008080]/40 mt-2" type="submit">Daftar</button>
            </form>
        </div>
    );
};

SignupIndividu.propTypes = {
    handleSignup: PropTypes.func.isRequired,
    setEmail: PropTypes.func.isRequired,
    setPassword: PropTypes.func.isRequired,
    setConfirmPassword: PropTypes.func.isRequired,
    setFullName: PropTypes.func.isRequired,
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    confirmPassword: PropTypes.string.isRequired,
    fullName: PropTypes.string.isRequired,
    errorMessage: PropTypes.string
};

export default SignupIndividu;