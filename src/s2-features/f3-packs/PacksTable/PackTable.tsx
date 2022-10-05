import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {PackType} from 's1-main/m3-dal/packApi';
import studyImg from 's1-main/m1-ui/common/c3-image/study.svg';
import editImg from 's1-main/m1-ui/common/c3-image/edit.svg';
import deleteImg from 's1-main/m1-ui/common/c3-image/delete.svg';
import {useAppDispatch, useAppSelector} from 's1-main/m2-bll/store';
import {deletePack, setSortPacks, updatePack} from 's1-main/m2-bll/reducers/packs-reducer';
import {Link} from 'react-router-dom';
import {TableHeaderItemSort} from '../../../s1-main/m1-ui/common/c1-components/TableHeaderItem/TableHeaderItemSort';
import style from './PackTable.module.scss'
import {SkeletonTableRow} from 's2-features/f3-packs/PacksTable/SkeletonTableRow';
import dayjs from 'dayjs';
import {PATH} from '../../../s1-main/m1-ui/u1-Route/Variables/routeVariables';
import {getProfileId} from '../../../s1-main/m2-bll/selectors/profile-selectors';
import {getIsFirstLoading, getPageCount} from '../../../s1-main/m2-bll/selectors/packs-selectors';


type TablePropsType = {
    packs: PackType[]
}

export const PackTable = ({packs}: TablePropsType) => {
    const dispatch = useAppDispatch()

    const userID = useAppSelector(getProfileId)
    const isFirstLoading = useAppSelector(getIsFirstLoading)
    const elementsPerPage = useAppSelector(getPageCount)


    const deletePackHandle = (id: string) => {
        dispatch(deletePack(id))
    }

    const updatePackHandle = (id: string) => {
        dispatch(updatePack(id))
    }

    return (
        <TableContainer sx={{marginTop: '25px'}} component={Paper}>
            <Table className={style.table}>
                <TableHead className={style.tableHead}>
                    <TableRow>
                        <TableHeaderItemSort name={'Name'} align={'left'} sortName={'name'} setSort={setSortPacks}
                                             className={style.name}/>
                        <TableHeaderItemSort name={'Cards'} align={'right'} sortName={'cardsCount'}
                                             setSort={setSortPacks} className={style.cards}/>
                        <TableHeaderItemSort name={'Last Updated'} align={'center'} sortName={'updated'}
                                             setSort={setSortPacks} className={style.lastUpdated}/>
                        <TableHeaderItemSort name={'Created by'} align={'center'} sortName={'user_name'}
                                             setSort={setSortPacks} className={style.createdBy}/>
                        <TableCell align="left" className={style.actions}>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        !isFirstLoading && packs.map(pack => (
                            <TableRow
                                key={pack._id}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}>

                                <TableCell align="left" sx={{overflowWrap: 'anywhere'}}>
                                    <Link to={PATH.PACK + pack._id}>
                                        {pack.name}
                                    </Link>
                                </TableCell>
                                <TableCell align="center">{pack.cardsCount}</TableCell>
                                <TableCell align="center">{dayjs(pack.updated).format(`DD.MM.YYYY`)}</TableCell>
                                <TableCell align="center">{pack.user_name}</TableCell>
                                <TableCell align="left">
                                <span style={{display: 'flex', gap: '8px'}}>
                                    {
                                        pack.cardsCount > 0 &&
                                        <img src={studyImg} alt="study"
                                             style={{cursor: 'pointer'}}/>
                                    }
                                    {
                                        userID === pack.user_id &&
                                        <>
                                            <img src={editImg} alt="edit"
                                                 style={{cursor: 'pointer'}}
                                                 onClick={() => updatePackHandle(pack._id)}
                                            />
                                            <img src={deleteImg} alt="delete"
                                                 style={{cursor: 'pointer'}}
                                                 onClick={() => deletePackHandle(pack._id)}/>
                                        </>
                                    }
                                </span>
                                </TableCell>
                            </TableRow>
                        ))
                    }
                    {
                        isFirstLoading && <SkeletonTableRow elementsPerPage={elementsPerPage}/>
                    }
                </TableBody>
            </Table>
            {!packs.length && !isFirstLoading &&
                <div style={{textAlign: 'center', fontSize: '25px'}}>No result try to use other params.</div>}
        </TableContainer>
    );
}