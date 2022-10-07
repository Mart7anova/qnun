import React from 'react'
import s from './PackMenu.module.scss'
import editImg from 's1-main/m1-ui/common/c3-image/edit.svg'
import learnImg from 's1-main/m1-ui/common/c3-image/study.svg'
import deleteImg from 's1-main/m1-ui/common/c3-image/delete.svg'
import {Link, useNavigate} from 'react-router-dom';
import {PATH} from '../../../u1-Route/Variables/routeVariables';
import {Icon} from '../Icon/Icon';
import {useModal} from '../../../../m2-bll/hooks/useModal';
import {DeleteModal} from '../../../../../s2-features/f6-modal/DeleteModel/DeleteModal';
import {useAppDispatch, useAppSelector} from '../../../../m2-bll/store';
import {getPackName} from '../../../../m2-bll/selectors/cards-selectors';
import {deletePack, updatePack} from '../../../../m2-bll/reducers/packs-reducer';
import {PackModal} from '../../../../../s2-features/f6-modal/PackModal/PackModal';
import {fetchCards} from '../../../../m2-bll/reducers/cards-reducer';

interface IProps {
    closeMenu: () => void
    packId: string
}

export const PackMenu = ({closeMenu, packId}: IProps) => {
    const dispatch = useAppDispatch()
    const packName = useAppSelector(getPackName)
    const navigate = useNavigate()

    const {open, openModal, closeModal} = useModal();
    const {openEdit, openEditModal, closeEditModal} = useModal();


    const onEditClick = async (packName: string, isPrivate: boolean) => {
        closeMenu()
        await dispatch(updatePack(packId, packName, isPrivate))
        await dispatch(fetchCards(packId))
        closeModal()
    }

    const onDeleteClick = async () => {
        closeMenu()
        await dispatch(deletePack(packId))
        closeEditModal()
        navigate(PATH.PACKS_LIST)
    }

    return (
        <div className={s.wrapper}>
            <div className={s.menuItem} onClick={openModal}>
                <Icon img={editImg} alt={'edit'}/>
                Edit
            </div>
            <PackModal title={'Edit pack'} open={open} closeModal={closeModal} sentChanges={onEditClick}/>

            <div className={s.menuItem} onClick={openEditModal}>
                <Icon img={deleteImg} alt={'delete'}/>
                Delete
            </div>
            <DeleteModal title={'Delete pack'} isPack deleteItem={onDeleteClick} itemName={packName} open={openEdit}
                         closeModal={closeEditModal}/>

            <Link to={PATH.LEARN + packId}>
                <div className={s.menuItem}>
                    <Icon img={learnImg} alt={'learn'}/>
                    Learn
                </div>
            </Link>
        </div>
    )
}