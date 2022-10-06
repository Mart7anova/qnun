import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import React from 'react';
import {setSortCards} from 's1-main/m2-bll/reducers/cards-reducer';
import {CardType} from 's1-main/m3-dal/cardsApi';
import {TableHeaderItemSort} from '../../../s1-main/m1-ui/common/c1-components/TableHeaderItem/TableHeaderItemSort';
import style from './CardsTable.module.scss'
import dayjs from 'dayjs';
import {Rating} from '@mui/material';
import {IconCardsGroup} from './IconCardsGroup';


type CardsTablePropsType = {
    cards: CardType[]
    isOwner: boolean
}

export const CardsTable = ({isOwner, cards}: CardsTablePropsType) => {
    return (
        <TableContainer sx={{marginTop: '25px'}} component={Paper}>
            <Table sx={{minWidth: 650}}>
                <TableHead sx={{backgroundColor: '#EFEFEF', height: '48px'}}>
                    <TableRow>
                        <TableHeaderItemSort name={'Question'} align={'left'} sortName={'question'}
                                             setSort={setSortCards} className={style.question}/>
                        <TableHeaderItemSort name={'Answer'} align={'left'} sortName={'answer'} setSort={setSortCards}
                                             className={style.answer}/>
                        <TableHeaderItemSort name={'Last Updated'} align={'right'} sortName={'updated'}
                                             setSort={setSortCards} className={style.lastUpdated}/>
                        <TableCell align={'center'} className={style.shots}>Shots</TableCell>
                        <TableHeaderItemSort name={'Grade'} align={'center'} sortName={'grade'} setSort={setSortCards}
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
                            <TableCell align="center">{card.shots}</TableCell>
                            <TableCell align="center"><Rating value={card.grade} readOnly/></TableCell>
                            {
                                isOwner && <TableCell align="center">
                                    <IconCardsGroup cardId={card._id} packId={card.cardsPack_id} cardName={card.question}/>
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
    )
}