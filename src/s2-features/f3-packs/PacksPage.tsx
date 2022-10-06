import React, {useEffect, useRef} from 'react';
import qs from 'qs';
import {
    changeStatusFirstLoading,
    createNewPack,
    fetchPacks,
    setCurrentPage,
    setIsMyPacksFilter,
    setPacksPerPage
} from 's1-main/m2-bll/reducers/packs-reducer';
import {useAppDispatch, useAppSelector} from 's1-main/m2-bll/store';
import {PackTable} from 's2-features/f3-packs/PacksTable/PackTable';
import {Button} from 's1-main/m1-ui/common/c1-components/Button/Button';
import {PackFiltration} from 's2-features/f3-packs/PackFiltration/PackFiltration';
import {
    getCardPacksTotalCount,
    getCurrentMaxCount,
    getCurrentMinCount,
    getPackName,
    getPacks,
    getPacksForUserId, getPage, getPageCount,
    getSortPacks
} from 's1-main/m2-bll/selectors/packs-selectors';
import {getIsLoggedIn} from 's1-main/m2-bll/selectors/auth-selectors';
import {Navigate, useNavigate} from 'react-router-dom';
import {PATH} from 's1-main/m1-ui/u1-Route/Variables/routeVariables';
import {SelectChangeEvent} from '@mui/material';
import {PaginationWithSelect} from '../../s1-main/m1-ui/common/c1-components/Pagination/PaginationWithSelect';
import {getAppStatus} from '../../s1-main/m2-bll/selectors/app-selectors';
import style from './PacksPage.module.scss'
import {useModal} from '../../s1-main/m2-bll/hooks/useModal';
import {PackModal} from '../f6-modal/PackModal/PackModal';

export const PacksPage = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const isSearch = useRef(false)
    const isMounted = useRef(false)

    const appStatus = useAppSelector(getAppStatus)
    const packs = useAppSelector(getPacks)
    const isLoggedIn = useAppSelector(getIsLoggedIn)
    const packName = useAppSelector(getPackName)
    const packsForUserId = useAppSelector(getPacksForUserId)
    const currentMinCount = useAppSelector(getCurrentMinCount)
    const currentMaxCount = useAppSelector(getCurrentMaxCount)
    const sortPacks = useAppSelector(getSortPacks)
    const page = useAppSelector(getPage)
    const packsTotalCount = useAppSelector(getCardPacksTotalCount)
    const elementsPerPage = useAppSelector(getPageCount)

    const {open, openModal, closeModal} = useModal();

    useEffect(() => {
        dispatch(changeStatusFirstLoading(true))

        if (window.location.hash) {
            const params = qs.parse(window.location.hash.substring(3))
            const packsForUserId = params.packsForUserId

            if (packsForUserId) {
                dispatch(setIsMyPacksFilter(packsForUserId as string))
                isSearch.current = true
            }
        }
    }, [])

    useEffect(() => {
        if (!isSearch.current) {
            dispatch(fetchPacks())
        }
        isSearch.current = false
    }, [packName, packsForUserId, currentMinCount, currentMaxCount, page, sortPacks, elementsPerPage])

    useEffect(() => {
        if (isMounted.current) {
            const queryString = qs.stringify({
                packsForUserId
            })
            navigate(`?${queryString}`)
        }
        isMounted.current = true
    }, [packsForUserId])

    const addNewPackHandler = async (name: string, isPrivate: boolean) => {
        await dispatch(createNewPack(name, isPrivate))
        closeModal()
    }
    const onChangePacksPerPage = (event: SelectChangeEvent<number>) => {
        dispatch(setPacksPerPage(event.target.value as number))
    }

    const onPageChange = (event: React.ChangeEvent<unknown>, page: number) => {
        dispatch(setCurrentPage(page))
    }

    if (!isLoggedIn) return <Navigate to={PATH.LOGIN}/>
    return (
        <div className={style.packContainer}>
            <div className={style.headerContainer}>
                <h1 className={style.header}>PacksList</h1>
                <Button onClick={openModal} disabled={appStatus === 'loading'}>Add new pack</Button>
                <PackModal title={'Add new pack'} open={open} closeModal={closeModal} sentChanges={addNewPackHandler}/>
            </div>

            <PackFiltration/>

            <PackTable packs={packs}/>
            {
                packsTotalCount > elementsPerPage && <PaginationWithSelect elementsPerPage={elementsPerPage}
                                                                           page={page}
                                                                           onChangeItemsPerPage={onChangePacksPerPage}
                                                                           onPageChange={onPageChange}
                                                                           label="Packs"
                                                                           totalItemsCount={packsTotalCount}/>
            }
        </div>
    );
};
