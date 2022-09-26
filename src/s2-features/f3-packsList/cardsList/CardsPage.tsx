import React, {useEffect} from 'react'
import {useAppDispatch, useAppSelector} from 's1-main/m2-bll/store';
import {
		createCard,
		deleteCard,
		initializePage,
		setPageInitialized,
		updateCard
} from 's1-main/m2-bll/reducers/cards-reducer';
import {Link, Navigate, useParams} from 'react-router-dom';
import {Button} from 's1-main/m1-ui/common/c1-components/Button/Button';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import {PATH} from 's1-main/m1-ui/u1-Route/Variables/routeVariables';
import style from 's2-features/f2-profile/Profile.module.scss';
import arrow from 's1-main/m1-ui/common/c3-image/photo/arrow.png';
import {TextField} from '@mui/material';
import {getAuthUserId, getIsLoggedIn} from 's1-main/m2-bll/selectors/auth-selectors';
import editImg from 'assets/edit.svg'
import deleteImg from 'assets/delete.svg'
import {Spinner} from 'assets/Spinner';

export const CardsPage = () => {
		const dispatch = useAppDispatch()
		const {id} = useParams<{ id: string }>()
		const cards = useAppSelector(state => state.cards.cards)
		const packId = id ? id : ''
		const packUserId = useAppSelector(state => state.cards.packUserId)
		const pageInitialized = useAppSelector(state => state.cards.pageInitialized)
		const isLoggedIn = useAppSelector(getIsLoggedIn)
		const userId = useAppSelector(getAuthUserId)
		const packName = useAppSelector(state => state.cards.packName)
		const isOwner = packUserId === userId

		const addNewCardHandle = () => {
				dispatch(createCard(packId))
		}

		const updateCardHandle = (packId: string, cardId: string) => {
				dispatch(updateCard(packId, cardId))
		}
		const deleteCardHandle = (packId: string, cardId: string) => {
				dispatch(deleteCard(packId, cardId))
		}

		useEffect(() => {
				dispatch(initializePage(packId))
		}, [])

		useEffect(() => {
				return () => {
						dispatch(setPageInitialized(false))
				}
		}, [])

		if (!isLoggedIn) return <Navigate to={PATH.LOGIN}/>
		if (!pageInitialized) return <Spinner/>
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
														<div>
																<h3>Search</h3>
																<TextField placeholder="Provide your text" sx={{width: '100%'}}/>
														</div>
														<TableContainer component={Paper}>
																<Table sx={{minWidth: 650}}>
																		<TableHead sx={{backgroundColor: '#EFEFEF', height: '48px'}}>
																				<TableRow>
																						<TableCell align="left" sx={{width: '35%'}}>Question</TableCell>
																						<TableCell align="left" sx={{width: '35%'}}>Answer</TableCell>
																						<TableCell align="center" sx={{width: '15%'}}>Last Updated</TableCell>
																						<TableCell align="center" sx={{width: '15%'}}>Grade</TableCell>
																						{isOwner && <TableCell>Actions</TableCell>}
																				</TableRow>
																		</TableHead>
																		<TableBody>
																				{cards.map(card => (
																						<TableRow
																								key={card._id}
																								sx={{'&:last-child td, &:last-child th': {border: 0}}}
																						>
																								<TableCell align="left">{card.question}</TableCell>
																								<TableCell align="left">{card.answer}</TableCell>
																								<TableCell align="center">{String(card.updated)}</TableCell>
																								<TableCell align="center">{card.grade}</TableCell>
																								{isOwner &&
																										<TableCell align="center">
																												<span style={{display: 'flex', gap: '8px'}}>
																														<img src={editImg} alt="edit"
																														     onClick={() => updateCardHandle(card.cardsPack_id, card._id)}/>
																														<img src={deleteImg} alt="detele"
																														     onClick={() => deleteCardHandle(card.cardsPack_id, card._id)}/>
																												</span>
																										</TableCell>}
																						</TableRow>
																				))}
																		</TableBody>
																</Table>
														</TableContainer>
														<h2>pagination</h2>
												</>
										)
										: (
												<div style={{textAlign: 'center', marginTop: '80px'}}>
														{isOwner
																? <>
																		<h2>This pack is empty. Click add new card to fill
																				this pack</h2>
																		<Button onClick={addNewCardHandle}>Add new card</Button>
																</>
																: <>
																		<h2>This pack is empty</h2>
																</>
														}
												</div>
										)
								}
						</div>
				</div>
		)
}