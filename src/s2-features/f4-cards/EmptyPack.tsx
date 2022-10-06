import React from 'react';
import {Button} from 's1-main/m1-ui/common/c1-components/Button/Button';
import {useAppSelector} from '../../s1-main/m2-bll/store';
import {getAppStatus} from '../../s1-main/m2-bll/selectors/app-selectors';
import {CardModal} from '../f6-modal/CardModal/CardModal';

type EmptyPackPropsType = {
    isOwner: boolean
    addNewCard: (question: string, answer: string) => void
    open: boolean
    closeModal: () => void
    openModal: () => void
}

export const EmptyPack = ({isOwner, addNewCard, open, closeModal, openModal}: EmptyPackPropsType) => {
    const appStatus = useAppSelector(getAppStatus)

    return (
        <div style={{textAlign: 'center', marginTop: '80px'}}>
            {isOwner
                ? <>
                    <h2>This pack is empty. Click add new card to fill
                        this pack</h2>
                    <Button onClick={openModal} disabled={appStatus === 'loading'} style={{margin: '20px'}}>Add new card</Button>
                    <CardModal title={'Add new card'} sentChanges={addNewCard} open={open} closeModal={closeModal}/>
                </>
                : <h2>This pack is empty</h2>
            }
        </div>
    );
};
