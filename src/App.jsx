import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/page";
import Limbah from "./pages/Limbah/page";
import LimbahDetail from "./pages/Limbah/details";
import Bencana from "./pages/Bencana/page";
import BencanaDetail from "./pages/Bencana/details";
import NotFound from "./pages/404/page";
import SignIn from "./pages/Auth/signin";
import SignWhat from "./pages/Auth/signwhat";
import Signup from "./pages/Auth/signup";
import Profile from "./pages/Profile/page";
import Komunitas from "./pages/Profile/komunitas";
import Voucher from "./pages/Voucher/page";
import './index.css'; 

const App = () => (
	<Router>
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/signin" element={<SignIn />} />
			<Route path="/signwhat" element={<SignWhat />} />
			<Route path="/signup/:role" element={<Signup />} />
			<Route path="/limbah" element={<Limbah />} /> 
			<Route path="/limbahdetail" element={<LimbahDetail />} />
			<Route path="/bencana" element={<Bencana />} /> 
			<Route path="/bencanadetail/:id" element={<BencanaDetail />} />
			<Route path="/profile" element={<Profile />} />
			<Route path="/komunitas" element={<Komunitas />} />
			<Route path="/voucher" element={<Voucher />} />
			<Route path="*" element={<NotFound />} /> 
		</Routes>
	</Router>
);

export default App;
// react vite, tailwind, firebase, react_router_dom