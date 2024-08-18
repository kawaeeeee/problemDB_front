import React, { useState } from 'react';
import { Button, Modal, Box } from '@mui/material';
import apiClient from './api';




const PrintButton = ({problem}) => {
    const [openModal, setOpenModal] = useState(false);

    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);
    const handlePrint = async () => {
        try{
            await apiClient.get(`/print/${problem.id}`);
            setOpenModal(false);
        } catch (error){
            if(error.response && error.response.status === 400){
                alert('ファイルが見つかりません。');
            } else {
                alert('印刷に失敗しました。後でもう一度お試しください。')
            }
        }
        
    };

    
    return (
        <div>
            <Button variant='contained' onClick={handleOpenModal}>
                印刷
            </Button>
            <Modal open={openModal} onClose={handleCloseModal}>
                <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 300, bgcolor: 'background.paper', p: 4 }}>
                <h2>本当に印刷しますか？</h2>
                <Button onClick={handleCloseModal} variant="outlined">キャンセル</Button>
                <Button onClick={handlePrint} variant="contained" color="secondary">印刷する</Button>
                </Box>
            </Modal>
        </div>
    );
}

export default PrintButton;