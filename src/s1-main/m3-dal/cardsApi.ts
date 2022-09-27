import {instance} from './instance/instance';


export const cardsApi = {
    getCards(packId: string, currentPage: number, searchParams: ParamsType) {
        return instance.get<CardsResponseType>(`/cards/card?cardsPack_id=${packId}`, {
            params: {
                pageCount: 10,
                page: currentPage,
                ...searchParams
            }
        })
    },
    createCard(packId: string, question: string, answer: string) {
        return instance.post(`/cards/card`, {
            card: {
                cardsPack_id: packId,
                question,
                answer,
            }
        })
    },
    deleteCard(cardId: string) {
        return instance.delete(`/cards/card?id=${cardId}`)
    },
    updateCard(cardId: string, question: string, answer: string) {
        return instance.put(`/cards/card`, {
            card: {
                _id: cardId,
                question,
                answer,
            }
        })
    },

}
//types
export type CardType = {
    answer: string
    question: string
    cardsPack_id: string
    grade: number
    shots: number
    user_id: string
    created: Date
    updated: Date
    _id: string
}
export type CardsResponseType = {
    cards: CardType[]
    cardsTotalCount: number
    maxGrade: number
    minGrade: number
    page: number
    pageCount: number
    packUserId: string
    packName: string
}

export type ParamsType = {
    //cardAnswer: string
    cardQuestion?: string
    cardsPack_id?: number
    min?: number
    max?: number
    sortCards?: string
    page?: number
    pageCount?: number
}