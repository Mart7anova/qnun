import React, {useEffect} from 'react';
import {createNewPack, fetchPacks, setCurrentPage} from 's1-main/m2-bll/reducers/packs-reducer';
import {useAppDispatch, useAppSelector} from 's1-main/m2-bll/store';
import {PackTable} from 's2-features/f3-packsList/PackTable';
import {Button} from 's1-main/m1-ui/common/c1-components/Button/Button';
import {PackFiltration} from 's2-features/f3-packsList/PackFiltration/PackFiltration';
import {
	getCurrentMaxCount,
	getCurrentMinCount,
	getPackName,
	getPacks,
	getPacksForUserId, getSortPacks
} from 's1-main/m2-bll/selectors/packs-selectors';
import {getIsLoggedIn} from 's1-main/m2-bll/selectors/auth-selectors';
import {Navigate} from 'react-router-dom';
import {PATH} from 's1-main/m1-ui/u1-Route/Variables/routeVariables';
import {Paginator} from 's1-main/m1-ui/common/c1-components/Pagination/Pagination';

export const PacksPage = () => {
		const dispatch = useAppDispatch()const status = useAppSelector(appStatus)
    const packs = useAppSelector(getPacks)
    const isLoggedIn = useAppSelector(getIsLoggedIn)
    const packName = useAppSelector(getPackName)
    const packsForUserId = useAppSelector(getPacksForUserId)
    const currentMinCount = useAppSelector(getCurrentMinCount)
    const currentMaxCount = useAppSelector(getCurrentMaxCount)
    const sortPacks = useAppSelector(getSortPacks)
		const page = useAppSelector(state => state.packs.searchParams.page)
    const packsTotalCount = useAppSelector(state => state.packs.packsTotalCount)
    const elementsPerPage = useAppSelector(state => state.packs.searchParams.pageCount)

    useEffect(() => {
        dispatch(fetchPacks())
    }, [packName, packsForUserId, currentMinCount, currentMaxCount, page, sortPacks])

		const addNewPackHandler = () => {
				dispatch(createNewPack())
		}

		const onPageChange = (event: React.ChangeEvent<unknown>, page: number) => {
				dispatch(setCurrentPage(page))
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
								<Paginator currentPage={page}
								           elementsPerPage={elementsPerPage}
								           onPageChange={onPageChange}
								           itemsTotalCount={packsTotalCount}
								/>
						</div>
				</div>
		);
};
