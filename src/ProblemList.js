import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, TextField, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import axios from 'axios';
import apiClient from './api';
import OpenPdfButton from './OpenPdfButton';
import EditProblemButton from './EditProblemButton';
import DeleteProblemButton from './DeleteProblemButton';

const ProblemList = ({ isEditable }) => {
  const [problems, setProblems] = useState([]);
  const [grades, setGrades] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [selectedGrade, setSelectedGrade] = useState('');
  const [filteredSubjects, setFilteredSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState('');

  useEffect(() => {
    // Fetch grades and subjects when the component loads
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

  const fetchAllProblems = async () => {
    const response = await apiClient.get('/get/problems');
    setProblems(response.data);
    setSelectedGrade('');
    setSelectedSubject('');
  };

  const fetchFilteredProblems = async () => {
    const response = await apiClient.get('/get/problems', {
      params: { grade: selectedGrade, subject: selectedSubject }
    });
    setProblems(response.data);
  };

  const handleOpenFile = (filePath) => {
    window.open(`http://127.0.0.1:5000/${filePath}`, '_blank');
  };

  return (
    <div>
      {/* <Button variant="contained" onClick={fetchAllProblems}>全件取得</Button> */}

      <div style={{ marginTop: 20, display: 'flex', alignItems: 'center', gap: '10px' }}>
        <FormControl fullWidth margin="normal" style={{ flex: 1 }}>
            <InputLabel>学年</InputLabel>
            <Select value={selectedGrade} onChange={(e) => setSelectedGrade(e.target.value)}>
            {grades.map(grade => (
                <MenuItem key={grade.id} value={grade.id}>{grade.name}</MenuItem>
            ))}
            </Select>
        </FormControl>

        <FormControl fullWidth margin="normal" style={{ flex: 1 }}>
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

        <Button variant="contained" onClick={fetchFilteredProblems} style={{ height: '56px' }}>
            検索
        </Button>
      </div>

      <TableContainer style={{ marginTop: 20 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>学年</TableCell>
              <TableCell>教科</TableCell>
              <TableCell>単元</TableCell>
              <TableCell>タイトル</TableCell>
              <TableCell>難しさ</TableCell>
              <TableCell>ファイルを開く</TableCell>
              {isEditable && <TableCell>編集</TableCell>}
              {isEditable && <TableCell>削除</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {problems.map((problem) => (
              <TableRow key={problem.id}>
                <TableCell>{problem.grade}</TableCell>
                <TableCell>{problem.subject}</TableCell>
                <TableCell>{problem.unit}</TableCell>
                <TableCell>{problem.title}</TableCell>
                <TableCell>{problem.difficulty}</TableCell>
                <TableCell>
                  <OpenPdfButton problem_id={problem.id}></OpenPdfButton>
                </TableCell>
                {isEditable &&
                    <TableCell>
                        <EditProblemButton problem={problem} grades={grades} subjects={subjects}></EditProblemButton>
                    </TableCell>
                }
                {isEditable &&
                    <TableCell>
                        <DeleteProblemButton problem={problem}/>
                    </TableCell>
                }
                
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ProblemList;