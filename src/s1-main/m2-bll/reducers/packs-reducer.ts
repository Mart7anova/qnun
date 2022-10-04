import {AppThunk} from 's1-main/m2-bll/store';
import {packApi, PackType, ResponseCardPacksType} from 's1-main/m3-dal/packApi';
import {setAppStatus} from './app-reducer';
import {errorUtils} from 'utils/error-utils';

const initialState = {
    packs: {
        cardPacks: [] as PackType[]
    } as ResponseCardPacksType,
    searchParams: {
        page: 1,
        pageCount: 10,
        packName: '',
    } as PackSearchParamsType,
    isFirstLoading: true
}

//reducer
export const packsReducer = (state: PacksReducerType = initialState, action: ActionsType): PacksReducerType => {
    switch (action.type) {
        case 'PACKS/CHANGE-STATUS-FIRST-LOADING':
            return {...state, isFirstLoading: action.payload.value}

        case 'PACKS/SET-PACKS':
            return {...state, packs: action.payload.packs}

        case 'PACKS/SET-IS-MY-PACKS-FILTER':
            return {...state, searchParams: {...state.searchParams, ...action.payload, page: 1}}

        case 'PACKS/SET-SEARCH-BY-PACKS-NAME-FILTER':
        case 'PACKS/SET-RANGE-CARDS':
        case 'PACKS/SET-SORT-PACKS':
        case 'PACKS/SET-CURRENT-PAGE':
        case 'PACKS/SET-PACKS-PER-PAGE':
            return {...state, searchParams: {...state.searchParams, ...action.payload}}

        case'PACKS/CLEAR-FILTERS':
            return {...state, searchParams: {...initialState.searchParams, max: state.packs.maxCardsCount, min:state.packs.minCardsCount}}

        default:
            return state
    }
}

//actions
export const setPacks = (packs: ResponseCardPacksType) => ({type: 'PACKS/SET-PACKS', payload: {packs}} as const)
export const changeStatusFirstLoading = (value: boolean) => ({
    type: 'PACKS/CHANGE-STATUS-FIRST-LOADING',
    payload: {value}
} as const)
export const setSearchByPacksNameFilter = (packName: string) => ({
    type: 'PACKS/SET-SEARCH-BY-PACKS-NAME-FILTER',
    payload: {packName}
} as const)
export const setIsMyPacksFilter = (user_id: string) => ({
    type: 'PACKS/SET-IS-MY-PACKS-FILTER',
    payload: {user_id}
} as const)
export const setRangeCards = (min: number, max: number) => ({
    type: 'PACKS/SET-RANGE-CARDS',
    payload: {min, max}
} as const)
export const setSortPacks = (sortPacks: string) => ({
    type: 'PACKS/SET-SORT-PACKS',
    payload: {sortPacks}
} as const)
export const clearFilters = () => ({type: 'PACKS/CLEAR-FILTERS'} as const)
export const setCurrentPage = (page: number) => ({
    type: 'PACKS/SET-CURRENT-PAGE',
    payload: {page}
} as const)
export const setPacksPerPage = (pageCount: number) => ({
    type: 'PACKS/SET-PACKS-PER-PAGE',
    payload: {pageCount}
} as const)

//thunks
export const fetchPacks = (): AppThunk => async (dispatch, getState) => {
    dispatch(setAppStatus('loading'))
    try {
        const searchParams = getState().packs.searchParams
        const {data} = await packApi.getPacks(searchParams)
        dispatch(setPacks(data))
        if (getState().packs.isFirstLoading) {
            dispatch(setRangeCards(data.minCardsCount, data.maxCardsCount))
            dispatch(changeStatusFirstLoading(false))
        }
    } catch (e) {
        errorUtils(e, dispatch)
    } finally {
        dispatch(setAppStatus('idle'))
    }
}
export const createNewPack = (): AppThunk => async (dispatch) => {
    dispatch(setAppStatus('loading'))
    try {
        await packApi.createPack('new pack')
        dispatch(fetchPacks())
    } catch (e) {
        errorUtils(e, dispatch)
    } finally {
        dispatch(setAppStatus('idle'))
    }
}
export const deletePack = (id: string): AppThunk => async (dispatch) => {
    dispatch(setAppStatus('loading'))
    try {
        await packApi.deletePack(id)
        dispatch(fetchPacks())
    } catch (e) {
        errorUtils(e, dispatch)
    } finally {
        dispatch(setAppStatus('idle'))
    }
}
export const updatePack = (id: string): AppThunk => async (dispatch) => {
    dispatch(setAppStatus('loading'))
    try {
        await packApi.updatePack(id, 'hardcoded updated name')
        dispatch(fetchPacks())
    } catch (e) {
        errorUtils(e, dispatch)
    } finally {
        dispatch(setAppStatus('idle'))
    }
}

//types
export type PacksReducerType = typeof initialState

type ActionsType =
    | ReturnType<typeof setPacks>
    | ReturnType<typeof setSearchByPacksNameFilter>
    | ReturnType<typeof clearFilters>
    | ReturnType<typeof setIsMyPacksFilter>
    | ReturnType<typeof setRangeCards>
    | ReturnType<typeof setCurrentPage>
    | ReturnType<typeof setSortPacks>
    | ReturnType<typeof changeStatusFirstLoading>
    | ReturnType<typeof setPacksPerPage>

export type PackSearchParamsType = {
    page: number
    pageCount: number
    sortPacks: string
    packName: string
    user_id: string
    min: number
    max: number
}