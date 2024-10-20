import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function AddShopLocation() {
  const [shopName, setShopName] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [isAdminShop, setIsAdminShop] = useState(false);
  const [isNormalShop, setIsNormalShop] = useState(false);
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role"); // Check the role of the logged-in user
  const navigate = useNavigate();

  useEffect(() => {
    if (role !== "ROLE_ADMIN") {
      alert("Unauthorized: Only admins can add shop locations.");
      navigate("/"); // Redirect to home if not an admin
    }
  }, [role, navigate]);

  const handleAddShop = async (e) => {
    e.preventDefault();
    const shopData = {
      shopName,
      city,
      address,
      isAdminShop,
      isNormalShop,
    };
    try {
      const response = await fetch("http://localhost:8080/api/shops", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(shopData),
      });

      if (response.ok) {
        alert("Shop added successfully!");
        navigate("/admin");
      } else {
        alert("Failed to add shop");
      }
    } catch (error) {
      console.error("Error adding shop:", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form className="max-w-lg w-full p-6 bg-white shadow-lg rounded-lg" onSubmit={handleAddShop}>
        <h2 className="text-2xl font-bold mb-4">Add Shop Location</h2>

        <div className="mb-4">
          <label className="block text-sm font-medium">Shop Name</label>
          <input
            type="text"
            value={shopName}
            onChange={(e) => setShopName(e.target.value)}
            required
            className="form-control block w-full border-1 p-2 rounded-md"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">City</label>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
            className="form-control block w-full border-1 p-2 rounded-md"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">Address</label>
          <textarea
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            className="form-control block w-full border-1 p-2 rounded-md"
          ></textarea>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">Shop Type</label>
          <div className="flex space-x-4">
            <label>
              <input
                type="checkbox"
                checked={isAdminShop}
                onChange={() => setIsAdminShop(!isAdminShop)}
              />
              Admin Shop Address
            </label>
            <label>
              <input
                type="checkbox"
                checked={isNormalShop}
                onChange={() => setIsNormalShop(!isNormalShop)}
              />
              Normal Shop Address
            </label>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-4 py-2 text-white font-semibold hover:bg-indigo-500"
          >
            Add Shop
          </button>
        </div>
      </form>
    </div>
  );
}
