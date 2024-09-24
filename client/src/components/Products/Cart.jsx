/* eslint-disable jsx-a11y/no-redundant-roles */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import Navbar from "../Common/Navbar";

const Cart = () => {
	const [cartItems, setCartItems] = useState([
		{
			id: 1,
			name: "Basic Tee",
			price: 32.0,
			size: "Large",
			color: "Sienna",
			quantity: 1,
			image:
				"https://tailwindui.com/img/ecommerce-images/shopping-cart-page-01-product-01.jpg",
			stock: true,
			deliveryEstimate: true,
		},
		{
			id: 2,
			name: "Basic Tee",
			price: 32.0,
			size: "Large",
			color: "Black",
			quantity: 1,
			image:
				"https://tailwindui.com/img/ecommerce-images/shopping-cart-page-01-product-02.jpg",
			stock: true,
		},
		{
			id: 3,
			name: "Nomad Tumbler",
			price: 35.0,
			size: "",
			color: "White",
			quantity: 1,
			image:
				"https://tailwindui.com/img/ecommerce-images/shopping-cart-page-01-product-03.jpg",
			stock: true,
		},
	]);

	const calculateSubtotal = () => {
		return cartItems.reduce(
			(total, item) => total + item.price * item.quantity,
			0
		);
	};

	return (
		<div className="bg-white">
			<Navbar />

			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
				<h1 className="text-3xl font-bold tracking-tight text-gray-900">
					Shopping Cart
				</h1>

				<div className="mt-6 lg:grid lg:grid-cols-12 lg:gap-x-12">
					<section aria-labelledby="cart-heading" className="lg:col-span-7">

						<h2 id="cart-heading" className="sr-only">
							Items in your shopping cart
						</h2>

						<ul
							role="list"
							className="divide-y divide-gray-200 border-t border-b border-gray-200"
						>
							{cartItems.map((item) => (
								<li key={item.id} className="flex py-3 sm:py-10">
									<div className="flex-shrink-0">
										<img
											src={item.image}
											alt={item.name}
											className="h-24 w-24 rounded-md object-cover object-center sm:h-48 sm:w-48"
										/>
									</div>

									<div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
										<div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
											<div>
												<div className="flex justify-between">
													<h3 className="text-sm">
														<a
															href="#"
															className="font-medium text-gray-700 hover:text-gray-800"
														>
															{item.name}
														</a>
													</h3>
												</div>
												<div className="mt-1 flex text-sm">
													<p className="text-gray-500">{item.color}</p>
													{item.size && (
														<p className="ml-4 border-l border-gray-200 pl-4 text-gray-500">
															{item.size}
														</p>
													)}
												</div>
												<p className="mt-1 text-sm font-medium text-gray-900">
													${item.price.toFixed(2)}
												</p>
											</div>

											<div className="mt-4 sm:mt-0 sm:pr-9">
												<label
													htmlFor={`quantity-${item.id}`}
													className="sr-only"
												>
													Quantity, {item.name}
												</label>
												<select
													id={`quantity-${item.id}`}
													name={`quantity-${item.id}`}
													className="rounded-md border border-gray-300 px-2 py-1.5 text-left text-base leading-5 text-gray-700 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
													value={item.quantity}
													onChange={(e) => {
														const newQuantity = parseInt(e.target.value, 10);
														setCartItems((prev) =>
															prev.map((i) =>
																i.id === item.id
																	? { ...i, quantity: newQuantity }
																	: i
															)
														);
													}}
												>
													{[1, 2, 3, 4, 5].map((qty) => (
														<option key={qty} value={qty}>
															{qty}
														</option>
													))}
												</select>

												<div className="absolute top-0 right-0">
													<button
														type="button"
														className="-m-2 inline-flex p-2 text-gray-400 hover:text-gray-500"
														onClick={() =>
															setCartItems(
																cartItems.filter((i) => i.id !== item.id)
															)
														}
													>
														<span className="sr-only">Remove</span>
														<svg
															className="h-5 w-5"
															xmlns="http://www.w3.org/2000/svg"
															fill="none"
															viewBox="0 0 24 24"
															stroke="currentColor"
															aria-hidden="true"
														>
															<path
																strokeLinecap="round"
																strokeLinejoin="round"
																strokeWidth={2}
																d="M6 18L18 6M6 6l12 12"
															/>
														</svg>
													</button>
												</div>
											</div>
										</div>

										<p className="mt-4 flex space-x-2 text-sm text-gray-700">
											{item.stock ? (
												<span className="text-green-500">
													{item.deliveryEstimate}
												</span>
											) : (
												<span className="text-red-500">Out of stock</span>
											)}
										</p>
									</div>
								</li>
							))}
						</ul>
					</section>

					{/* Order summary */}
					<section
						aria-labelledby="summary-heading"
						className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8"
					>
						<h2
							id="summary-heading"
							className="text-lg font-medium text-gray-900"
						>
							Order summary
						</h2>

						<dl className="mt-6 space-y-4">
							<div className="flex items-center justify-between">
								<dt className="text-sm text-gray-600">Subtotal</dt>
								<dd className="text-sm font-medium text-gray-900">
									${calculateSubtotal().toFixed(2)}
								</dd>
							</div>
							<div className="flex items-center justify-between border-t border-gray-200 pt-4">
								<dt className="flex text-sm text-gray-600">
									<span>Shipping estimate</span>
								</dt>
								<dd className="text-sm font-medium text-gray-900">$5.00</dd>
							</div>
							<div className="flex items-center justify-between border-t border-gray-200 pt-4">
								<dt className="flex text-sm text-gray-600">
									<span>Tax estimate</span>
								</dt>
								<dd className="text-sm font-medium text-gray-900">$8.32</dd>
							</div>
							<div className="flex items-center justify-between border-t border-gray-200 pt-4">
								<dt className="text-base font-medium text-gray-900">
									Order total
								</dt>
								<dd className="text-base font-medium text-gray-900">
									${(calculateSubtotal() + 5 + 8.32).toFixed(2)}
								</dd>
							</div>
						</dl>

						<div className="mt-6">
							<button
								type="button"
								className="w-full rounded-md border border-transparent bg-indigo-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
							>
								Checkout
							</button>
						</div>
					</section>
				</div>
			</div>
		</div>
	);
};

export default Cart;
