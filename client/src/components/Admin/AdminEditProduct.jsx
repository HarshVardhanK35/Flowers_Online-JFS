/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import AdminNavbar from "../Common/AdminNavbar";

const AdminEditProduct = () => {
	const { productId } = useParams();

	const navigate = useNavigate();

	const [product, setProduct] = useState(null);
	const [name, setName] = useState("");
	const [category, setCategory] = useState("");
	const [about, setAbout] = useState("");
	const [price, setPrice] = useState("");
	const [currency, setCurrency] = useState("$");
	const [size, setSize] = useState("");
	const [file, setFile] = useState(null);
	const [filePreview, setFilePreview] = useState(null);
	const [quantityAvailable, setQuantityAvailable] = useState(1);

	const token = localStorage.getItem("token");
	const role = localStorage.getItem("role");

	if (!token || role !== "ROLE_ADMIN") {
		alert("Unauthorized access");
		navigate("/login");
	}

	useEffect(() => {
		fetch(`http://localhost:8080/api/products/${productId}`, {
			headers: {
				Authorization: `Bearer ${localStorage.getItem("token")}`,
			},
		})
			.then((res) => {
				if (!res.ok) {
					if (res.status === 404) {
						alert("Product not found");
						navigate("/products");
					}
					throw new Error("Failed to fetch product details");
				}
				return res.json();
			})
			.then((data) => {
				// console.log(data);

				setProduct(data);
				setName(data.name);
				setCategory(data.category);
				setAbout(data.about);
				setPrice(data.price);
				setCurrency(data.currency);
				setSize(data.size);
				setQuantityAvailable(data.quantityAvailable);
				setFilePreview(`http://localhost:8080${data.photo}`);
			})
			.catch((error) => {
				console.error(error);
			});
	}, [navigate, productId]);

	const handleFileChange = (e) => {
		const selectedFile = e.target.files[0];
		setFile(selectedFile);

		if (selectedFile) {
			const fileUrl = URL.createObjectURL(selectedFile);
			setFilePreview(fileUrl);
		}
	};

	const handleUpdate = (e) => {
		e.preventDefault();
		const formData = new FormData();

		formData.append("name", name);
		formData.append("category", category);
		formData.append("about", about);
		formData.append("price", price);
		formData.append("size", size);
		formData.append("currency", currency);
		formData.append("quantityAvailable", quantityAvailable);
		if (file) {
			formData.append("photo", file);
		}

		fetch(`http://localhost:8080/api/products/edit/${productId}`, {
			method: "PUT",
			headers: {
				Authorization: `Bearer ${token}`,
				Accept: "application/json",
			},
			body: formData,
		})
			.then((response) => {
				if (response.ok) {
					// console.log(response);
					navigate("/admin/products");
				} else {
					console.log(response);
					alert("Failed to update product");
				}
			})
			.catch((error) => {
				// console.log(error.message);
				alert(error.message);
			});
	};

	return product ? (
		<div>
			<AdminNavbar />
			<div className="flex justify-center items-center mt-4">
				<form
					className="max-w-3xl w-full p-6 bg-white shadow-lg rounded-lg"
					onSubmit={handleUpdate}
				>
					<h2 className="mt-0 text-center text-2xl font-bold leading-9 text-gray-900">
						{`Update "${product.name}"`}
					</h2>

					<div className="space-y-10">
						<div className="border-b border-gray-900/10 pb-4">
							<div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-4">
								<div className="sm:col-span-2">
									<label className="pl-1 block text-sm font-medium leading-6 text-gray-900">
										Product Name
									</label>
									<div className="mt-1">
										<input
											type="text"
											value={name}
											maxLength={35}
											className="form-control pl-3 py-1.5 block w-full rounded-md border-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
											onChange={(e) => setName(e.target.value)}
										/>
									</div>
								</div>

								<div className="sm:col-span-2">
									<label className="pl-1 text-sm font-medium leading-6 text-gray-900">
										Select Category
									</label>
									<div className="mt-1">
										<select
											id="category"
											value={category}
											onChange={(e) => {
												setCategory(e.target.value);
											}}
											className="pl-3 py-2 block w-full rounded-md border-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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

								<div className="sm:col-span-2">
									<label className="pl-1 text-sm font-medium leading-6 text-gray-900">
										Select Size
									</label>
									<div className="mt-1">
										<select
											id="size"
											value={size}
											onChange={(e) => {
												setSize(e.target.value);
											}}
											className="block w-full rounded-md border-1 pl-3 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
											required
										>
											<option value="">Select a size</option>
											<option value="small">Small</option>
											<option value="large">Large</option>
										</select>
									</div>
								</div>

								<div className="sm:col-span-1">
									<label className="pl-1 text-sm font-medium leading-6 text-gray-900">
										Price
									</label>
									<div className="relative mt-1 rounded-md shadow-sm">
										<div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2">
											<span className="text-gray-500 sm:text-sm">
												{currency === "₹" ? "₹" : "$"}
											</span>
										</div>
										<input
											id="productPrice"
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
												value={currency}
												onChange={(e) => setCurrency(e.target.value)}
												className="block h-full rounded-md border-0 bg-transparent py-0 pl-2 pr-2 text-gray-500 sm:text-sm"
											>
												<option value="$">USD</option>
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
										<input
											type="number"
											id="quantityAvailable"
											name="quantityAvailable"
											value={quantityAvailable ?? ""} // Ensure a fallback value
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
										About the bouquet
									</label>
									<div className="mt-1">
										<textarea
											id="about"
											name="about"
											rows={4}
											value={about}
											onChange={(e) => setAbout(e.target.value)}
											className="form-control pl-2 block w-full rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
										/>
									</div>
								</div>

								<div className="col-span-3">
									<div className="mt-2 flex items-center">
										<label className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-1 hover:text-indigo-500">
											Upload an image for the product!
											<span aria-hidden="true"> →</span>
											<input
												type="file"
												onChange={handleFileChange}
												className="sr-only"
											/>
										</label>
										{filePreview && (
											<div className="ml-4">
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
					</div>
					<div className="mt-3 flex items-center justify-end gap-x-4">
						<button
							type="button"
							className="text-sm font-semibold leading-6 text-gray-900"
							onClick={() => navigate("/products")}
						>
							Cancel
						</button>
						<button
							type="submit"
							className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
						>
							Update
						</button>
					</div>
				</form>
			</div>
		</div>
	) : (
		<p>Loading...</p>
	);
};
export default AdminEditProduct;
