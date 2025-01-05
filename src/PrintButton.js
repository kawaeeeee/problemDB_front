import React, { useState } from 'react';
import { Button, Modal, Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import apiClient from './api';




const PrintButton = ({problem}) => {
    const [openModal, setOpenModal] = useState(false);
    const [paperSize, setPaperSize] = useState('9');
    const [duplex, setDuplex] = useState('1');

    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('paper_size', paperSize);
        formData.append('duplex', duplex);
        try{
            await apiClient.post(`/print-file/${problem.id}`, formData);
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
                <Box sx={modalStyle}>
                    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <FormControl fullWidth>
                            <InputLabel>用紙サイズ</InputLabel>
                            <Select value={paperSize} onChange={(e) => setPaperSize(e.target.value)}>
                                <MenuItem value='8'>A3</MenuItem>
                                <MenuItem value='9'>A4</MenuItem>
                                <MenuItem value='12'>B4</MenuItem>
                                <MenuItem value='13'>B5</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl fullWidth>
                            <InputLabel>両面印刷</InputLabel>
                            <Select value={duplex} onChange={(e) => setDuplex(e.target.value)}>
                                <MenuItem value='1'>しない</MenuItem>
                                <MenuItem value='2'>縦とじ</MenuItem>
                                <MenuItem value='3'>横とじ</MenuItem>
                            </Select>
                        </FormControl>
                        <Button type="submit" variant="contained" color="primary">印刷する</Button>
                        <Button onClick={handleCloseModal} variant="outlined">キャンセル</Button>
                    </Box>
                </Box>
            </Modal>
        </div>
    );
}

export default PrintButton;

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',  // 幅を80%に設定
    height: '80%',  // 高さを80%に設定
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    overflow: 'auto', // コンテンツがオーバーフローした場合にスクロールできるように設定
};