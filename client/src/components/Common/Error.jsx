/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { useNavigate } from "react-router-dom";


const Error = () => {

  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1)
  }

	return (
		<div>
			<main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
				<div className="text-center">
					<p className="text-base font-semibold text-indigo-600">404</p>
					<h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
						Page not found
					</h1>
					<p className="mt-6 text-base text-gray-600">
						Sorry, we couldn't find the page you're looking for
					</p>
          <p className="text-base text-gray-600">
            or
					</p>
          <p className="text-base text-gray-600">
            This page is still under maintenance.
					</p>
					<div className="mt-8 flex items-center justify-center gap-x-6">
						<button
							onClick={goBack}
							className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
						>
							Back
						</button>
						<a href="/" className="text-sm font-semibold text-gray-900">
							Contact support <span aria-hidden="true">&rarr;</span>
						</a>
					</div>
				</div>
			</main>
		</div>
	);
};

export default Error;
