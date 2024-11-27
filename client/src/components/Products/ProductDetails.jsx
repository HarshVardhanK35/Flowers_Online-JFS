/* eslint-disable jsx-a11y/no-redundant-roles */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminNavbar from "../Common/AdminNavbar";
import Navbar from "../Common/Navbar";
import { motion, AnimatePresence } from "framer-motion";

const ProductDetails = () => {
	const navigate = useNavigate();
	const { id } = useParams();

	const [product, setProduct] = useState(null);
	const [error, setError] = useState(null);
	const [selectedSize, setSelectedSize] = useState("");
	const [selectedQuantity, setSelectedQuantity] = useState(1);
	const [token] = useState(localStorage.getItem("token"));
	const [role] = useState(localStorage.getItem("role"));

	const checkServiceAvailability = async () => {
		const userCity = localStorage.getItem("userCity");
		try {
			const response = await fetch(
				`http://localhost:8080/api/shops/city/${userCity}`
			);
			const data = await response.json();
			return data.length > 0; // Returns true if shops are available, false otherwise
		} catch (error) {
			console.error("Error checking service availability:", error);
			return false;
		}
	};

	useEffect(() => {
		const fetchProduct = async () => {
			try {
				const response = await fetch(
					`http://localhost:8080/api/products/${id}`,
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);

				if (!response.ok) {
					const errorResponse = await response.text();
					console.error(
						`Error fetching product: ${response.status} - ${errorResponse}`
					);
					throw new Error(`Error fetching product: ${response.status}`);
				}

				const data = await response.json();
				setProduct(data);
			} catch (err) {
				setError(err.message);
			}
		};

		fetchProduct();
	}, [id, token]);

	const handleQuantityChange = (e) => {
		const value = parseInt(e.target.value);
		if (value <= product.availableQuantity) {
			setSelectedQuantity(value);
		}
	};

	const handleSizeChange = (size) => {
		if (size === "small" || size === "large") {
			setSelectedSize(size);
		}
	};

	const handleAddToCart = async () => {
		const userId = localStorage.getItem("userId");
		console.log("Selected Size at Add to Cart:", selectedSize);

		// Check if user is authenticated
		if (!userId) {
			alert("User is not authenticated. Please log in.");
			return;
		}

		// Check if size is selected
		if (!selectedSize) {
			alert("Please select a size before adding the product to the cart!");
			return;
		}

		// **Check if service is available at the user's location**
		const isServiceAvailable = await checkServiceAvailability();
		if (!isServiceAvailable) {
			alert("Service is not available at your location.");
			return; // Stop if no service is available
		}

		// Proceed with adding the product to the cart
		const cartItem = {
			productId: product.id,
			size: selectedSize,
			quantity: selectedQuantity,
		};

		try {
			const response = await fetch(
				`http://localhost:8080/api/cart/${userId}/add`,
				{
					method: "POST",
					headers: {
						Authorization: `Bearer ${localStorage.getItem("token")}`,
						"Content-Type": "application/json",
					},
					body: JSON.stringify(cartItem),
				}
			);

			if (response.ok) {
				alert(
					`Added ${selectedQuantity} product(s) of size ${selectedSize} to cart.`
				);
				navigate("/cart");
			} else {
				alert("Error adding product to cart");
			}
		} catch (error) {
			console.error("Error adding product to cart:", error);
		}
	};

	if (error) {
		return <div className="text-red-500">Error fetching product: {error}</div>;
	}

	if (!product) {
		return <div>Loading product details...</div>;
	}

	const productDetails = {
		description:
			"Express your sentiments with our exquisite flower bouquets. Whether you're celebrating a birthday, expressing love and affection, commemorating a wedding, offering condolences, or marking a grand opening, our blooms speak volumes. Each bouquet is a unique arrangement of fresh, vibrant flowers, carefully selected to convey your message.",
		highlights: [
			"covers a broad spectrum of occasions, making it suitable for most bouquets.",
			"focuses on expressing sentiments, appealing to customers desire to connect with others.",
			"emphasizes the freshness and careful selection of flowers, highlighting the artistry involved.",
		],
	};

	return (
		<div className="bg-white">
			{role === "ROLE_ADMIN" ? <AdminNavbar /> : <Navbar />}
			<div className="pt-6">
				<div className="mx-auto max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
					<div className="aspect-h-4 aspect-w-3 overflow-hidden rounded-lg lg:block">
						<motion.img
							src={`http://localhost:8080${product.photo}`}
							alt={product.name}
							className="h-full w-full object-cover object-center"
							whileHover={{ scale: 1.1 }}
							transition={{ duration: 0.3, ease: "easeInOut" }}
						/>
					</div>

					<div className=" lg:col-span-2 lg:mt-0">
						<motion.h1
							className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl"
							initial={{ opacity: 0, y: -10 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, ease: "easeOut" }}
						>
							{product.name}
						</motion.h1>

						<div className="mt-3">
							<h3 className="sr-only">Description</h3>
							<div>
								<p className="text-base text-gray-600">
									{productDetails.description}
								</p>
							</div>
						</div>

						<div className="mt-3">
							<h3 className="text-sm font-medium text-gray-900">Highlights</h3>
							<div className="mt-1">
								<ul role="list" className="list-disc space-y-1 pl-5 text-sm">
									{productDetails.highlights.map((highlight) => (
										<li key={highlight} className="text-gray-400">
											<span className="text-gray-600">{highlight}</span>
										</li>
									))}
								</ul>
							</div>
						</div>

						<div className="mt-3">
							<h3 className="text-sm font-medium text-gray-900">Details</h3>
							<div className="mt-1 space-y-1">
								<p className="text-sm text-gray-600 mt-1">
									{"- "}
									{product.about}
								</p>
							</div>
						</div>
						<div className="text-2xl tracking-tight font-bold text-gray-900 mt-4 flex items-center justify-between sm:text-3xl">
							<span>
								<span className="text-lg font-normal">{product.currency}</span>
								{product.price}
							</span>
						</div>

						<div className="mt-3 flex items-center">
							<h3 className="text-sm font-medium text-gray-900">
								{role === "ROLE_ADMIN"
									? "Available in Quantity "
									: "Select Quantity "}
							</h3>
							<div className="px-2">
								{product.availableQuantity === 0 ? (
									<h2>0</h2>
								) : (
									<input
										type="number"
										max={product.availableQuantity || 0}
										value={selectedQuantity}
										onChange={handleQuantityChange}
										className="pl-8 block w-20 rounded-md border-1 text-gray-900 shadow-sm"
										min="0"
										disabled={product.availableQuantity === 0}
									/>
								)}
							</div>
						</div>
						<p className="text-sm font-light text-gray-500">
							available in quantity: {`${product.availableQuantity}`}
						</p>

						<div className="mt-3">
							<h3 className="text-sm font-medium text-gray-900">
								{role === "ROLE_ADMIN" ? "Available in sizes" : "Select Size"}
							</h3>

							<div className="mt-1 grid grid-cols-2 gap-4">
								{["small", "large"].map((size) => (
									<motion.button
										key={size}
										className={`cursor-pointer text-gray-900 shadow-sm group relative flex items-center justify-center rounded-md border px-4 py-3 text-sm font-medium uppercase
                      ${
												product.size.includes(size)
													? selectedSize === size
														? "bg-gray-300 text-black hover:bg-gray-300"
														: "bg-white hover:bg-gray-100"
													: "opacity-50 cursor-not-allowed"
											}`}
										disabled={!product.size.includes(size)}
										onClick={() => handleSizeChange(size)}
										whileHover={{
											scale: product.size.includes(size) ? 1.05 : 1,
										}}
										transition={{ duration: 0.2 }}
									>
										{size.charAt(0).toUpperCase() + size.slice(1)}
									</motion.button>
								))}
							</div>
						</div>

						<p className="text-sm font-light text-gray-500">
							This product belongs to the category: "
							<span className="text-sm font-medium text-gray-900">
								{`${
									product.category
										? product.category.charAt(0).toUpperCase() +
										  product.category.slice(1)
										: "Unknown"
								}`}
							</span>
							"
						</p>

						{role === "ROLE_ADMIN" ? (
							<div className="mt-3 flex justify-between space-x-4">
								<motion.a
									href="/admin/products"
									className="rounded-md bg-indigo-600 px-5 py-3.5 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.95 }}
								>
									Admin cannot add products into cart
								</motion.a>
							</div>
						) : (
							<div className="mt-4 flex space-x-4">
								<motion.button
									type="button"
									onClick={handleAddToCart}
									className="w-1/2 flex items-center justify-center rounded-md bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700"
									disabled={!selectedSize || product.availableQuantity === 0}
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.95 }}
									transition={{ duration: 0.2 }}
								>
									{product.availableQuantity > 0
										? `Add ${selectedQuantity} to cart`
										: "Out of Stock"}
								</motion.button>
								<motion.button
									type="button"
									onClick={() => navigate(-1)}
									className="w-1/2 flex items-center justify-center rounded-md bg-gray-600 px-8 py-3 text-base font-medium text-white hover:bg-gray-700"
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.95 }}
									transition={{ duration: 0.2 }}
								>
									Cancel
								</motion.button>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProductDetails;
