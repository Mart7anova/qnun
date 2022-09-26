import React, {ChangeEvent, useEffect} from 'react';
import {TextField} from '@mui/material';
import {useDebounce} from 's1-main/m2-bll/hooks/hookDebonce';
import {useAppDispatch} from 's1-main/m2-bll/store';
import {setSearchByName} from 's1-main/m2-bll/reducers/packs-reducer';


export const SearchInput = ({packName}: { packName: string }) => {
		const debouncedValue = useDebounce<string>(packName, 500)
		const dispatch = useAppDispatch()

		const onSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
				dispatch(setSearchByName(e.currentTarget.value))
		}

		useEffect(() => {
				dispatch(setSearchByName(debouncedValue))
		}, [debouncedValue])

		return (
				<TextField placeholder="Provide your text"
				           size={'small'}
				           value={packName}
				           onChange={onSearchChange}
				           style={{margin: '0'}}
				/>
		);
};