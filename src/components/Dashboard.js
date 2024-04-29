import React from 'react';
import { Link } from 'react-router-dom';

function Dashboard() {
    return (
        <div className="container mt-5">
            <h1 className="mb-4">Dashboard</h1>
            <div className="row">
                <div className="col-md-4 mb-4">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Question Classification</h5>
                            <p className="card-text">Classify questions based on Bloom's Taxonomy categories.</p>
                            <Link to="/classification" className="btn btn-primary">Go to Classification</Link>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 mb-4">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Test Manager</h5>
                            <p className="card-text">Manage and create tests for your students.</p>
                            <Link to="/test-manager" className="btn btn-primary">Go to Tests</Link>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 mb-4">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Feedback</h5>
                            <p className="card-text">Let us know your thoughts and suggestions</p>
                            <Link to="/feedback" className="btn btn-primary">Go to Feedback</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
