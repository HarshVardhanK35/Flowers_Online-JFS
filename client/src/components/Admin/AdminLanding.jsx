/* eslint-disable no-unused-vars */
import React from "react";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "../Common/AdminNavbar";

const AdminLanding = () => {

	const navigate = useNavigate();

	return (
		<div>
			<AdminNavbar />
			<div className="mt-20 flex flex-col items-center justify-center bg-gray-45">
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-10 w-full max-w-3xl">

					<div
						className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl cursor-pointer transition duration-300"
						onClick={() => navigate("/admin/add-product")}
					>
						<h2 className="text-xl font-bold mb-2">
              Add Flower Bouquets <span aria-hidden="true" className="mt-1 text-sm text-gray-500">&rarr;</span>
            </h2>
						<p>Add new flower bouquets to the inventory.</p>
					</div>

					<div
						className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl cursor-pointer transition duration-300"
						onClick={() => navigate("/admin/products")}
					>
						<h2 className="text-xl font-bold mb-2">
              Modify Bouquets Listed <span aria-hidden="true" className="mt-1 text-sm text-gray-500">&rarr;</span>
            </h2>
						<p>Modify flower bouquets that were already present in the inventory.</p>
					</div>

					<div
						className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl cursor-pointer transition duration-300"
						onClick={() => navigate("/admin/add-shop")}
					>
						<h2 className="text-xl font-bold mb-2">
              Add Shop Details <span aria-hidden="true" className="mt-1 text-sm text-gray-500">&rarr;</span>
            </h2>
						<p>Add a new shop location to start your flower bouquet business.</p>
					</div>

          <div
						className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl cursor-pointer transition duration-300"
						onClick={() => navigate("/admin/shops")}
					>
						<h2 className="text-xl font-bold mb-2">
              All Shops List <span aria-hidden="true" className="mt-1 text-sm text-gray-500">&rarr;</span>
            </h2>
						<p>Modify / Edit and Delete shops listed.</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AdminLanding;