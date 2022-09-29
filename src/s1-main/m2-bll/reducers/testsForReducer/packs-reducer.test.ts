import {
	changeStatusFirstLoading,
	clearFilters, PackSearchParamsType,
	packsReducer,
	PacksReducerType,
	setCurrentPage,
	setIsMyPacksFilter,
	setPacks,
	setRangeCards,
	setSearchByPacksNameFilter,
	setSortPacks
} from 's1-main/m2-bll/reducers/packs-reducer';
import {PackType, ResponseCardPacksType} from '../../../m3-dal/packApi';


let startState: PacksReducerType
beforeEach(() => {
		startState = {
				packs: {
						cardPacks: [] as PackType[]
				} as ResponseCardPacksType,
				searchParams: {} as PackSearchParamsType,
				isFirstLoading: true,
		}
})
test('packs state should be set', () => {
		const action = setPacks({
				cardPacks: [
						{
								_id: 'id',
								user_id: 'userId',
								name: 'FIRST PACK',
								cardsCount: 15,
								updated: new Date(),
								__v: 12,
								user_name: 'userName',
								created: new Date(),
								grade: 1,
								more_id: 'more_id',
								path: 'path',
								private: false,
								rating: 10,
								shots: 10,
								type: 'type'
						},
						{
								_id: 'id',
								user_id: 'userId',
								name: 'SECOND PACK',
								cardsCount: 15,
								updated: new Date(),
								__v: 12,
								user_name: 'userName',
								created: new Date(),
								grade: 1,
								more_id: 'more_id',
								path: 'path',
								private: false,
								rating: 10,
								shots: 10,
								type: 'type'
						},],
				page: 1,
				cardPacksTotalCount: 15,
				maxCardsCount: 15,
				minCardsCount: 0,
				pageCount: 10,
		})
		const endState = packsReducer(startState, action)
		expect(endState.packs.cardPacks.length).toBe(2)
		expect(endState.packs.cardPacks[0].name).toBe('FIRST PACK')
		expect(endState.packs.cardPacks[1].name).toBe('SECOND PACK')
})
test('packs status should be set', () => {
		const action = changeStatusFirstLoading(false)
		const endState = packsReducer(startState, action)
		expect(endState.isFirstLoading).toBe(false)
})
test('filter by name should be set', () => {
		const action = setSearchByPacksNameFilter('filtered pack name')
		const endState = packsReducer(startState, action)
		expect(endState.searchParams.packName).toBe('filtered pack name')
})
test('user id filter should be set', () => {
		const action = setIsMyPacksFilter('filtered user id')
		const endState = packsReducer(startState, action)
		expect(endState.searchParams.user_id).toBe('filtered user id')
})
test('cards range should set', () => {
		const action = setRangeCards(10,50)
		const endState = packsReducer(startState, action)
		expect(endState.searchParams.min).toBe(10)
		expect(endState.searchParams.max).toBe(50)
})
test('packs sort should be set', () => {
		const action = setSortPacks('0updated')
		const endState = packsReducer(startState, action)
		expect(endState.searchParams.sortPacks).toBe('0updated')
})
test('filters should be reset', () => {
		const action = clearFilters()
		const endState = packsReducer(startState, action)
		expect(endState.searchParams.packName).toBe('')
		expect(endState.searchParams.user_id).toBe('')
})
test('new current page should be set', () => {
		const action = setCurrentPage(10)
		const endState = packsReducer(startState, action)
		expect(endState.searchParams.page).toBe(10)
})
