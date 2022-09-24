import React, {useEffect} from 'react';
import {createNewPack, fetchPacks} from 's1-main/m2-bll/reducers/packs-reducer';
import {useAppDispatch, useAppSelector} from 's1-main/m2-bll/store';
import {PackTable} from 's2-features/f3-packsList/PackTable';
import {Button} from 's1-main/m1-ui/common/c1-components/Button/Button';
import {PackFiltration} from 's2-features/f3-packsList/PackFiltration/PackFiltration';
import {getPacks} from 's1-main/m2-bll/selectors/packs-selectors';
import {getIsLoggedIn} from 's1-main/m2-bll/selectors/auth-selectors';
import {Navigate} from 'react-router-dom';
import {PATH} from 's1-main/m1-ui/u1-Route/Variables/routeVariables';

export const PacksPage = () => {
    const dispatch = useAppDispatch()
    const packs = useAppSelector(getPacks)
    const isLoggedIn = useAppSelector(getIsLoggedIn)

    useEffect(() => {
        dispatch(fetchPacks())
    }, [])
    const addNewPackHandler = () => {
        dispatch(createNewPack())
    }
    if (!isLoggedIn) return <Navigate to={PATH.LOGIN}/>
    return (
        <div>
            <div style={{maxWidth: '1008px', margin: '0 auto'}}>
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <h1>PacksList</h1>
                    <Button onClick={addNewPackHandler}>Add new pack</Button>
                </div>
                <PackFiltration/>
                <PackTable packs={packs}/>
                <h2>here will be pagination</h2>
            </div>
        </div>
    );
};
