import React, { useState, useEffect } from 'react';
import { getInsights } from '../api/apiService';
import Chart from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels'; // Import the plugin
import loadingGif from '../assets/loading.gif';

function Insights() {
    const [insights, setInsights] = useState(null);
    const [currentLevel, setCurrentLevel] = useState('Undergraduate');

    useEffect(() => {
        const fetchInsights = async () => {
            try {
                const response = await getInsights();
                setInsights(response);
                if (response.counts[currentLevel]) {
                    createChart(response.counts[currentLevel]);
                }
            } catch (error) {
                console.error('Error fetching insights:', error.response?.data?.message || error.message);
            }
        };
        fetchInsights();
    }, [currentLevel]);

    const handleToggleChange = (event) => {
        setCurrentLevel(event.target.value);
    };

    const createChart = (counts) => {
        if (!counts) return; // Prevent chart creation if counts are not available

        const labels = Object.keys(counts);
        const data = Object.values(counts);
        const backgroundColors = ['#FF6384', '#36A2EB', '#FFCE56', '#4CAF50', '#9C27B0', '#FF9800'];

        const ctxPie = document.getElementById('taxonomyPieChart');
        const ctxBar = document.getElementById('taxonomyBarChart');

        // Check if charts already exist and destroy them
        if (Chart.getChart(ctxPie)) {
            Chart.getChart(ctxPie).destroy();
        }
        if (Chart.getChart(ctxBar)) {
            Chart.getChart(ctxBar).destroy();
        }

        // Generate colors for count labels
        const countLabelColors = backgroundColors.slice(0, labels.length);

        // Create the pie chart
        new Chart(ctxPie, {
            type: 'pie',
            data: {
                labels: labels,
                datasets: [{
                    data: data,
                    backgroundColor: backgroundColors,
                    hoverOffset: 4
                }]
            },
            options: {
                plugins: {
                    datalabels: {
                        color: '#000',
                        formatter: (value, context) => {
                            const total = data.reduce((a, b) => a + b, 0);
                            const percentage = ((value / total) * 100).toFixed(2);
                            return percentage >= 2 ? `${percentage}%` : ''; // Only show label if percentage >= 2%
                        },
                        anchor: 'end',
                        align: 'start',
                        offset: 10,
                        font: {
                            weight: 'bold',
                            size: 24 // Increase font size
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: (context) => {
                                const count = context.parsed;
                                const percentage = ((count / data.reduce((a, b) => a + b, 0)) * 100).toFixed(2);
                                return `${count} - ${percentage}%`;
                            }
                        }
                    }
                }
            },
            plugins: [ChartDataLabels] // Include the plugin
        });

        // Create the bar chart
        new Chart(ctxBar, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Count',
                    data: data,
                    backgroundColor: countLabelColors
                }]
            },
            options: {
                indexAxis: 'y',
                plugins: {
                    datalabels: {
                        color: '#000',
                        formatter: (value, context) => {
                            const total = data.reduce((a, b) => a + b, 0);
                            const percentage = ((value / total) * 100).toFixed(2);
                            return percentage >= 2 ? `${percentage}%` : ''; // Only show label if percentage >= 2%
                        },
                        anchor: 'end',
                        align: 'end',
                        offset: 4,
                        font: {
                            weight: 'bold',
                            size: 14 // Increase font size
                        }
                    }
                }
            },
            plugins: [ChartDataLabels] // Include the plugin
        });
    };

    if (!insights) {
        return (
            <div className="container d-flex justify-content-center align-items-center vh-100">
                <img src={loadingGif} alt="Loading..." width={"10%"} />
            </div>
        );
    }

    const hasRecords = insights.total_tests[currentLevel] > 0;

    return (
        <div className="container mt-5">
            <h1>Insights</h1>
            <div>
                <button
                    onClick={() => setCurrentLevel('Undergraduate')}
                    className={`btn btn-${currentLevel === 'Undergraduate' ? 'primary' : 'secondary'} mr-2`}
                >
                    Undergraduate
                </button>
                <button
                    onClick={() => setCurrentLevel('Graduate')}
                    className={`btn btn-${currentLevel === 'Graduate' ? 'primary' : 'secondary'}`}
                >
                    Graduate
                </button>
            </div>
            {hasRecords ? (
                <div className="d-flex">
                    <div className="mr-5">
                        <h3>Total Tests: {insights.total_tests[currentLevel]}</h3>
                        <h4>Total Questions: {insights.total_questions[currentLevel]}</h4>
                        <div>
                            <h3>Classification Counts</h3>
                            <ul>
                                {Object.entries(insights.counts[currentLevel]).map(([classification, count]) => (
                                    <li key={classification} style={{ color: '#FF6384' }}>{classification}: <b>{count}</b></li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h3>Classification Percentages</h3>
                            <ul>
                                {Object.entries(insights.percentages[currentLevel]).map(([classification, percentage]) => (
                                    <li key={classification} style={{ color: '#36A2EB' }}>{classification}: <b>{percentage}%</b></li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div style={{ width: "60%" }}>
                        <h3>Taxonomy Distribution</h3>
                        <canvas id="taxonomyPieChart" width="400" height="400"></canvas>
                        <br />
                        {/* <canvas id="taxonomyBarChart" width="400" height="400"></canvas> */}
                    </div>
                </div>
            ) : (
                <div className="mt-5">
                    <h3>No records for {currentLevel} level</h3>
                </div>
            )}
        </div>
    );
}

export default Insights;
