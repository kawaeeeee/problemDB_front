import React, { useState } from 'react';
import { Button, Modal, Box } from '@mui/material';
import EditProblemForm from './EditProblemForm';

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    height: '80%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    overflow: 'auto',
};

const EditProblemButton = ({ problem, grades, subjects }) => {
    const [openModal, setOpenModal] = useState(false);

    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);

    return (
        <div>
            <Button variant='contained' onClick={handleOpenModal}>
                編集
            </Button>
            <Modal
                open={openModal}
                onClose={handleCloseModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={modalStyle}>
                    <EditProblemForm
                        problem={problem}
                        grades={grades}
                        subjects={subjects}
                        onClose={handleCloseModal}
                    />
                </Box>
            </Modal>
        </div>
    );
};

export default EditProblemButton;
