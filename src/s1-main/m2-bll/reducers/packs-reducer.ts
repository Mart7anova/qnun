import {AppThunk} from 's1-main/m2-bll/store';
import {packApi, PackType, ResponseCardPacksType, SearchParamsType} from 's1-main/m3-dal/packApi';

const initialState = {
    packs: {
        cardPacks: [] as PackType[]
    } as ResponseCardPacksType,
    searchParams: {
        page: 1,
        pageCount: 10,
        sortPacks: '0updated',
        packName: '',
        user_id: '',
        min: 0,
        max: 100,
    } as SearchParamsType,
}

//reducer
export const packsReducer = (state: PacksReducerType = initialState, action: ActionsType): PacksReducerType => {
    switch (action.type) {
        case 'PACKS/SET-PACKS': {
            return {...state, packs: action.payload.packs}
        }
        case 'PACKS/SET-SEARCH-BY-NAME-FILTER': {
            return {...state, searchParams: {...state.searchParams, packName: action.payload.packName}}
        }
        case 'PACKS/SET-IS-MY-PACKS-FILTER': {
            return {...state, searchParams: {...state.searchParams, user_id: action.payload.userId}}
        }
        case 'PACKS/SET-RANGE-CARDS':{
            return {...state, searchParams: {...state.searchParams, min: action.payload.min, max: action.payload.max}}
        }
        case 'PACKS/CLEAR-FILTERS':
            return {...state, searchParams: {...state.searchParams, ...action.payload}}
        default:
            return state
    }
}

//actions
export const setPacks = (packs: ResponseCardPacksType) => ({type: 'PACKS/SET-PACKS', payload: {packs}} as const)
export const setSearchByNameFilter = (packName: string) => ({
    type: 'PACKS/SET-SEARCH-BY-NAME-FILTER',
    payload: {packName}
} as const)
export const setIsMyPacksFilter = (userId: string) => ({
    type: 'PACKS/SET-IS-MY-PACKS-FILTER',
    payload: {userId}
} as const)
export const setRangeCards = (min: number, max: number) => ({
    type: 'PACKS/SET-RANGE-CARDS',
    payload: {min, max}
} as const)
export const clearFilters = () => ({
    type: 'PACKS/CLEAR-FILTERS',
    payload: {packName: '', isMyPack: false, min: 0, max: 100}
} as const)

//thunks
export const fetchPacks = (): AppThunk => async (dispatch, getState) => {
    try {
        const searchParams = getState().packs.searchParams
        const {data} = await packApi.getPacks(searchParams)
        dispatch(setPacks(data))
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
    | ReturnType<typeof setSearchByNameFilter>
    | ReturnType<typeof clearFilters>
    | ReturnType<typeof setIsMyPacksFilter>
    | ReturnType<typeof setRangeCards>
