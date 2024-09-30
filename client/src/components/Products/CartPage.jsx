/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const navigate = useNavigate()
  const [cartItems, setCartItems] = useState([]);
	const [cartTotal, setCartTotal] = useState(0);
  const token = localStorage.getItem("token");
	const userId = localStorage.getItem("userId");

	useEffect(() => {
		const fetchCartItems = async () => {
			try {
				const response = await fetch(`http://localhost:8080/api/cart/${userId}`, {
					headers: {
						Authorization: `Bearer ${localStorage.getItem("token")}`,
					},
				});

				if (!response.ok) {
					throw new Error(`Error: ${response.statusText}`);
				}

				const data = await response.json();
				setCartItems(data);
				const total = data.reduce(
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

	const handleRemoveFromCart = async (productId, size) => {
    if (!token) {
      alert("You must be logged in to perform this action.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/api/cart/${userId}/remove`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId, size }),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        console.error("Error removing item:", errorMessage);
        throw new Error(`Failed to remove item: ${response.statusText}`);
      }

      const removedItem = cartItems.find(
        (item) => item.product.id === productId && item.size === size
      );

      setCartItems((prevItems) =>
        prevItems.filter((item) => item.product.id !== productId || item.size !== size)
      );

      setCartTotal((prevTotal) => prevTotal - removedItem.product.price * removedItem.quantity);
      navigate('/cart')

    } catch (error) {
      console.error("Error during remove item from cart:", error);
      alert("Failed to remove item from cart.");
    }
  };

	return (
		<div className="container mx-auto p-4">
			<h2 className="text-2xl font-bold mb-4">Your Shopping Cart</h2>
			{cartItems.length === 0 ? (
				<p>Your cart is empty.</p>
			) : (
				<div>
					<ul>
						{cartItems.map((item, idx) => (
							<li key={idx} className="flex justify-between border-b py-4">
								<div>
									<h3 className="text-lg">{item.product.name}</h3>
									<p>Size: {item.size || "N/A"}</p>
									<p>Quantity: {item.quantity}</p>
								</div>
								<div>
									<p>
										{item.product.price} {item.product.currency}
									</p>
									<button
										onClick={() =>
											handleRemoveFromCart(item.product.id, item.size)
										}
										className="text-red-500"
									>
										Remove
									</button>
								</div>
							</li>
						))}
					</ul>
					<div className="mt-6">
						<h3 className="text-xl">Total: {cartTotal}</h3>
						<button className="bg-indigo-600 text-white px-4 py-2 mt-4">
							Proceed to Checkout
						</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default CartPage;
