import React, {useEffect} from 'react'
import {useAppDispatch, useAppSelector} from 's1-main/m2-bll/store';
import {createCard, fetchCards} from 's1-main/m2-bll/reducers/cards-reducer';
import {Link, Navigate, useParams} from 'react-router-dom';
import {Button} from 's1-main/m1-ui/common/c1-components/Button/Button';
import {PATH} from 's1-main/m1-ui/u1-Route/Variables/routeVariables';
import style from 's2-features/f2-profile/Profile.module.scss';
import arrow from 's1-main/m1-ui/common/c3-image/photo/arrow.png';
import {getAuthUserId, getIsLoggedIn} from 's1-main/m2-bll/selectors/auth-selectors';
import {EmptyPack} from 's2-features/f3-packsList/cardsList/EmptyPack';
import {Search} from 's2-features/f3-packsList/cardsList/Search';
import {CardsTable} from 's2-features/f3-packsList/cardsList/CardsTable';

export const CardsPage = () => {
		const dispatch = useAppDispatch()
		const {packId} = useParams() as { packId: string }
		const cards = useAppSelector(state => state.cards.cards)
		const packUserId = useAppSelector(state => state.cards.packUserId)
		const isLoggedIn = useAppSelector(getIsLoggedIn)
		const userId = useAppSelector(getAuthUserId)
		const packName = useAppSelector(state => state.cards.packName)
		const isOwner = packUserId === userId

		const addNewCardHandle = () => {
				dispatch(createCard(packId))
		}

		useEffect(() => {
				dispatch(fetchCards(packId))
		}, [])

		if (!isLoggedIn) return <Navigate to={PATH.LOGIN}/>
		return (
				<div>
						<div style={{width: '1008px', margin: '0 auto'}}>
								<Link to={PATH.PACKS_LIST} className={style.link}>
										<img src={arrow} alt={'arrow'} className={style.arrowImg}/>
										<span className={style.textLink}>Back to Packs List</span>
								</Link>
								<div style={{display: 'flex', justifyContent: 'space-between'}}>
										<h1>{packName}</h1>
										{cards.length > 0 && isOwner && <Button onClick={addNewCardHandle}>Add new cards</Button>}
										{cards.length > 0 && !isOwner && <Button>Learn to pack</Button>}
								</div>

								{cards.length
										? (
												<>
														<Search/>
														<CardsTable isOwner={isOwner} cards={cards}/>
														<h3>pagination</h3>
												</>
										)
										: <EmptyPack isOwner={isOwner} addNewCardHandle={addNewCardHandle}/>
								}
						</div>
				</div>
		)
}