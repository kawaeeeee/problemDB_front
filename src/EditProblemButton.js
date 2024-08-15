import React, { useState, useEffect } from 'react';
import { TextField, Button, MenuItem, Select, FormControl, InputLabel, Modal, Box } from '@mui/material';
import apiClient from './api';

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
    const [editedProblem, setEditedProblem] = useState(problem);
    const [filteredSubjects, setFilteredSubjects] = useState([]);
    const [units, setUnits] = useState([]);

    useEffect(() => {
        // 学年に基づいて教科をフィルタリング
        if (editedProblem.grade) {
            const filtered = subjects.filter(subject => subject.grade_id === editedProblem.grade);
            setFilteredSubjects(filtered);
        }
    }, [editedProblem.grade, subjects]);

    useEffect(() => {
        // 教科に基づいて単元を取得
        if (editedProblem.subject_id) {
            fetchUnitsForSubject(editedProblem.subject_id);
        }
    }, [editedProblem.subject]);

    const fetchUnitsForSubject = async (subjectId) => {
        const response = await apiClient.get(`/get/units/${subjectId}`);
        setUnits(response.data);
        // 教科が変わった場合は単元を初期化
        setEditedProblem(prev => ({ ...prev, unit: '' }));
    };

    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);

    const handleInputChange = (field, value) => {
        setEditedProblem(prev => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleSubmit = async () => {
        // 編集されたproblemを送信する処理を追加
        try {
            await apiClient.put(`/api/problems/${editedProblem.id}`, editedProblem);
            alert('問題が更新されました');
            handleCloseModal();
        } catch (error) {
            console.error('問題の更新中にエラーが発生しました:', error);
        }
    };

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
                    <FormControl fullWidth margin="normal">
                        <InputLabel>学年</InputLabel>
                        <Select
                            value={editedProblem.grade}
                            onChange={(e) => handleInputChange('grade', e.target.value)}
                        >
                            {grades.map(grade => (
                                <MenuItem key={grade.id} value={grade.id}>{grade.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControl fullWidth margin="normal">
                        <InputLabel>教科</InputLabel>
                        <Select
                            value={editedProblem.subject}
                            onChange={(e) => handleInputChange('subject', e.target.value)}
                            disabled={!editedProblem.grade}
                        >
                            {filteredSubjects.map(subject => (
                                <MenuItem key={subject.id} value={subject.id}>{subject.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControl fullWidth margin="normal">
                        <InputLabel>単元</InputLabel>
                        <Select
                            value={editedProblem.unit}
                            onChange={(e) => handleInputChange('unit', e.target.value)}
                            disabled={!editedProblem.subject}
                        >
                            {units.map(unit => (
                                <MenuItem key={unit.id} value={unit.name}>{unit.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <TextField
                        label="タイトル"
                        fullWidth
                        margin="normal"
                        value={editedProblem.title}
                        onChange={(e) => handleInputChange('title', e.target.value)}
                    />

                    <FormControl fullWidth margin="normal">
                        <InputLabel>難しさ</InputLabel>
                        <Select
                            value={editedProblem.difficulty}
                            onChange={(e) => handleInputChange('difficulty', e.target.value)}
                        >
                            {[0, 1, 2, 3, 4, 5].map(level => (
                                <MenuItem key={level} value={level.toString()}>{level}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <Button variant="contained" color="primary" onClick={handleSubmit}>
                        保存
                    </Button>
                </Box>
            </Modal>
        </div>
    );
};

export default EditProblemButton;
