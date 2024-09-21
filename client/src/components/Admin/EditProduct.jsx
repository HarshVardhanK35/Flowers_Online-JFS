/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import AdminNavbar from "../Common/AdminNavbar";

const EditProduct = () => {
	const { productId } = useParams();

	const navigate = useNavigate();

	const [product, setProduct] = useState(null);
	const [name, setName] = useState("");
	const [category, setCategory] = useState("");
	const [price, setPrice] = useState("");
	const [size, setSize] = useState("");
	const [file, setFile] = useState(null);

	const token = localStorage.getItem("token");

	useEffect(() => {
		fetch(`http://localhost:8080/api/products/${productId}`, {
			headers: {
				Authorization: `Bearer ${localStorage.getItem("token")}`,
			},
		})
			.then((res) => res.json())
			.then((data) => {
				setProduct(data);
				setName(data.name);
				setCategory(data.category);
				setPrice(data.price);
				setSize(data.size);
			});
	}, [productId]);

	const handleFileChange = (e) => {
		setFile(e.target.files[0]);
	};

	const handleUpdate = (e) => {
		e.preventDefault();
		const formData = new FormData();
		formData.append("name", name);
		formData.append("category", category);
		formData.append("price", price);
		formData.append("size", size);
		if (file) {
			formData.append("photo", file);
		}

		fetch(`http://localhost:8080/api/products/edit/${productId}`, {
			method: "PUT",
			headers: {
				Authorization: `Bearer ${localStorage.getItem("token")}`,
			},
			body: formData,
		})
			.then((response) => {
				if (response.ok) {
					navigate("/admin/products");
				} else {
					alert("Failed to update product");
				}
			})
			.catch((error) => alert(error.message));
	};

	return product ? (
		<div>
			<AdminNavbar />
			<form onSubmit={handleUpdate}>
				<label>Product Name</label>
				<input
					type="text"
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>
				{/* Other form fields: category, size, price */}
				<button type="submit">Update</button>
				<button onClick={() => navigate("/admin/products")}>Cancel</button>
			</form>
		</div>
	) : (
		<p>Loading...</p>
	);
};

export default EditProduct;
