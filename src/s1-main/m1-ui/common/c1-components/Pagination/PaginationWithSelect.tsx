import React, {ChangeEvent} from 'react';
import {Paginator} from "./Pagination";
import {FormControl, InputLabel, Select, SelectChangeEvent} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";


interface IProps {
    page: number
    elementsPerPage: number
    onPageChange: (event: ChangeEvent<unknown>, page: number) => void
    totalItemsCount: number
    label: string
    onChangeItemsPerPage: (event: SelectChangeEvent<number>) => void

}

export const PaginationWithSelect = ({
                                         page,
                                         elementsPerPage,
                                         onPageChange,
                                         totalItemsCount,
                                         label,
                                         onChangeItemsPerPage
                                     }: IProps) => {
    return (
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <Paginator currentPage={page}
                       elementsPerPage={elementsPerPage}
                       onPageChange={onPageChange}
                       itemsTotalCount={totalItemsCount}/>
            <FormControl size="small">
                <InputLabel id='labelForSelect'>{label}</InputLabel>
                <Select
                    value={elementsPerPage}
                    label={label}
                    labelId='labelForSelect'
                    onChange={(e) => onChangeItemsPerPage(e)}
                >
                    <MenuItem value={10}>10</MenuItem>
                    <MenuItem value={20}>20</MenuItem>
                    <MenuItem value={30}>30</MenuItem>
                    <MenuItem value={40}>40</MenuItem>
                    <MenuItem value={50}>50</MenuItem>
                </Select>
            </FormControl>
        </div>
    );
};
