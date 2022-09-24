import React, {useEffect} from 'react'
import {useAppDispatch, useAppSelector} from 's1-main/m2-bll/store';
import {createCard, fetchCards} from 's1-main/m2-bll/reducers/cards-reducer';
import {useParams} from 'react-router-dom';
import {Button} from 's1-main/m1-ui/common/c1-components/Button/Button';


export const CardsPage = () => {
		const dispatch = useAppDispatch()
		const {id} = useParams()
		const packId = id ? id : ''
		const cards = useAppSelector(state => state.cards.cards)

		const addNewCardHandle = () => {
				dispatch(createCard(packId))
		}
		useEffect(() => {
				dispatch(fetchCards(packId))
		}, [])
		return (
				<div>
						{cards.length
								? <span>here will be cards</span>
								: <div style={{textAlign: 'center', marginTop: '80px'}}>
										<h2>This pack is empty. Click add new card to fill
												this pack</h2>
										<Button onClick={addNewCardHandle}>Add new card</Button>
								</div>
						}
				</div>
		)
}