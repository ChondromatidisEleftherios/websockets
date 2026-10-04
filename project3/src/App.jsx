import {Login} from "./pages/Login.jsx";
import {Main} from "./pages/Main.jsx";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

export function App(){
	return (
		<BrowserRouter>
      		<Routes>
        		<Route path="/" element={<Login/>}/>
        		<Route path="/main" element={<Main/>}/>
      		</Routes>
    	</BrowserRouter>
		);
}