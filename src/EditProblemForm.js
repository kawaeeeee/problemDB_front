import React, { useState, useEffect } from 'react';
import { TextField, Button, MenuItem, Select, FormControl, InputLabel, Box } from '@mui/material';
import apiClient from './api';

const EditProblemForm = ({ problem, grades, subjects, onClose }) => {
    const [filteredSubjects, setFilteredSubjects] = useState([]);
    const [units, setUnits] = useState([]);
    const [selectedGrade, setSelectedGrade] = useState(problem.grade_id);
    const [selectedSubject, setSelectedSubject] = useState('');
    const [selectedUnit, setSelectedUnit] = useState('');
    const [difficulty, setDifficulty] = useState(problem.difficulty);
    const [title, setTitle] = useState(problem.title);

    // Filtering subjects based on the selected grade
    useEffect(() => {
        if (selectedGrade) {
            const filtered = subjects.filter(subject => subject.grade_id == selectedGrade);
            setFilteredSubjects(filtered);

            // Automatically set the subject if it exists in the filtered list
            if (filtered.length > 0 && problem.subject_id) {
                setSelectedSubject(problem.subject_id);
                fetchUnitsForSubject(problem.subject_id);
            } else {
                setSelectedSubject('');
                setUnits([]);
            }
        }
    }, [selectedGrade, problem.subject_id, subjects]);

    // Set the initial unit if problem data is available
    useEffect(() => {
        if (problem.unit_id) {
            setSelectedUnit(problem.unit_id);
        }
    }, [problem.unit_id]);

    const fetchUnitsForSubject = async (subjectId) => {
        const response = await apiClient.get(`/get/units/${subjectId}`);
        setUnits(response.data);
    };

    const isFormValid = () => {
        return (
            selectedGrade &&
            selectedSubject &&
            selectedUnit &&
            title &&
            difficulty !== undefined
        );
    };

    const handleSubmit = async () => {
        if (!isFormValid()) {
            alert('すべての項目を入力してください。');
            return;
        }

        const formData = new FormData();
        formData.append('id', problem.id);
        formData.append('grade', selectedGrade);
        formData.append('subject', selectedSubject);
        formData.append('unit', selectedUnit);
        formData.append('title', title);
        formData.append('difficulty', difficulty);

        try {
            await apiClient.put(`/api/problems/${problem.id}`, formData);
            alert('問題が更新されました');
            onClose(); // モーダルを閉じる
        } catch (error) {
            console.error('問題の更新中にエラーが発生しました:', error);
        }
    };

    return (
        <Box>
            <FormControl fullWidth margin="normal">
                <InputLabel>学年</InputLabel>
                <Select
                    value={selectedGrade}
                    onChange={(e) => setSelectedGrade(e.target.value)}
                >
                    {grades.map(grade => (
                        <MenuItem key={grade.id} value={grade.id}>{grade.name}</MenuItem>
                    ))}
                </Select>
            </FormControl>

            <FormControl fullWidth margin="normal">
                <InputLabel>教科</InputLabel>
                <Select
                    value={selectedSubject}
                    onChange={(e) => {
                        setSelectedSubject(e.target.value);
                        fetchUnitsForSubject(e.target.value);
                    }}
                    disabled={!selectedGrade}
                >
                    {filteredSubjects.map(sub => (
                        <MenuItem key={sub.id} value={sub.id}>{sub.name}</MenuItem>
                    ))}
                </Select>
            </FormControl>

            <FormControl fullWidth margin="normal">
                <InputLabel>単元</InputLabel>
                <Select
                    value={selectedUnit}
                    onChange={(e) => setSelectedUnit(e.target.value)}
                    disabled={!selectedSubject}
                >
                    {units.map(unit => (
                        <MenuItem key={unit.id} value={unit.id}>{unit.name}</MenuItem>
                    ))}
                </Select>
            </FormControl>

            <TextField
                label="タイトル"
                fullWidth
                margin="normal"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />

            <FormControl fullWidth margin="normal">
                <InputLabel>難しさ</InputLabel>
                <Select
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value)}
                >
                    {[0, 1, 2, 3, 4, 5].map(level => (
                        <MenuItem key={level} value={level.toString()}>{level}</MenuItem>
                    ))}
                </Select>
            </FormControl>

            <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                disabled={!isFormValid()} // フォームが無効な場合はボタンを無効化
            >
                保存
            </Button>
        </Box>
    );
};

export default EditProblemForm;
