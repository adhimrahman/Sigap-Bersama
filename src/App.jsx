import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/page";
import Limbah from "./pages/Limbah/page";
import './index.css';

const App = () => (
	<Router>
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/limbah" element={<Limbah />} />
		</Routes>
	</Router>
);

export default App;
// react vite, tailwind, firebase, react_router_dom