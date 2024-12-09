import PropTypes from "prop-types";

const SignupIndividu = ({
    handleSignup, setEmail, setPassword, setConfirmPassword, setFullName, email, password, confirmPassword, fullName,
}) => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-loginForm bg-center bg-cover text-white">
            <form onSubmit={handleSignup} className="flex flex-col gap-4 p-6 rounded-md shadow-md w-full max-w-md bg-white text-black">
                <h2 className="text-2xl font-bold mb-4">Daftar Sebagai Individu</h2>

                <label>Nama Lengkap
                    <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)}
                        className="border p-2 w-full rounded-md" placeholder="Nama Lengkap" required
                    />
                </label>

                <label>Email
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                        className="border p-2 w-full rounded-md" placeholder="Email" required
                    />
                </label>

                <label>Password
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                        className="border p-2 w-full rounded-md" placeholder="Password" required
                    />
                </label>

                <label> Konfirmasi Password
                    <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                        className="border p-2 w-full rounded-md" placeholder="Konfirmasi Password" required
                    />
                </label>

                <button className="bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600" type="submit">
                    Daftar
                </button>
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
};

export default SignupIndividu;