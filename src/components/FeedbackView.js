import React, { useState, useEffect } from 'react';
import { getFeedback } from '../api/apiService';

function FeedbackView() {
    const [feedbackList, setFeedbackList] = useState([]);

    useEffect(() => {
        const fetchFeedback = async () => {
            try {
                const response = await getFeedback();
                setFeedbackList(response);
            } catch (error) {
                console.error('Error fetching feedback:', error.response?.data?.message || error.message);
            }
        };
        fetchFeedback();
    }, []);

    return (
        <div className="container mt-5">
            <h1>Feedback</h1>
            <div className="list-group">
                {feedbackList.map(feedback => (
                    <div key={feedback.id} className="list-group-item">
                        <h5 className="mb-1">{feedback.user_email}</h5> {/* Display user's email */}
                        <p className="mb-1">{feedback.content}</p>
                        <small>{feedback.submitted_on}</small>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default FeedbackView;
