import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createTest } from '../api/apiService';

function CreateTest() {
    const [title, setTitle] = useState('');
    const [questions, setQuestions] = useState('');
    const navigate = useNavigate(); 

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = async (event) => {
            const fileContent = event.target.result;
            setQuestions(fileContent);
        };
        reader.readAsText(file);
    };

    const handleCreateTest = async () => {
        try {
            const response = await createTest(title, questions.split('\n'));
            alert(response.message);
            navigate('/my-tests');
        } catch (error) {
            console.error('Error creating test:', error.response?.data?.message || error.message);
        }
    };    

    return (
        <div className="container mt-5">
            <h1>Create Test</h1>
            <div className="form-group">
                <label htmlFor="titleInput">Title:</label>
                <input
                    type="text"
                    className="form-control"
                    id="titleInput"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label htmlFor="fileInput">Upload a CSV file:</label>
                <input type="file" accept=".csv" className="form-control-file" id="fileInput" onChange={handleFileUpload} />
            </div>
            <div className="form-group">
                <label htmlFor="questionsInput">Questions (one per line):</label>
                <textarea
                    className="form-control"
                    id="questionsInput"
                    rows="5"
                    value={questions}
                    onChange={(e) => setQuestions(e.target.value)}
                ></textarea>
            </div>
            <button className="btn btn-primary" onClick={handleCreateTest}>Create Test</button>
        </div>
    );
}

export default CreateTest;
