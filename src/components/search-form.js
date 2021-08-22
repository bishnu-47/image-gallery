import React, { useState } from "react";

export default function SearchForm({ search }) {
	const [searchTerm, setSearchTerm] = useState("");

	function onSubmitHandler(e) {
		e.preventDefault();

		search(searchTerm);
	}

	return (
		<div className="p-8">
			<form
				className="bg-white flex items-center rounded-full shadow-xl"
				onSubmit={onSubmitHandler}
			>
				<input
					className="rounded-l-full w-full py-4 px-6 text-gray-700 leading-tight focus:outline-none"
					id="search"
					type="text"
					placeholder="Search"
					onChange={(e) => setSearchTerm(e.target.value)}
				/>

				<div className="p-4">
					<button className="bg-secondary-main text-white rounded-full p-2 hover:bg-secondary-light focus:outline-none w-12 h-12 flex items-center justify-center">
						<i className="fa fa-search" aria-hidden="true"></i>
					</button>
				</div>
			</form>
		</div>
	);
}
