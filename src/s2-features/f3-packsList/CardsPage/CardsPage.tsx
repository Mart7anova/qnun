import React, {useEffect} from 'react'
import {useAppDispatch, useAppSelector} from 's1-main/m2-bll/store';
import {createCard, fetchCards, setCurrentPage} from 's1-main/m2-bll/reducers/cards-reducer';
import {Navigate, useParams} from 'react-router-dom';
import {Button} from 's1-main/m1-ui/common/c1-components/Button/Button';
import {PATH} from 's1-main/m1-ui/u1-Route/Variables/routeVariables';
import {getAuthUserId, getIsLoggedIn} from 's1-main/m2-bll/selectors/auth-selectors';
import {EmptyPack} from 's2-features/f3-packsList/CardsPage/EmptyPack';
import {Search} from 's2-features/f3-packsList/CardsPage/Search';
import {CardsTable} from 's2-features/f3-packsList/CardsPage/CardsTable';
import {Paginator} from 's1-main/m1-ui/common/c1-components/Pagination/Pagination';
import {LinkBackTo} from '../../../s1-main/m1-ui/common/c1-components/LinkBackTo/LinkBackTo';

export const CardsPage = () => {
    const dispatch = useAppDispatch()
    const {packId} = useParams() as { packId: string }
    const cards = useAppSelector(state => state.cards.cards)
    const packOwnerUserId = useAppSelector(state => state.cards.packOwnerUserId)
    const isLoggedIn = useAppSelector(getIsLoggedIn)
    const userId = useAppSelector(getAuthUserId)
    const packName = useAppSelector(state => state.cards.packName)
    const cardsTotalCount = useAppSelector(state => state.cards.cardsTotalCount)
    const elementsPerPage = useAppSelector(state => state.cards.elementPerPage)
    const currentPage = useAppSelector(state => state.cards.currentPage)
    const searchParams = useAppSelector(state => state.cards.searchParams)
    const isOwner = packOwnerUserId === userId

    const addNewCardHandle = () => {
        dispatch(createCard(packId))
    }

    const onPageChange = (event: React.ChangeEvent<unknown>, page: number) => {
        dispatch(setCurrentPage(page))
    }

    useEffect(() => {
        dispatch(fetchCards(packId))
    }, [currentPage, searchParams])

    if (!isLoggedIn) return <Navigate to={PATH.LOGIN}/>
    return (
        <div>
            <div style={{width: '1008px', margin: '0 auto'}}>

                <LinkBackTo link={PATH.PACKS_LIST}/>

                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <h1>{packName}</h1>
                    {cards.length > 0 && isOwner && <Button onClick={addNewCardHandle}>Add new cards</Button>}
                    {cards.length > 0 && !isOwner && <Button>Learn to pack</Button>}
                </div>

                {cards.length
                    ? (
                        <>
                            <Search/>
                            <CardsTable isOwner={isOwner} cards={cards}/>
                            <Paginator currentPage={currentPage}
                                       elementsPerPage={elementsPerPage}
                                       onPageChange={onPageChange}
                                       itemsTotalCount={cardsTotalCount}
                            />
                        </>
                    )
                    : <EmptyPack isOwner={isOwner} addNewCardHandle={addNewCardHandle}/>
                }
            </div>
        </div>
    )
}