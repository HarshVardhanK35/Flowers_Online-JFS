/* eslint-disable jsx-a11y/no-redundant-roles */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import AdminNavbar from "../Common/AdminNavbar";
import Navbar from "../Common/Navbar";

const ProductDetails = () => {
	const { productId } = useParams();
	const [product, setProduct] = useState(null); // Initialize as null
	const [error, setError] = useState(null);
	const [token] = useState(localStorage.getItem("token"));
	const [role] = useState(localStorage.getItem("role"));

	useEffect(() => {
		const fetchProduct = async () => {
			try {
				const response = await fetch(
					`http://localhost:8080/api/products/${productId}`,
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);
				if (!response.ok) {
					throw new Error(`Error fetching product: ${response.statusText}`);
				}
				const data = await response.json();
				setProduct(data);
			} catch (err) {
				setError(err.message);
			}
		};

		fetchProduct();
	}, [productId, token]);

	if (error) {
		return <div>Error fetching product: {error}</div>;
	}

	if (!product) {
		return <div>Loading...</div>;
	}

	const productDetails = {
		description:
			"Express your sentiments with our exquisite flower bouquets. Whether you're celebrating a birthday, expressing love and affection, commemorating a wedding, offering condolences, or marking a grand opening, our blooms speak volumes. Each bouquet is a unique arrangement of fresh, vibrant flowers, carefully selected to convey your message.",
		// Let our floral artistry create a lasting impression and add a touch of natural elegance to any special moment

		highlights: [
			"covers a broad spectrum of occasions, making it suitable for most bouquets.",
			"focuses on expressing sentiments, appealing to customers desire to connect with others.",
			"emphasizes the freshness and careful selection of flowers, highlighting the artistry involved.",
		],
	};

	return (
		<div className="bg-white">
			{role === "ROLE_ADMIN" ? <AdminNavbar /> : <Navbar />}
			<div className="pt-6">
				<div className="mx-auto max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
					<div className="aspect-h-4 aspect-w-3 overflow-hidden rounded-lg lg:block">
						<img
							src={`http://localhost:8080${product.photo}`}
							alt={product.name}
							className="h-full w-full object-cover object-center"
						/>
					</div>
					<div className=" lg:col-span-2 lg:mt-0">

						<h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
							{product.name}
						</h1>

            <div className="mt-3">
              <h3 className="sr-only">Description</h3>

              <div>
                <p className="text-base text-gray-900">{productDetails.description}</p>
              </div>
            </div>

						<div className="mt-4">
							<h3 className="text-sm font-medium text-gray-900">Highlights</h3>
							<div className="mt-1">
								<ul role="list" className="list-disc space-y-1 pl-5 text-sm">
									{productDetails.highlights.map((highlight) => (
										<li key={highlight} className="text-gray-400">
											<span className="text-gray-600">{highlight}</span>
										</li>
									))}
								</ul>
							</div>
						</div>

						<div className="mt-4">
							<h2 className="text-sm font-medium text-gray-900">Details</h2>
							<div className="mt-1 space-y-1">
								<p className="text-sm text-gray-600 mt-1">{product.about}</p>
							</div>
						</div>

						<p className="text-3xl tracking-tight text-gray-900 mt-6">
							{`${product.price} ${product.currency}`}
						</p>

						<div className="mt-4">
							<h3 className="text-sm font-medium text-gray-900">Select Size</h3>
							<div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-2">
								{["small", "large"].includes(product.size.toLowerCase()) && (
									<button className="cursor-pointer bg-white text-gray-900 shadow-sm group relative flex items-center justify-center rounded-md border px-4 py-3 text-sm font-medium uppercase">
										{product.size.charAt(0).toUpperCase() +
											product.size.slice(1)}
									</button>
								)}
							</div>
						</div>

						<button
							type="submit"
							className="mt-4 w-full flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
						>
							Add to bag
						</button>

					</div>
				</div>
			</div>
		</div>
	);
};

export default ProductDetails;
