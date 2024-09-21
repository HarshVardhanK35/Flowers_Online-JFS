/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "../Common/AdminNavbar";

const AddProducts = () => {
	const [currency, setCurrency] = useState("$");
	const [productName, setProductName] = useState("");
	const [category, setCategory] = useState("");
	const [size, setSize] = useState(""); // New state for size
	const [price, setPrice] = useState("");
	const [file, setFile] = useState(null);
	const [filePreview, setFilePreview] = useState(null);

	const navigate = useNavigate();

	const handleCurrencyChange = (e) => {
		setCurrency(e.target.value);
	};

	const handleFileChange = (e) => {
		const selectedFile = e.target.files[0];
		setFile(selectedFile);
		if (selectedFile) {
			const fileUrl = URL.createObjectURL(selectedFile);
			setFilePreview(fileUrl);
		}
	};

	const handleCategoryChange = (e) => {
		setCategory(e.target.value);
	};

	const handleSizeChange = (e) => {
		setSize(e.target.value);
	};

	const handleAddProducts = async (e) => {
		e.preventDefault();

		const token = localStorage.getItem("token");
		const formData = new FormData();

		formData.append("name", productName);
		formData.append("category", category);
		formData.append("size", size);
		formData.append("price", price);
		formData.append("currency", currency);
		formData.append("photo", file);

		try {
			const response = await fetch("http://localhost:8080/api/products", {
				method: "POST",
				body: formData,
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})

			if (response.ok) {
				navigate("/products");
			} else {
				alert("Error saving product");
			}
		}
    catch (error) {
			console.error(error);
			alert("Error: " + error);
		}
	};

	return (
		<div>
			<AdminNavbar />
			<div className="flex justify-center items-center mt-3">
				<form
					className="max-w-3xl w-full p-16 bg-white shadow-lg rounded-lg"
					onSubmit={handleAddProducts}
				>
					<h2 className="-mt-11 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
						Add a new flower
					</h2>
					<div className="space-y-10">
						<div className="border-b border-gray-900/10 pb-3">
							<div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-4">
								<div className="sm:col-span-3">
									<label
										htmlFor="productName"
										className="pl-1 block text-sm font-medium leading-6 text-gray-900"
									>
										Enter Flower Name
									</label>
									<div className="mt-2">
										<input
											type="text"
											name="productName"
											id="productName"
											value={productName}
											onChange={(e) => setProductName(e.target.value)}
											autoComplete="productName"
											className="form-control pl-2 block w-full rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
											placeholder="Roses"
											required
										/>
									</div>
								</div>

								<div className="sm:col-span-2">
									<label
										htmlFor="size"
										className="pl-1 block text-sm font-medium leading-6 text-gray-900"
									>
										Select Size
									</label>
									<div className="mt-2">
										<select
											id="size"
											name="size"
											value={size}
											onChange={handleSizeChange}
											className="form-control pl-2 block w-full rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
											required
										>
											<option value="">Select a size</option>
											<option value="small">Small</option>
											<option value="large">Large</option>
										</select>
									</div>
								</div>

								<div className="sm:col-span-2">
									<label
										htmlFor="productPrice"
										className="pl-1 block text-sm font-medium leading-6 text-gray-900"
									>
										Price
									</label>
									<div className="relative mt-2 rounded-md shadow-sm">
										<div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
											<span className="text-gray-500 sm:text-sm">
												{currency === "₹" ? "₹" : "$"}
											</span>
										</div>
										<input
											id="productPrice"
											name="productPrice"
											type="text"
											value={price}
											onChange={(e) => setPrice(e.target.value)}
											placeholder="0.00"
											className="form-control block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
											required
										/>
										<div className="absolute inset-y-0 right-0 flex items-center">
											<label htmlFor="currency" className="sr-only">
												Currency
											</label>
											<select
												id="currency"
												name="currency"
												value={currency}
												onChange={handleCurrencyChange}
												className="form-control h-full rounded-md border-0 bg-transparent py-0 pl-2 pr-7 text-gray-500 sm:text-sm"
											>
												<option value="$">USD</option>
												<option value="₹">INR</option>
											</select>
										</div>
									</div>
								</div>

								<div className="sm:col-span-3">
									<label
										htmlFor="category"
										className="pl-1 block text-sm font-medium leading-6 text-gray-900"
									>
										Select Category
									</label>
									<div className="mt-2">
										<select
											id="category"
											name="category"
											value={category}
											onChange={handleCategoryChange}
											className="form-control pl-2 block w-full rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
											required
										>
											<option value="">Select a category</option>
											<option value="birthdays">Birthday</option>
											<option value="love">Love</option>
											<option value="marriages">Marriage</option>
											<option value="grand-openings">Grand Openings</option>
											<option value="sympathy">Sympathy</option>
										</select>
									</div>
								</div>

								<div className="col-span-3">
									<div className="mt-2 flex items-center">
										<label className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-1 hover:text-indigo-500">
											Upload an image for flower!{" "}
											<span aria-hidden="true">→</span>
											<input
												id="file-upload"
												name="file-upload"
												type="file"
												onChange={handleFileChange}
												className="sr-only"
												required
											/>
										</label>
										{filePreview && (
											<div className=" absolute relative -mt-5">
												<img
													src={filePreview}
													alt="Selected file preview"
													className="p-3 h-40 w-40 object-cover rounded-md"
												/>
											</div>
										)}
									</div>
								</div>
							</div>
						</div>
						<div className="mt-3 flex items-center justify-end gap-x-6">
							<button
								type="button"
								onClick={() => navigate("/admin")}
								className="text-sm font-semibold leading-6 text-gray-900"
							>
								Cancel
							</button>
							<button
								type="submit"
								className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
							>
								Save
							</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
};
export default AddProducts;