/* eslint-disable no-unused-vars */
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import Navbar from "../Common/Navbar";
import AdminNavbar from "../Common/AdminNavbar";
import ProductFilter from "../Common/ProductFilter";

const AdminProductList = () => {
	const navigate = useNavigate();

	const [products, setProducts] = useState([]);
	const [filteredProducts, setFilteredProducts] = useState([]);
	const [isDeleting, setIsDeleting] = useState(false);
	const [loading, setLoading] = useState(true);

	const token = localStorage.getItem("token");
	const role = localStorage.getItem("role");

	const fetchProducts = useCallback(async () => {
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
			setFilteredProducts(data);
		} catch (error) {
			console.error("Error fetching products:", error);
			alert("Failed to fetch products. Please try again later.");
		}
	}, [token]);

	useEffect(() => {
		fetchProducts();
	}, [fetchProducts]);

	const handleSearch = (searchTerm) => {
		const filtered = products.filter((product) =>
			product.name.toLowerCase().startsWith(searchTerm.toLowerCase())
		);
		setFilteredProducts(filtered);
	};

	const handleSort = (sortOption) => {
		let sortedProducts = [...filteredProducts];
		if (sortOption === "lowToHigh") {
			sortedProducts.sort((a, b) => a.availableQuantity - b.availableQuantity);
		} else if (sortOption === "highToLow") {
			sortedProducts.sort((a, b) => b.availableQuantity - a.availableQuantity);
		}
		setFilteredProducts(sortedProducts);
	};

	const handleSizeFilter = (sizeOption) => {
		const filtered = products.filter(
			(product) => product.size.toLowerCase() === sizeOption.toLowerCase()
		);
		setFilteredProducts(filtered);
	};

	useEffect(() => {
		const handleCartUpdate = () => {
			fetchProducts();
		};

		window.addEventListener("cartUpdated", handleCartUpdate);

		return () => {
			window.removeEventListener("cartUpdated", handleCartUpdate);
		};
	}, [fetchProducts]);

	// console.log(products);

	const handleEdit = (id) => {
		navigate(`/admin/edit-product/${id}`);
	};

	const handleDelete = async (productId) => {
		const confirmDelete = window.confirm(
			"Are you sure you want to delete this product?"
		);

		if (confirmDelete) {
			setIsDeleting(true);
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
				alert("Error deleting product. Please try again.");
			} finally {
				setIsDeleting(false);
			}
		}
	};

	useEffect(() => {
		fetchProducts().finally(() => setLoading(false));
	}, [fetchProducts]);

	if (loading) {
		return <p>Loading products...</p>;
	}

	// const formatProductName = (productName) => {
	// 	let words = productName.trim().toLowerCase().split(" ");
	// 	if (words.length > 1 && words[words.length - 2] !== "and") {
	// 		words.splice(words.length - 1, 0, "and");
	// 	}
	// 	const formattedWords = words.map((word, index, array) => {
	// 		if (
	// 			index !== array.length - 2 &&
	// 			index !== array.length - 1 && !word.endsWith("s")
	// 		) {
	// 			word += "s";
	// 		}
	// 		return word.charAt(0).toUpperCase() + word.slice(1);
	// 	});
	// 	if (formattedWords.length > 3) {
	// 		const lastTwoWords = formattedWords.splice(-2);
	// 		return `${formattedWords.join(", ")} ${lastTwoWords.join(" ")} Bouquet`;
	// 	}
	// 	return formattedWords.join(" ") + " Bouquet";
	// };

	return (
		<div>
			{role === "ROLE_ADMIN" ? <AdminNavbar /> : <Navbar />}

			<div className="bg-white">
				<div className="mx-auto max-w-2xl px-4 py-4 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
					<h2 className="text-2xl font-bold tracking-tight text-gray-900">
						{products.length === 0 ? `No Products` : "Products Available..."}
					</h2>

					<ProductFilter
						onSearch={handleSearch}
						onSort={handleSort}
						onSizeFilter={handleSizeFilter}
					/>

					<div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2">
						{filteredProducts.length > 0 ? (
							filteredProducts.map((product) => (
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

									<div className="ml-5 flex flex-col justify-between w-1/2">
										<div>
											<motion.a href={`/admin/products`}>
												<h3 className="text-gray-700">
													<p className="text-2xl font-semibold text-gray-900">
														{(product.name)}
													</p>
												</h3>
											</motion.a>

											<span className="mt-1 text-lg font-medium text-gray-900 block ">
												<span className="text-base font-light text-gray-500">
													Price:{" "}
												</span>
												<span className="text-sm">{`${product.currency}`}</span>
												{`${product.price} `}
											</span>

											<span className="mt-2 text-base font-normal text-gray-900 block ">
												<span className="text-base font-light text-gray-500">
													Available Quantity:{" "}
												</span>
												{product.availableQuantity > 0 ? (
													`${product.availableQuantity}`
												) : (
													<span className="text-red-500">Out of Stock</span>
												)}
											</span>

											<span className="text-base font-normal text-gray-900 block ">
												<span className="text-base font-light text-gray-500">
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
							))
						) : (
							<p>No products available.</p>
						)}
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
								className="text-sm font-semibold leading-6 text-black rounded-md px-2 py-1"
								whileHover={{
									scale: 1.1,
									boxShadow: "0px 4px 8px black",
									backgroundColor: "#f0f4f8",
									color: "#000000",
								}}
								transition={{ duration: 0.2, ease: "easeInOut" }}
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

export default AdminProductList;
