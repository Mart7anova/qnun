import {AppThunk} from '../store';
import {packApi, PackType} from 's1-main/m3-dal/packApi';

const initialState = {
		packs: [] as PackType[],
}

//reducer
export const packsReducer = (state: PacksReducerType = initialState, action: ActionsType): PacksReducerType => {
		switch (action.type) {
				case 'PACKS/SET-PACKS':
						return {...state, packs: action.payload.packs}
				default:
						return state
		}
}


//actions
export const setPacks = (packs: PackType[]) => ({type: 'PACKS/SET-PACKS', payload: {packs}} as const)

//thunks
export const fetchPacks = (): AppThunk => async (dispatch) => {
		try {
				const {data} = await packApi.getPacks()
				dispatch(setPacks(data.cardPacks))
		} catch (e) {
		}
}
export const createNewPack = (): AppThunk => async (dispatch) => {
		try {
				await packApi.createPack('new pack')
				dispatch(fetchPacks())
		} catch (e) {
		}
}
export const deletePack = (id: string): AppThunk => async (dispatch) => {
		try {
				await packApi.deletePack(id)
				dispatch(fetchPacks())
		} catch (e) {
		}
}
export const updatePack = (id: string): AppThunk => async (dispatch) => {
		try {
				await packApi.updatePack(id, 'hardcoded updated name')
				dispatch(fetchPacks())
		} catch (e) {
		}
}

//types
export type PacksReducerType = typeof initialState
type ActionsType =
		| ReturnType<typeof setPacks>