import PropTypes from "prop-types";

const SignupKomunitas = ({
    handleSignup, setEmail, setPassword, setConfirmPassword, setContactName, setPhone, setCommunityName, setCommunityType,
    email, password, confirmPassword, contactName, phone, communityName, communityType,
}) => {
    return (
        <form onSubmit={handleSignup} className="flex flex-col gap-4 bg-white p-6 rounded-md shadow-md w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4">Daftar Sebagai Komunitas</h2>

            <label>Nama Komunitas
                <input type="text" value={communityName} onChange={(e) => setCommunityName(e.target.value)}
                    className="border p-2 w-full rounded-md" placeholder="Nama Komunitas" required
                />
            </label>

            <label>Jenis Komunitas
                <input type="text" value={communityType} onChange={(e) => setCommunityType(e.target.value)}
                    className="border p-2 w-full rounded-md" placeholder="Jenis Komunitas" required
                />
            </label>

            <label>Nama Kontak
                <input type="text" value={contactName} onChange={(e) => setContactName(e.target.value)}
                    className="border p-2 w-full rounded-md" placeholder="Nama Kontak" required
                />
            </label>

            <label>Nomor Telepon
                <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)}
                    className="border p-2 w-full rounded-md" placeholder="Nomor Telepon" required
                />
            </label>

            <label>Email
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                    className="border p-2 w-full rounded-md" placeholder="Email" required
                />
            </label>

            <label> Password
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                    className="border p-2 w-full rounded-md" placeholder="Password" required
                />
            </label>

            <label> Konfirmasi Password
                <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                    className="border p-2 w-full rounded-md" placeholder="Konfirmasi Password" required
                />
            </label>

            <button type="submit" className="bg-green-500 text-white py-2 rounded-md hover:bg-green-600">
                Daftar
            </button>
        </form>
    );
};

SignupKomunitas.propTypes = {
    handleSignup: PropTypes.func.isRequired,
    setEmail: PropTypes.func.isRequired,
    setPassword: PropTypes.func.isRequired,
    setConfirmPassword: PropTypes.func.isRequired,
    setContactName: PropTypes.func.isRequired,
    setPhone: PropTypes.func.isRequired,
    setCommunityName: PropTypes.func.isRequired,
    setCommunityType: PropTypes.func.isRequired,
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    confirmPassword: PropTypes.string.isRequired,
    contactName: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    communityName: PropTypes.string.isRequired,
    communityType: PropTypes.string.isRequired,
};

export default SignupKomunitas;
