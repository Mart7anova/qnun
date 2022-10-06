import React from 'react';
import {Icon} from '../../../s1-main/m1-ui/common/c1-components/Icon/Icon';
import editImg from '../../../s1-main/m1-ui/common/c3-image/edit.svg';
import deleteImg from '../../../s1-main/m1-ui/common/c3-image/delete.svg';
import {deleteCard, updateCard} from '../../../s1-main/m2-bll/reducers/cards-reducer';
import {useAppDispatch} from '../../../s1-main/m2-bll/store';
import {useModal} from '../../../s1-main/m2-bll/hooks/useModal';
import {CardModal} from '../../f6-modal/CardModal/CardModal';
import {DeleteModal} from '../../f6-modal/DeleteModel/DeleteModal';

type PropsType = {
    packId: string
    cardId: string
    cardName: string
}

export const IconCardsGroup = ({packId, cardId, cardName}: PropsType) => {

    const {open, openModal, closeModal} = useModal();
    const {openEdit, openEditModal, closeEditModal} = useModal();
    const dispatch = useAppDispatch()

    const updateCardHandle = async (question: string, answer: string) => {
        await dispatch(updateCard(packId, cardId, question, answer))
        closeModal()
    }

    const deleteCardHandle = async() => {
        await dispatch(deleteCard(packId, cardId))
        closeEditModal()
    }

    return (
        <span style={{display: 'flex', gap: '8px'}}>
            <Icon img={editImg} alt={'edit'} onClick={openModal}/>
            <CardModal title={'Edit card'} sentChanges={updateCardHandle} open={open} closeModal={closeModal}/>
            <Icon img={deleteImg} alt={'delete'} onClick={openEditModal}/>
            <DeleteModal title={'Delete card'} deleteItem={deleteCardHandle} itemName={cardName} open={openEdit} closeModal={closeEditModal}/>
        </span>
    );
};
