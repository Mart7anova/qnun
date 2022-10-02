import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import editImg from 'assets/edit.svg';
import deleteImg from 'assets/delete.svg';
import TableContainer from '@mui/material/TableContainer';
import React from 'react';
import {deleteCard, setSortCards, updateCard} from 's1-main/m2-bll/reducers/cards-reducer';
import {useAppDispatch} from 's1-main/m2-bll/store';
import {CardType} from 's1-main/m3-dal/cardsApi';
import {TableHeaderItem} from '../TableHeaderItem';
import style from './CardsTable.module.scss'
import dayjs from 'dayjs';

type CardsTablePropsType = {
		cards: CardType[]
		isOwner: boolean
}

export const CardsTable = ({isOwner, cards}: CardsTablePropsType) => {
		const dispatch = useAppDispatch()
		const updateCardHandle = (packId: string, cardId: string) => {
				dispatch(updateCard(packId, cardId))
		}
		const deleteCardHandle = (packId: string, cardId: string) => {
				dispatch(deleteCard(packId, cardId))
		}
		return (
				<div>
						<TableContainer component={Paper}>
								<Table sx={{minWidth: 650}}>
										<TableHead sx={{backgroundColor: '#EFEFEF', height: '48px'}}>
												<TableRow>
														<TableHeaderItem name={'Question'} align={'left'} sortName={'question'}
														                 setSort={setSortCards} className={style.question}/>
														<TableHeaderItem name={'Answer'} align={'left'} sortName={'answer'} setSort={setSortCards}
														                 className={style.answer}/>
														<TableHeaderItem name={'Last Updated'} align={'center'} sortName={'updated'}
														                 setSort={setSortCards} className={style.lastUpdated}/>
														<TableHeaderItem name={'Grade'} align={'center'} sortName={'grade'} setSort={setSortCards}
														                 className={style.grade}/>
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
																<TableCell align="center">{dayjs(card.updated).format(`DD.MM.YYYY`)}</TableCell>
																<TableCell align="center">{card.grade}</TableCell>
																{
																		isOwner && <TableCell align="center">
									<span style={{display: 'flex', gap: '8px'}}>
										<img src={editImg} alt="edit"
										     onClick={() => updateCardHandle(card.cardsPack_id, card._id)}/>
										<img src={deleteImg} alt="detele"
										     onClick={() => deleteCardHandle(card.cardsPack_id, card._id)}/>
									</span>
																		</TableCell>
																}
														</TableRow>
												))}
										</TableBody>
								</Table>
								{cards.length === 0 &&
										<div style={{textAlign: 'center', fontSize: '25px'}}>No results.</div>
								}
						</TableContainer>
				</div>
		)
}