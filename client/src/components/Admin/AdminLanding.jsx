/* eslint-disable no-unused-vars */
import React from "react";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "../Common/AdminNavbar";

const AdminLanding = () => {

	const navigate = useNavigate();

	return (
		<div>
			<AdminNavbar />
			<div className="mt-10 flex flex-col items-center justify-center bg-gray-45">
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-10 w-full max-w-3xl">

					<div
						className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl cursor-pointer transition duration-300"
						onClick={() => navigate("/admin/details")}
					>
						<h2 className="text-xl font-bold mb-2">
              Edit Your Details <span aria-hidden="true" className="mt-1 text-sm text-gray-500">&rarr;</span>
            </h2>
						<p>Modify / Edit AdminLanding details here.</p>
					</div>

					<div
						className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl cursor-pointer transition duration-300"
						onClick={() => navigate("/admin/add-product")}
					>
						<h2 className="text-xl font-bold mb-2">
              Add Flowers <span aria-hidden="true" className="mt-1 text-sm text-gray-500">&rarr;</span>
            </h2>
						<p>Add new flowers to the inventory.</p>
					</div>

					<div
						className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl cursor-pointer transition duration-300"
						onClick={() => navigate("/products")}
					>
						<h2 className="text-xl font-bold mb-2">
              Modify Flowers Listed <span aria-hidden="true" className="mt-1 text-sm text-gray-500">&rarr;</span>
            </h2>
						<p>Modify flowers that were already present in the inventory.</p>
					</div>

					<div
						className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl cursor-pointer transition duration-300"
						onClick={() => navigate("/admin/add-shop")}
					>
						<h2 className="text-xl font-bold mb-2">
              Add Shop Location <span aria-hidden="true" className="mt-1 text-sm text-gray-500">&rarr;</span>
            </h2>
						<p>Add a new shop location to start your flowers business.</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AdminLanding;
