import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/page";
import Limbah from "./pages/Limbah/page";
import LimbahDetail from "./pages/Limbah/details";
import Bencana from "./pages/Bencana/page";
import BencanaDetail from "./pages/Bencana/details";
import NotFound from "./pages/404/page";
import SignIn from "./pages/Auth/signin";
import SignWhat from "./pages/Auth/signwhat";
import SignupIndividu from "./components/forms/signupIndividu";
import SignupKomunitas from "./components/forms/signupKomunitas";
import Profile from "./pages/Profile/page";
import Voucher from "./pages/Voucher/page";
import './index.css'; 

const App = () => (
	<Router>
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/signin" element={<SignIn />} />
			<Route path="/signwhat" element={<SignWhat />} />
			<Route path="/signup/individu" element={<SignupIndividu />} />
			<Route path="/signup/komunitas" element={<SignupKomunitas />} />
			<Route path="/limbah" element={<Limbah />} /> 
			<Route path="/limbahdetail" element={<LimbahDetail />} />
			<Route path="/bencana" element={<Bencana />} /> 
			<Route path="/bencanadetail/:id" element={<BencanaDetail />} />
			<Route path="/profile" element={<Profile />} />
			<Route path="/voucher" element={<Voucher />} />
			<Route path="*" element={<NotFound />} /> 
		</Routes>
	</Router>
);

export default App;
// react vite, tailwind, firebase, react_router_dom