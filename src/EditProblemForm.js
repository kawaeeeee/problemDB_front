import React, { useState, useEffect } from 'react';
import { TextField, Button, MenuItem, Select, FormControl, InputLabel, Box } from '@mui/material';
import apiClient from './api';

const EditProblemForm = ({ problem, grades, subjects, onClose }) => {
    const [filteredSubjects, setFilteredSubjects] = useState([]);
    const [units, setUnits] = useState([]);
    const [grade, setGrade] = useState(problem.grade_id);
    const [subject, setSubject] = useState('');
    const [unit, setUnit] = useState('');
    const [difficulty, setDifficulty] = useState(problem.difficulty);
    const [title, setTitle] = useState(problem.title);


    useEffect(() => {
        if (problem.grade_id) {
            const filtered = subjects.filter(subject => subject.grade_id === problem.grade_id);
            setFilteredSubjects(filtered);
        }
    },[])

    // 初期値の設定
    useEffect(() => {
        if (grade) {
            const filtered = subjects.filter(subject => subject.grade_id === grade);
            setFilteredSubjects(filtered);
        }
    }, [grade, subjects]);

    useEffect(() => {
        if (problem.subject_id) {
            setSubject(problem.subject_id);
            fetchUnitsForSubject(problem.subject_id);
        }
    }, [problem.subject_id]);

    useEffect(() => {
        if (problem.unit_id) {
            setUnit(problem.unit_id);
        }
    }, [problem.unit_id, units]);

    const fetchUnitsForSubject = async (subjectId) => {
        const response = await apiClient.get(`/get/units/${subjectId}`);
        setUnits(response.data);
    };

    const isFormValid = () => {
        return (
            grade &&
            subject &&
            unit &&
            title &&
            difficulty !== undefined
        );
    };

    const handleSubmit = async (e) => {
        if (!isFormValid()) {
            alert('すべての項目を入力してください。');
            return;
        }

        const formData = new FormData();
        formData.append('id', problem.id);
        formData.append('grade', grade);
        formData.append('subject', subject);
        formData.append('unit', unit);
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
                    value={grade}
                    onChange={(e) => setGrade(e.target.value)}
                >
                    {grades.map(grade => (
                        <MenuItem key={grade.id} value={grade.id}>{grade.name}</MenuItem>
                    ))}
                </Select>
            </FormControl>

            <FormControl fullWidth margin="normal">
                <InputLabel>教科</InputLabel>
                <Select
                    value={subject}
                    onChange={(e) => {
                        setSubject(e.target.value);
                        fetchUnitsForSubject(e.target.value);
                    }}
                    disabled={!grade}
                >
                    {filteredSubjects.map(subject => (
                        <MenuItem key={subject.id} value={subject.id}>{subject.name}</MenuItem>
                    ))}
                </Select>
            </FormControl>

            <FormControl fullWidth margin="normal">
                <InputLabel>単元</InputLabel>
                <Select
                    value={unit}
                    onChange={(e) => setUnit(e.target.value)}
                    disabled={!subject}
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
