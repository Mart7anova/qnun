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
import {deleteCard, updateCard} from 's1-main/m2-bll/reducers/cards-reducer';
import {useAppDispatch} from 's1-main/m2-bll/store';
import {CardType} from 's1-main/m3-dal/cardsApi';

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
        </TableContainer>
    )
}