import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/page";
import Limbah from "./pages/Limbah/page";
import LimbahDetail from "./pages/Limbah/details";
import Bencana from "./pages/Bencana/page";
import BencanaDetail from "./pages/Bencana/details";
import './index.css';

const App = () => (
	<Router>
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/limbah" element={<Limbah />} /> 
			<Route path="/limbahdetail" element={<LimbahDetail />} />{/* Untuk preview contoh halaman detail, nanti diubah routenya*/}
			<Route path="/bencana" element={<Bencana />} /> 
			<Route path="/bencanadetail" element={<BencanaDetail />} />{/* Untuk preview contoh halaman detail, nanti diubah routenya*/}
		</Routes>
	</Router>
);

export default App;
// react vite, tailwind, firebase, react_router_dom