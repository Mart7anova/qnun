import { useState } from 'react';

interface ReturnType {
    open: boolean;
    openEdit: boolean;
    openModal: () => void;
    closeModal: () => void;
    closeEditModal: () => void;
    openEditModal: () => void;
}

export const useModal = (): ReturnType => {
    const [open, setOpen] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);

    const closeModal = (): void => {
        setOpen(false);
    };

    const openModal = (): void => {
        setOpen(true);
    };

    const closeEditModal = (): void => {
        setOpenEdit(false);
    };

    const openEditModal = (): void => {
        setOpenEdit(true);
    };

    return {
        open,
        openEdit,
        closeModal,
        openModal,
        closeEditModal,
        openEditModal,
    };
};