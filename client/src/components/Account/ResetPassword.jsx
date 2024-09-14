import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function ResetPassword() {
	const [email, setEmail] = useState(""); // Ensure email is included
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const navigate = useNavigate();

	const handleResetPassword = (e) => {
		e.preventDefault();

		if (password !== confirmPassword) {
			alert("Passwords do not match!");
			return;
		}

		fetch("http://localhost:8080/api/users/reset-password", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ email, password }), // Send email and password
		}).then((response) => {
			if (response.status === 200) {
				alert("Password reset successfully! Redirecting to login.");
				navigate("/login");
			} else {
				alert("Error resetting password.");
			}
		});
	};

	return (
		<div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
			<div className="sm:mx-auto sm:w-full sm:max-w-sm">
				<h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Reset Your Password
        </h2>
			</div>

			<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
				<form onSubmit={handleResetPassword} className="space-y-6">
					<div>
						<label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
							Email address
						</label>
							<input
                className="form-control block w-full rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								id="email"
								name="email"
								type="email"
                placeholder='example@email.com'
								required
								autoComplete="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
					</div>

					<div>
						<label
							htmlFor="password"
							className="block text-sm font-medium leading-6 text-gray-900"
						>
							New Password
						</label>
							<input
                className="form-control block w-full rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								autoComplete="current-password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								name="password"
                placeholder='**************'
								type="password"
								id="password"
								required
							/>
					</div>

					<div>
						<label
							htmlFor="password"
							className="block text-sm font-medium leading-6 text-gray-900"
						>
							Confirm Password
						</label>
						<input
							className="form-control block w-full rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
							onChange={(e) => setConfirmPassword(e.target.value)}
							autoComplete="current-password"
							value={confirmPassword}
							id="password"
              placeholder='**************'
							name="password"
							type="password"
							required
						/>
					</div>
					<div className="mt-6 flex items-center justify-end gap-x-6">
            <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
              <a href="/">
                Cancel
              </a>
            </button>
            <button
              type="submit"
              className="btn btn-primary"
            >
              Reset
            </button>
          </div>
				</form>
			</div>
		</div>
	);
}

export default ResetPassword;
