import React from "react";
import { Route, Routes, BrowserRouter} from "react-router-dom";
import Register from "./components/Account/Register";
import ForgotPassword from "./components/Account/ForgotPassword";
import ResetPassword from "./components/Account/ResetPassword";
import Home from "./components/Home/Home";
import Login from "./components/Account/Login";
import Admin from "./components/Admin/Admin";
import Categories from "./components/Home/Categories";
import Navbar from "./components/Common/Navbar";

function App() {
	return (
		<BrowserRouter>
				<div className="App">
					<Routes>
						<Route>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login/>} />
              <Route path="/register" element={<Register/>}></Route>
              <Route path="/forgot-password" element={<ForgotPassword/>}></Route>
              <Route path="/reset-password" element={<ResetPassword/>}></Route>

              <Route path="/categories" element={<Categories/>}></Route>
              <Route path="/navbar" element={<Navbar/>}></Route>

              <Route path="/admin" element={<Admin/>}></Route>
            </Route>
					</Routes>
				</div>
		</BrowserRouter>
	);
}

export default App;