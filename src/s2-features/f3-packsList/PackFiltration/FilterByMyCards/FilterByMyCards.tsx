import React from 'react';
import {Button, ButtonGroup} from '@mui/material';
import {useAppDispatch, useAppSelector} from '../../../../s1-main/m2-bll/store';
import {getProfileId} from '../../../../s1-main/m2-bll/selectors/profile-selectors';
import {getPacksForUserId} from '../../../../s1-main/m2-bll/selectors/packs-selectors';
import {setIsMyPacksFilter} from '../../../../s1-main/m2-bll/reducers/packs-reducer';

const FilterByMyCards = () => {
    const profileId = useAppSelector(getProfileId)
    const packsForUserId = useAppSelector(getPacksForUserId)
    const dispatch = useAppDispatch()

    const onIsMyPacksFilterChange = (profileId: string) => {
        dispatch(setIsMyPacksFilter(profileId))
    }
    return (
        <ButtonGroup color="primary">
            <Button variant={packsForUserId !== '' ? 'contained' : 'outlined'}
                    onClick={()=>onIsMyPacksFilterChange(profileId)}>
                My
            </Button>
            <Button variant={packsForUserId === '' ? 'contained' : 'outlined'}
                    onClick={()=>onIsMyPacksFilterChange('')}>
                All
            </Button>
        </ButtonGroup>
    );
};

export default FilterByMyCards;