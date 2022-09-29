import {
		appReducer,
		AppReducerType,
		setAppError,
		setAppInitialized,
		setAppStatus
} from 's1-main/m2-bll/reducers/app-reducer';

let startState: AppReducerType
beforeEach(() => {
		startState = {
				status: '',
				error: null,
				isInitialized: false
		}
})
test('app status should be set', () => {
		const action = setAppStatus('loading')
		const endState = appReducer(startState, action)
		expect(endState.status).toBe('loading')
})
test('app error should be set', () => {
		const action = setAppError('SOME ERROR')
		const endState = appReducer(startState, action)
		expect(endState.error).toBe('SOME ERROR')
})
test('app error should be initialized', () => {
		const action = setAppInitialized(true)
		const endState = appReducer(startState, action)
		expect(endState.isInitialized).toBe(true)
})