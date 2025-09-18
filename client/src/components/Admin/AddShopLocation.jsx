import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion"; // Import motion
import AdminNavbar from "../Common/AdminNavbar";

export default function AddShopLocation() {
	const [shopName, setShopName] = useState("");
	const [city, setCity] = useState("");
	const [address, setAddress] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");
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
			name: shopName, // Change from shopName to name
			city,
			address,
			phoneNumber, // Add this if you want to handle phone numbers
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
				navigate("/admin/shops");
			} else {
				alert("Failed to add shop");
			}
		} catch (error) {
			console.error("Error adding shop:", error);
		}
	};

	return (
		<div>
			<AdminNavbar />
			<div className="flex justify-center items-center py-4">
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
						Add A Shop
					</motion.h2>

					<div className="mb-4">
						<label className="pl-1 text-sm font-medium leading-6 text-gray-900">
							Shop Name
						</label>
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
						<label className="pl-1 text-sm font-medium leading-6 text-gray-900">
							Select City
						</label>
						<motion.select
							value={city}
							onChange={(e) => setCity(e.target.value)}
							required
							className="block w-full rounded-md border-1 pl-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
							whileFocus={{
								scale: 1.02,
								boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.1)",
							}}
							transition={{ duration: 0.2 }}
						>
							<option value="">Select City</option>
							<option value="Vizag">Vizag</option>
							<option value="Pune">Pune</option>
							<option value="Hyderabad">Hyderabad</option>
							<option value="Mumbai">Mumbai</option>
							<option value="Chennai">Chennai</option>
							<option value="Kolkata">Kolkata</option>
							<option value="Bangalore">Bangalore</option>
							<option value="Greater-Noida">Greater-Noida</option>
							<option value="Kochin">Kochin</option>
							<option value="Ahmedabad">Ahmedabad</option>
							<option value="Haryana">Haryana</option>
							<option value="Goa">Goa</option>
						</motion.select>
					</div>

					<div className="mb-4">
						<label className="pl-1 text-sm font-medium leading-6 text-gray-900">
							Address
						</label>
						<textarea
							value={address}
							onChange={(e) => setAddress(e.target.value)}
							required
							className="form-control block w-full border-1 p-2 rounded-md"
						></textarea>
					</div>

					<div className="mb-4">
						<label className="pl-1 text-sm font-medium leading-6 text-gray-900">
							Phone Number
						</label>
						<input
							type="tel"
							pattern="[6789][0-9]{9}"
							value={phoneNumber}
							onChange={(e) => setPhoneNumber(e.target.value)}
							required
							className="form-control block w-full border-1 p-2 rounded-md"
						/>
					</div>

					<div className="mt-2 flex items-center justify-end gap-x-6">
						<motion.button
							type="button"
							onClick={() => navigate("/admin")}
							className="text-sm font-semibold leading-6 text-gray-900"
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
							transition={{ duration: 0.2 }}
						>
							Cancel
						</motion.button>
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
		</div>
	);
}
