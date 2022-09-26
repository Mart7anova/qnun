import {AppThunk} from 's1-main/m2-bll/store';
import {cardsApi, CardType} from 's1-main/m3-dal/cardsApi';

const initialState = {
		cards: [] as CardType[],
		packUserId: '',
		packName: '',
}

//reducer
export const cardsReducer = (state: PacksReducerType = initialState, action: ActionsType): PacksReducerType => {
		switch (action.type) {
				case 'CARDS/SET-CARDS':
						return {...state, cards: action.payload.cards}
				case 'CARDS/SET-USER-ID':
						return {...state, packUserId: action.payload.id}
				case 'CARDS/SET-PACK-NAME':
						return {...state, packName: action.payload.packName}
				default:
						return state
		}
}


//actions
export const setCards = (cards: CardType[]) => ({type: 'CARDS/SET-CARDS', payload: {cards}} as const)
export const setUserId = (id: string) => ({type: 'CARDS/SET-USER-ID', payload: {id}} as const)
export const setPackName = (packName: string) => ({type: 'CARDS/SET-PACK-NAME', payload: {packName}} as const)


//thunks
export const fetchCards = (packId: string): AppThunk => async (dispatch) => {
		try {
				const {data} = await cardsApi.getCards(packId)
				dispatch(setCards(data.cards))
				dispatch(setUserId(data.packUserId))
				dispatch(setPackName(data.packName))
		} catch (e) {
		}
}
export const createCard = (packId: string): AppThunk => async (dispatch) => {
		try {
				await cardsApi.createCard(packId, 'hardcoded question', 'hardcoded answer')
				dispatch(fetchCards(packId))
		} catch (e) {
		}
}
export const deleteCard = (packId:string,cardId: string): AppThunk => async (dispatch) => {
		try {
				await cardsApi.deleteCard(cardId)
				dispatch(fetchCards(packId))
		} catch (e) {
		}
}
export const updateCard = (packId:string, cardId: string): AppThunk => async (dispatch) => {
		try {
				await cardsApi.updateCard(cardId,'updated question','updated answer')
				dispatch(fetchCards(packId))
		} catch (e) {
		}
}

//types
export type PacksReducerType = typeof initialState
type ActionsType =
		| ReturnType<typeof setCards>
		| ReturnType<typeof setUserId>
		| ReturnType<typeof setPackName>