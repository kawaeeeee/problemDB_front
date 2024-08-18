
import { Button, Modal, Box } from '@mui/material';
import { useState, useEffect } from 'react';
import FileUpload from './FileUpload';
import UnitForm from './UnitForm';
import UnitList from './UnitList';
import apiClient from './api';
import ProblemList from './ProblemList';
import MenuBar from './MenuBar';
import AddProblemButton from './AddProblemButton';

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

const App = () => {
    const [openunitf,setOpenunitf] = useState(false);//
    const [screen, setScreen] = useState(1);
    const handleOpenunitf = () => setOpenunitf(true);//単元フォームモーダルを開くための関数
    const handleCloseunitf = () => setOpenunitf(false);


    return (
        <div className='App'>
            <MenuBar 
                onHomeClick={() => setScreen(1)} 
                onEditUnitClick={() => setScreen(2)}
                onEditProblemClick={() => setScreen(3)}
            />
            {screen === 1 && (
                <div>
                    <ProblemList isPrintable={true} />
                </div>
            )}
            {screen === 2 && (
                <div>
                    <Button onClick={handleOpenunitf}>単元を追加</Button>
                    <UnitList />
                    <Modal
                        open={openunitf}
                        onClose={handleCloseunitf}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={modalStyle}>
                            <UnitForm />
                        </Box>
                    </Modal>
                </div>
            )}
            {screen === 3 && (
                <div>
                    <AddProblemButton />
                    <ProblemList isEditable={true} />
                </div>
            )}
        </div>
    );
};

export default App;
