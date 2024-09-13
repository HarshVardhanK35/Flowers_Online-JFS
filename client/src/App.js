import React from "react";
import { Route, Routes, BrowserRouter} from "react-router-dom";
import ProductList from "./components/ProductList";
import AddProduct from "./components/AddProduct";
import LoginRegister from "./components/LoginRegister";
import "./App.css";
import Register from "./components/Register";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";

function App() {
	return (
		<BrowserRouter>
				<div className="App">
					<Routes>
						<Route>
              <Route path="/login" element={<LoginRegister />} />
              <Route path="/" element={<LoginRegister />} />
              <Route path="/products" element={<ProductList/>}></Route>
              <Route path="/add-product" element={<AddProduct/>}></Route>
              <Route path="/register" element={<Register/>}></Route>
              <Route path="/forgot-password" element={<ForgotPassword/>}></Route>
              <Route path="/reset-password" element={<ResetPassword/>}></Route>
            </Route>
					</Routes>
				</div>
		</BrowserRouter>
	);
}

export default App;