import React, {useState} from 'react';
import {Checkbox} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import TableCell from '@mui/material/TableCell';
import {setSortPacks} from '../../s1-main/m2-bll/reducers/packs-reducer';
import {useAppDispatch} from '../../s1-main/m2-bll/store';

type PropsType = {
    name: string
    align: 'left' | 'right' | 'center'
    sortName: string
    className: string
}

export const PackTableHeader = ({name, align, sortName, className}: PropsType) => {
    const [isSortHeader, setIsSortHeader] = useState(true)
    const dispatch = useAppDispatch()

    const onChangeSortPacks = (sortHeader: boolean, sortName: string) => {
        let sortValue

        if (sortHeader) {
            sortValue = '1' + sortName
        } else {
            sortValue = '0' + sortName
        }

        dispatch(setSortPacks(sortValue))
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
