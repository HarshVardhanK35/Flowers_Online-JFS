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
	const [acceptedTerms, setAcceptedTerms] = useState(false);
	const [emailExists, setEmailExists] = useState(false);

	const navigate = useNavigate();

	const handleRegister = (e) => {
		e.preventDefault();

		// Validate passwords match
		if (password !== confirmPassword) {
			alert("Passwords do not match!");
			return;
		}

		// Check if email is unique
		fetch(`http://localhost:8080/api/users/check-email?email=${email}`)
			.then((response) => response.json())
			.then((data) => {
				if (data.exists) {
					setEmailExists(true);
				} else {
					// Register the user
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
							alert("Account created successfully! Please log in.");
							navigate("/login");
						});
				}
			});
	};

	return (
		<div className="flex justify-center items-center min-h-screen">
			<form
				className="max-w-3xl w-full p-6 bg-white shadow-lg rounded-lg"
				onSubmit={handleRegister}
			>
				<div className="space-y-12">
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

							<div className="sm:col-span-3">
								<label
									htmlFor="email"
									className="block text-sm font-medium leading-6 text-gray-900"
								>
									Email address
								</label>
								<div className="mt-2">
									<input
										id="email"
										name="email"
										type="email"
										value={email}
										onChange={(e) => setEmail(e.target.value)}
										required
										autoComplete="email"
										className="form-control block w-full rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
									/>
								</div>
							</div>

							<div className="sm:col-span-3">
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

							<div className="sm:col-span-3">
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

							<div className="sm:col-span-3">
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

							<div className="sm:col-span-3">
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
										onChange={(e) => setCity(e.target.value)}
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
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="mt-6 flex items-center justify-end gap-x-6">
					<button
						type="button"
						className="text-sm font-semibold leading-6 text-gray-900"
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
