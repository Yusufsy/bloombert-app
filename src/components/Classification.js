import React, { useState, useEffect } from 'react';
import { classifyQuestions } from '../api/apiService';
import Chart from 'chart.js/auto';

function ClassificationPage() {
    const [questions, setQuestions] = useState('');
    const [classificationResults, setClassificationResults] = useState([]);

    useEffect(() => {
        updateChart();
    }, [classificationResults]);

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = async (event) => {
            const fileContent = event.target.result;
            setQuestions(fileContent);
        };
        reader.readAsText(file);
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

    return (
        <div className="container mt-5">
        <h1>Question Classification</h1>
        <p>
            Classifying questions based on Bloom's Taxonomy can greatly assist educators in designing effective
            assessments. By categorizing questions according to cognitive levels, educators can ensure that their
            assessments target various aspects of learning, from basic recall to higher-order thinking skills.
        </p>
        <div className="form-group">
            <label htmlFor="fileInput">Upload a CSV file:</label>
            <input type="file" accept=".csv" className="form-control-file" id="fileInput" onChange={handleFileUpload} />
        </div>
        <div className="form-group">
            <label htmlFor="questionInput">Enter question(s) (separate with commas or new lines):</label>
            <textarea
                className="form-control"
                id="questionInput"
                rows="5"
                value={questions}
                onChange={(e) => setQuestions(e.target.value)}
            ></textarea>
        </div>
        <button className="btn btn-primary" onClick={handleClassify}>Classify</button>
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

export default ClassificationPage;
