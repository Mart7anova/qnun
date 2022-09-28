import {AppThunk} from 's1-main/m2-bll/store';
import {packApi, PackType, ResponseCardPacksType, PackSearchParamsType} from 's1-main/m3-dal/packApi';
import {changeStatus, errorMessage} from './app-reducer';
import {setAppStatus} from './app-reducer';
import {errorUtils} from 'utils/error-utils';

const initialState = {
    packs: {
        cardPacks: [] as PackType[]
    } as ResponseCardPacksType,
    searchParams: {
        pageCount: 10,
        packName: '',
    } as PackSearchParamsType,
    isFirstLoading: true
}

//reducer
export const packsReducer = (state: PacksReducerType = initialState, action: ActionsType): PacksReducerType => {
    switch (action.type) {
        case 'PACKS/SET-PACKS':
            return {...state, packs: action.payload.packs}
        case 'PACKS/SET-SEARCH-BY-PACKS-NAME-FILTER':
            return {...state, searchParams: {...state.searchParams, packName: action.payload.packName}}
        case 'PACKS/SET-IS-MY-PACKS-FILTER':
            return {...state, searchParams: {...state.searchParams, user_id: action.payload.userId}}
        case 'PACKS/SET-RANGE-CARDS':
            return {...state, searchParams: {...state.searchParams, min: action.payload.min, max: action.payload.max}}
        case 'PACKS/SET-SORT-PACKS':
            return {...state, searchParams: {...state.searchParams, sortPacks: action.payload.sortValue}}
        case 'PACKS/CLEAR-FILTERS':
            return {...state, searchParams: {...state.searchParams, ...action.payload}}
        case 'PACKS/SET-CURRENT-PAGE':
            return {...state, searchParams: {...state.searchParams, page: action.payload.page}}
        case 'PACKS/CHANGE-STATUS-FIRST-LOADING':
            return {...state, isFirstLoading: action.payload.value}
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

export const setIsMyPacksFilter = (userId: string) => ({
    type: 'PACKS/SET-IS-MY-PACKS-FILTER',
    payload: {userId}
} as const)

export const setRangeCards = (min: number, max: number) => ({
    type: 'PACKS/SET-RANGE-CARDS',
    payload: {min, max}
} as const)

export const setSortPacks = (sortValue: string) => ({
    type: 'PACKS/SET-SORT-PACKS',
    payload: {sortValue}
} as const)

export const clearFilters = () => ({
    type: 'PACKS/CLEAR-FILTERS',
    payload: {packName: '', isMyPack: false, min: 0, max: 100}
} as const)

export const setPacksTotalCount = (count: number) => ({
    type: 'PACKS/SET-PACKS-TOTAL-COUNT',
    payload: {count}
} as const)

export const setCurrentPage = (page: number) => ({
    type: 'PACKS/SET-CURRENT-PAGE',
    payload: {page}
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
    | ReturnType<typeof setPacksTotalCount>
    | ReturnType<typeof setCurrentPage>
    | ReturnType<typeof setSortPacks>
    | ReturnType<typeof changeStatusFirstLoading>
