/* eslint-disable no-unused-vars */
import React from "react";
import Navbar from "../Common/Navbar";
import AdminNavbar from "../Common/AdminNavbar";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Categories = () => {
	const role = localStorage.getItem("role");

	const navigate = useNavigate();

	const callouts = [
    {
      name: "All Category",
      description: "All categories of flowers are available here",
      imageSrc: "/categories/all.jpg",
      href: "/products/all", // Use 'all' for showing all products
    },
    {
      name: "Birthday",
      description: "Flowers for birthdays",
      imageSrc: "/categories/birthdays.jpg",
      href: "/products/birthdays",
    },
    {
      name: "Love",
      description: "Flowers for love occasions",
      imageSrc: "/categories/love.jpg",
      href: "/products/love",
    },
    {
      name: "Marriage",
      description: "Flowers for marriages",
      imageSrc: "/categories/marriages.jpg",
      href: "/products/marriages",
    },
    {
      name: "Grand Opening",
      description: "Flowers for grand openings",
      imageSrc: "/categories/grandopenings.jpg",
      href: "/products/grand-openings",
    },
    {
      name: "Sympathy",
      description: "Flowers for sympathy",
      imageSrc: "/categories/sympathy.jpg",
      href: "/products/sympathy",
    },
  ];

	return (
		<div>
			{role === "ROLE_ADMIN" ? <AdminNavbar /> : <Navbar />}
			<div className="bg-gray-100">
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<div className="mx-auto max-w-2xl py-6 sm:py-24 lg:max-w-none lg:py-2">
						{/* Animated heading */}
						<motion.h2
							initial={{ opacity: 0, y: -20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, ease: "easeOut" }}
							className="text-2xl font-bold text-gray-900"
						>
							Categories Available
						</motion.h2>

						<div className="mt- space-y-5 lg:grid lg:grid-cols-3 lg:gap-x-5 lg:space-y-0">

              {callouts.map((callout) => (
								<motion.div // Animate each category card
									key={callout.name}
									className="group relative"
									initial={{ opacity: 0, scale: 0.95 }}
									animate={{ opacity: 1, scale: 1 }}
									transition={{ duration: 0.3, ease: "easeOut", delay: 0.1 }}
									whileHover={{ scale: 1.05 }} // Scale up on hover
								>
									<a href={callout.href}>
										<div className="mt-2 relative h-40 w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-60">
											{/* Image with subtle zoom on hover */}
											<motion.img
												alt={callout.imageAlt}
												src={callout.imageSrc}
												className="h-full w-full object-cover object-center"
												whileHover={{ scale: 1.1 }}
												transition={{ duration: 0.3, ease: "easeOut" }}
											/>
										</div>
									</a>
										<h3 className="text-xl font-semibold text-gray-900 cursor-pointer">
											{callout.name}
										</h3>
									<p className="px-2 text-sm text-gray-500">
										{callout.description}
									</p>
								</motion.div>
							))}
						</div>

						<div className="mt-2 lg:flex lg:flex-1 lg:justify-end">
							{/* Animated back button */}
							<motion.button
								onClick={() => {
									if (role === "ROLE_ADMIN") {
										navigate("/admin");
									} else {
										navigate("/");
									}
								}}
								whileHover={{
                  scale: 1.1,
                  boxShadow: "0px 4px 8px black",
                  backgroundColor: "#000000",
                  color: "#f0f4f8",
                }}
								whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
								className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
							>
								Back
							</motion.button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Categories;