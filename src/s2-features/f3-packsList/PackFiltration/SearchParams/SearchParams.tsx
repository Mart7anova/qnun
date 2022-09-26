import React, {ChangeEvent, useEffect, useState} from 'react';
import {useDebounce} from '../../../../s1-main/m2-bll/hooks/hookDebonce';
import {useAppDispatch} from '../../../../s1-main/m2-bll/store';
import {fetchPacks, setSearchParams} from '../../../../s1-main/m2-bll/reducers/packs-reducer';
import {TextField} from '@mui/material';


export const SearchParams = () => {
    const [searchValue, setSearchValue] = useState('')
    const debouncedValue = useDebounce<string>(searchValue, 500)
    const dispatch = useAppDispatch()

    const onSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.currentTarget.value)
    }

    useEffect(() => {
        dispatch(setSearchParams({packName: searchValue}))
        dispatch(fetchPacks())
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