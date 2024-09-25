/* eslint-disable jsx-a11y/no-redundant-roles */
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import AdminNavbar from "../Common/AdminNavbar";
import Navbar from "../Common/Navbar";

const ProductDetails = () => {

  const { id } = useParams(); // change productId to id

	const [product, setProduct] = useState(null);
	const [error, setError] = useState(null);
	const [selectedSize, setSelectedSize] = useState("");
	const [selectedQuantity, setSelectedQuantity] = useState(1);
	const [token] = useState(localStorage.getItem("token"));
	const [role] = useState(localStorage.getItem("role"));

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
					throw new Error(`Error fetching product: ${response.statusText}`);
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
		if (value <= product.quantityAvailable && value <= 3) {
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

		if (!userId) {
			alert("User is not authenticated. Please log in.");
			return;
		}

		if (!selectedSize) {
			alert("Please select a size!");
			return;
		}

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
				const updatedCart = await response.json();
				setProduct(updatedCart);

				const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
				storedCart.push(cartItem);
				localStorage.setItem("cart", JSON.stringify(storedCart));

				alert(
					`Added ${selectedQuantity} product(s) of size ${selectedSize} to cart.`
				);
			} else {
				alert("Error adding product to cart");
			}
		} catch (error) {
			console.error("Error adding product to cart:", error);
		}
	};

	if (error) {
		return <div>Error fetching product: {error}</div>;
	}

	if (!product) {
		return <div>Loading...</div>;
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
						<img
							src={`http://localhost:8080${product.photo}`}
							alt={product.name}
							className="h-full w-full object-cover object-center"
						/>
					</div>
					<div className=" lg:col-span-2 lg:mt-0">
						<h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
							{product.name}
						</h1>
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
								<span className="text-lg font-normal">{`${product.currency}`}</span>
								{`${product.price}`}
							</span>
						</div>

						<div className="mt-3 flex items-center justify-content">
							<h3 className="text-sm font-medium text-gray-900">
								Select Quantity:
							</h3>
							<div className="px-2">
								<input
									type="number"
									value={selectedQuantity}
									onChange={handleQuantityChange}
									className="pl-8 block w-20 rounded-md border-1 text-gray-900 shadow-sm"
									min="1"
									max={Math.min(product.quantityAvailable, 3)}
									disabled={product.quantityAvailable === 0}
								/>
							</div>
						</div>
						<p className="text-sm text-gray-500">{`Available: ${product.quantityAvailable}`}</p>

						<div className="mt-3">
							<h3 className="text-sm font-medium text-gray-900">Select Size</h3>
							<div className="mt-1 grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-2">
								<button
									className={`cursor-pointer bg-white text-gray-900 shadow-sm group relative flex items-center justify-center rounded-md border px-4 py-3 text-sm font-medium uppercase ${
										product.size === "small"
											? ""
											: "opacity-50 cursor-not-allowed"
									}`}
									disabled={product.size !== "small"}
									onClick={() => handleSizeChange("small")}
								>
									Small
								</button>
								<button
									className={`cursor-pointer bg-white text-gray-900 shadow-sm group relative flex items-center justify-center rounded-md border px-4 py-3 text-sm font-medium uppercase ${
										product.size === "large"
											? ""
											: "opacity-50 cursor-not-allowed"
									}`}
									disabled={product.size !== "large"}
									onClick={() => handleSizeChange("large")}
								>
									Large
								</button>
							</div>
						</div>
						<button
							type="button"
							onClick={handleAddToCart}
							className="mt-3 w-full flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
							disabled={!selectedSize || product.quantityAvailable === 0}
						>
							{product.quantityAvailable > 0
								? `Add ${selectedQuantity} to cart`
								: "Out of Stock"}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
export default ProductDetails;
