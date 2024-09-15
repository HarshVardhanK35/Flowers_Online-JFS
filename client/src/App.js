import React from "react";
import { Route, Routes, BrowserRouter} from "react-router-dom";
import ProductList from "./components/products/ProductList";
import Register from "./components/Account/Register";
import ForgotPassword from "./components/Account/ForgotPassword";
import ResetPassword from "./components/Account/ResetPassword";
import Home from "./components/Home/Home";
import Login from "./components/Account/Login";
import Regis from "./components/Account/Regis";

function App() {
	return (
		<BrowserRouter>
				<div className="App">
					<Routes>
						<Route>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login/>} />
              <Route path="/register" element={<Register/>}></Route>
              <Route path="/regis" element={<Regis/>}></Route>
              <Route path="/forgot-password" element={<ForgotPassword/>}></Route>
              <Route path="/reset-password" element={<ResetPassword/>}></Route>

              <Route path="/products" element={<ProductList/>}></Route>
            </Route>
					</Routes>
				</div>
		</BrowserRouter>
	);
}

export default App;