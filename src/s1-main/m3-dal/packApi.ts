import {instance} from 's1-main/m3-dal/authApi';


export const packApi = {
		getPacks() {
				return instance.get<ResponseType>(`/cards/pack`)
		},
		createPack(name: string, isPrivate = false) {
				return instance.post(`cards/pack`, {
						cardsPack: {
								name,
								private: isPrivate
						}
				})
		},
		deletePack(packId: string) {
				return instance.delete(`/cards/pack/?id=${packId}`)
		},
		updatePack(_id: string, newName: string) {
				return instance.put(`/cards/pack`, {
						cardsPack: {
								_id,
								name: newName,
						}
				})
		},
}
//types
type PackType = {
		_id: string
		user_id: string
		name: string
		cardsCount: number
		created: Date
		updated: Date
}
type ResponseType = {
		cardPacks: PackType[]
		cardPacksTotalCount: number
		maxCardsCount: number
		minCardsCount: number
		page: number
		pageCount: number
}