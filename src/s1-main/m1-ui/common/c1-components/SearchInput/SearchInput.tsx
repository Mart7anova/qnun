import React, {ChangeEvent, useEffect, useState} from 'react';
import {useDebounce} from 's1-main/m2-bll/hooks/useDebonce';
import {useAppDispatch} from 's1-main/m2-bll/store';
import {TextField} from '@mui/material';
import {AnyAction} from 'redux';

type PropsType = {
		setSearch: (value: string) => AnyAction
		setIsSearching?: (isSearching: boolean) => void
}

export const SearchInput = ({setSearch, setIsSearching}: PropsType) => {
		const [searchValue, setSearchValue] = useState('')
		const debouncedValue = useDebounce<string>(searchValue, 500)
		const dispatch = useAppDispatch()

		const onSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
				if (setIsSearching) {
						setIsSearching(true)
				}
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