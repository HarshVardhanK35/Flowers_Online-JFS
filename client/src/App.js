import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Register from "./components/Account/Register";
import ForgotPassword from "./components/Account/ForgotPassword";
import ResetPassword from "./components/Account/ResetPassword";
import Login from "./components/Account/Login";
import Categories from "./components/Home/Categories";
import ProductList from "./components/Products/ProductList";
import AddProducts from "./components/Admin/AddProducts";
import ProtectedRoute from "./components/Admin/ProtectedRoute";
import Error from "./components/Common/Error";
import UserLanding from "./components/Home/UserLanding";
import AdminLanding from "./components/Admin/AdminLanding";
import AddShopLocation from "./components/Admin/AddShopLocation";
import AdminDetails from "./components/Admin/AdminDetails";

function App() {
	return (
		<BrowserRouter>
			<div className="App">
				<Routes>
					<Route path="/" element={<UserLanding />} />

					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
					<Route path="/forgot-password" element={<ForgotPassword />} />
					<Route path="/reset-password" element={<ResetPassword />} />

					<Route path="/categories" element={<Categories />} />
					<Route path="/categories/all" element={<ProductList />} />
					<Route path="/products" element={<ProductList />} />

					<Route
						path="/products/:categoryName"
						element={
							<ProtectedRoute>
								{" "}
								<ProductList />{" "}
							</ProtectedRoute>
						}
					/>

					<Route
						path="/admin"
						element={
							<ProtectedRoute adminOnly={true}>
								<AdminLanding />
							</ProtectedRoute>
						}
					/>

          <Route
						path="/admin/add-product"
						element={
							<ProtectedRoute adminOnly={true}>
								<AddProducts />
							</ProtectedRoute>
						}
					/>

          <Route
						path="/admin/add-shop"
						element={
							<ProtectedRoute adminOnly={true}>
                <AddShopLocation />
							</ProtectedRoute>
						}
					/>

          <Route
						path="/admin/details"
						element={
							<ProtectedRoute adminOnly={true}>
                <AdminDetails />
							</ProtectedRoute>
						}
					/>

					<Route path="*" element={<Error />} />
				</Routes>
			</div>
		</BrowserRouter>
	);
}

export default App;
