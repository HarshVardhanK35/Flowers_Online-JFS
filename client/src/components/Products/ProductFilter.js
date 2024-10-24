import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";

const ProductFilter = ({ onSearch, onFilter, onClearFilter, onResetFilters, showCategoryFilter, onCategoryChange }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilters, setSelectedFilters] = useState({
    size: "",
    price: "",
    quantity: "",
  });

  const handleSearchChange = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    onSearch(term);
  };

  const handleFilterChange = (type, value) => {
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      [type]: value,
    }));
    onFilter(type, value);
  };

  const handleClearFilter = (type) => {
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      [type]: "",
    }));
    onClearFilter(type);
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0 sm:space-x-4">
      <input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="border px-3 py-2 rounded-md w-auto sm:w-40"
      />

      <div className="flex flex-wrap items-center space-x-4">
        <div className="relative">
          <label className="text-sm font-medium text-gray-700 mb-1 block">Size:</label>
          <select
            value={selectedFilters.size}
            onChange={(e) => handleFilterChange("size", e.target.value)}
            className="border px-2 py-1 rounded-md"
          >
            <option value="">Select Size</option>
            <option value="small">Small</option>
            <option value="large">Large</option>
          </select>
          {selectedFilters.size && (
            <FaTimes
              onClick={() => handleClearFilter("size")}
              className="inline ml-2 cursor-pointer text-red-500"
            />
          )}
        </div>

        <div className="relative">
          <label className="text-sm font-medium text-gray-700 mb-1 block">Price:</label>
          <select
            value={selectedFilters.price}
            onChange={(e) => handleFilterChange("price", e.target.value)}
            className="border px-2 py-1 rounded-md"
          >
            <option value="">Select Price Order</option>
            <option value="lowToHigh">Low to High</option>
            <option value="highToLow">High to Low</option>
          </select>
          {selectedFilters.price && (
            <FaTimes
              onClick={() => handleClearFilter("price")}
              className="inline ml-2 cursor-pointer text-red-500"
            />
          )}
        </div>

        <div className="relative">
          <label className="text-sm font-medium text-gray-700 mb-1 block">Quantity:</label>
          <select
            value={selectedFilters.quantity}
            onChange={(e) => handleFilterChange("quantity", e.target.value)}
            className="border px-2 py-1 rounded-md"
          >
            <option value="">Select Quantity Order</option>
            <option value="lowToHigh">Low to High</option>
            <option value="highToLow">High to Low</option>
          </select>
          {selectedFilters.quantity && (
            <FaTimes
              onClick={() => handleClearFilter("quantity")}
              className="inline ml-2 cursor-pointer text-red-500"
            />
          )}
        </div>

        {showCategoryFilter && (
          <div className="relative">
            <label className="text-sm font-medium text-gray-700 mb-1 block">Category:</label>
            <select
              onChange={(e) => onCategoryChange(e.target.value)}
              className="border px-2 py-1 rounded-md"
            >
              <option value="all">All</option>
              <option value="love">Love</option>
              <option value="birthdays">Birthdays</option>
              <option value="marriages">Marriages</option>
              <option value="grand-openings">Grand Openings</option>
              <option value="sympathy">Sympathy</option>
            </select>
          </div>
        )}

        <button
          onClick={onResetFilters}
          className="mt-1 ml-4 px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
export default ProductFilter;