/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Navbar from "../Common/Navbar";
import AdminNavbar from "../Common/AdminNavbar";
import { useNavigate } from "react-router-dom";

const ProductList = () => {
	const navigate = useNavigate();

	const navigation = () => {
		if (!role === "ROLE_ADMIN") {
			navigate(-1);
		} else {
			navigate("/admin");
		}
	};

	const [products, setProducts] = useState([]);

	const token = localStorage.getItem("token");
	const role = localStorage.getItem("role");

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const response = await fetch("http://localhost:8080/api/products", {
					method: "GET",
					headers: {
						Authorization: `Bearer ${token}`, // Send the JWT token
						"Content-Type": "application/json",
					},
				});

				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}

				const data = await response.json();
				console.log(data);
				setProducts(data);
			} catch (error) {
				console.error("Error fetching products:", error);
			}
		};
		fetchProducts();
	}, [token]);

	return (
		<div>
			{role === "ROLE_ADMIN" ? <AdminNavbar /> : <Navbar />}

			<div className="bg-white">
				<div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
					<h2 className="text-2xl font-bold tracking-tight text-gray-900">
						Products Available...
					</h2>

					<div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
						{products.map((product) => (
							<div key={product.id} className="group relative">
								<div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
									<img
										src={`http://localhost:8080${product.photo}`}
										alt={product.name}
										className="h-full w-full object-cover object-center lg:h-full lg:w-full"
									/>
								</div>
								<div className="mt-1 flex justify-between">
									<div>
										<h3 className="text-sm text-gray-700">
											<a href={`/products/:${product.id}`}>
												<span
													aria-hidden="true"
													className="text-sm font-medium text-gray-900"
												/>
												{product.name}
											</a>
										</h3>
										<p className="mt-1 text-sm text-gray-500">
											{product.category}
										</p>
									</div>
									<p className="text-sm font-medium text-gray-900">
										{product.price}
									</p>
								</div>
							</div>
						))}
					</div>
					<div className="lg:flex lg:justify-end">
						<button
							onClick={navigation}
							className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
						>
							Back
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
export default ProductList;
