/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Navbar from "../Common/Navbar";

const ProductList = () => {

	const [products, setProducts] = useState([]);

	const token = localStorage.getItem("token"); // Assuming token is stored in localStorage after login

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const response = await fetch("http://localhost:8080/api/products", {
					method: "GET",
					headers: {
						Authorization: `Bearer ${token}`, // Send the JWT token
						"Content-Type": "application/json",
					},
				});
				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}
				const data = await response.json();
        console.log(data)
				setProducts(data);
			} catch (error) {
				console.error("Error fetching products:", error);
			}
		};
		fetchProducts();
	}, [token]);
	return (
		<div>
			<Navbar />
			{/* <div className="container mx-auto mt-10">
        <h2 className="text-3xl font-bold mb-6">All Products</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">

        {products.map((product) => (
            <div key={product.id} className="bg-white p-4 rounded-lg shadow-md">

              <img
                src={`http://localhost:8080${product.photo}`}  // Assuming 'photo' contains the image URL
                alt={product.name}
                className="w-full h-40 object-cover mb-4 rounded"
              />

              <h3 className="text-lg font-semibold">{product.name}</h3>

              <p className="text-gray-600">{product.description}</p>

              <p className="text-blue-600 font-bold">${product.price}</p>

              </div>
          ))}
        </div>
      </div> */}

			<div className="bg-white">
				<div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
					<h2 className="text-2xl font-bold tracking-tight text-gray-900">
						Products Available...
					</h2>

					<div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">

						{products.map((product) => (
							<div key={product.id} className="group relative">
								<div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
									<img
										src={`http://localhost:8080${product.photo}`}
										alt={product.name}
										className="h-full w-full object-cover object-center lg:h-full lg:w-full"
									/>
								</div>
								<div className="mt-1 flex justify-between">
									<div>
										<h3 className="text-sm text-gray-700">
											<a href={`/products/:${product.id}`}>
												<span aria-hidden="true" className="text-sm font-medium text-gray-900" />
												{product.name}
											</a>
										</h3>
										<p className="mt-1 text-sm text-gray-500">
											{product.category}
										</p>
									</div>
									<p className="text-sm font-medium text-gray-900">
										{product.price}
									</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};
export default ProductList;
