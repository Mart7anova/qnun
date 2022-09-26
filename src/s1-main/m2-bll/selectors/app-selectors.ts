import {AppRootStateType} from 's1-main/m2-bll/store';

export const appStatus = (state: AppRootStateType) => state.app.status
export const getIsInitialized = (state: AppRootStateType) => state.app.isInitialized