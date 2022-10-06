import {AppThunk} from 's1-main/m2-bll/store';
import {cardsApi, CardsResponseType, CardType,} from 's1-main/m3-dal/cardsApi';
import {setAppStatus} from './app-reducer';
import {errorUtils} from 'utils/error-utils';

const initialState = {
    cardsState: {
        cards: [] as CardType[]
    } as CardsResponseType,
    searchParams: {
        page: 1,
        pageCount: 10,
        cardQuestion: '',
    } as CardSearchParamsType,
}

//reducer
export const cardsReducer = (state: CardsReducerType = initialState, action: ActionsType): CardsReducerType => {
    switch (action.type) {
        case 'CARDS/SET-CARDS':
            return {...state, cardsState: action.payload.cards}
        case 'CARDS/SET-UPDATE_CARD_GRADE':
            return {
                ...state, cardsState: {
                    ...state.cardsState, cards: state.cardsState.cards.map(c =>
                        c._id === action.payload._id
                            ? {...c, grade: action.payload.grade, shots: action.payload.shots}
                            : c
                    )
                }
            }
        case 'CARDS/RESET-CARDS-STATE':
            return {...initialState}
        case 'CARDS/SET-SORT-CARDS':
        case 'CARDS/SET-SEARCH-BY-CARDS-NAME-FILTER':
        case "CARDS/SET-CARDS-PER-PAGE":
        case 'CARDS/SET-CURRENT-PAGE':
            return {...state, searchParams: {...state.searchParams, ...action.payload}}
        default:
            return state
    }
}

//actions
export const setCards = (cards: CardsResponseType) =>
    ({type: 'CARDS/SET-CARDS', payload: {cards}} as const)
export const resetCardsState = () =>
    ({type: 'CARDS/RESET-CARDS-STATE'} as const)
export const setCurrentPage = (page: number) =>
    ({type: 'CARDS/SET-CURRENT-PAGE', payload: {page}} as const)
export const setSearchByCardsNameFilter = (cardQuestion: string) =>
    ({type: 'CARDS/SET-SEARCH-BY-CARDS-NAME-FILTER', payload: {cardQuestion}} as const)
export const setSortCards = (sortCards: string) =>
    ({type: 'CARDS/SET-SORT-CARDS', payload: {sortCards}} as const)
export const setUpdateCardGrade = (_id: string, grade: number, shots: number) =>
    ({type: 'CARDS/SET-UPDATE_CARD_GRADE', payload: {_id, grade, shots}} as const)
export const setCardsPerPage = (pageCount: number) =>
    ({type: 'CARDS/SET-CARDS-PER-PAGE', payload: {pageCount}} as const)

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
export const createCard = (packId: string, question: string, answer: string): AppThunk => async (dispatch) => {
    dispatch(setAppStatus('loading'))
    try {
        await cardsApi.createCard(packId, question, answer)
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
export const updateCard = (packId: string, cardId: string, question: string, answer: string): AppThunk => async (dispatch) => {
    dispatch(setAppStatus('loading'))
    try {
        await cardsApi.updateCard(cardId, question, answer)
        dispatch(fetchCards(packId))
    } catch (e) {
        errorUtils(e, dispatch)
    } finally {
        dispatch(setAppStatus('idle'))
    }
}
export const updateCardGrade = (card_id: string, grade: number, packId: string): AppThunk => async (dispatch) => {
    dispatch(setAppStatus('loading'))
    try {
        await cardsApi.updateCardsGrade(card_id, grade)
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
    | ReturnType<typeof resetCardsState>
    | ReturnType<typeof setUpdateCardGrade>
    | ReturnType<typeof setCardsPerPage>

export type CardSearchParamsType = {
    cardQuestion: string
    cardsPack_id: number
    min: number
    max: number
    sortCards: string
    page: number
    pageCount: number
}