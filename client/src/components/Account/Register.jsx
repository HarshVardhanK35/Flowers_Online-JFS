/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
	const [title, setTitle] = useState("None");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [phone, setPhone] = useState("");
	const [city, setCity] = useState("");
	const [availableShops, setAvailableShops] = useState([]);
	const [acceptedTerms, setAcceptedTerms] = useState(false);
	const [emailExists, setEmailExists] = useState(false);
	const [confirmNoShop, setConfirmNoShop] = useState(false);

	const navigate = useNavigate();

	const fetchShopsByCity = async (selectedCity) => {
		try {
			const response = await fetch(
				`http://localhost:8080/api/shops/city/${selectedCity}`
			);
			if (response.ok) {
				const data = await response.json();
				setAvailableShops(data);
			} else {
				setAvailableShops([]); // No shops found
			}
		} catch (error) {
			console.error("Error fetching shops:", error);
		}
	};

	const handleCityChange = (e) => {
		const selectedCity = e.target.value;
		setCity(selectedCity);
		fetchShopsByCity(selectedCity);
	};
	// console.log(availableShops)

	const handleRegister = (e) => {
		e.preventDefault();

		if (password !== confirmPassword) {
			alert("Passwords do not match!");
			return;
		}

		// Check if no shops are available for the selected city
		if (availableShops.length === 0) {
			const proceed = window.confirm(
				"No shops available at your location! Would you like to proceed with the registration anyway?"
			);

			if (!proceed) {
				return; // Stop registration if the user doesn't confirm
			}
		}

		// Continue with existing registration process...
		fetch(`http://localhost:8080/api/users/check-email?email=${email}`)
			.then((response) => response.json())
			.then((data) => {
				if (data.exists) {
					setEmailExists(true);
				} else {
					const userData = {
						title,
						firstName,
						lastName,
						email,
						password,
						phone,
						city,
					};

					fetch("http://localhost:8080/api/users/register", {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify(userData),
					})
						.then((response) => response.json())
						.then(() => {
							localStorage.setItem("userCity", city); // Save the user's city to localStorage

							alert("Account created successfully! Please log in.");
							navigate("/login");
						});
				}
			})
			.catch((error) => {
				console.error("Error checking email:", error);
			});
	};

	return (
		<div className="flex justify-center items-center min-h-screen">
			<form
				className="max-w-3xl w-full p-6 bg-white shadow-lg rounded-lg"
				onSubmit={handleRegister}
			>
				<h2 className="mt-0 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
					Register here
				</h2>
				<div className="space-y-10">
					<div className="border-b border-gray-900/10 pb-10">
						<h2 className="text-base font-semibold leading-7 text-gray-900">
							Personal Information
						</h2>
						<p className="mt-1 text-sm leading-6 text-gray-600">
							Use a permanent address where you can receive mail.
						</p>

						<div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-5">
							<div className="sm:col-span-1">
								<label
									htmlFor="title"
									className="block text-sm font-medium leading-6 text-gray-900"
								>
									Title
								</label>
								<div className="mt-2">
									<select
										id="title"
										name="title"
										autoComplete="title"
										value={title}
										onChange={(e) => setTitle(e.target.value)}
										required
										className="form-control block w-full rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
									>
										<option>None</option>
										<option>Mr.</option>
										<option>Mrs.</option>
									</select>
								</div>
							</div>

							<div className="sm:col-span-2">
								<label
									htmlFor="first-name"
									className="block text-sm font-medium leading-6 text-gray-900"
								>
									First name
								</label>
								<div className="mt-2">
									<input
										id="first-name"
										name="first-name"
										type="text"
										value={firstName}
										onChange={(e) => setFirstName(e.target.value)}
										required
										autoComplete="given-name"
										className="form-control block w-full rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
									/>
								</div>
							</div>

							<div className="sm:col-span-2">
								<label
									htmlFor="last-name"
									className="block text-sm font-medium leading-6 text-gray-900"
								>
									Last name
								</label>
								<div className="mt-2">
									<input
										id="last-name"
										name="last-name"
										type="text"
										value={lastName}
										onChange={(e) => setLastName(e.target.value)}
										required
										autoComplete="family-name"
										className="form-control block w-full rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
									/>
								</div>
							</div>

							<div className="sm:col-span-4">
								<label
									htmlFor="email"
									className="block text-sm font-medium leading-6 text-gray-900"
								>
									Email address
								</label>
								<div className="mt-2">
									<input
										className={`${
											emailExists ? "is-invalid" : ""
										} form-control block w-full rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
										onChange={(e) => setEmail(e.target.value)}
										autoComplete="email"
										value={email}
										name="email"
										type="email"
										id="email"
										required
									/>
									{emailExists && (
										<div className="invalid-feedback">
											Email already exists!
										</div>
									)}
								</div>
							</div>

							<div className="sm:col-span-2">
								<label
									htmlFor="password"
									className="block text-sm font-medium leading-6 text-gray-900"
								>
									Enter password
								</label>
								<div className="mt-2">
									<input
										id="password"
										name="password"
										type="password"
										autoComplete="password"
										value={password}
										onChange={(e) => setPassword(e.target.value)}
										required
										className="form-control block w-full rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
									/>
								</div>
							</div>

							<div className="sm:col-span-2">
								<label
									htmlFor="password"
									className="block text-sm font-medium leading-6 text-gray-900"
								>
									Confirm password
								</label>
								<div className="mt-2">
									<input
										id="password"
										name="password"
										type="password"
										autoComplete="confirm-password"
										value={confirmPassword}
										onChange={(e) => setConfirmPassword(e.target.value)}
										required
										className="form-control block w-full rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
									/>
								</div>
							</div>

							<div className="sm:col-span-4">
								<label
									htmlFor="phone"
									className="block text-sm font-medium leading-6 text-gray-900"
								>
									Enter contact number
								</label>
								<input
									type="tel"
									className="form-control"
									pattern="[6789][0-9]{9}"
									value={phone}
									onChange={(e) => setPhone(e.target.value)}
									required
								/>
							</div>

							<div className="sm:col-span-4">
								<label
									htmlFor="city"
									className="block text-sm font-medium leading-6 text-gray-900"
								>
									Enter your city name
								</label>
								<div className="mt-2">
									<select
										className="form-control block w-full rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
										id="city"
										name="city"
										autoComplete="city"
										value={city}
										onChange={handleCityChange}
										required
									>
										<option value="">Select City</option>
										<option>Vizag</option>
										<option>Pune</option>
										<option>Hyderabad</option>
										<option>Mumbai</option>
										<option>Chennai</option>
										<option>Kolkata</option>
										<option>Bangalore</option>
										<option>Greater-Noida</option>
										<option>Kochin</option>
										<option>Ahmedabad</option>
										<option>Haryana</option>
										<option>Goa</option>
									</select>
									{availableShops.length > 0 ? (
										<div className="mt-2 text-xs font-light">
											<p className="">Available shops in {city}:</p>
											<ul>
												{availableShops.map((shop) => (
													<li key={shop.id} className="font-medium">
														{shop.name} - {shop.address}
													</li>
												))}
											</ul>
										</div>
									) : (
										city && (
											<p className="mt-2 text-sm text-red-500">
												No shops available at your location.
											</p>
										)
									)}
								</div>
							</div>

							<div className="sm:col-span-5">
								<div className="flex items-start">
									<div className="flex h-5 items-center">
										<input
											type="checkbox"
											id="terms"
											className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
											checked={acceptedTerms}
											onChange={() => setAcceptedTerms(!acceptedTerms)}
											required
										/>
									</div>
									<div className="ml-3 text-sm">
										<label
											htmlFor="terms"
											className="font-medium text-gray-700"
										>
											I accept the terms and conditions
										</label>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="mt-6 flex items-center justify-end gap-x-6">
					<button
						type="button"
						className="text-sm font-semibold leading-6 text-gray-900"
						onClick={() => navigate("/")}
					>
						Cancel
					</button>
					<button
						type="submit"
						className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
					>
						Save
					</button>
				</div>
			</form>
		</div>
	);
}
