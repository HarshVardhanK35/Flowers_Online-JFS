
// /* eslint-disable no-unused-vars */
// import React, { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import { useNavigate } from "react-router-dom";

// const ProductFilter = ({
//   onSearch,
//   onSort,
//   onSizeFilter,
//   onResetFilters,
// }) => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [sortOption, setSortOption] = useState("");
//   const [sizeOption, setSizeOption] = useState("");
//   const [resetClicked, setResetClicked] = useState(false);
//   const [showFilters, setShowFilters] = useState(false);
//   const navigate = useNavigate();

// 	const handleSearchChange = (e) => {
// 		setSearchTerm(e.target.value);
// 		onSearch(e.target.value);
// 	};

// 	const handleSortChange = (e) => {
// 		setSortOption(e.target.value);
// 		onSort(e.target.value);
// 	};

// 	const handleSizeChange = (e) => {
// 		setSizeOption(e.target.value);
// 		onSizeFilter(e.target.value);
// 	};

// 	const handleResetFilters = () => {
//     setSearchTerm("");
//     setSortOption("");
//     setSizeOption("");

//     onResetFilters();

//     localStorage.setItem("filtersVisible", JSON.stringify(showFilters));

//     setResetClicked(true);
//     setTimeout(() => {
//       setResetClicked(false);
//     }, 1000);

//     window.location.reload();
//   };

//   useEffect(() => {
//     const filtersVisible = JSON.parse(localStorage.getItem("filtersVisible"));
//     if (filtersVisible !== null) {
//       setShowFilters(filtersVisible); // Set the filter visibility based on previous state
//     }

//     return () => {
//       localStorage.removeItem("filtersVisible");
//     };
//   }, []);

// 	return (
//     <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4 justify-between w-full mb-6">
//       <div className="flex space-x-3 w-full md:w-1/2">
//         <input
//           type="text"
//           value={searchTerm}
//           onChange={handleSearchChange}
//           placeholder="Search for products..."
//           className="border px-2 py-1 rounded-md w-1/2"
//         />
//         <motion.button
//           onClick={() => setShowFilters(!showFilters)}
//           className="text-sm font-semibold text-white bg-indigo-600 py-2 px-3 rounded-md shadow-md hover:bg-indigo-500"
//           whileHover={{
//             scale: 1.1,
//             boxShadow: "0px 4px 8px black",
//           }}
//           transition={{ duration: 0.2, ease: "easeInOut" }}
//         >
//           {showFilters ? "Hide Filters" : "Apply Filters"}
//         </motion.button>
//       </div>
//       {showFilters && (
//         <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 justify-between w-full">
//           <div className="flex items-start space-x-2">
//             <span className="text-sm font-semibold text-gray-700">Quantity:</span>
//             <div className="flex flex-col space-y-1">
//               <label className="inline-flex items-center">
//                 <input
//                   type="radio"
//                   name="sortOption"
//                   value="lowToHigh"
//                   checked={sortOption === "lowToHigh"}
//                   onChange={handleSortChange}
//                   className="form-radio"
//                 />
//                 <span className="ml-1 text-sm">Low to High</span>
//               </label>
//               <label className="inline-flex items-center">
//                 <input
//                   type="radio"
//                   name="sortOption"
//                   value="highToLow"
//                   checked={sortOption === "highToLow"}
//                   onChange={handleSortChange}
//                   className="form-radio"
//                 />
//                 <span className="ml-1 text-sm">High to Low</span>
//               </label>
//             </div>
//           </div>
//           <div className="flex items-start space-x-2">
//             <span className="text-sm font-semibold text-gray-700">Price:</span>
//             <div className="flex flex-col space-y-1">
//               <label className="inline-flex items-center">
//                 <input
//                   type="radio"
//                   name="sortOption"
//                   value="priceLowToHigh"
//                   checked={sortOption === "priceLowToHigh"}
//                   onChange={handleSortChange}
//                   className="form-radio"
//                 />
//                 <span className="ml-1 text-sm">Low to High</span>
//               </label>
//               <label className="inline-flex items-center">
//                 <input
//                   type="radio"
//                   name="sortOption"
//                   value="priceHighToLow"
//                   checked={sortOption === "priceHighToLow"}
//                   onChange={handleSortChange}
//                   className="form-radio"
//                 />
//                 <span className="ml-1 text-sm">High to Low</span>
//               </label>
//             </div>
//           </div>
//           <div className="flex items-start space-x-2">
//             <span className="text-sm font-semibold text-gray-700">Size:</span>
//             <div className="flex flex-col space-y-1">
//               <label className="inline-flex items-center">
//                 <input
//                   type="radio"
//                   name="sizeOption"
//                   value="Small"
//                   checked={sizeOption === "Small"}
//                   onChange={handleSizeChange}
//                   className="form-radio"
//                 />
//                 <span className="ml-1 text-sm">Small</span>
//               </label>
//               <label className="inline-flex items-center">
//                 <input
//                   type="radio"
//                   name="sizeOption"
//                   value="Large"
//                   checked={sizeOption === "Large"}
//                   onChange={handleSizeChange}
//                   className="form-radio"
//                 />
//                 <span className="ml-1 text-sm">Large</span>
//               </label>
//             </div>
//           </div>

//         </div>
//       )}
//       <motion.button
//         onClick={handleResetFilters}
//         className={`text-sm font-semibold leading-6 text-white py-2 px-3 rounded-md shadow-md ${
//           resetClicked ? "bg-green-500" : "bg-black"
//         }`}
//         whileHover={{
//           scale: 1.1,
//           boxShadow: "0px 4px 8px black",
//         }}
//         transition={{ duration: 0.2, ease: "easeInOut" }}
//       >
//         {resetClicked ? "Done!" : "Reset"}
//       </motion.button>
//     </div>
//   );
// };

// export default ProductFilter;