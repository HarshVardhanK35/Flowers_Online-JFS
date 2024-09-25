/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();

	const handleLogin = (e) => {
		e.preventDefault();

		fetch("http://localhost:8080/api/users/login", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ email, password }),
		})
			.then((response) => {
				if (response.status === 200) {
					return response.json();
				} else {
					throw new Error("Invalid login credentials");
				}
			})
			.then((data) => {
				localStorage.setItem("token", data.token);
				localStorage.setItem("role", data.user.role);
				localStorage.setItem("userId", data.user.id);

				if (data.user.role === "ROLE_ADMIN") {
					navigate("/admin");
				} else {
					navigate("/categories");
				}
			})
			.catch((error) => {
				alert(error.message);
			});
	};

	return (
		<div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
			<div className="sm:mx-auto sm:w-full sm:max-w-sm">
				<a href="/" className="-m-1.5 p-1.5">
					<img
						alt="9Flowers.Online"
						src="/logo.jpeg"
						className="mx-auto h-12 w-auto"
					/>
				</a>
				<h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
					Sign in to your account
				</h2>
			</div>
			<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
				<form onSubmit={handleLogin} className="space-y-6">
					<div>
						<label
							htmlFor="email"
							className="block text-sm font-medium leading-6 text-gray-900"
						>
							Email address
						</label>
						<div className="mt-2">
							<input
								className="form-control block w-full rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								onChange={(e) => setEmail(e.target.value)}
								autoComplete="email"
								placeholder="example@email.com"
								value={email}
								type="email"
								required
							/>
						</div>
					</div>
					<div>
						<div className="flex items-center justify-between">
							<label
								htmlFor="password"
								className="block text-sm font-medium leading-6 text-gray-900"
							>
								Password
							</label>
							<div className="text-sm">
								<a
									href="/forgot-password"
									className="font-semibold text-indigo-600 hover:text-indigo-500"
								>
									Forgot password?
								</a>
							</div>
						</div>
						<div className="mt-2">
							<input
								className="form-control block w-full rounded-md border-0.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								onChange={(e) => setPassword(e.target.value)}
								autoComplete="current-password"
								value={password}
								placeholder="**************"
								type="password"
								name="password"
								id="password"
								required
							/>
						</div>
					</div>
					<div>
						<button
							type="submit"
							className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
						>
							Sign in
						</button>
					</div>
				</form>
				<p className="mt-10 text-center text-sm text-gray-500">
					Not a member?{" "}
					<a
						href="/register"
						className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
					>
						Register Here <span aria-hidden="true">→</span>
					</a>
				</p>
				<div className="mt-6 flex items-center justify-end gap-x-6">
					<button
						className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
						onClick={() => navigate("/")}
					>
						Back
					</button>
				</div>
			</div>
		</div>
	);
}
export default Login;
