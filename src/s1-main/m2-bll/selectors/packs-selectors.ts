import {AppRootStateType} from 's1-main/m2-bll/store';

export const getPacks = (state: AppRootStateType) => state.packs.packs
export const getPacksForUserId = (state: AppRootStateType) => state.packs.searchParams.user_id
export const getPackName = (state: AppRootStateType) => state.packs.searchParams.packName