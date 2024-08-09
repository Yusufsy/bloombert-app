import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchUserTests, deleteTest } from '../api/apiService';

function MyTests() {
    const [tests, setTests] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const userTests = await fetchUserTests();
                setTests(userTests ?? []);
            } catch (error) {
                console.error('Error fetching user tests:', error.response?.data?.message || error.message);
            }
        }
        fetchData();
    }, []);

    const handleDeleteTest = async (testId) => {
        const confirmed = window.confirm('Are you sure you want to delete this test?');
        if (!confirmed) {
            return; // If the user cancels, do nothing
        }
    
        try {
            await deleteTest(testId);
            setTests(tests.filter(test => test.id !== testId));
            alert('Test deleted successfully!');
        } catch (error) {
            console.error('Error deleting test:', error.response?.data?.message || error.message);
        }
    };

    return (
        <div className="container mt-5">
            <h1>My Tests</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Graduate Level</th> {/* Add Graduate Level column */}
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {tests?.map(test => (
                        <tr key={test.id}>
                            <td>{test.id}</td>
                            <td><Link to={`/edit-test/${test.id}`}>{test.title}</Link></td>
                            <td>{test.graduate_level}</td> {/* Display Graduate Level */}
                            <td>
                                <button onClick={() => handleDeleteTest(test.id)} className="btn btn-danger">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default MyTests;
