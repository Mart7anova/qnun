import React, {useEffect, useState} from 'react'
import {useAppDispatch, useAppSelector} from 's1-main/m2-bll/store';
import {
    createCard,
    fetchCards,
    resetCardsState,
    setCardsPerPage,
    setCurrentPage
} from 's1-main/m2-bll/reducers/cards-reducer';
import {Link, Navigate, useParams} from 'react-router-dom';
import {Button} from 's1-main/m1-ui/common/c1-components/Button/Button';
import {PATH} from 's1-main/m1-ui/u1-Route/Variables/routeVariables';
import {getAuthUserId, getIsLoggedIn} from 's1-main/m2-bll/selectors/auth-selectors';
import {EmptyPack} from 's2-features/f4-cards/EmptyPack';
import {Search} from 's2-features/f4-cards/Search';
import {CardsTable} from 's2-features/f4-cards/CardsTable/CardsTable';
import {LinkBackTo} from 's1-main/m1-ui/common/c1-components/LinkBackTo/LinkBackTo';
import {SelectChangeEvent} from "@mui/material";
import {PaginationWithSelect} from '../../s1-main/m1-ui/common/c1-components/Pagination/PaginationWithSelect';
import packMenuIcon from 'assets/pack-menu-icon.svg'
import {PackMenu} from "../../s1-main/m1-ui/common/c1-components/MiniMenu/PackMenu";

export const CardsPage = () => {
    const dispatch = useAppDispatch()
    const {packId} = useParams() as { packId: string }
    const [isSearching, setIsSearching] = useState(false)
    const [isOpenPackMenu, setIsOpenPackMenu] = useState(false)

    const cards = useAppSelector(state => state.cards.cardsState.cards)
    const packOwnerUserId = useAppSelector(state => state.cards.cardsState.packUserId)
    const isLoggedIn = useAppSelector(getIsLoggedIn)
    const userId = useAppSelector(getAuthUserId)
    const packName = useAppSelector(state => state.cards.cardsState.packName)
    const cardsTotalCount = useAppSelector(state => state.cards.cardsState.cardsTotalCount)
    const elementsPerPage = useAppSelector(state => state.cards.searchParams.pageCount)
    const currentPage = useAppSelector(state => state.cards.searchParams.page)
    const cardQuestionSearch = useAppSelector(state => state.cards.searchParams.cardQuestion)
    const sortCards = useAppSelector(state => state.cards.searchParams.sortCards)

    const packNameChanged = packName && packName.length > 0
    const isOwner = packOwnerUserId === userId

    const addNewCardHandle = () => {
        dispatch(createCard(packId))
    }

    const onPageChange = (event: React.ChangeEvent<unknown>, page: number) => {
        dispatch(setCurrentPage(page))
    }

    const onChangeCardsPerPage = (event: SelectChangeEvent<number>) => {
        dispatch(setCardsPerPage(event.target.value as number))
    }

    useEffect(() => {
        return () => {
            dispatch(resetCardsState())
        }
    }, [])

    useEffect(() => {
        dispatch(fetchCards(packId))
    }, [currentPage, cardQuestionSearch, sortCards, packId, elementsPerPage, packNameChanged])

    if (!isLoggedIn) return <Navigate to={PATH.LOGIN}/>
    if (!packName && !packOwnerUserId) return null

    return (
        <div style={{maxWidth: '1008px', margin: '0 auto'}}>

            <LinkBackTo link={PATH.PACKS_LIST}/>

            <div style={{display: 'flex', justifyContent: 'space-between', marginTop: '70px', marginBottom: '30px'}}>
                <div style={{position: 'relative', display: 'flex', alignItems: 'center', gap: '10px'}}>
                    <h1>{packName}</h1>
                    {isOwner && cardsTotalCount > 0 && <img src={packMenuIcon}
                                                            alt='packMenuIcon'
                                                            style={{width: '22px', height: '22px', cursor: 'pointer'}}
                                                            onClick={() => setIsOpenPackMenu(true)}/>
                    }
                    {isOpenPackMenu && <PackMenu packId={packId} closeMenu={() => setIsOpenPackMenu(false)}/>}
                </div>
                {cards.length > 0 && isOwner && <Button onClick={addNewCardHandle}>Add new card</Button>}

                {cards.length > 0 && <Link to={PATH.PACK + packId + PATH.LEARN}><Button>Learn to pack</Button></Link>}
            </div>

            {
                cards.length > 0 || isSearching
                    ? <>
                        <Search setIsSearching={setIsSearching}/>
                        <CardsTable isOwner={isOwner} cards={cards}/>
                        {cardsTotalCount > elementsPerPage &&
                            <PaginationWithSelect page={currentPage}
                                                  elementsPerPage={elementsPerPage}
                                                  onPageChange={onPageChange}
                                                  totalItemsCount={cardsTotalCount}
                                                  label='Cards'
                                                  onChangeItemsPerPage={onChangeCardsPerPage}/>
                        }
                    </>
                    : <EmptyPack isOwner={isOwner} addNewCardHandle={addNewCardHandle}/>
            }
        </div>
    )
}