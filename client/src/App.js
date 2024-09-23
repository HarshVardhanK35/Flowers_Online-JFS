/* eslint-disable no-unused-vars */
import React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

import UserLanding from "./components/Home/UserLanding";
import Register from "./components/Account/Register";
import Login from "./components/Account/Login";
import ForgotPassword from "./components/Account/ForgotPassword";
import ResetPassword from "./components/Account/ResetPassword";
import Categories from "./components/Home/Categories";
import ProductList from "./components/Products/ProductList";
import ProtectedRoute from "./components/Admin/ProtectedRoute";
import Error from "./components/Common/Error";
import AdminLanding from "./components/Admin/AdminLanding";
import AddProducts from "./components/Admin/AddProducts";
import AdminDetails from "./components/Admin/AdminDetails";
import AddShopLocation from "./components/Admin/AddShopLocation";
import EditProduct from './components/Admin/EditProduct.jsx'
import ProductDetails from "./components/Products/ProductDetails.jsx";

function App() {
	return (
		<div className="App">
			<Routes>
				<Route path="/" element={<UserLanding />} />
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
				<Route path="/forgot-password" element={<ForgotPassword />} />
				<Route path="/reset-password" element={<ResetPassword />} />
				<Route path="/categories" element={<Categories />} />

				<Route path="/products" element={<ProtectedRoute><ProductList /></ProtectedRoute>} />
				<Route path="/categories/all" element={<ProtectedRoute><ProductList /></ProtectedRoute>} />
				<Route path="/products/:categoryName" element={<ProtectedRoute><ProductList /></ProtectedRoute>} />
				<Route path="/product/:productId" element={<ProtectedRoute><ProductDetails /></ProtectedRoute>} />

				<Route path="/admin" element={<ProtectedRoute adminOnly={true}><AdminLanding /></ProtectedRoute>} />
        <Route path="/admin/add-product" element={<ProtectedRoute adminOnly={true}><AddProducts /></ProtectedRoute>} />
        <Route path="/admin/edit-product/:productId" element={<ProtectedRoute adminOnly={true}><EditProduct /></ProtectedRoute>}/>
				<Route path="/admin/add-shop" element={<ProtectedRoute adminOnly={true}><AddShopLocation /></ProtectedRoute>} />
				<Route path="/admin/details" element={<ProtectedRoute adminOnly={true}><AdminDetails /></ProtectedRoute>} />

        <Route path="*" element={<Error />} />

			</Routes>
		</div>
	);
}

export default App;
