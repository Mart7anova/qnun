import React from 'react';
import {Button, ButtonGroup} from '@mui/material';
import {useAppDispatch, useAppSelector} from '../../../../s1-main/m2-bll/store';
import {getProfileId} from '../../../../s1-main/m2-bll/selectors/profile-selectors';
import {getPacksForUserId} from '../../../../s1-main/m2-bll/selectors/packs-selectors';
import {setIsMyPacksFilter} from '../../../../s1-main/m2-bll/reducers/packs-reducer';
import {getAppStatus} from '../../../../s1-main/m2-bll/selectors/app-selectors';

export const FilterByMyCards = () => {
    const dispatch = useAppDispatch()

    const profileId = useAppSelector(getProfileId)
    const packsForUserId = useAppSelector(getPacksForUserId)
    const appStatus = useAppSelector(getAppStatus)

    const onIsMyPacksFilterChange = (profileId: string) => {
        dispatch(setIsMyPacksFilter(profileId))
    }

    return (
        <ButtonGroup color="primary" size={'medium'} disabled={appStatus==='loading'}>
            <Button variant={packsForUserId ? 'contained' : 'outlined'}
                    onClick={()=>onIsMyPacksFilterChange(profileId)}>
                My
            </Button>
            <Button variant={!packsForUserId ? 'contained' : 'outlined'}
                    onClick={()=>onIsMyPacksFilterChange('')}>
                All
            </Button>
        </ButtonGroup>
    );
};
