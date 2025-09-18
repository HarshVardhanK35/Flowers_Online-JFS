"use client";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/16/solid";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const UserLanding = () => {
	const navigate = useNavigate();

	const handleLogout = () => {
		const bool = window.confirm("Are you sure you want to logout!");
		if (bool) {
			localStorage.removeItem("token");
			localStorage.removeItem("role");
			navigate("/");
		}
	};

	const adminNavigation = [
		{ name: "Dashboard", href: "/admin" },
		{ name: "Users", href: "/users" },
	];

	const userNavigation = [
		{ name: "Categories", href: "/categories" },
		{ name: "About", href: "/about" },
		{ name: "Contact", href: "/contact" },
	];

	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

	const [role, setRole] = useState(null);
	const [token, setToken] = useState(null);

	useEffect(() => {
		const storedRole = localStorage.getItem("role");
		const storedToken = localStorage.getItem("token");

		setRole(storedRole);
		setToken(storedToken);
	}, []);

	const navigation = role === "ROLE_ADMIN" ? adminNavigation : userNavigation;

	return (
		<motion.div
			initial={{ backgroundPosition: "0% 50%" }}
			whileHover={{
				backgroundPosition: "100% 50%",
				backgroundImage: "linear-gradient(270deg, #ff80b5, #9089fc)",
			}}
			transition={{ duration: 0.1, ease: "easeInOut" }} // Faster transition
			className="relative min-h-screen isolate px-6 pt-14 lg:px-8"
		>
			<header className="absolute inset-x-0 top-0 z-50">
				<nav
					aria-label="Global"
					className="flex items-center justify-between p-6 lg:px-8"
				>
					<div className="flex lg:flex-1">
						<motion.div
							initial={{ scale: 0.8, opacity: 0 }}
							animate={{ scale: 1, opacity: 1 }}
							transition={{ duration: 0.5, ease: "easeOut" }}
							whileHover={{ scale: 1.1 }}
						>
							<img
								alt="9Flowers.Online Logo"
								src="/logo.jpeg"
								className="h-14 w-auto rounded-md"
							/>
						</motion.div>
					</div>
					<div className="flex lg:hidden">
						<button
							type="button"
							onClick={() => setMobileMenuOpen(true)}
							className="-m-2.5 inline-flex items-center justify-center rounded-md p-2 text-gray-700"
						>
							<span className="sr-only">Open main menu</span>
							<Bars3Icon aria-hidden="true" className="h-6 w-6" />
						</button>
					</div>
					<div className="hidden lg:flex lg:gap-x-5">
						{navigation.map((item) => (
							<motion.a
								key={item.name}
								href={item.href}
								className="text-sm font-semibold leading-6 text-gray-900 px-2"
								whileHover={{ scale: 1.25, color: "#f0f4f8" }}
								whileTap={{ scale: 0.95 }}
							>
								{item.name}
							</motion.a>
						))}
						{token && (
							<motion.a
								href="/"
								onClick={handleLogout}
								className="text-sm font-semibold leading-6 text-gray-900 px-2 cursor-pointer"
								whileHover={{ scale: 1.25, color: "#f0f4f8" }}
								whileTap={{ scale: 0.95 }}
							>
								Logout
							</motion.a>
						)}
					</div>
				</nav>
				<AnimatePresence>
					{mobileMenuOpen && (
						<Dialog
							as={motion.div}
							open={mobileMenuOpen}
							animate={{ x: 0 }}
							transition={{ duration: 0.5, ease: "easeOut" }}
							onClose={setMobileMenuOpen}
							className="lg:hidden"
						>
							<div className="fixed inset-0 z-50" />
							<DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
								<div className="flex items-center justify-between">
									<a href="/" className="-m-1.5 p-1.5">
										<span className="sr-only">9Flowers.Online</span>
										<img
											alt="9Flowers.Online Logo"
											src="/logo.jpeg"
											className="h-8 w-auto rounded-md"
										/>
									</a>
									<button
										type="button"
										onClick={() => setMobileMenuOpen(false)}
										className="m-2.5 rounded-md p-2.5 text-gray-700"
									>
										<span className="sr-only">Close menu</span>
										<XMarkIcon aria-hidden="true" className="h-6 w-6" />
									</button>
								</div>
								<div className="mt-6 flow-root">
									<div className="-my-6 divide-y divide-gray-500">
										<div className="space-y-2 py-6">
											{navigation.map((item) => (
												<motion.a
													key={item.name}
													href={item.href}
													whileHover={{
														scale: 1.05,
														backgroundColor: "#808080",
														color: "#f0f4f8",
													}}
													whileTap={{ scale: 0.95 }}
													className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900"
												>
													{item.name}
												</motion.a>
											))}
											{token && (
												<motion.a
													href="/"
													onClick={handleLogout}
													className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900"
													whileHover={{
														scale: 1.05,
														backgroundColor: "#808080",
														color: "#f0f4f8",
													}}
													whileTap={{ scale: 0.95 }}
												>
													Logout
												</motion.a>
											)}
										</div>
									</div>
								</div>
							</DialogPanel>
						</Dialog>
					)}
				</AnimatePresence>
			</header>
			<motion.div
				aria-hidden="true"
				className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
				initial={{ opacity: 0, scale: 0.8 }}
				animate={{ opacity: 1, scale: 1 }}
				transition={{ duration: 1.5, ease: "easeOut" }}
			>
				<div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" />
			</motion.div>
			<div className="mx-auto max-w-2xl py-32 sm:py-40 lg:py-30">
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 1.2 }}
					className="text-center"
				>
					<h1 className="text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl">
						9Flowers.Online
					</h1>
					<p className="mt-4 text-xl leading-8 text-gray-100">
						Explore beautiful floral arrangements, personalized flower bouquets.
					</p>
					<p className="leading-8 text-gray-200">
						Find the perfect flower bouquets for every occasion here.
					</p>
				</motion.div>
				{!token && (
					<div className="mt-10 flex items-center justify-center gap-x-4">
          <motion.a
            href="/register"
            className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Register Here
          </motion.a>
          <motion.a
            href="/login"
            className="text-sm font-semibold leading-6 text-white rounded-md px-2 py-1 shadow-md md:ml-2 md:mr-4"
            whileHover={{
              scale: 1.1,
              boxShadow: "0px 4px 8px black",
              backgroundColor: "#000000",
              color: "#f0f4f8",
            }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            Already a user? Login here <span aria-hidden="true">→</span>
          </motion.a>
        </div>
				)}
			</div>
			<motion.div
				initial={{ opacity: 0, scale: 0.8 }}
				animate={{ opacity: 1, scale: 1 }}
				transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
				aria-hidden="true"
				className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-2xl sm:top-[calc(100%-35rem)]"
			>
				<div
					style={{
						clipPath:
							"polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
					}}
					className="relative left-[calc(50%+13rem)] aspect-[1155/678] w-[16.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%+6rem)] sm:w-[12.1875rem]"
				/>
			</motion.div>
		</motion.div>
	);
};
export default UserLanding;
