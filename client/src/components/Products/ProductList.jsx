import React, { useEffect, useState } from 'react';
import Navbar from '../Common/Navbar';
const ProductList = () => {
  const [products, setProducts] = useState([]);
  const token = localStorage.getItem('token'); // Assuming token is stored in localStorage after login
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/products', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`, // Send the JWT token
            'Content-Type': 'application/json',
          }
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
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
      <div className="container mx-auto mt-10">
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
      </div>
    </div>
  );
};
export default ProductList;