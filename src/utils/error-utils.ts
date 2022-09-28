import axios, {AxiosError} from 'axios';
import {Dispatch} from 'redux';
import {setAppError} from 's1-main/m2-bll/reducers/app-reducer';

export const errorUtils = (e: any, dispatch: Dispatch) => {
		const err = e as Error | AxiosError<{ error: string }>
		if (axios.isAxiosError(err)) {
				const error = err.response?.data ? err.response.data.error : err.message
				dispatch(setAppError(error))
		} else {
				dispatch(setAppError(`Native error ${err.message}`))
		}
}
