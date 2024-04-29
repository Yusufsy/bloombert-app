import React from 'react';
import { Link } from 'react-router-dom';

function TestManager() {
    return (
        <div className="container mt-5">
            <h1 className="mb-4">Test Manager Options</h1>
            <div className="row">
                <div className="col-md-4 mb-4">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Create Test</h5>
                            <p className="card-text">Create a new test with a title and a list of questions.</p>
                            <Link to="/create-test" className="btn btn-primary">Go to Create Test</Link>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 mb-4">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">My Tests</h5>
                            <p className="card-text">View and manage your existing tests. You can update the title or delete a test.</p>
                            <Link to="/my-tests" className="btn btn-primary">Go to My Tests</Link>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 mb-4">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Insights</h5>
                            <p className="card-text">View insights based on the classifications of questions in your tests.</p>
                            <Link to="/insights" className="btn btn-primary">Go to Insights</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TestManager;
