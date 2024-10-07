/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { motion } from "framer-motion";

const ProductFilter = ({
  onSearch,
  onSort,
  onSizeFilter,
  onCategoryFilter, // New prop for category filtering
  onResetFilters,
  showCategoryFilter, // Conditionally render category filter
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [sizeOption, setSizeOption] = useState("");

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
    onSort(e.target.value);
  };

  const handleSizeChange = (e) => {
    setSizeOption(e.target.value);
    onSizeFilter(e.target.value);
  };

  const handleResetFilters = () => {
    setSearchTerm("");
    setSortOption("");
    setSizeOption("");
    onResetFilters(); // Call parent function to reset filters
  };

  return (
    <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4 justify-between w-full mb-6">
      {/* Search Box */}
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Search for products..."
        className="border px-2 py-2 rounded-md w-full md:w-1/5"
      />
      <div>{'|'}</div>

      {/* Sort Radio Buttons */}
      <div className="flex items-center space-x-2">
        <span className="text-sm font-semibold text-gray-700">Sort By:</span>
        <label className="inline-flex items-center">
          <input
            type="radio"
            name="sortOption"
            value="lowToHigh"
            checked={sortOption === "lowToHigh"}
            onChange={handleSortChange}
            className="form-radio"
          />
          <span className="ml-1 text-sm">Low - High</span>
        </label>
        <label className="inline-flex items-center">
          <input
            type="radio"
            name="sortOption"
            value="highToLow"
            checked={sortOption === "highToLow"}
            onChange={handleSortChange}
            className="form-radio"
          />
          <span className="ml-1 text-sm">High - Low</span>
        </label>
      </div>

      <div>{'|'}</div>

      {/* Size Filter Radio Buttons */}
      <div className="flex items-center space-x-2">
        <span className="text-sm font-semibold text-gray-700">Size:</span>
        <label className="inline-flex items-center">
          <input
            type="radio"
            name="sizeOption"
            value="Small"
            checked={sizeOption === "Small"}
            onChange={handleSizeChange}
            className="form-radio"
          />
          <span className="ml-1 text-sm">Small</span>
        </label>
        <label className="inline-flex items-center">
          <input
            type="radio"
            name="sizeOption"
            value="Large"
            checked={sizeOption === "Large"}
            onChange={handleSizeChange}
            className="form-radio"
          />
          <span className="ml-1 text-sm">Large</span>
        </label>
      </div>

      <div>{'|'}</div>

      {/* Category Filter - Conditionally rendered */}
      {showCategoryFilter && (
        <div className="flex items-center space-x-2">
          <span className="text-sm font-semibold text-gray-700">Category:</span>
          <select
            onChange={(e) => onCategoryFilter(e.target.value)}
            className="p-1 rounded-md border border-gray-300"
          >
            <option value="all">All</option>
            <option value="birthdays">Birthdays</option>
            <option value="love">Love</option>
            <option value="marriages">Marriages</option>
            <option value="grand-openings">Grand Openings</option>
            <option value="sympathy">Sympathy</option>
          </select>
        </div>
      )}

      <motion.button
        onClick={handleResetFilters}
        className="text-sm font-semibold leading-6 text-white py-2 px-3 rounded-md shadow-md bg-black"
        whileHover={{
          scale: 1.1,
          boxShadow: "0px 4px 8px black",
        }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
      >
        Reset Filters
      </motion.button>
    </div>
  );
};

export default ProductFilter;
