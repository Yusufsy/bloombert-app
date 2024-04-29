import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import TestManager from './components/TestManager';
import Homepage from './components/Homepage';
import Header from './components/Header';
import ClassificationPage from './components/Classification';
import CreateTest from './components/CreateTest';
import MyTests from './components/MyTests';
import UpdateTest from './components/UpdateTest';
import Insights from './components/Insights';
import FeedbackForm from './components/FeedbackForm';
import FeedbackView from './components/FeedbackView';
import Footer from './components/Footer';

function App() {
  const isAuthenticated = !!sessionStorage.getItem('token');
  return (
    <Router>
      <div className="App">
      <Header isAuthenticated={isAuthenticated} />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/classification" element={<ClassificationPage />} />
          <Route path="/test-manager" element={<TestManager />} />
          <Route path="/create-test" element={<CreateTest />} />
          <Route path="/my-tests" element={<MyTests />} />
          <Route path="/edit-test/:id" element={<UpdateTest />} />
          <Route path="/insights" element={<Insights />} />
          <Route path="/feedback" element={<FeedbackForm />} />
          <Route path="/view-feedback" element={<FeedbackView />} />
        </Routes>
        {/* <Footer /> */}
      </div>
    </Router>
  );
}

export default App;
