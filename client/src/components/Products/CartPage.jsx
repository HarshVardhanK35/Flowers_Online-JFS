/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../Common/Navbar";

const CartPage = () => {
	const navigate = useNavigate();
	const [cartItems, setCartItems] = useState([]);
	const [cartTotal, setCartTotal] = useState(0);
	const token = localStorage.getItem("token");
	const userId = localStorage.getItem("userId");

	// console.log("Authorization Header:", `Bearer ${token}`);

	useEffect(() => {
		const fetchCartItems = async () => {
			try {
				const response = await fetch(
					`http://localhost:8080/api/cart/${userId}`,
					{
						headers: {
							Authorization: `Bearer ${token}`, // Use the token from localStorage
						},
					}
				);

				if (!response.ok) {
					throw new Error(`Error: ${response.statusText}`);
				}

				const data = await response.json();

				const productIds = data.map((item) => item.product.id);
				const productResponse = await fetch(
					`http://localhost:8080/api/products?ids=${productIds.join(",")}`,
					{
						headers: {
							Authorization: `Bearer ${token}`, // Use the token from localStorage
						},
					}
				);

				const productData = await productResponse.json();

				const updatedCartItems = data.map((item) => {
					const productDetails = productData.find(
						(product) => product.id === item.product.id
					);
					return {
						...item,
						availableQuantity: productDetails
							? productDetails.availableQuantity
							: 0,
						quantityChanged: false, // Track quantity change
					};
				});

				setCartItems(updatedCartItems);

				const total = updatedCartItems.reduce(
					(sum, item) => sum + item.product.price * item.quantity,
					0
				);
				setCartTotal(total);
			} catch (error) {
				console.error("Error fetching cart items:", error);
			}
		};

		if (userId) {
			fetchCartItems();
		}
	}, [userId, token]);

	const handleQuantityChange = (productId, newQuantity) => {
		const updatedCartItems = cartItems.map((item) => {
			if (item.product.id === productId) {
				return {
					...item,
					quantity: parseInt(newQuantity),
					quantityChanged: true,
				};
			}
			return item;
		});

		setCartItems(updatedCartItems);

		const total = updatedCartItems.reduce(
			(sum, item) => sum + item.product.price * item.quantity,
			0
		);
		setCartTotal(total);
	};

	const handleDecreaseQuantity = (productId, currentQuantity) => {
		if (currentQuantity > 1) {
			handleQuantityChange(productId, currentQuantity - 1);
		}
	};

	const handleIncreaseQuantity = (productId, currentQuantity) => {
		if (currentQuantity < 3) {
			handleQuantityChange(productId, currentQuantity + 1);
		}
	};

	const handleRemoveFromCart = async (productId, size) => {
		const confirmRemove = window.confirm(
			`Are you sure you want to remove all these items from this cart?`
		);
		if (!confirmRemove) {
			window.location.reload();
			return;
		}
		if (!token) {
			alert("You must be logged in to perform this action.");
			return;
		}
		try {
			const response = await fetch(
				`http://localhost:8080/api/cart/${userId}/remove`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
					body: JSON.stringify({ productId, size }),
				}
			);
			if (!response.ok) {
				const errorMessage = await response.text();
				console.error("Error removing item:", errorMessage);
				throw new Error(`Failed to remove item: ${response.statusText}`);
			}
			const removedItem = cartItems.find(
				(item) => item.product.id === productId && item.size === size
			);
			setCartItems((prevItems) =>
				prevItems.filter(
					(item) => item.product.id !== productId || item.size !== size
				)
			);
			setCartTotal(
				(prevTotal) =>
					prevTotal - removedItem.product.price * removedItem.quantity
			);
			navigate("/cart");
		} catch (error) {
			console.error("Error during remove item from cart:", error);
			alert("Failed to remove item from cart.");
		}
	};

	const handleSaveQuantity = async (productId, newQuantity) => {
		const confirmSave = window.confirm(
			"Are you sure you want to save the changes?"
		);
		if (confirmSave) {
			try {
				const response = await fetch(
					`http://localhost:8080/api/cart/${userId}/update`,
					{
						method: "POST",
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${token}`,
						},
						body: JSON.stringify({ productId, quantity: newQuantity }),
					}
				);
				if (!response.ok) {
					throw new Error(`Error: ${response.statusText}`);
				}
				const data = await response.json();
				window.location.reload();
			} catch (error) {
				console.error("Error updating cart:", error);
			}
		} else {
			alert("Save action cancelled.");
			window.location.reload();
		}
	};

	useEffect(() => {
		if (cartItems.length > 0) {
			cartItems.forEach((item) => {

        console.log(item)

        if (item.product && item.availableQuantity !== undefined) {
					// Use the initial available quantity when the cart item is first loaded
					const initialAvailableQuantity =
						item.initialAvailableQuantity || item.availableQuantity;
					const selectedQuantity = item.quantity;

					// Store the initial available quantity to prevent overwriting it when availableQuantity is updated
					item.initialAvailableQuantity = initialAvailableQuantity;

					const currentAvailableQuantity = item.availableQuantity; // Updated quantity in the DB

					// console.log(
					// 	"Selected Quantity: " + selectedQuantity,
					// 	"Current Available Quantity: " + currentAvailableQuantity,
					// 	"Initial Available Quantity: " + initialAvailableQuantity
					// );

					// Check if minimum quantity is selected
					const isMinQuantitySelected = selectedQuantity === 1;

					// Check if maximum quantity is selected (based on the initial available quantity)
					const isMaxQuantitySelected =
						selectedQuantity === initialAvailableQuantity;

					// console.log({
					// 	isMaxQuantitySelected,
					// 	isMinQuantitySelected,
					// });
				}
			});
		}
	}, [cartItems]);

	return (
		<>
			<Navbar />
			<div className="container mx-auto py-3 px-5">
				<h2 className="text-2xl font-bold mb-2">Your Shopping Cart</h2>
				{cartItems.length === 0 ? (
					<span>
						<p>
							Your cart is empty
							<motion.a
								href="/products/all"
								className="text-sm font-semibold leading-6 text-black rounded-md px-3 py-1"
								whileHover={{
									scale: 1.1,
									boxShadow: "0px 4px 8px rgba(38, 38, 38, 0.2)",
									backgroundColor: "#f0f4f8",
									color: "#000000",
								}}
								transition={{ duration: 0.2, ease: "easeInOut" }}
							>
								or Continue Shopping <span aria-hidden="true">→</span>
							</motion.a>
						</p>
					</span>
				) : (
					<div className="flex justify-center md:flex-row gap-8">
						<ul className="w-full md:w-3/4">
							{cartItems.map((item) => (
								<div
									key={item.product.id}
									className="flex justify-between border-b py-4"
								>
									<div className="flex items-center">
										<img
											src={item.product.photo}
											alt={item.product.name}
											className="w-20 h-20 object-cover mr-4"
										/>

										<div>
											<h3 className="text-lg font-bold">{item.product.name}</h3>
											<p>Size Selected: {item.product.size}</p>
											<p>Price: {item.product.price}</p>
										</div>
									</div>

									<div className="flex items-center">
										<button
											className="px-2 py-1 border rounded-l-md"
											onClick={() =>
												handleDecreaseQuantity(item.product.id, item.quantity)
											}
											disabled={item.quantity <= 1}
										>
											-
										</button>
										<input
											type="text"
											value={item.quantity}
											readOnly
											className="border-t border-b w-10 text-center"
										/>
										<button
											className="px-2 py-1 border rounded-r-md"
											onClick={() =>
												handleIncreaseQuantity(
													item.product.id,
													item.quantity,
													item.availableQuantity
												)
											}
											disabled={item.quantity >= 3}
										>
											+
										</button>
									</div>

									{/* Add Save Button for Quantity Update */}
									{item.quantityChanged && (
										<div>
											<button
												onClick={() =>
													handleSaveQuantity(item.product.id, item.quantity)
												}
												className="text-green-600"
											>
												Save
											</button>
										</div>
									)}

									<div>
										<button
											onClick={() =>
												handleRemoveFromCart(item.product.id, item.size)
											}
											className="text-red-600"
										>
											Remove
										</button>
									</div>
								</div>
							))}
						</ul>
					</div>
				)}
			</div>
			<div className="flex justify-center">
				<div className="w-full md:w-2/4 bg-gray-100 p-4 rounded-lg flex items justify-between">
					<div>
						<h3 className="text-lg font-bold">Order Summary</h3>
						<p className="text-gray-700">Total: ${cartTotal.toFixed(2)}</p>
						<button
							onClick={() => navigate("#")}
							className="mt-2 bg-blue-500 text-white rounded-md px-4 py-2"
						>
							Proceed to Checkout
						</button>
					</div>

					<div className="mt-2">
						<motion.button
							type="button"
							className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
							onClick={() => {
								navigate(-1);
							}}
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
							transition={{ duration: 0.2 }}
						>
							Back
						</motion.button>
						<motion.a
							href="/products/all"
							className="text-sm font-semibold leading-6 text-black rounded-md px-2 py-1"
							whileHover={{
								scale: 1.1,
								boxShadow: "0px 4px 8px rgba(38, 38, 38, 0.2)",
								backgroundColor: "#f0f4f8",
								color: "#000000",
							}}
							transition={{ duration: 0.2, ease: "easeInOut" }}
						>
							or Continue Shopping <span aria-hidden="true">→</span>
						</motion.a>
					</div>
				</div>
			</div>
		</>
	);
};

export default CartPage;
