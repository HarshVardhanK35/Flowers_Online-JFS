import React from "react";
import { useNavigate } from "react-router-dom";

const ServiceNotAvailable = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col justify-center items-center min-h-screen">
            <h1 className="text-2xl font-bold text-red-600 mb-4">
                Services are not available at your location.
            </h1>
            <p className="mb-6 text-center text-gray-700">
                We currently do not provide services in the city you've selected. Please check back later or select a different city.
            </p>
            <button
                className="rounded-md bg-indigo-600 px-4 py-2 text-white font-semibold hover:bg-indigo-500"
                onClick={() => navigate("/products/all")}
            >
                Continue Shopping
            </button>
        </div>
    );
};

export default ServiceNotAvailable;
