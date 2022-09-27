import React, {ChangeEvent, useEffect, useState} from 'react';
import {useDebounce} from '../../../../m2-bll/hooks/hookDebonce';
import {useAppDispatch} from '../../../../m2-bll/store';
import {TextField} from '@mui/material';
import {AnyAction} from 'redux';

type PropsType={
    setSearch: (value: string) => AnyAction
}

export const SearchInput = ({setSearch}: PropsType) => {
    const [searchValue, setSearchValue] = useState('')
    const debouncedValue = useDebounce<string>(searchValue, 500)
    const dispatch = useAppDispatch()

    const onSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.currentTarget.value)
    }

    useEffect(() => {
        dispatch(setSearch(searchValue))
    }, [debouncedValue])

    return (
        <TextField placeholder="Provide your text"
                   size={'small'}
                   value={searchValue}
                   onChange={onSearchChange}
                   style={{margin: '0'}}
        />
    );
};