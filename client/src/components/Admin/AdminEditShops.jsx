/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminNavbar from "../Common/AdminNavbar";

const AdminEditShop = () => {
	const { shopId } = useParams();
	const navigate = useNavigate();

	const [shop, setShop] = useState(null);
	const [name, setName] = useState("");
	const [address, setAddress] = useState("");
	const [city, setCity] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");

	const token = localStorage.getItem("token");
	const role = localStorage.getItem("role");

	// Redirect if not authorized
	if (!token || role !== "ROLE_ADMIN") {
		alert("Unauthorized access");
		navigate("/login");
	}

	// Fetch shop details when component mounts
	useEffect(() => {
		fetch(`http://localhost:8080/api/shops/${shopId}`, {
			headers: {
				Authorization: `Bearer ${localStorage.getItem("token")}`,
			},
		})
			.then((res) => {
				if (res.status === 401) {
					// alert("Unauthorized. Please login again.");
					// navigate("/login");
					return;
				}
				if (!res.ok) {
					if (res.status === 404) {
						alert("Shop not found");
						navigate("/admin/shops");
					}
					throw new Error("Failed to fetch shop details");
				}
				return res.json();
			})
			.then((data) => {
				setShop(data);
				setName(data.name);
				setAddress(data.address);
				setCity(data.city);
				setPhoneNumber(data.phoneNumber);
			})
			.catch((error) => {
				console.error(error);
			});
	}, [navigate, shopId]);

	const handleUpdate = (e) => {
		e.preventDefault();
		const updatedShopData = {
			name,
			address,
			city,
			phoneNumber,
		};

		fetch(`http://localhost:8080/api/shops/${shopId}`, {
			method: "PUT",
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify(updatedShopData),
		})
			.then((response) => {
				if (response.ok) {
					alert("Shop updated successfully!");
					navigate("/admin/shops");
				} else {
					console.log(response);
					alert("Failed to update shop");
				}
			})
			.catch((error) => {
				console.error(error.message);
				alert(error.message);
			});
	};

	console.log(shop);

	return shop ? (
		<div>
			<AdminNavbar />
			<div className="flex justify-center items-center mt-4">
				<form
					className="max-w-lg w-full p-6 bg-white shadow-lg rounded-lg"
					onSubmit={handleUpdate}
				>
					<h2 className="mt-0 text-center text-2xl font-bold leading-9 text-gray-900">
						{`Update "${shop.name}"`}
					</h2>

					<div className="space-y-4">
						<div>
							<label className="block text-sm font-medium text-gray-900">
								Shop Name
							</label>
							<input
								type="text"
								value={name}
								onChange={(e) => setName(e.target.value)}
								required
								className="form-control block w-full border-1 p-2 rounded-md"
							/>
						</div>

						<div>
							<label className="block text-sm font-medium text-gray-900">
								City
							</label>
							<input
								type="text"
								value={city}
								onChange={(e) => setCity(e.target.value)}
								required
								className="form-control block w-full border-1 p-2 rounded-md"
							/>
						</div>

						<div>
							<label className="block text-sm font-medium text-gray-900">
								Address
							</label>
							<textarea
								value={address}
								onChange={(e) => setAddress(e.target.value)}
								required
								className="form-control block w-full border-1 p-2 rounded-md"
							/>
						</div>

						<div>
							<label className="block text-sm font-medium text-gray-900">
								Phone Number
							</label>
							<input
								type="tel"
								value={phoneNumber}
								onChange={(e) => setPhoneNumber(e.target.value)}
								required
								className="form-control block w-full border-1 p-2 rounded-md"
							/>
						</div>

						<div className="mt-6 flex justify-end">
							<button
								type="button"
								onClick={() => navigate("/admin/shops")}
								className="text-sm font-semibold leading-6 text-gray-900"
							>
								Cancel
							</button>
							<button
								type="submit"
								className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 ml-3"
							>
								Update
							</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	) : (
		<p>Loading...</p>
	);
};

export default AdminEditShop;
