/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const CartPage = () => {
	const navigate = useNavigate();
	const [cartItems, setCartItems] = useState([]);
	const [cartTotal, setCartTotal] = useState(0);
	const token = localStorage.getItem("token");
	const userId = localStorage.getItem("userId");

	useEffect(() => {
		const fetchCartItems = async () => {
			try {
				const response = await fetch(
					`http://localhost:8080/api/cart/${userId}`,
					{
						headers: {
							Authorization: `Bearer ${localStorage.getItem("token")}`,
						},
					}
				);

				if (!response.ok) {
					throw new Error(`Error: ${response.statusText}`);
				}

				const data = await response.json();

				// Fetch product details (including available quantity)
				const productIds = data.map((item) => item.product.id);
				const productResponse = await fetch(
					`http://localhost:8080/api/products?ids=${productIds.join(",")}`,
					{
						headers: {
							Authorization: `Bearer ${localStorage.getItem("token")}`,
						},
					}
				);

				const productData = await productResponse.json();

				// Merge product data with cart data
				const updatedCartItems = data.map((item) => {
					const productDetails = productData.find(
						(product) => product.id === item.product.id
					);
					return {
						...item,
						availableQuantity: productDetails
							? productDetails.availableQuantity
							: 0,
					};
				});

				setCartItems(updatedCartItems);

				// Calculate total
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
	}, [userId]);

	const handleQuantityChange = (productId, newQuantity) => {
		const updatedCartItems = cartItems.map((item) => {
			if (item.product.id === productId) {
				return { ...item, quantity: parseInt(newQuantity) };
			}
			return item;
		});

		setCartItems(updatedCartItems);

		// Recalculate total
		const total = updatedCartItems.reduce(
			(sum, item) => sum + item.product.price * item.quantity,
			0
		);
		setCartTotal(total);
	};

	const handleRemoveFromCart = async (productId, size) => {
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

	console.log(cartItems);

	return (
		<div className="container mx-auto p-4">
			<h2 className="text-2xl font-bold mb-4">Your Shopping Cart</h2>
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
				<div className="flex flex-col md:flex-row gap-8">
					<ul className="w-full md:w-3/4">
						{/* {cartItems.map((item, idx) => (
              <li key={idx} className="flex justify-between border-b py-4">
                <div className="flex items-center">
                  <img
                    src={item.product.imageUrl}
                    alt={item.product.name}
                    className="w-20 h-20 object-cover mr-4"
                  />
                  <div>
                    <h3 className="text-lg">{item.product.name}</h3>
                    <p>Size: {item.size || "N/A"}</p>
                    <select
                      value={item.quantity}
                      onChange={(e) => {
                        // Update quantity logic
                      }}
                      className="mt-2 border rounded px-2 py-1"
                    >
                      {[...Array(item.product.availableQuantity).keys()].map(
                        (qty) => (
                          <option key={qty + 1} value={qty + 1}>
                            {qty + 1}
                          </option>
                        )
                      )}
                    </select>
                    <p className="text-sm text-gray-500 mt-1">
                      Ships in 3–4 weeks
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <p className="mr-4">
                    {item.product.price} {item.product.currency}
                  </p>
                  <button
                    onClick={() =>
                      handleRemoveFromCart(item.product.id, item.size)
                    }
                    className="text-red-500 text-lg"
                  >
                    ×
                  </button>
                </div>
              </li>
            ))} */}
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
										<p>Price: ${item.product.price}</p>
									</div>
								</div>

								<div>
									<label
										htmlFor={`quantity-${item.product.id}`}
										className="mr-2"
									>
										Quantity:
									</label>
									<select
										id={`quantity-${item.product.id}`}
										value={item.quantity}
										onChange={(e) => {
											const selectedQuantity = Number(e.target.value);
											handleQuantityChange(
												item.product.id,
												selectedQuantity > item.availableQuantity
													? item.availableQuantity
													: selectedQuantity
											);
										}}
										className="border rounded-md p-1"
									>
										{[...Array(item.availableQuantity).keys()].map((i) => (
											<option key={i + 1} value={i + 1}>
												{i + 1}
											</option>
										))}
									</select>
								</div>

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
					<div className="w-full md:w-1/4 bg-gray-100 p-4 rounded-lg">
						<h3 className="text-lg font-bold">Order Summary</h3>
						<p className="text-gray-700">Total: ${cartTotal}</p>
						<button
							onClick={() => navigate("#")}
							className="mt-2 bg-blue-500 text-white rounded-md px-4 py-2"
						>
							Proceed to Checkout
						</button>
            <div className="mt-2">
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
            </div>
					</div>
				</div>
			)}
		</div>
	);
};

export default CartPage;
