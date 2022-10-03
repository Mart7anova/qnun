import React, {useState} from 'react';
import {Checkbox} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import TableCell from '@mui/material/TableCell';
import {useAppDispatch} from '../../../../m2-bll/store';
import {AnyAction} from 'redux';

type PropsType = {
    name: string
    align: 'left' | 'right' | 'center'
    sortName: string
    setSort: (sortValue: string) => AnyAction
    className: string
}

export const TableHeaderItem = ({name, align, sortName, className, setSort}: PropsType) => {
    const [isSortHeader, setIsSortHeader] = useState(true)
    const dispatch = useAppDispatch()

    const onChangeSortPacks = (sortHeader: boolean, sortName: string) => {
        let sortValue

        if (sortHeader) {
            sortValue = '1' + sortName
        } else {
            sortValue = '0' + sortName
        }
        dispatch(setSort(sortValue))
    }

    return (
        <TableCell align={align} className={className}>
            {name}
            <Checkbox icon={<KeyboardArrowDownIcon/>}
                      checkedIcon={<KeyboardArrowUpIcon/>}
                      color={'default'}
                      onClick={() => setIsSortHeader(!isSortHeader)}
                      onChange={() => onChangeSortPacks(isSortHeader, sortName)}
            />
        </TableCell>
    );
};
