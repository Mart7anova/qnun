import {profileReducer, ProfileReducerType, setProfile} from 's1-main/m2-bll/reducers/profile-reducer';
import {ProfileResponseType} from 's1-main/m3-dal/authApi';

let startState: ProfileReducerType
beforeEach(() => {
		startState = {
				profile: {} as ProfileResponseType
		}
})
test('profile should be set', () => {
		const action = setProfile({
				_id:'123id',
				avatar:'avatar',
				name:'Name',
				email:'email@email.com',
				created: 'created',
				rememberMe:true,
				isAdmin:false,
				publicCardPacksCount:11,
				updated:'updatedTime',
				verified:false,
				token:'312312',
				tokenDeathTime:312312,
				__v:12
		})
		const endState = profileReducer(startState, action)
		expect(endState.profile._id).toBe('123id')
})
