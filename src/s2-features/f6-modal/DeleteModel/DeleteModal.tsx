import React from 'react';
import {BasicModal} from '../BaseModal';
import s from './DeleteModal.module.scss'
import {Button} from '../../../s1-main/m1-ui/common/c1-components/Button/Button';

type PropsType = {
    title: string
    open: boolean
    closeModal: () => void
    deleteItem: () => void
    itemName: string
    isPack?: boolean
}

export const DeleteModal = ({title, open, closeModal, deleteItem, itemName, isPack}: PropsType) => {
    return (
        <BasicModal open={open} closeModal={closeModal} title={title}>
            <div className={s.text}>
                Do you really want to remove
                <span className={s.itemName}> {itemName}</span>?
                {
                    isPack && <div style={{marginTop: '5px'}}>All cards will be deleted.</div>
                }
            </div>
            <div className={s.btnGroup}>
                <Button  onClick={closeModal} white>Cansel</Button>
                <Button onClick={deleteItem} red>Delete</Button>
            </div>
        </BasicModal>
    );
};
