import React from 'react';
import {Icon} from '../../../s1-main/m1-ui/common/c1-components/Icon/Icon';
import editImg from '../../../s1-main/m1-ui/common/c3-image/edit.svg';
import deleteImg from '../../../s1-main/m1-ui/common/c3-image/delete.svg';
import {useAppDispatch} from '../../../s1-main/m2-bll/store';
import {useModal} from '../../../s1-main/m2-bll/hooks/useModal';
import {DeleteModal} from '../../f6-modal/DeleteModel/DeleteModal';
import {deletePack, updatePack} from '../../../s1-main/m2-bll/reducers/packs-reducer';
import {PackModal} from '../../f6-modal/PackModal/PackModal';

type PropsType = {
    packId: string
    packName: string
}

export const IconPacksGroup = ({packId, packName}: PropsType) => {

    const {open, openModal, closeModal} = useModal();
    const {openEdit, openEditModal, closeEditModal} = useModal();
    const dispatch = useAppDispatch()

    const updatePackHandle = async (packName: string, isPrivate: boolean) => {
        await dispatch(updatePack(packId, packName, isPrivate))
        closeModal()
    }

    const deletePackHandle = async () => {
        await dispatch(deletePack(packId))
        closeEditModal()
    }

    return (
        <span style={{display: 'flex', gap: '8px'}}>
            <Icon img={editImg} alt={'edit'} onClick={openModal}/>
            <PackModal title={'Edit pack'}
                       open={open}
                       closeModal={closeModal}
                       sentChanges={updatePackHandle}
            />

            <Icon img={deleteImg} alt={'delete'} onClick={openEditModal}/>
            <DeleteModal title={'Delete card'}
                         isPack
                         deleteItem={deletePackHandle}
                         itemName={packName}
                         open={openEdit}
                         closeModal={closeEditModal}
            />
        </span>
    );
};
