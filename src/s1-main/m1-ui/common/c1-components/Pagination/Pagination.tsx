import React from 'react';
import {Pagination} from '@mui/material';


type PaginationPropsType = {
		itemsTotalCount: number
		elementsPerPage: number
		currentPage: number
		onPageChange: (event: React.ChangeEvent<unknown>, page: number) => void
}
export const Paginator = ({itemsTotalCount, elementsPerPage,currentPage,onPageChange}: PaginationPropsType) => {
		return (
				<Pagination count={Math.ceil(itemsTotalCount / elementsPerPage)}
				            page={currentPage}
				            onChange={onPageChange}
							style={{margin: '20px 0'}}
				/>
		)
}
