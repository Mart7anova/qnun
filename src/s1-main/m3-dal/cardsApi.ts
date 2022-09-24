import {instance} from 's1-main/m3-dal/authApi';


export const cardsApi = {
    getCards(packId: string) {
        return instance.get<ResponseType>(`/cards/card?cardsPack_id=${packId}`)
    },
    createCard(packId: string, question: string, answer: string) {
        return instance.post(`cards/card`, {
            card: {
                cardsPack_id: packId,
                question,
                answer,
            }
        })
    },
    deleteCard(cardId: string) {
        return instance.delete(`cards/card?id=${cardId}`)
    },
    updateCard(cardId: string, question: string, answer: string) {
        return instance.put(`cards/card`, {
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
type ResponseType = {
    cards: CardType[]
    cardsTotalCount: number
    maxGrade: number
    minGrade: number
    page: number
    pageCount: number
    packUserId: string
}