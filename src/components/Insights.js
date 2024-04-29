import React, { useState, useEffect } from 'react';
import { getInsights } from '../api/apiService';
import Chart from 'chart.js/auto';
import loadingGif from '../assets/loading.gif';

function Insights() {
    const [insights, setInsights] = useState(null);

    useEffect(() => {
        const fetchInsights = async () => {
            try {
                const response = await getInsights();
                setInsights(response);
                createChart(response.counts);
            } catch (error) {
                console.error('Error fetching insights:', error.response?.data?.message || error.message);
            }
        };
        fetchInsights();
    }, []);

    const createChart = (counts) => {
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
            }
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
                    tooltip: {
                        callbacks: {
                            // label: (context) => {
                            //     const count = context.parsed;
                            //     const percentage = ((count / data.reduce((a, b) => a + b, 0)) * 100).toFixed(2);
                            //     return `${count} - ${percentage}%`;
                            // }
                        }
                    }
                }
            }
        });
    };    
    

    if (!insights) {
        return (
            <div className="container d-flex justify-content-center align-items-center vh-100">
                <img src={loadingGif} alt="Loading..." width={"10%"}/>
            </div>
        );
    }

    return (
        <div className="container mt-5">
            <h1>Insights</h1>
            <div className="d-flex">
                <div className="mr-5">
                    <h3>Total Tests: {insights.total_tests}</h3>
                    <h4>Total Questions: {insights.total_questions}</h4>
                    <div>
                        <h3>Classification Counts</h3>
                        <ul>
                            {Object.entries(insights.counts).map(([classification, count], index) => (
                                <li key={classification} style={{ color: '#FF6384' }}>{classification}: <b>{count}</b></li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h3>Classification Percentages</h3>
                        <ul>
                            {Object.entries(insights.percentages).map(([classification, percentage], index) => (
                                <li key={classification} style={{ color: '#36A2EB' }}>{classification}: <b>{percentage}%</b></li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div style={{width: "60%"}}>
                    <h3>Taxonomy Distribution</h3>
                    <canvas id="taxonomyPieChart" width="400" height="400"></canvas>
                    <br/>
                    <canvas id="taxonomyBarChart" width="400" height="400"></canvas>
                </div>
            </div>
        </div>
    );
}

export default Insights;
