import React, { useState, useEffect } from 'react';
import { TextField, Button, Select, MenuItem, InputLabel, FormControl, Box } from '@mui/material';
import axios from 'axios';
import apiClient from './api';

const AddProblemForm = () => {
  const [grades, setGrades] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [units, setUnits] = useState([]);
  const [selectedGrade, setSelectedGrade] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedUnit, setSelectedUnit] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [title, setTitle] = useState('');
  const [memo, setMemo] = useState('');
  const [pdfFile, setPdfFile] = useState(null);

  useEffect(() => {
    // 学年と教科を取得
    fetchGradesAndSubjects();
  }, []);

  useEffect(() => {
    // 教科が選択されたら対応する単元を取得
    if (selectedSubject) {
      fetchUnits(selectedSubject);
    }
  }, [selectedSubject]);

  const fetchGradesAndSubjects = async () => {
    const gradesResponse = await apiClient.get('/get/grades/all');
    const subjectsResponse = await apiClient.get('/get/subjects/all');
    setGrades(gradesResponse.data);
    setSubjects(subjectsResponse.data);
  };

  const fetchUnits = async (subjectId) => {
    const response = await apiClient.get(`/get/units/${subjectId}`);
    setUnits(response.data);
  };

  const handleFileChange = (e) => {
    setPdfFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', pdfFile);
    formData.append('title', title);
    formData.append('grade', selectedGrade);
    formData.append('subject', selectedSubject);
    formData.append('unit', selectedUnit);
    formData.append('difficulty', difficulty);
    formData.append('memo', memo);

    try {
      await apiClient.post('/insert/problem', formData);
      alert('Problem added successfully');
      resetForm();
    } catch (error) {
      console.error('Error adding problem:', error);
      alert('Failed to add problem');
    }
  };

  const resetForm = () => {
    setPdfFile(null);
    setTitle('');
    setSelectedGrade('');
    setSelectedSubject('');
    setSelectedUnit('');
    setDifficulty('');
    setMemo('');
  }

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <FormControl fullWidth>
        <InputLabel>学年</InputLabel>
        <Select value={selectedGrade} onChange={(e) => setSelectedGrade(e.target.value)}>
          {grades.map((grade) => (
            <MenuItem key={grade.id} value={grade.id}>{grade.name}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth>
        <InputLabel>教科</InputLabel>
        <Select value={selectedSubject} onChange={(e) => setSelectedSubject(e.target.value)}>
          {subjects
            .filter((subject) => subject.grade_id === selectedGrade)
            .map((subject) => (
              <MenuItem key={subject.id} value={subject.id}>{subject.name}</MenuItem>
            ))}
        </Select>
      </FormControl>

      <FormControl fullWidth>
        <InputLabel>単元</InputLabel>
        <Select value={selectedUnit} onChange={(e) => setSelectedUnit(e.target.value)}>
          {units.map((unit) => (
            <MenuItem key={unit.id} value={unit.id}>{unit.name}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth>
        <InputLabel>難しさ</InputLabel>
        <Select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
          <MenuItem value="0">0</MenuItem>
          <MenuItem value="1">1</MenuItem>
          <MenuItem value="2">2</MenuItem>
          <MenuItem value="3">3</MenuItem>
          <MenuItem value="4">4</MenuItem>
          <MenuItem value="5">5</MenuItem>
        </Select>
      </FormControl>

      <TextField
        label="タイトル"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
      />

      <TextField
        label="メモ"
        value={memo}
        onChange={(e) => setMemo(e.target.value)}
        multiline
        rows={4}
        fullWidth
      />

      <input type="file" accept="application/pdf" onChange={handleFileChange} />

      <Button type="submit" variant="contained">登録</Button>
    </Box>
  );
};

export default AddProblemForm;

