// FeedbackForm.js
import React, { useState } from 'react';
import { submitFeedback } from '../api/apiService';
import { useNavigate } from 'react-router-dom';

const FeedbackForm = () => {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await submitFeedback(content);
      setMessage('Feedback submitted successfully');
      alert('Feedback submitted successfully, thank you!');
      navigate('/dashboard');
    } catch (error) {
      console.error('Error submitting feedback:', error.response?.data?.message || error.message);
      setMessage('Error submitting feedback');
    }
    setLoading(false);
  };

  return (
    <div className='container mt-5'>
      <h2>Submit Feedback</h2>
      {message && <p style={{color: 'green'}}>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="content">Feedback:</label>
          <textarea
            id="content"
            className="form-control"
            rows="5"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit Feedback'}
        </button>
      </form>
    </div>
  );
};

export default FeedbackForm;
