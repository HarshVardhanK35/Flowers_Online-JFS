/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import {
	Disclosure,
	DisclosureButton,
	DisclosurePanel,
	Menu,
	MenuButton,
	MenuItem,
	MenuItems,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Navbar = () => {
	const navigate = useNavigate();

	const [userId, setUserId] = useState(null);
	const [token, setToken] = useState(null);
	const [cartItemCount, setCartItemCount] = useState(0);
	const [showLoginMessage, setShowLoginMessage] = useState(false); // To control login message

	const navigation = [
		{ name: "Categories", href: "/categories", current: false },
		{ name: "All Products", href: "/products/all", current: false },
		{ name: "About", href: "/about", current: false },
		{ name: "Contact", href: "/contact", current: false },
	];

	useEffect(() => {
		const storedToken = localStorage.getItem("token");
		const storedUserId = localStorage.getItem("userId");

		setUserId(storedUserId);
		setToken(storedToken);

		if (storedUserId && storedToken) {
			fetchCartCount(storedUserId, storedToken);
		} else {
			setShowLoginMessage(true); // Show login message if user is not logged in
		}
	}, []);

	const fetchCartCount = async (userId, token) => {
		try {
			const response = await fetch(`http://localhost:8080/api/cart/${userId}`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			});

			if (!response.ok) {
				const errorText = await response.text();
				console.error(
					`Error fetching cart items: ${response.status} - ${errorText}`
				);
				throw new Error(`Failed to fetch cart items: ${response.status}`);
			}

			const data = await response.json();
			setCartItemCount(data.length);
		} catch (error) {
			console.error("Error fetching cart items:", error);
		}
	};

	const handleCartClick = (e) => {
		e.preventDefault();
		if (!userId || !token) {
			alert("Please log in to view your cart.");
			return;
		}
		navigate("/cart");
	};

	const handleLogout = () => {
		const confirmLogout = window.confirm("Are you sure you want to logout?");
		if (confirmLogout) {
			localStorage.removeItem("token");
			localStorage.removeItem("role");
			navigate("/");
		}
	};

	function classNames(...classes) {
		return classes.filter(Boolean).join(" ");
	}

	return (
		<>
			<Disclosure as="nav" className="bg-gray-800">
				<div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
					<div className="relative flex h-16 items-center justify-between">
						<div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
							<DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
								<span className="absolute -inset-0.5" />
								<span className="sr-only">Open main menu</span>
								<Bars3Icon
									aria-hidden="true"
									className="block h-6 w-6 group-data-[open]:hidden"
								/>
								<XMarkIcon
									aria-hidden="true"
									className="hidden h-6 w-6 group-data-[open]:block"
								/>
							</DisclosureButton>
						</div>
						<div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
							<div className="flex flex-shrink-0 items-center">
								<a>
									<motion.div
										whileHover={{ scale: 1.05 }}
										transition={{ duration: 0.2 }}
									>
										<img
											alt="9Flowers.Online"
											src="/logo.jpeg"
											className="h-10 w-auto rounded-md cursor-pointer"
										/>
									</motion.div>
								</a>
							</div>
							<div className="hidden sm:flex sm:items-center flex-1">
								<motion.span
									className="text-white text-xl font-bold text-gray-300 hover:text-white rounded-md px-3 py-1 text-sm font-medium transition duration-300 ease-in-out"
									whileHover={{ scale: 1.05 }}
									transition={{ duration: 0.2 }}
								>
									<a href="/">9Flowers.Online</a>
								</motion.span>
							</div>
							<div className="hidden sm:ml-6 sm:block">
								<div className="flex space-x-4">
									{navigation.map((item) => {
										if (item.name === "All products" && !token) {
											return null; // Hide "All products" if user is not logged in
										}
										return (
											<motion.a
												key={item.name}
												href={item.href}
												aria-current={item.current ? "page" : undefined}
												className={classNames(
													item.current
														? "bg-indigo-600 text-white"
														: "text-gray-300 hover:bg-gray-700 hover:text-white",
													"rounded-md px-3 py-2 text-sm font-medium transition duration-300 ease-in-out"
												)}
												whileHover={{
													scale: 1.05,
													backgroundColor: item.current
														? "bg-indigo-500"
														: "bg-gray-600",
												}}
											>
												{item.name}
											</motion.a>
										);
									})}
								</div>
							</div>
						</div>
						{token && (
							<div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
								<motion.a
									href="#"
									onClick={handleCartClick}
									className={`relative rounded-full p-1 ${
										cartItemCount > 0 ? "bg-green-600" : "bg-gray-800"
									} text-gray-400 hover:text-white`}
								>
									<FontAwesomeIcon icon={faShoppingCart} className="h-6 w-6" />{" "}
									{cartItemCount > 0 && (
										<motion.span
											className="absolute top-0 right-0 inline-block w-3 h-3 bg-red-600 rounded-full"
											animate={{ scale: [1, 1.2, 1] }}
											transition={{
												duration: 0.5,
												repeat: Infinity,
												ease: "easeInOut",
											}}
										/>
									)}
									<span className="sr-only">Cart</span>
								</motion.a>
								<Menu as="div" className="relative ml-3">
									<div>
										<MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 overflow-hidden">
											<span className="absolute -inset-1.5" />
											<span className="sr-only">Open user menu</span>
											<motion.img
												alt=""
												src="/profile.jpg"
												className="h-8 w-8 rounded-full transition duration-300 ease-in-out"
												whileHover={{ scale: 1.1 }}
											/>
										</MenuButton>
									</div>
									<MenuItems
										transition
										className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
									>
										<MenuItem>
											<a
												href="/profile"
												className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100"
											>
												Your Profile
											</a>
										</MenuItem>
										<MenuItem>
											<a
												onClick={handleLogout}
												className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 cursor-pointer"
											>
												Sign out
											</a>
										</MenuItem>
									</MenuItems>
								</Menu>
							</div>
						)}
					</div>
				</div>

				{/* Show login message if user is not logged in */}
				{!token && showLoginMessage && (
					<a href="/login">
						<div className="bg-red-500 text-white text-center p-1">
							Please log in to view all products!
						</div>
					</a>
				)}

				<DisclosurePanel className="sm:hidden">
					<div className="space-y-1 px-2 pb-3 pt-2">
						{navigation.map((item) => (
							<Disclosure.Button
								key={item.name}
								as="a"
								href={item.href}
								className={classNames(
									item.current
										? "bg-indigo-600 text-white"
										: "text-gray-300 hover:bg-gray-700 hover:text-white",
									"block rounded-md px-3 py-2 text-base font-medium"
								)}
								aria-current={item.current ? "page" : undefined}
							>
								{item.name}
							</Disclosure.Button>
						))}
					</div>
				</DisclosurePanel>
			</Disclosure>
		</>
	);
};

export default Navbar;
