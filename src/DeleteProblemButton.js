import React, { useState } from 'react';
import { Button, Modal, Box } from '@mui/material';
import apiClient from './api';




const DeleteProblemButton = ({problem}) => {
    const [openModal, setOpenModal] = useState(false);

    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);
    const handleDelete = async () => {
        await apiClient.delete(`/delete/problem/${problem.id}`);
        setOpenModal(false);
    };

    
    return (
        <div>
            <Button variant='contained' onClick={handleOpenModal}>
                削除
            </Button>
            <Modal open={openModal} onClose={handleCloseModal}>
                <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 300, bgcolor: 'background.paper', p: 4 }}>
                <h2>本当に削除しますか？</h2>
                <Button onClick={handleCloseModal} variant="outlined">キャンセル</Button>
                <Button onClick={handleDelete} variant="contained" color="secondary">削除する</Button>
                </Box>
            </Modal>
        </div>
    );
}

export default DeleteProblemButton;