import {AppThunk} from 's1-main/m2-bll/store';
import {cardsApi, CardsResponseType, CardType, ParamsType} from 's1-main/m3-dal/cardsApi';
import {changeStatus, errorMessage} from './app-reducer';

const initialState = {
		cardsState: {
				cards: [] as CardType[]
		} as CardsResponseType,
		searchParams: {} as ParamsType,
}

//reducer
export const cardsReducer = (state: PacksReducerType = initialState, action: ActionsType): PacksReducerType => {
		switch (action.type) {
				case 'CARDS/SET-CARDS':
						return {...state, cardsState: action.payload.cards}
				case 'CARDS/SET-SEARCH-BY-CARDS-NAME-FILTER':
						return {...state, searchParams: {...state.searchParams, cardQuestion: action.payload.cardName}}
				case 'CARDS/SET-SORT-CARDS':
						return {...state,searchParams: {...state.searchParams,sortCards:action.payload.sortValue}}
				case 'CARDS/SET-CURRENT-PAGE':
						return {...state, searchParams: {...state.searchParams, page: action.payload.page}}
				case 'CARDS/RESET-SEARCH-BY-NAME':
						return {...state,searchParams: {...state.searchParams,cardQuestion:''}}
				default:
						return state
		}
}


//actions
export const setCards = (cards: CardsResponseType) =>
		({type: 'CARDS/SET-CARDS', payload: {cards}} as const)
export const setCurrentPage = (page: number) =>
		({type: 'CARDS/SET-CURRENT-PAGE', payload: {page}} as const)
export const setSearchByCardsNameFilter = (cardName: string) =>
		({type: 'CARDS/SET-SEARCH-BY-CARDS-NAME-FILTER', payload: {cardName}} as const)
export const setSortCards = (sortValue: string) =>
		({type: 'CARDS/SET-SORT-CARDS', payload: {sortValue}} as const)
export const resetSearchByName = () =>
		({type: 'CARDS/RESET-SEARCH-BY-NAME'} as const)

//thunks
export const fetchCards = (packId: string): AppThunk => async (dispatch, getState) => {
		dispatch(changeStatus('loading'))
		try {
				const {data} = await cardsApi.getCards(packId, getState().cards.cardsState.page, getState().cards.searchParams)
				dispatch(setCards(data))
		} finally {
				dispatch(changeStatus('idle'))
		}
}
export const createCard = (packId: string): AppThunk => async (dispatch) => {
		dispatch(changeStatus('loading'))
		try {
				await cardsApi.createCard(packId, 'hardcoded question', 'hardcoded answer')
				dispatch(fetchCards(packId))
		} catch (err) {
				dispatch(errorMessage((err as Error).message))
		} finally {
				dispatch(changeStatus('idle'))
		}
}
export const deleteCard = (packId: string, cardId: string): AppThunk => async (dispatch) => {
		dispatch(changeStatus('loading'))
		try {
				await cardsApi.deleteCard(cardId)
				dispatch(fetchCards(packId))
		} catch (err) {
				dispatch(errorMessage((err as Error).message))
		} finally {
				dispatch(changeStatus('idle'))
		}
}
export const updateCard = (packId: string, cardId: string): AppThunk => async (dispatch) => {
		dispatch(changeStatus('loading'))
		try {
				await cardsApi.updateCard(cardId, 'updated question', 'updated answer')
				dispatch(fetchCards(packId))
		} catch (err) {
				dispatch(errorMessage((err as Error).message))
		} finally {
				dispatch(changeStatus('idle'))
		}
}

//types
export type PacksReducerType = typeof initialState
type ActionsType =
		| ReturnType<typeof setCards>
		| ReturnType<typeof setCurrentPage>
		| ReturnType<typeof setSearchByCardsNameFilter>
		| ReturnType<typeof setSortCards>
		| ReturnType<typeof resetSearchByName>