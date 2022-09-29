import React from 'react';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import {Skeleton} from '@mui/material';

type SkeletonTableRow = {
		elementsPerPage: number
}
export const SkeletonTableRow = React.memo(({elementsPerPage = 10}: SkeletonTableRow) => {
		const fakeArray = []
		for (let i = 0; i < elementsPerPage; i++) {
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