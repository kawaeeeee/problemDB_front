import React, { useState, useEffect } from 'react';
import { TextField, Button, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import axios from 'axios';
import apiClient from './api';

const UnitForm = () => {
  const [grades, setGrades] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [selectedGrade, setSelectedGrade] = useState('');
  const [filteredSubjects, setFilteredSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState('');
  const [unitName, setUnitName] = useState('');

  useEffect(() => {
    // 学年と教科を取得するAPI呼び出し
    const fetchGradesAndSubjects = async () => {
      const gradesResponse = await apiClient.get('/get/grades/all');
      const subjectsResponse = await apiClient.get('/get/subjects/all');
      setGrades(gradesResponse.data);
      setSubjects(subjectsResponse.data);
    };
    fetchGradesAndSubjects();
  }, []);

  useEffect(() => {
    // 選択された学年に対応する教科をフィルタリング
    const filtered = subjects.filter(subject => subject.grade_id === selectedGrade);
    setFilteredSubjects(filtered);
  }, [selectedGrade, subjects]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    // 単元を追加するAPI呼び出し
    await apiClient.post('/insert/unit', {
      name: unitName,
      subject_id: selectedSubject,
    });
    // フォームのリセット
    setUnitName('');
    setSelectedGrade('');
    setSelectedSubject('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormControl fullWidth margin="normal">
        <InputLabel>学年</InputLabel>
        <Select
          value={selectedGrade}
          onChange={(e) => setSelectedGrade(e.target.value)}
        >
          {grades.map((grade) => (
            <MenuItem key={grade.id} value={grade.id}>
              {grade.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth margin="normal">
        <InputLabel>教科</InputLabel>
        <Select
          value={selectedSubject}
          onChange={(e) => setSelectedSubject(e.target.value)}
          disabled={!selectedGrade}
        >
          {filteredSubjects.map((subject) => (
            <MenuItem key={subject.id} value={subject.id}>
              {subject.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        fullWidth
        label="単元名"
        value={unitName}
        onChange={(e) => setUnitName(e.target.value)}
        margin="normal"
      />
      <Button variant="contained" color="primary" type="submit">
        登録する
      </Button>
    </form>
  );
};

export default UnitForm;
