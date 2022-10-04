import {AppRootStateType} from 's1-main/m2-bll/store';

export const getCards = (state: AppRootStateType) => state.cards.cardsState.cards
export const getPackUserId= (state: AppRootStateType) => state.cards.cardsState.packUserId
export const getPackName= (state: AppRootStateType) => state.cards.cardsState.packName
export const getCardsTotalCount= (state: AppRootStateType) => state.cards.cardsState.cardsTotalCount

export const getPageCount= (state: AppRootStateType) => state.cards.searchParams.pageCount
export const getPage= (state: AppRootStateType) => state.cards.searchParams.page
export const getCardQuestion= (state: AppRootStateType) => state.cards.searchParams.cardQuestion
export const getSortCards= (state: AppRootStateType) => state.cards.searchParams.sortCards


