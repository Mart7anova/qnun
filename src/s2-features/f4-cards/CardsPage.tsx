import React, {useEffect, useState} from 'react'
import {useAppDispatch, useAppSelector} from 's1-main/m2-bll/store';
import {
    createCard,
    fetchCards,
    resetCardsState,
    setCardsPerPage,
    setCurrentPage,
    setSearchByCardsNameFilter
} from 's1-main/m2-bll/reducers/cards-reducer';
import {Navigate, useParams} from 'react-router-dom';
import {Button} from 's1-main/m1-ui/common/c1-components/Button/Button';
import {PATH} from 's1-main/m1-ui/u1-Route/Variables/routeVariables';
import {getAuthUserId, getIsLoggedIn} from 's1-main/m2-bll/selectors/auth-selectors';
import {EmptyPack} from 's2-features/f4-cards/EmptyPack';
import {CardsTable} from 's2-features/f4-cards/CardsTable/CardsTable';
import {LinkBackTo} from 's1-main/m1-ui/common/c1-components/LinkBackTo/LinkBackTo';
import {SelectChangeEvent} from '@mui/material';
import {PaginationWithSelect} from '../../s1-main/m1-ui/common/c1-components/Pagination/PaginationWithSelect';
import packMenuIcon from 's1-main/m1-ui/common/c3-image/pack-menu-icon.svg'
import {PackMenu} from '../../s1-main/m1-ui/common/c1-components/MiniMenu/PackMenu';
import {getAppStatus} from '../../s1-main/m2-bll/selectors/app-selectors';
import {
    getCardQuestion,
    getCards,
    getCardsTotalCount,
    getPackName,
    getPackUserId,
    getPage,
    getPageCount,
    getSortCards
} from '../../s1-main/m2-bll/selectors/cards-selectors';
import {CardModal} from '../f6-modal/CardModal/CardModal';
import style from './CardsPage.module.scss'
import {SearchInput} from '../../s1-main/m1-ui/common/c1-components/SearchInput/SearchInput';
import {useModal} from '../../s1-main/m2-bll/hooks/useModal';


export const CardsPage = () => {
    const dispatch = useAppDispatch()
    const {packId} = useParams() as { packId: string }

    const [isSearching, setIsSearching] = useState(false)
    const [isOpenPackMenu, setIsOpenPackMenu] = useState(false)
    const { open, openModal, closeModal } = useModal();

    const appStatus = useAppSelector(getAppStatus)
    const isLoggedIn = useAppSelector(getIsLoggedIn)
    const userId = useAppSelector(getAuthUserId)

    const cards = useAppSelector(getCards)
    const packOwnerUserId = useAppSelector(getPackUserId)
    const packName = useAppSelector(getPackName)
    const cardsTotalCount = useAppSelector(getCardsTotalCount)

    const elementsPerPage = useAppSelector(getPageCount)
    const currentPage = useAppSelector(getPage)
    const cardQuestionSearch = useAppSelector(getCardQuestion)
    const sortCards = useAppSelector(getSortCards)

    const isOwner = packOwnerUserId === userId

    const addNewCard = async (question: string, answer: string) => {
        await dispatch(createCard(packId,question, answer))
        closeModal()
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
    }, [currentPage, cardQuestionSearch, sortCards, packId, elementsPerPage])

    if (!isLoggedIn) return <Navigate to={PATH.LOGIN}/>
    if (!packName && !packOwnerUserId) return null


    return (
        <div className={style.cardsContainer}>

            <LinkBackTo link={PATH.PACKS_LIST}/>

            <div className={style.headerContainer}>
                <div className={style.header}>
                    <h1>{packName}</h1>
                    {isOwner && cardsTotalCount > 0 && <img src={packMenuIcon}
                                                            alt="packMenuIcon"
                                                            className={style.imgHeader}
                                                            onClick={() => setIsOpenPackMenu(!isOpenPackMenu)}/>
                    }
                    {isOpenPackMenu && <PackMenu packId={packId} closeMenu={() => setIsOpenPackMenu(false)}/>}
                </div>
                {
                    cards.length > 0 && isOwner && <>
                    <Button onClick={openModal} disabled={appStatus === 'loading'}>Add new card</Button>
                    <CardModal title={'Add new card'} sentChanges={addNewCard} open={open} closeModal={closeModal}/></>
                }

            </div>
            {
                cards.length > 0 || isSearching
                    ? <>
                        <div>Search</div>
                        <SearchInput setIsSearching={setIsSearching} setSearch={setSearchByCardsNameFilter}/>
                        <CardsTable isOwner={isOwner} cards={cards}/>
                        {
                            cardsTotalCount > elementsPerPage &&
                            <PaginationWithSelect page={currentPage}
                                                  elementsPerPage={elementsPerPage}
                                                  onPageChange={onPageChange}
                                                  totalItemsCount={cardsTotalCount}
                                                  label="Cards"
                                                  onChangeItemsPerPage={onChangeCardsPerPage}/>
                        }
                    </>
                    : <EmptyPack isOwner={isOwner} openModal={openModal} addNewCard={addNewCard} open={open} closeModal={closeModal}/>
            }
        </div>
    )
}