import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, adminOnly = false }) => {
	const token = localStorage.getItem("token");
	const userRole = localStorage.getItem("role");

	if (!token) {
		return (
			<div>
				<main class="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
					<div class="text-center">
						<p class="text-base font-semibold text-indigo-600">404</p>
						<h1 class="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
							Page not found
						</h1>
						<p class="mt-6 text-base leading-7 text-gray-600">
							Sorry, you are unauthorized to view this page!
						</p>
						<div class="mt-10 flex items-center justify-center gap-x-6">
							<a
								href="/login"
								class="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
							>
								Login Here
							</a>
							<a href="/register" class="text-sm font-semibold text-gray-900">
								Feel free to register <span aria-hidden="true">&rarr;</span>
							</a>
						</div>
					</div>
				</main>
			</div>
		);
	}

	if (adminOnly && userRole !== "ROLE_ADMIN") {
		return <Navigate to="/categories" />;
	}
	return children;
};

export default ProtectedRoute;
