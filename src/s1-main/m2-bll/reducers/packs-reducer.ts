import {AppThunk} from 's1-main/m2-bll/store';
import {packApi, PackType, SearchParamsType} from 's1-main/m3-dal/packApi';

const initialState = {
    packs: [] as PackType[],
    searchParams: {
        page: 1,
        pageCount: 10,
        sortPacks: '0updated',
        packName: '',
        isMyPacks: false
    } as SearchParamsType,
}

//reducer
export const packsReducer = (state: PacksReducerType = initialState, action: ActionsType): PacksReducerType => {
    switch (action.type) {
        case 'PACKS/SET-PACKS': {
            return {...state, packs: action.payload.packs}
        }
        case 'PACKS/SET-SEARCH-PARAMS': {
            return {...state, searchParams: {...state.searchParams, ...action.payload.params}}
        }
        default:
            return state
    }
}


//actions
export const setPacks = (packs: PackType[]) => ({type: 'PACKS/SET-PACKS', payload: {packs}} as const)
export const setSearchParams = (params: SearchParamsType) => ({
    type: 'PACKS/SET-SEARCH-PARAMS',
    payload: {params}
} as const)

//thunks
export const fetchPacks = (): AppThunk => async (dispatch, getState) => {
    try {
        const searchParams = getState().packs.searchParams
        const {data} = await packApi.getPacks(searchParams)
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

type ActionsType = ReturnType<typeof setPacks>
    | ReturnType<typeof setSearchParams>