import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { Button, Modal, Box } from '@mui/material';
import { useState, useEffect } from 'react';

import apiClient from './api';


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

const OpenPdfButton = (props) => {
    const [pdfBlob, setPdfBlob] = useState(null);//pdfファイルの保存先
    const [openpdf, setOpenpdf] = useState(false);//pdf表示のモーダルを開くかどうか

    const handleOpenpdf = () => setOpenpdf(true);
    const handleClosepdf = () => setOpenpdf(false);//pdfモーダルを閉じるための関数

    const handleFileOpen = () => {
        setOpenpdf(true);

        apiClient.get(`/get-pdf/${props.problem_id}`,{
            responseType: 'blob'
        })
        .then(response => {
            setPdfBlob(response.data);
        })
        .catch(error => {
            console.error('Error fetching PDF:',error);
        });
    }

    return (
        <div>
            <Button variant="contained" onClick={handleFileOpen}>
                    開く
            </Button>
            <Modal
                open={openpdf}
                onClose={handleClosepdf}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={modalStyle}>
                    {pdfBlob ? (
                        <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}>
                            <Viewer
                                fileUrl={URL.createObjectURL(pdfBlob)}
                                style={{ height: '100%', width: '100%' }} // Viewerの高さと幅を100%に設定
                            />
                        </Worker>
                    ) : (
                        <p>Loading PDF...</p>
                    )}
                </Box>
            </Modal>
        </div>
        
    );

}

export default OpenPdfButton;