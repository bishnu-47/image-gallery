import React from "react";
import { Pagination } from "antd";

const PaginationSection = ({
	pageNum,
	itemsPerPage,
	setPageNum,
	setItemsPerPage,
}) => {
	return (
		<div className="w-full mx-auto py-8 text-center">
			<Pagination
				current={pageNum}
				pageSize={itemsPerPage}
				total={200}
				onChange={(page, pageSize) => setPageNum(page)}
				onShowSizeChange={(current, size) => setItemsPerPage(size)}
			/>
		</div>
	);
};

export default PaginationSection;
