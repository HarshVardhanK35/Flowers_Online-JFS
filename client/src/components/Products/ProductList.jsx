/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../Common/Navbar";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import AdminNavbar from "../Common/AdminNavbar";

const ProductList = () => {
	const { categoryName } = useParams(); // Get category from URL
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);

	const token = localStorage.getItem("token");
	const role = localStorage.getItem("role");

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const category = categoryName.toLowerCase(); // Make category case-insensitive
				const url =
					category === "all"
						? "http://localhost:8080/api/products"
						: `http://localhost:8080/api/products/category/${category}`;

				const response = await fetch(url);
				if (!response.ok) throw new Error("Error fetching products");

				const data = await response.json();
				console.log(data);
				setProducts(data);
			} catch (error) {
				console.error(error);
			} finally {
				setLoading(false);
			}
		};

		fetchProducts();
	}, [categoryName]); // Fetch products when the category changes

	if (loading) {
		return <div>Loading...</div>;
	}

	const formatProductName = (productName) => {
		let words = productName.trim().toLowerCase().split(" ");
		if (words.length > 1 && words[words.length - 2] !== "and") {
			words.splice(words.length - 1, 0, "and");
		}
		const formattedWords = words.map((word, index, array) => {
			if (
				index !== array.length - 2 &&
				index !== array.length - 1 &&
				!word.endsWith("s")
			) {
				word += "s";
			}
			return word.charAt(0).toUpperCase() + word.slice(1);
		});
		if (formattedWords.length > 3) {
			const lastTwoWords = formattedWords.splice(-2);
			return `${formattedWords.join(", ")} ${lastTwoWords.join(" ")} Bouquet`;
		}
		return formattedWords.join(" ") + " Bouquet";
	};

	return (
		<div>
			{role === "ROLE_ADMIN" ? <AdminNavbar /> : <Navbar />}
			<div className="bg-white">
				<div className="mx-auto max-w-2xl px-4 py-4 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
					<h2 className="text-2xl font-bold tracking-tight text-gray-900">
						{categoryName === "all"
							? "All Products"
							: `${categoryName.charAt(0).toUpperCase() + categoryName.slice(1)} Products`}
					</h2>

					<div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2">
						{products.length > 0 ? (
							products.map((product) => (
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
											<motion.a href={`/admin/add-product`}>
												<h3 className="text-gray-700">
													<p className="text-2xl font-semibold text-gray-900">
														{formatProductName(product.name)}
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

											<span className="-mt-1 text-lg font-medium text-gray-900 block ">
												<span className="text-base font-light text-gray-500">
													Available Quantity:{" "}
												</span>
												{product.availableQuantity > 0
													? `${product.availableQuantity}`
													: "Out of Stock"}
											</span>

											<span className="mt-3 text-base font-normal text-gray-900 block ">
												<span className="text-sm font-light text-gray-500">
													Category:{" "}
												</span>
												{product.category.charAt(0).toUpperCase() +
													product.category.slice(1)}
											</span>

											<span className="-mt-1 text-base font-normal text-gray-900 block ">
												<span className="text-sm font-light text-gray-500">
													Size:{" "}
												</span>
												{product.size.charAt(0).toUpperCase() +
													product.size.slice(1)}
											</span>

											<span className="mt-3 text-xs font-normal text-gray-900 block">
												{product.about === null ? "" : product.about}
											</span>
										</div>
									</div>
								</motion.div>
							))
						) : (
							<p>No products available in this category.</p>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProductList;
