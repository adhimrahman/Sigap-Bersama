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
import Voucher from "./pages/Voucher/page";
import ProtectedRoute from "./components/ProtectedRoute";
import AddEvent from "./pages/My/addEvent";
import EditEvent from "./pages/My/editEvent";
import DonationPage from "./pages/payment/DonationPage";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './index.css'; 
import MyEvent from "./pages/My/event";
import MyInterest from "./pages/My/interest";

const App = () => (
	<Router>
		<ToastContainer />
		{/* <Navbar /> */}
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/signin" element={<SignIn />} />
			<Route path="/signwhat" element={<SignWhat />} />
			<Route path="/signup/:role" element={<Signup />} />
			<Route path="/limbah" element={<Limbah />} /> 
			<Route path="/limbahdetail/:id" element={<LimbahDetail />} />
			<Route path="/bencana" element={<Bencana />} />
			<Route path="/bencanadetail/:id" element={<BencanaDetail />} />
			<Route path="/donate/:category/:id" element={<DonationPage />} />
			<Route path="/profile" element={<ProtectedRoute element={<Profile />}/>} />
			<Route path="/voucher" element={<Voucher />} />
			<Route path="/myevent" element={<ProtectedRoute element={<MyEvent />}/>} />
			<Route path="/addevent" element={<ProtectedRoute element={<AddEvent />}/>} />
			<Route path="/editEvent/:type/:id" element={<EditEvent />} />
			<Route path="/myinterest" element={<ProtectedRoute element={<MyInterest />}/>} />
			<Route path="*" element={<NotFound />} /> 
		</Routes>
	</Router>
);

export default App;
// react vite, tailwind, firebase, react_router_dom