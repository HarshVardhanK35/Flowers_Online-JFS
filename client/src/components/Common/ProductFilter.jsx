import React, { useState } from 'react';

const ProductFilter = ({ onSearch, onSort, onSizeFilter }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('');
  const [sizeOption, setSizeOption] = useState('');

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

  return (
    <div className="mb-4">
      {/* Search Box */}
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Search products..."
        className="border px-3 py-2 rounded-md w-full mb-4"
      />

      {/* Sort Dropdown */}
      <select
        value={sortOption}
        onChange={handleSortChange}
        className="border px-3 py-2 rounded-md w-full mb-4"
      >
        <option value="">Sort by Quantity</option>
        <option value="lowToHigh">Quantity: Low to High</option>
        <option value="highToLow">Quantity: High to Low</option>
      </select>

      {/* Size Filter */}
      <select
        value={sizeOption}
        onChange={handleSizeChange}
        className="border px-3 py-2 rounded-md w-full mb-4"
      >
        <option value="">Filter by Size</option>
        <option value="S">Size S</option>
        <option value="L">Size L</option>
      </select>
    </div>
  );
};

export default ProductFilter;
