import React from "react";
import { Route, Routes, BrowserRouter} from "react-router-dom";
import Register from "./components/Account/Register";
import ForgotPassword from "./components/Account/ForgotPassword";
import ResetPassword from "./components/Account/ResetPassword";
import Home from "./components/Home/Home";
import Login from "./components/Account/Login";
import Admin from "./components/Admin/Admin";
import Categories from "./components/Home/Categories";
import ProductList from "./components/Products/ProductList";
import AddProducts from "./components/Admin/AddProducts";
import ProtectedRoute from "./components/Admin/ProtectedRoute";
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
              {/* <Route path="/products/:categoryName" element={<ProductList />} /> */}
              <Route path="/products" element={<ProductList />} />

              <Route path="/admin" element={<ProtectedRoute><Admin /></ProtectedRoute>} />
              <Route path="/admin/products" element={<ProtectedRoute><ProductList /></ProtectedRoute>} />
              <Route path="/admin/add-product" element={<ProtectedRoute><AddProducts /></ProtectedRoute>} />
            </Route>
					</Routes>
				</div>
		</BrowserRouter>
	);
}
export default App;