import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, TextField, Modal, Box } from '@mui/material';
import axios from 'axios';
import apiClient from './api';

const UnitList = () => {
  const [units, setUnits] = useState([]);//全件取得したunitの格納場所
  const [editUnit, setEditUnit] = useState(null);
  const [deleteUnit, setDeleteUnit] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [grades, setGrades] = useState([]);
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    fetchUnits();
    fetchGrades();
    fetchSubjects();
  }, []);//始めにunit,grade,subjectを全件取得

  const fetchUnits = async () => {
    const response = await apiClient.get('/get/units/all');
    setUnits(response.data);
  };

  const fetchGrades = async () => {
    const response = await apiClient.get('/get/grades/all');
    setGrades(response.data);
  }

  const fetchSubjects = async () => {
    const response = await apiClient.get('/get/subjects/all');
    setSubjects(response.data);
  }

  const handleEditChange = (e) => {
    setEditUnit({ ...editUnit, name: e.target.value });
  };

  const handleEditSave = async () => {
    await apiClient.put(`/update/unit/${editUnit.id}`, { name: editUnit.name });
    setEditUnit(null);
    fetchUnits();
  };

  const handleDelete = async () => {
    await apiClient.delete(`/delete/unit/${deleteUnit.id}`);
    setModalOpen(false);
    setDeleteUnit(null);
    fetchUnits();
  };

  const getSubjectName = (subject_id) => {
    const subject = subjects.find((sub) => sub.id === subject_id);
    return subject ? subject.name : '';
  };

  const getSubjectGradeid = (subject_id) => {
    const subject = subjects.find((sub) => sub.id === subject_id);
    return subject ? subject.grade_id : '';
  };

  const getGradeName = (grade_id) => {
    const grade = grades.find((gr) => gr.id === grade_id);
    return grade ? grade.name : '';
  };

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>学年</TableCell>
            <TableCell>教科名</TableCell>
            <TableCell>単元名</TableCell>
            <TableCell>編集</TableCell>
            <TableCell>削除</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {units.map((unit) => (
            <TableRow key={unit.id}>
              <TableCell>{getGradeName(getSubjectGradeid(unit.subject_id))}</TableCell>
              <TableCell>{getSubjectName(unit.subject_id)}</TableCell>
              <TableCell>
                {editUnit && editUnit.id === unit.id ? (
                  <TextField value={editUnit.name} onChange={handleEditChange} />
                ) : (
                  unit.name
                )}
              </TableCell>
              <TableCell>
                {editUnit && editUnit.id === unit.id ? (
                  <Button onClick={handleEditSave} variant="contained">保存</Button>
                ) : (
                  <Button onClick={() => setEditUnit(unit)} variant="outlined">編集</Button>
                )}
              </TableCell>
              <TableCell>
                <Button onClick={() => { setDeleteUnit(unit); setModalOpen(true); }} variant="contained" color="secondary">削除</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 300, bgcolor: 'background.paper', p: 4 }}>
          <h2>本当に削除しますか？</h2>
          <Button onClick={() => setModalOpen(false)} variant="outlined">キャンセル</Button>
          <Button onClick={handleDelete} variant="contained" color="secondary">削除する</Button>
        </Box>
      </Modal>
    </TableContainer>
  );
};

export default UnitList;
