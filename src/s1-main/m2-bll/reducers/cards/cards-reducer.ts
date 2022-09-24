import {AppThunk} from 's1-main/m2-bll/store';
import {cardsApi, CardType} from 's1-main/m3-dal/cardsApi';

const initialState = {
		cards: [] as CardType[],
}

//reducer
export const cardsReducer = (state: PacksReducerType = initialState, action: ActionsType): PacksReducerType => {
		switch (action.type) {
				case 'CARDS/SET-CARDS':
						return {...state, cards: action.payload.cards}
				default:
						return state
		}
}


//actions
export const setCards = (cards: CardType[]) => ({type: 'CARDS/SET-CARDS', payload: {cards}} as const)

//thunks
export const fetchCards = (packId: string): AppThunk => async (dispatch) => {
		try {
				const {data} = await cardsApi.getCards(packId)
				dispatch(setCards(data.cards))
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

//types
export type PacksReducerType = typeof initialState
type ActionsType =
		|ReturnType<typeof setCards>