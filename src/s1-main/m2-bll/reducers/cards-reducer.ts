import {AppThunk} from 's1-main/m2-bll/store';
import {cardsApi, CardType, ParamsType} from 's1-main/m3-dal/cardsApi';
import {changeStatus, errorMessage} from "./app-reducer";

const initialState = {
    cards: [] as CardType[],
    packOwnerUserId: '',
    packName: '',
    cardsTotalCount: 0,
    currentPage: 1,
    elementPerPage: 10,
    searchParams: {} as ParamsType,
}

//reducer
export const cardsReducer = (state: PacksReducerType = initialState, action: ActionsType): PacksReducerType => {
    switch (action.type) {
        case 'CARDS/SET-CARDS':
            return {...state, cards: action.payload.cards}
        case 'CARDS/SET-USER-ID':
            return {...state, packOwnerUserId: action.payload.id}
        case 'CARDS/SET-PACK-NAME':
            return {...state, packName: action.payload.packName}
        case 'CARDS/SET-CARDS-TOTAL-COUNT':
            return {...state, cardsTotalCount: action.payload.cardsTotalCount}
        case 'PACKS/SET-CURRENT-PAGE':
            return {...state, currentPage: action.payload.page}
        case 'PACKS/SET-SEARCH-BY-CARDS-NAME-FILTER':
            return {...state, searchParams: {...state.searchParams, cardQuestion: action.payload.cardName}}
        case 'PACKS/SET-SORT-CARDS':
            return {...state, searchParams: {...state.searchParams, sortCards: action.payload.sortValue}}
        default:
            return state
    }
}


//actions
export const setCards = (cards: CardType[]) =>
    ({type: 'CARDS/SET-CARDS', payload: {cards}} as const)
export const setPackOwnerUserId = (id: string) =>
    ({type: 'CARDS/SET-USER-ID', payload: {id}} as const)
export const setPackName = (packName: string) =>
    ({type: 'CARDS/SET-PACK-NAME', payload: {packName}} as const)
export const setCardsTotalCount = (cardsTotalCount: number) =>
    ({type: 'CARDS/SET-CARDS-TOTAL-COUNT', payload: {cardsTotalCount}} as const)
export const setCurrentPage = (page: number) =>
    ({type: 'PACKS/SET-CURRENT-PAGE', payload: {page}} as const)

export const setSearchByCardsNameFilter = (cardName: string) =>
    ({type: 'PACKS/SET-SEARCH-BY-CARDS-NAME-FILTER', payload: {cardName}} as const)

export const setSortCards = (sortValue: string) =>
    ({type: 'PACKS/SET-SORT-CARDS', payload: {sortValue}} as const)

//thunks
export const fetchCards = (packId: string): AppThunk => async (dispatch, getState) => {
    dispatch(changeStatus("loading"))
	try {
        const {data} = await cardsApi.getCards(packId, getState().cards.currentPage, getState().cards.searchParams)
        dispatch(setCards(data.cards))
        dispatch(setPackOwnerUserId(data.packUserId))
        dispatch(setPackName(data.packName))
        dispatch(setCardsTotalCount(data.cardsTotalCount))
    } catch (err) {
        dispatch(errorMessage((err as Error).message))
    } finally {
        dispatch(changeStatus("idle"))
    }
}
export const createCard = (packId: string): AppThunk => async (dispatch) => {
    dispatch(changeStatus("loading"))
	try {
        await cardsApi.createCard(packId, 'hardcoded question', 'hardcoded answer')
        dispatch(fetchCards(packId))
    } catch (err) {
        dispatch(errorMessage((err as Error).message))
    } finally {
        dispatch(changeStatus("idle"))
    }
}
export const deleteCard = (packId: string, cardId: string): AppThunk => async (dispatch) => {
    dispatch(changeStatus("loading"))
	try {
        await cardsApi.deleteCard(cardId)
        dispatch(fetchCards(packId))
    } catch (err) {
        dispatch(errorMessage((err as Error).message))
    } finally {
        dispatch(changeStatus("idle"))
    }
}
export const updateCard = (packId: string, cardId: string): AppThunk => async (dispatch) => {
    dispatch(changeStatus("loading"))
	try {
        await cardsApi.updateCard(cardId, 'updated question', 'updated answer')
        dispatch(fetchCards(packId))
    } catch (err) {
        dispatch(errorMessage((err as Error).message))
    } finally {
        dispatch(changeStatus("idle"))
    }
}

//types
export type PacksReducerType = typeof initialState
type ActionsType =
    | ReturnType<typeof setCards>
    | ReturnType<typeof setPackOwnerUserId>
    | ReturnType<typeof setPackName>
    | ReturnType<typeof setCardsTotalCount>
    | ReturnType<typeof setCurrentPage>
    | ReturnType<typeof setSearchByCardsNameFilter>
    | ReturnType<typeof setSortCards>