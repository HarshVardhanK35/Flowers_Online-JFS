/* eslint-disable no-unused-vars */
import React, { useState } from "react";

const ProductFilter = ({ onSearch, onFilter }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    onSearch(term);
  };

  const handleFilterChange = (type, value) => {
    onFilter(type, value);
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between mb-6 space-y-4 sm:space-y-0 sm:space-x-6">
      {/* Search Box */}
      <input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="border px-3 py-2 rounded-md w-full sm:w-1/3"
      />

      {/* Filters */}
      <div className="flex flex-wrap items-center space-x-4">
        {/* Size Filter */}
        <div>
          <label className="text-sm font-medium text-gray-700">Size:</label>
          <div className="flex items-center space-x-2">
            <label>
              <input
                type="radio"
                name="size"
                value="small"
                onChange={() => handleFilterChange("size", "small")}
                className="mr-1"
              />
              Small
            </label>
            <label>
              <input
                type="radio"
                name="size"
                value="large"
                onChange={() => handleFilterChange("size", "large")}
                className="mr-1"
              />
              Large
            </label>
          </div>
        </div>

        {/* Price Filter */}
        <div>
          <label className="text-sm font-medium text-gray-700">Price:</label>
          <div className="flex items-center space-x-2">
            <label>
              <input
                type="radio"
                name="price"
                value="lowToHigh"
                onChange={() => handleFilterChange("price", "lowToHigh")}
                className="mr-1"
              />
              Low to High
            </label>
            <label>
              <input
                type="radio"
                name="price"
                value="highToLow"
                onChange={() => handleFilterChange("price", "highToLow")}
                className="mr-1"
              />
              High to Low
            </label>
          </div>
        </div>

        {/* Quantity Filter */}
        <div>
          <label className="text-sm font-medium text-gray-700">Quantity:</label>
          <div className="flex items-center space-x-2">
            <label>
              <input
                type="radio"
                name="quantity"
                value="lowToHigh"
                onChange={() => handleFilterChange("quantity", "lowToHigh")}
                className="mr-1"
              />
              Low to High
            </label>
            <label>
              <input
                type="radio"
                name="quantity"
                value="highToLow"
                onChange={() => handleFilterChange("quantity", "highToLow")}
                className="mr-1"
              />
              High to Low
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductFilter;