import React from "react";
import { Spin } from "antd";

const Loading = ({ size }) => {
	return (
		<div className="mt-12 text-3xl font-semibold text-gray-800 text-center">
			<div className="example">
				<Spin size={size} />
			</div>
			Loading...
		</div>
	);
};

export default Loading;
