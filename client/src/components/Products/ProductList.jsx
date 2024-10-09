/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../Common/Navbar";
import AdminNavbar from "../Common/AdminNavbar";
import ProductFilter from "../Common/ProductFilter";

const ProductList = () => {
	const navigate = useNavigate();

	const { categoryName } = useParams(); // Get category from URL
	const [products, setProducts] = useState([]);
	const [filteredProducts, setFilteredProducts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortOption, setSortOption] = useState("");
  const [sizeOption, setSizeOption] = useState("");

	const token = localStorage.getItem("token");
	const role = localStorage.getItem("role");

	const fetchFilteredProducts = async () => {
		try {
			if (!token) {
				throw new Error("Unauthorized: No token provided.");
			}

			const category =
				selectedCategory && selectedCategory !== "all"
					? selectedCategory.toLowerCase()
					: "all";

			const url =
				category === "all"
					? "http://localhost:8080/api/products"
					: `http://localhost:8080/api/products/category/${category}`;

			const response = await fetch(url, {
				headers: {
					Authorization: `Bearer ${token}`,
					"Content-Type": "application/json",
				},
			});

			if (!response.ok) {
				throw new Error("Error fetching products");
			}

			const data = await response.json();
			setProducts(data);
      setFilteredProducts(data); // Load all products initially
		} catch (error) {
			console.error(error.message);
			alert(error.message);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		if (categoryName) {
			setSelectedCategory(categoryName);
			// console.log(categoryName)
		}
	}, [categoryName]);

	useEffect(() => {
		if (token) {
			fetchFilteredProducts();
		} else {
			console.log("No token found.");
		}
	}, [selectedCategory, token]);

  // Apply all filters at once (size, sort by quantity, sort by price)
  const applyFilters = () => {
    let filtered = [...products];

    // Apply size filter if selected
    if (sizeOption) {
      filtered = filtered.filter(
        (product) => product.size.toLowerCase() === sizeOption.toLowerCase()
      );
    }

    // Apply sorting for quantity or price
    if (sortOption === "lowToHigh") {
      filtered.sort((a, b) => a.availableQuantity - b.availableQuantity);
    } else if (sortOption === "highToLow") {
      filtered.sort((a, b) => b.availableQuantity - a.availableQuantity);
    } else if (sortOption === "priceLowToHigh") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortOption === "priceHighToLow") {
      filtered.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(filtered); // Update with all applied filters
  };

	const handleSearch = (searchTerm) => {
    const filtered = products.filter((product) =>
      product.name.toLowerCase().startsWith(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  const handleSort = (option) => {
    setSortOption(option);
    applyFilters(); // Apply all filters after updating sort
  };

  const handleSizeFilter = (size) => {
    setSizeOption(size);
    applyFilters(); // Apply all filters after updating size
  };

  const handleCategoryFilterChange = (category) => {
    setSelectedCategory(category);
    applyFilters(); // Apply all filters after updating category
  };

  const handleResetFilters = () => {
    setSortOption("");
    setSizeOption("");
    setSelectedCategory("all");
    setFilteredProducts(products); // Reset to all products
  };


	// console.log(filteredProducts);

	if (!token) {
		return (
			<>
				<Navbar />
				<div className="mt-24 flex flex-col items-center justify-center">
					<h2 className="text-2xl font-bold text-gray-900 mb-4">
						Please Log In to View Products
					</h2>
					<div className="flex space-x-3">
						<motion.button
							onClick={() => navigate(-1)}
							className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus:outline-none"
							whileHover={{
								scale: 1.1,
								boxShadow: "0px 4px 8px black",
								backgroundColor: "#000000",
								color: "#f0f4f8",
							}}
							transition={{ duration: 0.2, ease: "easeInOut" }}
						>
							Cancel
						</motion.button>

						<motion.a
							href="/login"
							className="text-sm font-semibold leading-6 text-black rounded-md px-2 py-1 shadow-md md:ml-2 md:mr-4"
							whileHover={{
								scale: 1.1,
								boxShadow: "0px 4px 8px black",
								backgroundColor: "#f0f4f8",
								color: "#000000",
							}}
							transition={{ duration: 0.2, ease: "easeInOut" }}
						>
							Already a user? Login here <span aria-hidden="true">→</span>
						</motion.a>
					</div>
				</div>
			</>
		);
	}

	return (
		<div>
			{role === "ROLE_ADMIN" ? <AdminNavbar /> : <Navbar />}
			<div className="bg-white">
				<div className="mx-auto max-w-2xl px-4 py-4 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
					<h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
						{categoryName && categoryName === "all"
							? "All Flower Bouquets"
							: categoryName
							? `${
									categoryName.charAt(0).toUpperCase() + categoryName.slice(1)
							  } Bouquets`
							: "Category Not Found"}
					</h2>

					<ProductFilter
            onSearch={handleSearch}
            onSort={handleSort}
            onSizeFilter={handleSizeFilter}
            onCategoryFilter={handleCategoryFilterChange}
            onResetFilters={handleResetFilters}
            showCategoryFilter={categoryName === "all"}
            selectedCategory={selectedCategory} // Pass selectedCategory to ProductFilter
          />

					<div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2">
						{filteredProducts.length > 0 ? (
							filteredProducts.map((product) => (
								<motion.div
									key={product.id}
									className="group relative flex flex-row"
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{
										duration: 0.5,
										ease: "easeOut",
										delay: 0.05 * product.id,
									}}
								>
									<div className="w-1/3 h-auto overflow-hidden rounded-md bg-gray-200">
										<a href={`/product/${product.id}`}>
											<motion.img
												src={`http://localhost:8080${product.photo}`}
												alt={`${product.name}+ " Bouquet"`}
												className="h-full w-full object-cover object-center"
												whileHover={{ scale: 1.15 }}
												transition={{ duration: 0.5 }}
											/>
										</a>
									</div>

									<div className="ml-5 flex flex-col justify-between w-1/2">
										<div>
											<motion.a href={`/product/${product.id}`}>
												<h3 className="text-gray-700">
													<p className="text-2xl font-semibold text-gray-900">
														{product.name}
													</p>
												</h3>
											</motion.a>

											<span className="-mt-1 text-lg font-medium text-gray-900 block ">
												<span className="text-sm font-light text-gray-500">
													Price:{" "}
												</span>
												<span>{`${product.currency}`}</span>
												{`${product.price} `}
											</span>

											<span className="mt-3 text-base font-normal text-gray-900 block ">
												<span className="text-sm font-light text-gray-500">
													Available Quantity:{" "}
												</span>
												{product.availableQuantity > 0
													? `${product.availableQuantity}`
													: "Out of Stock"}
											</span>

											<span className="-mt-1 text-base font-normal text-gray-900 block">
												<span className="text-sm font-light text-gray-500">
													Available in sizes:{" "}
												</span>
												{product.size
													? product.size.charAt(0).toUpperCase() +
													  product.size.slice(1)
													: "Not Available"}
											</span>

											<span className="mt-2 text-base font-normal text-gray-900 block ">
												<span className="text-sm font-light text-gray-500">
													Category:{" "}
												</span>
												{product.category
													? product.category.charAt(0).toUpperCase() +
													  product.category.slice(1)
													: "Unknown"}
											</span>

											<span className="mt-2 text-xs font-normal text-gray-900 block">
												{product.about === null ? "" : product.about}
											</span>
										</div>
									</div>
								</motion.div>
							))
						) : (
							<p>No products available in this category or Out of stock</p>
						)}
					</div>

					<div className="mt-2 lg:flex lg:flex-1 lg:justify-end">
						{/* Animated back button */}
						<motion.button
							onClick={() => {
								if (role === "ROLE_ADMIN") {
									navigate("/admin");
								} else {
									navigate(-1);
								}
							}}
							className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
							whileHover={{
								scale: 1.1,
								boxShadow: "0px 4px 8px black",
								backgroundColor: "#000000",
								color: "#f0f4f8",
							}}
							whileTap={{ scale: 0.95 }}
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

export default ProductList;
