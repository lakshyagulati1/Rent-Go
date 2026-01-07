// src/components/auth/Login.js

import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';
// import { jwtDecode } from 'jwt-decode';


const Login = () => {

    // const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: '',
        password: '',
        role: 'CUSTOMER'
    });

    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        try {
            const response = await axios.post('http://localhost:8080/api/auth/login', formData);

            // response.data now has { token, role }
            const { token, role, user } = response.data;

            // Save to localStorage
            localStorage.setItem('token', token);
            localStorage.setItem('role', role);
            localStorage.setItem('user', JSON.stringify(user)); // ✅ so username shows in Navbar

            setMessage('✅ Login successful! Redirecting...');

            // Redirect to respective dashboard
            if (role === 'CUSTOMER') {
                window.location.href = '/customer/dashboard';
            } else if (role === 'ADMIN') {
                window.location.href = '/admin/dashboard';
            }
        } catch (err) {
            setMessage(`❌ ${err.response?.data || 'Login failed!'}`);
        }
    };

    return (
        <div className="container login-container">
            <div className="row justify-content-center">
                <div className="col-md-8 col-lg-6">
                    <div className="card login-card shadow rounded">
                        <div className="card-body">
                            <h3 className="text-center mb-4">Login to Your Account</h3>
                            {message && (
                                <div className={`alert ${message.startsWith('✅') ? 'alert-success' : 'alert-danger'}`}>
                                    {message}
                                </div>
                            )}
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label">Username</label>
                                    <input
                                        type="text"
                                        name="username"
                                        className="form-control"
                                        placeholder="Enter username"
                                        value={formData.username}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Password</label>
                                    <input
                                        type="password"
                                        name="password"
                                        className="form-control"
                                        placeholder="Enter password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Login As</label>
                                    <select
                                        name="role"
                                        className="form-select"
                                        value={formData.role}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="CUSTOMER">Customer</option>
                                        <option value="ADMIN">Admin</option>
                                    </select>
                                </div>

                                <button type="submit" className="btn btn-primary w-100">
                                    Login
                                </button>
                            </form>

                            <div className="text-center mt-3">
                                <small>Don't have an account? <a href="/register">Register</a></small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;

// navpreet_507 -> password123 -> Customer
// navpreet507 -> password123 -> Admin