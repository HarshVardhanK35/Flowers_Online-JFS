/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Navbar from "../Common/Navbar";
import AdminNavbar from "../Common/AdminNavbar";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

const ProductList = () => {
	const navigate = useNavigate();

	const [products, setProducts] = useState([]);

	const token = localStorage.getItem("token");
	const role = localStorage.getItem("role");

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const response = await fetch("http://localhost:8080/api/products", {
					method: "GET",
					headers: {
						Authorization: `Bearer ${token}`,
						"Content-Type": "application/json",
					},
				});
				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}
				const data = await response.json();
				setProducts(data);
			} catch (error) {
				console.error("Error fetching products:", error);
			}
		};
		fetchProducts();
	}, [token]);

	const handleDelete = async (productId) => {
		const confirmDelete = window.confirm(
			"Are you sure you want to delete this product?"
		);
		if (confirmDelete) {
			try {
				const response = await fetch(
					`http://localhost:8080/api/products/${productId}`,
					{
						method: "DELETE",
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);
				if (response.ok) {
					setProducts(products.filter((product) => product.id !== productId));
					alert("Product deleted successfully");
				} else {
					alert("Error deleting product");
				}
			} catch (error) {
				console.error("Error deleting product:", error);
			}
		}
	};

	return (
		<div>
			{role === "ROLE_ADMIN" ? <AdminNavbar /> : <Navbar />}

			<div className="bg-white">
				<div className="mx-auto max-w-2xl px-4 py-4 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
					<h2 className="text-2xl font-bold tracking-tight text-gray-900">
						{products.length === 0 ? `No Products` : "Products Available..."}
					</h2>

					<div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
						{products.map((product) => (
							<div key={product.id} className="group relative">

								<div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none lg:h-60">
									<a href={`/admin/add-product`}>
										<img
											src={`http://localhost:8080${product.photo}`}
											alt={`${product.name}+ " Bouquet"`}
											className="h-full w-full object-cover object-center lg:h-full lg:w-full"
										/>
									</a>
								</div>

								<div className="mt-1 flex justify-between">
									<div>
										<h3 className="text-sm text-gray-700">
											<p className="text-sm font-medium text-gray-900">
												{`${product.name.trim()} Bouquet`}<span className="px-4 text-sm text-gray-500">Size: {product.size}</span>
											</p>
										</h3>
										<p className="text-sm font-medium text-gray-900">{`${product.price} ${product.currency}`}</p>
									</div>

									<div>
										{role === "ROLE_ADMIN" && (
											<div className="mt-2 flex space-x-3 justify-end">
												<FontAwesomeIcon
													icon={faEdit}
													onClick={() =>
														navigate(`/admin/edit-product/${product.id}`)
													}
													className="cursor-pointer text-blue-500 hover:text-blue-600"
												/>
												<FontAwesomeIcon
													icon={faTrashAlt}
													onClick={() => handleDelete(product.id)}
													className="cursor-pointer text-red-500 hover:text-red-600"
												/>
											</div>
										)}
									</div>
								</div>
							</div>
						))}
					</div>
					<div className="lg:flex items-center lg:justify-end space-x-2 mt-2">
						{products.length !== 0 ? (
							<button
								onClick={() => {
									if (role === "ROLE_ADMIN") {
										navigate("/admin/add-product");
									} else {
										navigate(-1);
									}
								}}
								className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
							>
								{role === "ROLE_ADMIN" ? "Add more products" : "Back"}
							</button>
						) : (
							<button
								onClick={() => {
									if (role === "ROLE_ADMIN") {
										navigate("/admin/add-product");
									} else {
										navigate(-1);
									}
								}}
								className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
							>
								{role === "ROLE_ADMIN" ? "No products? Add here" : "Back"}
							</button>
						)}
						{role === "ROLE_ADMIN" ? (
							<button
								onClick={() => navigate(-1)}
								className="text-sm font-semibold rounded-md bg-white-600 px-3 py-2 shadow font-semibold hover:bg-indigo-600 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
							>
								Back
							</button>
						) : (
							""
						)}
					</div>
				</div>
			</div>
		</div>
	);
};
export default ProductList;
