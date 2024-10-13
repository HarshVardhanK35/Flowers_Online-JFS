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
	const [searchTerm, setSearchTerm] = useState("");

	const token = localStorage.getItem("token");
	const role = localStorage.getItem("role");

	const fetchProducts = async () => {
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

      // Check if data is empty
      if (data.length === 0) {
        setProducts([]); // Set to empty array if no products
        setFilteredProducts([]);
      } else {
        setProducts(data); // Set all products to the main products state
        setFilteredProducts(data); // Initially show all fetched products
      }
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

	useEffect(() => {
		if (categoryName) {
			setSelectedCategory(categoryName);
		}
	}, [categoryName]);

	useEffect(() => {
		setFilteredProducts([]);
		if (token) {
			fetchProducts();
		}
	}, [token, selectedCategory]);

	const applyFilters = () => {
    let filtered = [...products]; // Use the main product list

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Size filter
    if (sizeOption) {
      filtered = filtered.filter(
        (product) =>
          product.size &&
          product.size.toLowerCase() === sizeOption.toLowerCase()
      );
    }

    // Sorting
    if (sortOption === "lowToHigh") {
      filtered.sort((a, b) => a.availableQuantity - b.availableQuantity);
    } else if (sortOption === "highToLow") {
      filtered.sort((a, b) => b.availableQuantity - a.availableQuantity);
    } else if (sortOption === "priceLowToHigh") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortOption === "priceHighToLow") {
      filtered.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(filtered);
  };
  useEffect(() => {
    applyFilters();
  }, [products, searchTerm, sizeOption, sortOption]);


	const handleSearch = (searchTerm) => {
		setSearchTerm(searchTerm);
	};

	const handleSort = (option) => {
		setSortOption(option);
	};

	const handleSizeFilter = (size) => {
		setSizeOption(size);
	};

	const handleCategoryFilterChange = (category) => {
		setSelectedCategory(category);
		applyFilters();
	};

	const handleResetFilters = () => {
		setSortOption("");
		setSizeOption("");
		setSearchTerm("");
		setSelectedCategory("all");
		setFilteredProducts(products); // Reset to all products
	};

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
						>
							Cancel
						</motion.button>
						<motion.a
							href="/login"
							className="text-sm font-semibold leading-6 text-black rounded-md px-2 py-1 shadow-md"
						>
							Already a user? Login here
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
						showCategoryFilter={true}
						selectedCategory={selectedCategory}
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
												alt={`${product.name} Bouquet`}
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
									navigate("/categories");
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
