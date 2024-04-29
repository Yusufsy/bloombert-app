import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { loginUser } from '../api/apiService';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const response = await loginUser(username, password);
            sessionStorage.setItem('token', response.data.token);
            window.location.href = '/dashboard';
        } catch (error) {
            console.log(error);
            alert('Login failed!');
        }
    };

    return (
        <div className="container mt-5">
            <h1 className="mb-4">Login</h1>
            <form>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        className="form-control"
                        id="username"
                        placeholder="Enter username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleLogin}
                >
                    Login
                </button>
                <p className="mt-3">
                    Don't have an account? <Link to="/register">Sign Up</Link>
                </p>
            </form>
        </div>
    );
}

export default Login;
