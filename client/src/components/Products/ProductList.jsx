/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Navbar from "../Common/Navbar";
import AdminNavbar from "../Common/AdminNavbar";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";

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

	console.log(products);

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

	const formatProductName = (productName) => {
		const words = productName.trim().toLowerCase().split(" and ");
		const formattedWords = words.map((word, index) => {
			if (words.length === 1 && word.endsWith("s")) {
				return word.slice(0, -1);
			} else if (index === 0 || index === 1) {
				return (
					word.charAt(0).toUpperCase() +
					word.slice(1) +
					(word.endsWith("s") ? "" : "s")
				);
			} else {
				return word;
			}
		});

		return formattedWords.join(" and ") + " Bouquet";
	};

	return (
		<div>
			{role === "ROLE_ADMIN" ? <AdminNavbar /> : <Navbar />}

			<div className="bg-white">
				<div className="mx-auto max-w-2xl px-4 py-4 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
					<h2 className="text-2xl font-bold tracking-tight text-gray-900">
						{products.length === 0 ? `No Products` : "Products Available..."}
					</h2>
					<div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2">
						{products.map((product) => (
							<motion.div
								key={product.id}
								className="group relative flex flex-row"
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{
									duration: 0.5,
									ease: "easeOut",
									delay: 0.05 * product.id,
								}}
							>
								<div className="w-1/3 h-auto overflow-hidden rounded-md bg-gray-200">
									<a href={`/product/${product.id}`}>
										<motion.img
											src={`http://localhost:8080${product.photo}`}
											alt={`${product.name}+ " Bouquet"`}
											className="h-full w-full object-cover object-center"
											whileHover={{ scale: 1.15 }}
											transition={{ duration: 0.5 }}
										/>
									</a>
								</div>

								<div className="ml-4 flex flex-col justify-between w-1/2">

									<div>
										<motion.a href={`/admin/add-product`}>
											<h3 className="text-gray-700">
												<p className="text-2xl font-semibold text-gray-900">
													{formatProductName(product.name)}
												</p>
											</h3>
										</motion.a>

										<span className="mt-2 text-lg font-medium text-gray-900 block ">
											<span className="text-base font-light text-gray-500">
												Price:{" "}
											</span>
											{`${product.price} ${product.currency}`}
										</span>

										<span className="text-base font-normal text-gray-900 block ">
											<span className="text-base font-extralight text-gray-500">
												Size:{" "}
											</span>
											{product.size.charAt(0).toUpperCase() +
												product.size.slice(1)}
										</span>

										<span className="mt-4 text-sm font-normal text-gray-900 block">
											{product.about === null ? "" : product.about}
										</span>
									</div>
                  
									{role === "ROLE_ADMIN" && (
										<motion.div className="mt-9 space-x-3 flex">
											<motion.button
												className="cursor-pointer text-blue-500 hover:text-blue-600"
												onClick={() =>
													navigate(`/admin/edit-product/${product.id}`)
												}
												whileHover={{ scale: 1.1 }}
												whileTap={{ scale: 0.9 }}
												transition={{ duration: 0.2 }}
											>
												Edit
												<FontAwesomeIcon
													icon={faEdit}
													className="px-1 cursor-pointer text-blue-500 hover:text-blue-600"
												/>
											</motion.button>
											<motion.button
												className="text-red-500 hover:text-red-600"
												onClick={() => handleDelete(product.id)}
												whileHover={{ scale: 1.1 }}
												whileTap={{ scale: 0.9 }}
												transition={{ duration: 0.2 }}
											>
												Delete
												<FontAwesomeIcon
													icon={faTrashAlt}
													className="px-1 cursor-pointer text-red-500 hover:text-red-600"
												/>
											</motion.button>
										</motion.div>
									)}
								</div>
							</motion.div>
						))}
					</div>
					<div className="lg:flex items-center lg:justify-end space-x-2 mt-4">
						{products.length !== 0 ? (
							<motion.button
								onClick={() => {
									if (role === "ROLE_ADMIN") {
										navigate("/admin/add-product");
									} else {
										navigate(-1);
									}
								}}
								className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
								transition={{ duration: 0.2 }}
							>
								{role === "ROLE_ADMIN" ? "Add more products" : "Back"}
							</motion.button>
						) : (
							<motion.button
								onClick={() => {
									if (role === "ROLE_ADMIN") {
										navigate("/admin/add-product");
									} else {
										navigate(-1);
									}
								}}
								className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
								transition={{ duration: 0.2 }}
							>
								{role === "ROLE_ADMIN" ? "No products? Add here" : "Back"}
							</motion.button>
						)}

						{role === "ROLE_ADMIN" && (
							<motion.button
								onClick={() => navigate(-1)}
								className="text-sm font-semibold rounded-md bg-white-600 px-3 py-2 shadow hover:bg-indigo-600 hover:text-white"
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
								transition={{ duration: 0.2 }}
							>
								Back
							</motion.button>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProductList;
