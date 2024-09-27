/* eslint-disable jsx-a11y/no-redundant-roles */
/* eslint-disable no-unused-vars */
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
	Dialog,
	DialogBackdrop,
	DialogPanel,
	DialogTitle,
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
	const [cartItems, setCartItems] = useState([]);
	const [openCart, setOpenCart] = useState(false);

	useEffect(() => {
		const storedToken = localStorage.getItem("token");
		const storedUserId = localStorage.getItem("userId");

		setUserId(storedUserId);
		setToken(storedToken);
	}, []);

	useEffect(() => {
		if (userId) {
			const fetchCartItems = async () => {
				const response = await fetch(`/api/cart/${userId}`, {
					headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
				});
				const data = await response.json();
				setCartItems(data);
			};

			fetchCartItems();
		}
	}, [userId]);

	const navigation = [
		{ name: "About", href: "/about", current: false },
		{ name: "Contact", href: "/contact", current: false },
	];

	function classNames(...classes) {
		return classes.filter(Boolean).join(" ");
	}

	useEffect(() => {
		const storedCart = JSON.parse(localStorage.getItem("cart"));
		setCartItems(storedCart ? storedCart.length : 0);
	}, []);

	const handleCartClick = (e) => {
		e.preventDefault();
		if (cartItems === 0) {
			alert("Your cart is empty.");
		} else {
			setOpenCart(true); // Open the cart sidebar
		}
	};

	const handleLogout = () => {
		const bool = window.confirm("Are you sure you want to logout!");
		if (bool) {
			localStorage.removeItem("token");
			localStorage.removeItem("role");
			navigate("/");
		}
	};

  const handleRemoveFromCart = async (productId, size) => {
    const response = await fetch(`/api/cart/${userId}/remove`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ productId, size }),
    });

    if (response.ok) {
      setCartItems(cartItems.filter(item => !(item.product.id === productId && item.size === size)));
    } else {
      alert("Failed to remove item from cart.");
    }
  };

	const closeCart = () => {
		setOpenCart(false);
	};

  // const calculateSubtotal = (cartItems) => {
  //   return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  // };

  // const cartTotal = calculateSubtotal(cartItems);
  const cartTotal = null;

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
									{navigation.map((item) => (
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
									))}
								</div>
							</div>
						</div>
						{token && (
							<div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
								<motion.a
									href="#"
									onClick={handleCartClick} // Click to open cart
									className={`relative rounded-full p-1 ${
										cartItems > 0 ? "bg-green-600" : "bg-gray-800"
									} text-gray-400 hover:text-white`}
								>
									<FontAwesomeIcon icon={faShoppingCart} className="h-6 w-6" />{" "}
									{cartItems > 0 && (
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
				<DisclosurePanel className="sm:hidden">
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

			{/* Cart Sidebar */}
			<Dialog open={openCart} onClose={setOpenCart} className="relative z-10">
				<DialogBackdrop
					transition
					className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity duration-500 ease-in-out data-[closed]:opacity-0"
				/>
				<div className="fixed inset-0 overflow-hidden">
					<div className="absolute inset-0 overflow-hidden">
						<div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
							<DialogPanel
								transition
								className="pointer-events-auto w-screen max-w-md transform transition duration-500 ease-in-out data-[closed]:translate-x-full sm:duration-700"
							>
								<div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
									<div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
										<div className="flex items-start justify-between">
											<DialogTitle className="text-lg font-medium text-gray-900">
												Shopping cart
											</DialogTitle>
											<div className="ml-3 flex h-7 items-center">
												<button
													type="button"
													onClick={() => setOpenCart(false)}
													className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
												>
													<span className="absolute -inset-0.5" />
													<span className="sr-only">Close panel</span>
													<XMarkIcon aria-hidden="true" className="h-6 w-6" />
												</button>
											</div>
										</div>

										<div className="mt-8">
											<div className="flow-root">
												<ul
													role="list"
													className="-my-6 divide-y divide-gray-200"
												>
													{cartItems.length > 0 ? (
														cartItems.map((item) => (
															<li key={item.id} className="flex py-6">
																<div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
																	<img
																		alt={item.product.name}
																		src={item.product.photo}
																		className="h-full w-full object-cover object-center"
																	/>
																</div>

																<div className="ml-4 flex flex-1 flex-col">
																	<div>
																		<div className="flex justify-between text-base font-medium text-gray-900">
																			<h3>{item.product.name}</h3>
																			<p className="ml-4">
																				{item.product.price}{" "}
																				{item.product.currency}
																			</p>
																		</div>
																		<p className="mt-1 text-sm text-gray-500">
																			Size: {item.size}
																		</p>
																	</div>
																	<div className="flex flex-1 items-end justify-between text-sm">
																		<p className="text-gray-500">
																			Qty {item.quantity}
																		</p>

																		<div className="flex">
																			<button
																				type="button"
																				className="font-medium text-indigo-600 hover:text-indigo-500"
																				onClick={() =>
																					handleRemoveFromCart(
																						item.product.id,
																						item.size
																					)
																				}
																			>
																				Remove
																			</button>
																		</div>
																	</div>
																</div>
															</li>
														))
													) : (
														<p>Your cart is empty.</p>
													)}
												</ul>
											</div>
										</div>
									</div>

									<div className="border-t border-gray-200 px-4 py-6 sm:px-6">
										<div className="flex justify-between text-base font-medium text-gray-900">
                      <p>{cartTotal}</p>
										</div>
										<p className="mt-0.5 text-sm text-gray-500">
											Shipping and taxes calculated at checkout.
										</p>
										<div className="mt-6">
											<a
												href="#"
												className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
											>
												Checkout
											</a>
										</div>
										<div className="mt-6 flex justify-center text-center text-sm text-gray-500">
											<p>
												or{" "}
												<button
													type="button"
													onClick={() => setOpenCart(false)}
													className="font-medium text-indigo-600 hover:text-indigo-500"
												>
													Continue Shopping
													<span aria-hidden="true"> &rarr;</span>
												</button>
											</p>
										</div>
									</div>
								</div>
							</DialogPanel>
						</div>
					</div>
				</div>
			</Dialog>
		</>
	);
};

export default Navbar;
