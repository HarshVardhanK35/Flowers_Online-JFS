/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "../Common/AdminNavbar";
import { motion } from "framer-motion";

const AddProducts = () => {
	const [productName, setProductName] = useState("");
	const [size, setSize] = useState("");
	const [category, setCategory] = useState("");
	const [about, setAbout] = useState("");
	const [price, setPrice] = useState("");
	const [currency, setCurrency] = useState("₹");
	const [file, setFile] = useState(null);
	const [filePreview, setFilePreview] = useState(null);
	const [quantityAvailable, setQuantityAvailable] = useState(1);

	const navigate = useNavigate();

	const handleFileChange = (e) => {
		const selectedFile = e.target.files[0];
		setFile(selectedFile);

		if (selectedFile) {
			const fileUrl = URL.createObjectURL(selectedFile);
			setFilePreview(fileUrl);
		}
	};

	const handleRemoveImage = () => {
		// Clear the file and preview without refreshing the page
		setFile(null);
		setFilePreview(null);
	};

	const handleAddProducts = async (e) => {
		e.preventDefault();

		const token = localStorage.getItem("token");
		const formData = new FormData();

		formData.append("name", productName);
		formData.append("category", category);
		formData.append("size", size);
		formData.append("about", about);
		formData.append("price", price);
		formData.append("currency", currency);
		formData.append("photo", file);
		formData.append("quantityAvailable", quantityAvailable);

		try {
			const response = await fetch("http://localhost:8080/api/products", {
				method: "POST",
				body: formData,
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			if (response.ok) {
				navigate("/admin/products");
			} else {
				alert("Error saving product");
			}
		} catch (error) {
			console.error(error);
			alert("Error: " + error);
		}
	};

	return (
		<div>
			<AdminNavbar />
			<div className="flex justify-center items-center mt-2">
				<motion.form
					className="max-w-3xl w-full p-6 bg-white shadow-lg rounded-lg"
					onSubmit={handleAddProducts}
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, ease: "easeOut" }}
				>
					<motion.h2
						className="-mt-4 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900"
						initial={{ opacity: 0, scale: 0.9 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ duration: 0.3, delay: 0.2 }}
					>
						Add a new flower bouquet
					</motion.h2>

					<div className="space-y-1">
						<div className="border-b border-gray-900/10 pb-1">
							<div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-4">
								<div className="sm:col-span-2">

                  <label
										htmlFor="productName"
										className="pl-1 block text-sm font-medium leading-6 text-gray-900"
									>
										Enter bouquet Name
									</label>

									<div className="mt-1">
										<motion.input
											type="text"
											name="productName"
											value={productName}
											onChange={(e) => setProductName(e.target.value)}
											autoComplete="productName"
											maxLength={35}
											className="form-control pl-3 py-1.5 block w-full rounded-md border-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
											whileFocus={{
												scale: 1.02,
												boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.1)",
											}}
											transition={{ duration: 0.2 }}
											placeholder="Roses"
											required
										/>
									</div>
								</div>

								<div className="sm:col-span-2">
									<label
										htmlFor="category"
										className="pl-1 text-sm font-medium leading-6 text-gray-900"
									>
										Select Category
									</label>
									<div className="mt-1">
										<motion.select
											name="category"
											value={category}
											onChange={(e) => {
												setCategory(e.target.value);
											}}
											className="pl-3 py-2 block w-full rounded-md border-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
											whileFocus={{
												scale: 1.02,
												boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.1)",
											}}
											transition={{ duration: 0.2 }}
											required
										>
											<option value="">Select a category</option>
											<option value="birthdays">Birthday</option>
											<option value="love">Love</option>
											<option value="marriages">Marriage</option>
											<option value="grand-openings">Grand Openings</option>
											<option value="sympathy">Sympathy</option>
										</motion.select>
									</div>
								</div>

								<div className="sm:col-span-2">
									<label
										htmlFor="size"
										className="pl-1 text-sm font-medium leading-6 text-gray-900"
									>
										Select Size
									</label>
									<div className="mt-1">
										<motion.select
											id="size"
											name="size"
											value={size}
											onChange={(e) => {
												setSize(e.target.value);
											}}
											className="block w-full rounded-md border-1 pl-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
											whileFocus={{
												scale: 1.02,
												boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.1)",
											}}
											transition={{ duration: 0.2 }}
											required
										>
											<option value="">Select a size</option>
											<option value="small">Small</option>
											<option value="large">Large</option>
										</motion.select>
									</div>
								</div>

								<div className="sm:col-span-1">
									<label
										htmlFor="productPrice"
										className="pl-1 text-sm font-medium leading-6 text-gray-900"
									>
										Price
									</label>
									<div className="relative mt-1 rounded-md shadow-sm">
										<div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2">
											<span className="text-gray-500 sm:text-sm">₹</span>
										</div>
										<motion.input
											id="productPrice"
											name="productPrice"
											type="text"
											value={price}
											onChange={(e) => setPrice(e.target.value)}
											placeholder="0.00"
											className="form-control block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
											whileFocus={{
												scale: 1.02,
												boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.1)",
											}}
											transition={{ duration: 0.2 }}
											required
										/>
										<div className="absolute inset-y-0 right-0">
											<select
												id="currency"
												name="currency"
												value={currency}
												onChange={(e) => {
													setCurrency(e.target.value);
												}}
												className="block h-full rounded-md border-0 bg-transparent py-1.5 pl-2 pr-2 text-gray-500 sm:text-sm"
											>
												<option value="₹">INR</option>
											</select>
										</div>
									</div>
								</div>

								<div className="sm:col-span-1">
									<label
										htmlFor="quantityAvailable"
										className="pl-1 text-sm font-medium leading-6 text-gray-900"
									>
										Available Quantity
									</label>
									<div className="mt-1">
										<motion.input
											type="number"
											name="quantityAvailable"
											value={quantityAvailable}
											onChange={(e) => setQuantityAvailable(e.target.value)}
											className="pl-3 py-1 block w-full rounded-md border-1 text-gray-900 shadow-sm"
											min="1"
											max="3"
											required
										/>
									</div>
								</div>

								<div className="col-span-full">
									<label
										htmlFor="about"
										className="pl-1 text-sm font-medium leading-6 text-gray-900"
									>
										About
									</label>
									<div className="mt-1">
										<motion.textarea
											id="about"
											name="about"
											rows={4}
											onChange={(e) => {
												setAbout(e.target.value);
											}}
											whileFocus={{
												scale: 1.02,
												boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.1)",
											}}
											transition={{ duration: 0.2 }}
											placeholder="About flower bouquet."
											className="form-control pl-2 block w-full rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
											required
										/>
									</div>
								</div>

								{/* Image Upload with Remove Button */}
								<div className="-mt-2 col-span-3">
									<div className="flex items-center">
										<label className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-1 hover:text-indigo-500">
											Upload an image! <span aria-hidden="true">→</span>
											<input
												id="file-upload"
												name="file-upload"
												type="file"
												onChange={handleFileChange}
												className="sr-only"
											/>
										</label>

										{filePreview && (
											<motion.div
												className="relative p-2"
												initial={{ opacity: 0 }}
												animate={{ opacity: 1 }}
												transition={{ duration: 0.3 }}
											>
												<motion.img
													src={filePreview}
													alt="Selected file preview"
													className="h-40 w-40 object-cover rounded-md"
												/>
												{/* "X" Button to Remove Image */}
												<motion.button
													className="absolute top-0 right-0 text-red-600 bg-white rounded-full px-2 py-0.5 hover:bg-gray-200"
													onClick={handleRemoveImage}
													whileHover={{ scale: 1.2 }}
													whileTap={{ scale: 0.95 }}
												>
													X
												</motion.button>
											</motion.div>
										)}
									</div>

									{file && (
										<div className="-mt-1 text-sm text-gray-600">
											{file.name}
										</div>
									)}
								</div>
							</div>
						</div>

						<div className="mt-2 flex items-center justify-end gap-x-6">
							<motion.button
								type="button"
								onClick={() => navigate(-1)}
								className="text-sm font-semibold leading-6 text-gray-900"
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
								transition={{ duration: 0.2 }}
							>
								Cancel
							</motion.button>
							<motion.button
								type="submit"
								className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
								transition={{ duration: 0.2 }}
							>
								Save
							</motion.button>
						</div>
					</div>
				</motion.form>
			</div>
		</div>
	);
};

export default AddProducts;
