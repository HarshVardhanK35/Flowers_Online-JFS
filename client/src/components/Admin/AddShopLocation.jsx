import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion"; // Import motion

export default function AddShopLocation() {
	const [shopName, setShopName] = useState("");
	const [city, setCity] = useState("");
	const [address, setAddress] = useState("");
	const [shopType, setShopType] = useState(""); // Change state to handle radio buttons
	const token = localStorage.getItem("token");
	const role = localStorage.getItem("role"); // Check the role of the logged-in user
	const navigate = useNavigate();

	useEffect(() => {
		if (role !== "ROLE_ADMIN") {
			alert("Unauthorized: Only admins can add shop locations.");
			navigate("/");
		}
	}, [role, navigate]);

	const handleAddShop = async (e) => {
		e.preventDefault();
		const shopData = {
			shopName,
			city,
			address,
			isAdminShop: shopType === "admin",
			isNormalShop: shopType === "normal",
		};
		try {
			const response = await fetch("http://localhost:8080/api/shops", {
				method: "POST",
				headers: {
					Authorization: `Bearer ${token}`,
					"Content-Type": "application/json",
				},
				body: JSON.stringify(shopData),
			});

			if (response.ok) {
				alert("Shop added successfully!");
				navigate("/admin");
			} else {
				alert("Failed to add shop");
			}
		} catch (error) {
			console.error("Error adding shop:", error);
		}
	};

	return (
		<div className="flex justify-center items-center min-h-screen">
			<motion.form
				className="max-w-lg w-full p-6 bg-white shadow-lg rounded-lg"
				onSubmit={handleAddShop}
				initial={{ opacity: 0, y: 20 }} // Initial state: slightly off-screen and transparent
				animate={{ opacity: 1, y: 0 }} // Animate to: fully visible and in its normal position
				transition={{ duration: 0.5, ease: "easeOut" }}
			>
				<motion.h2
					className="text-2xl font-bold mb-4"
					initial={{ opacity: 0, scale: 0.9 }} // Initial state: slightly smaller and transparent
					animate={{ opacity: 1, scale: 1 }} // Animate to: fully visible and normal size
					transition={{ duration: 0.3, delay: 0.2 }} // Slight delay for a smoother effect
				>
					Add Shop Location
				</motion.h2>

				<div className="mb-4">
					<label className="block text-sm font-medium">Shop Name</label>
					<input
						type="text"
						value={shopName}
						onChange={(e) => setShopName(e.target.value)}
						required
						className="form-control block w-full border-1 p-2 rounded-md"
						whileFocus={{
							scale: 1.02,
							boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.1)",
						}} // Subtle zoom and shadow on focus
						transition={{ duration: 0.2 }}
					/>
				</div>

				<div className="mb-4">
					<label className="block text-sm font-medium">City</label>
					<select
						value={city}
						onChange={(e) => setCity(e.target.value)}
						required
						className="form-control block w-full border-1 p-2 rounded-md"
					>
						<option value="">Select City</option>
						<option>Vizag</option>
						<option>Pune</option>
						<option>Hyderabad</option>
						<option>Mumbai</option>
						<option>Chennai</option>
						<option>Kolkata</option>
						<option>Bangalore</option>
						<option>Greater-Noida</option>
						<option>Kochin</option>
						<option>Ahmedabad</option>
						<option>Haryana</option>
						<option>Goa</option>
					</select>
				</div>

				<div className="mb-4">
					<label className="block text-sm font-medium">Address</label>
					<textarea
						value={address}
						onChange={(e) => setAddress(e.target.value)}
						required
						className="form-control block w-full border-1 p-2 rounded-md"
					></textarea>
				</div>

				<div className="mb-4">
					<label className="block text-sm font-medium">Shop Type</label>
					<div className="flex space-x-4">
						<label>
							<input
								type="radio"
								value="admin"
								checked={shopType === "admin"}
								onChange={() => setShopType("admin")}
							/>
							Admin Shop Address
						</label>
						<label>
							<input
								type="radio"
								value="normal"
								checked={shopType === "normal"}
								onChange={() => setShopType("normal")}
							/>
							Normal Shop Address
						</label>
					</div>
				</div>

				<div className="mt-6 flex justify-end">
					<motion.button
						type="submit"
						className="rounded-md bg-indigo-600 px-4 py-2 text-white font-semibold hover:bg-indigo-500"
						whileHover={{ scale: 1.05 }} // Scale up slightly on hover
						whileTap={{ scale: 0.95 }} // Scale down slightly on tap
						transition={{ duration: 0.2 }}
					>
						Add Shop
					</motion.button>
				</div>
			</motion.form>
		</div>
	);
}
