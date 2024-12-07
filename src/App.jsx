import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/page";
import Limbah from "./pages/Limbah/page";
import Bencana from "./pages/Bencana/page";
import './index.css';

const App = () => (
	<Router>
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/limbah" element={<Limbah />} /> 
			<Route path="/bencana" element={<Bencana />} /> 
		</Routes>
	</Router>
);

export default App;
// react vite, tailwind, firebase, react_router_dom