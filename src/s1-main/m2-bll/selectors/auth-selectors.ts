import {AppRootStateType} from 's1-main/m2-bll/store';

export const getIsLoggedIn = (state: AppRootStateType) => state.auth.isLoggedIn
export const getAuthUserId = (state: AppRootStateType) => state.profile.profile._id
export const isLoggedIn = (state: AppRootStateType) => state.auth.isAuth