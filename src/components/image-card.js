import React from "react";
import {Tag} from 'antd';

export default function ImageCard({ image }) {
	const tags = image.tags.split(",");

	return (
		<div className="mx-auto max-w-sm rounded-sm shadow-lg overflow-hidden bg-gray-100">
			<img src={image.webformatURL} alt="" className="w-full" />
			<div className="px-6 py-4">
				<h1 className="text-secondary-main font-bold text-2xl">
					Photo by {image.user}
				</h1>

				<ul>
					<li>
						<strong>Views: </strong>
						{image.views}
					</li>
					<li>
						<strong>Downloads: </strong>
						{image.downloads}
					</li>
					<li>
						<strong>Likes: </strong>
						{image.likes}
					</li>
				</ul>

				<div className="px-4 py-6">
					{tags.map((tag, i) => (
						<Tag key={i} color="blue">#{tag}</Tag>
					))}
				</div>
			</div>
		</div>
	);
}
