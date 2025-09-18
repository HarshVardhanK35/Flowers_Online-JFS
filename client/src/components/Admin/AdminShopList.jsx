/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import AdminNavbar from "../Common/AdminNavbar";

const AdminShopList = () => {
	const navigate = useNavigate();
	const [shops, setShops] = useState([]);
	const [isDeleting, setIsDeleting] = useState(false);
	const token = localStorage.getItem("token");
	const role = localStorage.getItem("role");

	const fetchShops = async () => {
		try {
			const response = await fetch("http://localhost:8080/api/shops", {
				method: "GET",
				headers: {
					Authorization: `Bearer ${token}`,
					"Content-Type": "application/json",
				},
			});
			if (!response.ok) {
				throw new Error("Error fetching shops");
			}
			const data = await response.json();
			setShops(data);
		} catch (error) {
			console.error("Error fetching shops:", error);
			alert("Failed to fetch shops. Please try again later.");
		}
	};

	useEffect(() => {
		fetchShops();
	}, []);

	const handleDelete = async (shopId) => {
		const confirmDelete = window.confirm(
			"Are you sure you want to delete this shop?"
		);
		if (confirmDelete) {
			setIsDeleting(true);
			try {
				const response = await fetch(
					`http://localhost:8080/api/shops/${shopId}`,
					{
						method: "DELETE",
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);
				if (response.ok) {
					setShops(shops.filter((shop) => shop.id !== shopId));
					alert("Shop deleted successfully");
				} else {
					alert("Error deleting shop");
				}
			} catch (error) {
				console.error("Error deleting shop:", error);
				alert("Error deleting shop. Please try again.");
			} finally {
				setIsDeleting(false);
			}
		}
	};

  console.log(shops)

	return (
		<div>
			<AdminNavbar />
			<div className="bg-white">
				<div className="mx-auto max-w-2xl px-4 py-4 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
					{shops.length > 0 ? (
						<h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
							Shops Available
						</h2>
					) : (
						<h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
							No Shops Available
						</h2>
					)}

					<div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-3">
						{shops.length > 0
							? shops.map((shop) => (
									<motion.div
										key={shop.id}
										className="group relative flex flex-row rounded-lg border border-gray-600 shadow-md p-2"
										initial={{ opacity: 0, y: 20 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{
											duration: 0.5,
											ease: "easeOut",
											delay: 0.05 * shop.id,
										}}
									>
										<div className="ml-2 flex flex-col justify-between">
											<div>
												<h3 className="text-gray-700">
													<p className="text-2xl font-semibold text-gray-900">
														{shop.name} {/* Ensure this is using 'name' */}
													</p>
												</h3>
												<span className="ml-2 mt-3 text-base font-normal block ">
													<span className="text-sm font-extralight text-gray-500">
														Address:{" "}
													</span>
												{shop.address}, {shop.city}
												</span>
												<span className="ml-2 mt-1 text-base font-normal block ">
													<span className="text-sm font-extralight text-gray-500">
														Contact:{" "}
													</span>
													{shop.phoneNumber} {/* Use phoneNumber */}
												</span>
											</div>

											<motion.div className="mt-3 space-x-12 flex justify-center">
												<motion.button
													className="cursor-pointer text-blue-500 hover:text-blue-600"
													onClick={() =>
														navigate(`/admin/edit-shop/${shop.id}`)
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
													onClick={() => handleDelete(shop.id)}
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
										</div>
									</motion.div>
							  ))
							: ""}
					</div>
					<div className="lg:flex items-center lg:justify-end space-x-2 mt-4">
						<motion.button
							onClick={() => navigate("/admin/add-shop")}
							className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
							transition={{ duration: 0.2 }}
						>
							{shops.length === 0 ? "Add Shops" : "Add More"}
						</motion.button>

						<motion.button
							onClick={() => navigate("/admin")}
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
					</div>
				</div>
			</div>
		</div>
	);
};

export default AdminShopList;
