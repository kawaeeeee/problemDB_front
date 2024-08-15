import React, { useState } from 'react';
import axios from 'axios';
import apiClient from './api';

const FileUpload = () => {
    const [file, setFile] = useState(null);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleFileUpload = async () => {
        if (file) {
            const formData = new FormData();
            formData.append('file', file);

            try {
                const response = await apiClient.post('/upload', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                console.log('File uploaded successfully:', response.data);
            } catch (error) {
                console.error('Error uploading file:', error);
            }
        }
    };

    return (
        <div>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleFileUpload}>Upload</button>
        </div>
    );
};

export default FileUpload;
