import React from 'react';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import {Skeleton} from '@mui/material';

type SkeletonTableRow = {
		items: number
		elementsPerPage: number
}
export const SkeletonTableRow = React.memo(({items = 10, elementsPerPage = 10}: SkeletonTableRow) => {
		const fakeArray = []
		const howManyItemsRender = items < 10 ? items : elementsPerPage
		for (let i = 0; i < howManyItemsRender; i++) {
				fakeArray.push(i)
		}
		return (
				<>
						{fakeArray.map(number =>
								<TableRow key={number}>
										<TableCell><Skeleton animation="pulse"/></TableCell>
										<TableCell><Skeleton animation="pulse"/></TableCell>
										<TableCell><Skeleton animation="pulse"/></TableCell>
										<TableCell><Skeleton animation="pulse"/></TableCell>
										<TableCell><Skeleton animation="pulse"/></TableCell>
								</TableRow>
						)}
				</>
		)
})