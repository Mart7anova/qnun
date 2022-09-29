import React, {useEffect, useState} from 'react'
import {useAppDispatch, useAppSelector} from 's1-main/m2-bll/store';
import {createCard, fetchCards, resetCardsState, setCurrentPage} from 's1-main/m2-bll/reducers/cards-reducer';
import {Navigate, useParams} from 'react-router-dom';
import {Button} from 's1-main/m1-ui/common/c1-components/Button/Button';
import {PATH} from 's1-main/m1-ui/u1-Route/Variables/routeVariables';
import {getAuthUserId, getIsLoggedIn} from 's1-main/m2-bll/selectors/auth-selectors';
import {EmptyPack} from 's2-features/f3-packsList/CardsPage/EmptyPack';
import {Search} from 's2-features/f3-packsList/CardsPage/Search';
import {CardsTable} from 's2-features/f3-packsList/CardsPage/CardsTable';
import {Paginator} from 's1-main/m1-ui/common/c1-components/Pagination/Pagination';
import {LinkBackTo} from 's1-main/m1-ui/common/c1-components/LinkBackTo/LinkBackTo';

export const CardsPage = () => {
		const dispatch = useAppDispatch()
		const {packId} = useParams() as { packId: string }
		const [isSearching, setIsSearching] = useState(false)
		const cards = useAppSelector(state => state.cards.cardsState.cards)
		const packOwnerUserId = useAppSelector(state => state.cards.cardsState.packUserId)
		const isLoggedIn = useAppSelector(getIsLoggedIn)
		const userId = useAppSelector(getAuthUserId)
		const packName = useAppSelector(state => state.cards.cardsState.packName)
		const cardsTotalCount = useAppSelector(state => state.cards.cardsState.cardsTotalCount)
		const elementsPerPage = useAppSelector(state => state.cards.cardsState.pageCount)
		const currentPage = useAppSelector(state => state.cards.searchParams.page)
		const cardQuestionSearch = useAppSelector(state => state.cards.searchParams.cardQuestion)
		const sortCards = useAppSelector(state => state.cards.searchParams.sortCards)
		const isOwner = packOwnerUserId === userId

		const addNewCardHandle = () => {
				dispatch(createCard(packId))
		}

		const onPageChange = (event: React.ChangeEvent<unknown>, page: number) => {
				dispatch(setCurrentPage(page))
		}
		useEffect(() => {
				return () => {
						dispatch(resetCardsState())
				}
		}, [])

		useEffect(() => {
				dispatch(fetchCards(packId))
		}, [currentPage, cardQuestionSearch, sortCards])

		if (!isLoggedIn) return <Navigate to={PATH.LOGIN}/>
		if (!packName && !packOwnerUserId) return null

		return (
				<div style={{maxWidth: '1008px', margin: '0 auto'}}>

						<LinkBackTo link={PATH.PACKS_LIST}/>

						<div style={{display: 'flex', justifyContent: 'space-between', marginTop: '50px'}}>
								<h1>{packName}</h1>
								{cards.length > 0 && isOwner && <Button onClick={addNewCardHandle}>Add new cards</Button>}
								{cards.length > 0 && !isOwner && <Button>Learn to pack</Button>}
						</div>


						{cards.length || isSearching
								? <>
										<Search setIsSearching={setIsSearching}/>
										<CardsTable isOwner={isOwner} cards={cards}/>
										{cards.length > 0 &&
												<Paginator currentPage={currentPage}
												           elementsPerPage={elementsPerPage}
												           onPageChange={onPageChange}
												           itemsTotalCount={cardsTotalCount}/>
										}
								</>
								: <EmptyPack isOwner={isOwner} addNewCardHandle={addNewCardHandle}/>
						}
				</div>
		)
}