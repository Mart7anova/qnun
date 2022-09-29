import {AppThunk} from 's1-main/m2-bll/store';
import {cardsApi, CardSearchParamsType, CardsResponseType, CardType} from 's1-main/m3-dal/cardsApi';
import {setAppStatus} from './app-reducer';
import {errorUtils} from 'utils/error-utils';

const initialState = {
    cardsState: {
        cards: [] as CardType[]
    } as CardsResponseType,
    searchParams: {
        cardQuestion: '',
		page: 1,
		pageCount: 10,
	} as CardSearchParamsType,
}

//reducer
export const cardsReducer = (state: CardsReducerType = initialState, action: ActionsType): CardsReducerType => {
    switch (action.type) {
        case 'CARDS/SET-CARDS':
            return {...state, cardsState: action.payload.cards}
        case 'CARDS/SET-SEARCH-BY-CARDS-NAME-FILTER':
            return {...state, searchParams: {...state.searchParams, cardQuestion: action.payload.cardName}}
        case 'CARDS/SET-SORT-CARDS':
            return {...state, searchParams: {...state.searchParams, sortCards: action.payload.sortValue}}
        case 'CARDS/SET-CURRENT-PAGE':
            return {...state, searchParams: {...state.searchParams, page: action.payload.page}}
				case 'CARDS/RESET-CARDS-STATE':
						return {...state, ...initialState}
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
export const setCardsIsFirstLoading = (value: boolean) =>
		({type: 'CARDS/SET-CARDS-IS-FIRST-LOADING', payload: {value}} as const)
export const resetCardsState = () =>
		({type: 'CARDS/RESET-CARDS-STATE'} as const)

//thunks
export const fetchCards = (packId: string): AppThunk => async (dispatch, getState) => {
    dispatch(setAppStatus('loading'))
    try {
        const searchParams = getState().cards.searchParams
        const {data} = await cardsApi.getCards(packId, searchParams)
        dispatch(setCards(data))
    } catch (e) {
        errorUtils(e, dispatch)
    } finally {
        dispatch(setAppStatus('idle'))
    }
}
export const createCard = (packId: string): AppThunk => async (dispatch) => {
    dispatch(setAppStatus('loading'))
    try {
        await cardsApi.createCard(packId, 'hardcoded question', 'hardcoded answer')
        dispatch(fetchCards(packId))
    } catch (e) {
        errorUtils(e, dispatch)
    } finally {
        dispatch(setAppStatus('idle'))
    }
}
export const deleteCard = (packId: string, cardId: string): AppThunk => async (dispatch) => {
    dispatch(setAppStatus('loading'))
    try {
        await cardsApi.deleteCard(cardId)
        dispatch(fetchCards(packId))
    } catch (e) {
        errorUtils(e, dispatch)
    } finally {
        dispatch(setAppStatus('idle'))
    }
}
export const updateCard = (packId: string, cardId: string): AppThunk => async (dispatch) => {
    dispatch(setAppStatus('loading'))
    try {
        await cardsApi.updateCard(cardId, 'updated question', 'updated answer')
        dispatch(fetchCards(packId))
    } catch (e) {
        errorUtils(e, dispatch)
    } finally {
        dispatch(setAppStatus('idle'))
    }
}

//types
export type CardsReducerType = typeof initialState
type ActionsType =
    | ReturnType<typeof setCards>
    | ReturnType<typeof setCurrentPage>
    | ReturnType<typeof setSearchByCardsNameFilter>
    | ReturnType<typeof setSortCards>
		| ReturnType<typeof setCardsIsFirstLoading>
		| ReturnType<typeof resetCardsState>