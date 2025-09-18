/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
	Disclosure,
	DisclosureButton,
	DisclosurePanel,
	Menu,
	MenuButton,
	MenuItem,
	MenuItems,
} from "@headlessui/react";

const AdminNavbar = () => {
	const navigate = useNavigate();

	const navigation = [
		{ name: "Dashboard", href: "/admin", current: false },
		{ name: "Categories", href: "/categories", current: false },
		{ name: "Users", href: "/user-profiles", current: false },
	];

	const handleLogout = () => {
		if (window.confirm("Are you sure you want to logout!")) {
			localStorage.removeItem("token");
			localStorage.removeItem("role");
			navigate("/");
		}
	};

	function classNames(...classes) {
		return classes.filter(Boolean).join(" ");
	}

	return (
		<div>
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
								<a href="/">
									<motion.div // Wrap the image in motion.div
										initial={{ opacity: 0, scale: 0.8 }} // Start slightly smaller and transparent
										whileHover={{ scale: 1.05 }}
										transition={{ duration: 0.2 }}
										animate={{ opacity: 1, scale: 1 }} // Animate to full size and opacity // Smooth animation
									>
										<img
											alt="9Flowers.Online"
											src="/logo.jpeg"
											className="h-8 w-auto rounded-md"
										/>
									</motion.div>
								</a>
							</div>

							<div className="hidden sm:flex sm:items-center flex-1">
								<motion.span // Wrap the Dashboard link
									whileHover={{ scale: 1.05 }} // Scale up slightly on hover
									transition={{ duration: 0.2 }}
									className="text-white text-xl font-bold text-gray-300 hover:text-white rounded-md px-3 py-1 text-sm font-medium"
								>
									<a href="/admin">Dashboard</a>
								</motion.span>
							</div>

							<div className="hidden sm:ml-1 sm:block">
								<div className="flex space-x-3">
									{navigation.map((item) => (
										<motion.a
											key={item.name}
											href={item.href}
											aria-current={item.current ? "page" : undefined}
											className={classNames(
												item.current
													? "bg-gray-900 text-white"
													: "text-gray-300 hover:bg-gray-700 hover:text-white",
												"rounded-md px-3 py-2 text-sm font-medium"
											)}
											whileHover={{ scale: 1.05 }}
											transition={{ duration: 0.2 }}
										>
											{item.name}
										</motion.a>
									))}
								</div>
							</div>
						</div>

						<div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
							<a href="/notifications">
								<motion.button
									type="button"
									className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
									whileHover={{ scale: 1.1 }} // Scale up slightly on hover
									transition={{ duration: 0.2 }}
								>
									<span className="absolute -inset-1.5" />
									<span className="sr-only">View notifications</span>
									<BellIcon aria-hidden="true" className="h-6 w-6" />
								</motion.button>
							</a>

							<Menu as="div" className="relative ml-2">
								<div>
									<MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
										<span className="absolute -inset-1.5" />
										<span className="sr-only">Open user menu</span>
										<img
											alt="Profile Pic"
											src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
											className="h-8 w-8 rounded-full"
										/>
									</MenuButton>
								</div>
								<MenuItems
									className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
									initial={{ opacity: 0, scale: 0.9 }} // Start smaller and transparent
									animate={{ opacity: 1, scale: 1 }} // Animate to full size and opacity
									exit={{ opacity: 0, scale: 0.9 }} // Animate back out when closing
									transition={{ duration: 0.2, ease: "easeInOut" }}
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
					</div>
				</div>

				<DisclosurePanel
					className="sm:hidden"
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: -20 }}
					transition={{ duration: 0.3, ease: "easeInOut" }}
				>
					<div className="space-y-1 px-2 pb-3 pt-2">
						{navigation.map((item) => (
							<DisclosureButton
								key={item.name}
								as="a"
								href={item.href}
								aria-current={item.current ? "page" : undefined}
								className={classNames(
									item.current
										? "bg-gray-900 text-white"
										: "text-gray-300 hover:bg-gray-700 hover:text-white",
									"block rounded-md px-3 py-2 text-base font-medium"
								)}
							>
								{item.name}
							</DisclosureButton>
						))}
					</div>
				</DisclosurePanel>
			</Disclosure>
		</div>
	);
};

export default AdminNavbar;
