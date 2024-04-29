import React, { useState, useEffect } from 'react';
import { getTestById, updateTest, classifyQuestions } from '../api/apiService';
import { useParams } from 'react-router-dom';
import Chart from 'chart.js/auto';

function UpdateTest() {
    const { id } = useParams();
    const [test, setTest] = useState(null);
    const [title, setTitle] = useState('');
    const [questions, setQuestions] = useState('');
    const [classificationResults, setClassificationResults] = useState([]);

    useEffect(() => {
        updateChart();
    }, [classificationResults]);

    useEffect(() => {
        const fetchTest = async () => {
            try {
                const response = await getTestById(id);
                setTest(response);
                setTitle(response.title || '');
                setQuestions(response.questions ? response.questions.join('\n') : '');
            } catch (error) {
                console.error('Error fetching test:', error.response?.message || error.message);
            }
        };
        fetchTest();
    }, [id]);

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = () => {
            const fileContent = reader.result;
            setQuestions(fileContent);
        };
        reader.readAsText(file);
    };

    const handleUpdateTest = async () => {
        try {
            await updateTest(id, { title, questions: questions.split('\n') });
            alert('Test updated successfully!');
        } catch (error) {
            console.error('Error updating test:', error.response?.data?.message || error.message);
        }
    };

    const handleClassify = async () => {
        try {
            const response = await classifyQuestions(questions.split(/\r?\n/));
            setClassificationResults(response.data);
        } catch (error) {
            console.error('Error classifying questions:', error);
        }
    };

    const updateChart = () => {
        const counts = {};
        classificationResults.forEach((result) => {
            counts[result.classification] = (counts[result.classification] || 0) + 1;
        });
    
        const ctx = document.getElementById('classificationChart');
        if (ctx) {
            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: Object.keys(counts),
                    datasets: [{
                        label: 'Count',
                        data: Object.values(counts),
                        backgroundColor: 'rgba(54, 162, 235, 0.2)',
                        borderColor: 'rgba(54, 162, 235, 1)',
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        }
    };  

    if (!test) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mt-5">
            <h1>Test ID: {test.id}</h1>
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
            <button className="btn btn-primary" onClick={handleClassify}>Classify</button>
            &nbsp;&nbsp;&nbsp;
            <button className="btn btn-secondary" onClick={handleUpdateTest}>Update Test</button>
            <div className="mt-4">
                {classificationResults.length > 0 && (
                    <div>
                        <h2>Classification Results</h2>
                        <div className="row">
                            <div className="col-md-6">
                                <ul>
                                    {classificationResults.map((result, index) => (
                                        <li key={index}>
                                            <strong>Question:</strong> {result.question}<br />
                                            <strong>Classification:</strong> {result.classification}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="col-md-6">
                                <canvas id="classificationChart" width="400" height="200"></canvas>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default UpdateTest;
