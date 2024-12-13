import PropTypes from "prop-types";

const SignupKomunitas = ({
    handleSignup, setEmail, setPassword, setConfirmPassword, setContactName, setPhone, setCommunityName, setCommunityType, email, password, confirmPassword, contactName, phone, communityName, communityType, errorMessage
}) => { 

    return (
        <div className="flex flex-col w-full items-center justify-center min-h-screen bg-loginForm bg-center bg-cover text-white">
            {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}
            <form onSubmit={handleSignup} className="flex flex-col items-center justify-center bg-[#282C34]/95 w-2/3 rounded-[16px] backdrop-blur-sm gap-3 p-11 pb-14">              
                <div className="flex items-center justify-center w-full mt-8">
                    <h2 className="text-2xl font-bold mb-8">Daftar Sebagai Komunitas</h2>
                </div>
                
                <div className="container flex gap-9">
                    <div className="leftSide w-1/2 h-fit flex flex-col gap-4">
                        <label>Nama Komunitas
                            <input type="text" value={communityName} onChange={(e) => setCommunityName(e.target.value)} className="border text-black p-2 w-full rounded-md" placeholder="Nama Komunitas" required/>
                        </label>

                        <label>Jenis Komunitas
                            <input type="text" value={communityType} onChange={(e) => setCommunityType(e.target.value)} className="border text-black p-2 w-full rounded-md" placeholder="Jenis Komunitas" required/>
                        </label>

                        <label>Nama Kontak
                            <input type="text" value={contactName} onChange={(e) => setContactName(e.target.value)} className="border text-black p-2 w-full rounded-md" placeholder="Nama Kontak" required/>
                        </label>

                        <label>Nomor Telepon
                            <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className="border text-black p-2 w-full rounded-md" placeholder="Nomor Telepon" required/>
                        </label>
                    </div>

                    <div className="rightSide w-1/2 h-fit flex flex-col gap-4">
                        <label>Email
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="border text-black p-2 w-full rounded-md" placeholder="Email" required />
                        </label>

                        <label> Password
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="border text-black p-2 w-full rounded-md" placeholder="Password" required />
                        </label>

                        <label> Konfirmasi Password
                            <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="border text-black p-2 w-full rounded-md" placeholder="Konfirmasi Password" required />
                        </label>

                        <label className="text-[#282C34]">1
                            <button type="submit" className="bg-[#008080] text-white w-full py-2 rounded-md hover:bg-[#008080]/40">Daftar</button>
                        </label>
                    </div>
                </div>
            </form>
        </div>
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
    contactName: PropTypes.string,
    phone: PropTypes.string,
    communityName: PropTypes.string,
    communityType: PropTypes.string,
    errorMessage: PropTypes.string
};

export default SignupKomunitas;