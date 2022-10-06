import * as React from 'react';
import {ReactNode} from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import s from './BaseModal.module.scss'
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    boxShadow: 24,
    pt: 3,
};

type PropsType = {
    children: ReactNode
    title: string
    open: boolean
    closeModal: () => void
}

export const BasicModal = (props: PropsType) => {
    const {children, title, open, closeModal} = props

    return (
        <Modal open={open} onClose={closeModal}>
            <Box sx={style}>
                <div className={s.headerContainer}>
                    <h1 className={s.header}>{title}</h1>
                    <ClearRoundedIcon className={s.iconClose} onClick={closeModal}/>
                </div>
                <div className={s.childrenContainer}>
                    {children}
                </div>
            </Box>
        </Modal>
    );
}
