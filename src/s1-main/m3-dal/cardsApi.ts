import {instance} from './instance/instance';
import {AxiosResponse} from 'axios';


export const cardsApi = {
    getCards(packId: string, params: RequestCardSearchParamsType) {
        return instance.get<RequestCardSearchParamsType, AxiosResponse<CardsResponseType>>(`/cards/card?cardsPack_id=${packId}`, {params})
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
    updateCardsGrade(card_id: string, grade: number) {
        return instance.put<ResponseCardGrade>(`/cards/grade`, {
            card_id,
            grade
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

export type RequestCardSearchParamsType = {
    cardQuestion?: string
    cardsPack_id?: number
    min?: number
    max?: number
    sortCards?: string
    page?: number
    pageCount?: number
}

export type ResponseCardGrade = {
    token: string
    tokenDeathTime: number
    updateGrade: {
        card_id: string
        cardsPack_id: string
        created: string
        grade: number
        more_id: string
        shots: number
        updated: string
        user_id: string
        __v: number
        _id: string
    }
}