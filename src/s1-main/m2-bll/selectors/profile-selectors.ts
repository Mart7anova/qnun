import {AppRootStateType} from 's1-main/m2-bll/store';

export const getProfileInfo = (state:AppRootStateType)=>state.profile.profile
export const getProfileId = (state:AppRootStateType)=>state.profile.profile._id