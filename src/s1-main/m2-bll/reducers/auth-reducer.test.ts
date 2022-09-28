import {authReducer, AuthReducerType, isLoggedIn, setIsRequestSuccess} from 's1-main/m2-bll/reducers/auth-reducer';

let startState: AuthReducerType
beforeEach(() => {
    startState = {
        isLoggedIn: false,
        isAuth: false,
        isRequestSuccess: false
    }
})
test('isLoggedIn value should be set', () => {
    const action = isLoggedIn(true)
    const endState = authReducer(startState, action)
    expect(endState.isLoggedIn).toBe(true)
})
test('IsRequestSuccess value should be set', () => {
    const action = setIsRequestSuccess(true)
    const endState = authReducer(startState, action)
    expect(endState.isRequestSuccess).toBe(true)
})
