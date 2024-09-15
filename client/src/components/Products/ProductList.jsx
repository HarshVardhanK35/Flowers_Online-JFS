import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../Common/Navbar';

const ProductList = () => {
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch products based on category
    // Replace with your actual API or data fetching logic
    const fetchProducts = async () => {

      let apiUrl = '/api/products';
      if (categoryName !== 'all') {
        apiUrl = `/api/products?category=${categoryName}`;
      }

      const response = await fetch(apiUrl);
      const data = await response.json();
      setProducts(data);
    };

    fetchProducts();
  }, [categoryName]);

  return (
    <div>
      <Navbar />
      <div className="container mx-auto mt-10">
        <h2 className="text-2xl font-bold text-gray-900 capitalize">
          {categoryName === 'all' ? 'All Products' : `${categoryName} Flowers`}
        </h2>
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.length > 0 ? (
            products.map((product) => (
              <div key={product.id} className="bg-white shadow-md rounded-lg p-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-40 w-full object-cover mb-4 rounded-md"
                />
                <h3 className="mt-4 text-lg font-semibold">{product.name}</h3>
                <p className="mt-2 text-sm text-gray-600">{product.description}</p>
                <p className="mt-2 font-semibold text-gray-900">${product.price}</p>
                <button className="bg-blue-600 text-white rounded px-4 py-2 mt-4">
                  Add to Cart
                </button>
              </div>
            ))
          ) : (
            <p>No products available for this category.</p>
          )}
        </div>
      </div>
    </div>
  );
};
export default ProductList;
