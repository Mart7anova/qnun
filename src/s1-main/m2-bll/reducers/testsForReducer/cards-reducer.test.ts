import {
    cardsReducer,
    CardsReducerType, resetCardsState,
    setCards,
    setCurrentPage,
    setSearchByCardsNameFilter, setSortCards
} from 's1-main/m2-bll/reducers/cards-reducer';

let startState: CardsReducerType
beforeEach(() => {
    startState = {
        cardsState: {
            cards: [
                {
                    cardsPack_id: 'doesnt matter',
                    _id: 'doesnt matter',
                    answer: 'answer',
                    user_id: '123',
                    grade: 0,
                    question: 'question',
                    updated: new Date(),
                    created: new Date(),
                    shots: 0,
                },
            ],
            page: 1,
            cardsTotalCount: 50,
            pageCount: 10,
            packUserId: 'doesnt matter',
            packName: 'some pack',
            maxGrade: 5,
            minGrade: 0,
        },
        searchParams: {
            cardQuestion: '',
            page: 1,
            cardsPack_id: 1,
            pageCount: 10,
            max: 10,
            min: 0,
            sortCards: '0updated',
        },
    }
})
test('cards from response should be set', () => {
    const action = setCards({
        cards: [
            {
                cardsPack_id: 'doesnt matter',
                _id: 'doesnt matter',
                answer: 'answer',
                user_id: '123',
                grade: 0,
                question: 'question',
                updated: new Date(),
                created: new Date(),
                shots: 0,
            },
            {
                cardsPack_id: 'doesnt matter',
                _id: 'doesnt matter',
                answer: 'answer',
                user_id: '123',
                grade: 0,
                question: 'question',
                updated: new Date(),
                created: new Date(),
                shots: 0,
            },
        ],
        cardsTotalCount: 2,
        page: 1,
        pageCount: 10,
        minGrade: 0,
        maxGrade: 5,
        packName: 'NEW PACK NAME',
        packUserId: '222'
    })
    const endState = cardsReducer(startState, action)
    expect(endState.cardsState.cards.length).toBe(2)
    expect(endState.cardsState.packName).toBe('NEW PACK NAME')
})
test('new currentPage should be set', () => {
    const action = setCurrentPage(5)
    const endState = cardsReducer(startState, action)
    expect(endState.searchParams.page).toBe(5)
})
test('card question param should be set', () => {
    const action = setSearchByCardsNameFilter('searched card question')
    const endState = cardsReducer(startState, action)
    expect(endState.searchParams.cardQuestion).toBe('searched card question')
})
test('sort card should work properly', () => {
    const action = setSortCards('1updated')
    const endState = cardsReducer(startState, action)
    expect(endState.searchParams.sortCards).toBe('1updated')
})
test('state should be set to initial', () => {
    const action = resetCardsState()
    const endState = cardsReducer(startState, action)
    expect(endState.cardsState.cards.length).toBe(0)
})