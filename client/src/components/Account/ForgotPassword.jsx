/* eslint-disable jsx-a11y/anchor-has-content */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
	const [email, setEmail] = useState("");
	const navigate = useNavigate();

	const handleForgotPassword = (e) => {
		e.preventDefault();

		fetch("http://localhost:8080/api/users/forgot-password", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ email }),
		}).then((response) => {

      if (response.status === 200) {
				alert("Email verified. Redirecting to reset password.");
				navigate("/reset-password");
			} else {
				alert("Email not found.");
			}
		});
	};

	return (
		<div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
			<div className="sm:mx-auto sm:w-full sm:max-w-sm">
				<h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
					Forgot Password ?
				</h2>
			</div>

			<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
				<form onSubmit={handleForgotPassword} className="space-y-6">
					<div>
						<label
							htmlFor="email"
							className="block text-sm font-medium leading-6 text-gray-900"
						>
							Email address
						</label>
						<input
							className="form-control block w-full rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
							id="email"
							placeholder="Validate your email address"
							name="email"
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
						/>
					</div>
					<div className="mt-6 flex items-center justify-end gap-x-6">
						<button
							type="button"
							className="text-sm font-semibold leading-6 text-gray-900"
						>
							<a href="/login">Cancel</a>
						</button>
						<button type="submit" className="btn btn-primary">
							Validate
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default ForgotPassword;
