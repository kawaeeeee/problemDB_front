import { Button, Modal, Box } from '@mui/material';
import { useState, useEffect } from 'react';
import AddProblemForm from './AddProblemForm';

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

const AddProblemButton = () => {
    const [openProblemForm, setOpenProblemForm] = useState(false);

    const handleOpenProblemForm = () => setOpenProblemForm(true);
    const handleCloseProblemForm = () => setOpenProblemForm(false);

    return (
        <div>
            <Button variant='contained' onClick={handleOpenProblemForm}>
                問題を追加
            </Button>
            <Modal
                open={openProblemForm}
                onClose={handleCloseProblemForm}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={modalStyle}>
                    <AddProblemForm></AddProblemForm>
                </Box>
            </Modal>
        </div>
    );
}

export default AddProblemButton;