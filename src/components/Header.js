// Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

const Header = ({ isAuthenticated }) => {
  const handleLogout = () => {
    const confirmLogout = window.confirm('Are you sure you want to logout?');
    if (confirmLogout) {
      // Clear session data
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('username');
      // Redirect to homepage
      window.location.href = '/';
    }
  };

  const username = sessionStorage.getItem('username');

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <Link className="navbar-brand" to="/">
        <img src={logo} alt="Logo" style={{ height: '40px', marginRight: '10px' }} />
        QCBloom Classifier
      </Link>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ml-auto">
          {isAuthenticated ? (
            <>
            <li className="nav-item">
                <Link className="nav-link" to="#">Hello {username}</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/dashboard">Dashboard</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/classification">Classification</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/test-manager">Test Manager</Link>
              </li>
              <li className="nav-item">
                <button className="nav-link btn btn-link" onClick={handleLogout}>Logout</button>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/classification">Classification</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/login">Sign in</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Header;
