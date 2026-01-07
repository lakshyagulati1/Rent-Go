// src/components/auth/Register.js



import React, { useState } from 'react';
import axios from 'axios';
import './Register.css';
// import { useNavigate } from 'react-router-dom';

const Register = () => {
    // const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: '',
        password: '',
        name: '',
        email: '',
        phone: '',
        address: '',
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
            const response = await axios.post('http://localhost:8080/api/auth/register', formData);

            const { token, role, user } = response.data;
            localStorage.setItem('token', token);
            localStorage.setItem('role', role);
            localStorage.setItem('user', JSON.stringify(user));

            setMessage('✅ Registration successful! Redirecting...');

            // Redirect after a short delay (1.5 seconds)
            setTimeout(() => {
                if (role === 'CUSTOMER') {
                    window.location.href = '/customer/dashboard';
                } else if (role === 'ADMIN') {
                    window.location.href = '/admin/dashboard';
                }
            }, 1500);

        } catch (err) {
            setMessage(`❌ ${err.response?.data || 'Registration failed!'}`);
        }
    };




    return (
        <div className="container">
            <div className="row justify-content-center my-5">
                <div className="col-md-8 col-lg-6">
                    <div className="card shadow rounded register-card">
                        <div className="card-body">
                            <h3 className="text-center mb-4">Create an Account</h3>
                            {message && (
                                <div className={`alert ${message.startsWith('✅') ? 'alert-success' : 'alert-danger'}`}>
                                    {message}
                                </div>
                            )}
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label">Full Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        className="form-control"
                                        placeholder="John Doe"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Username</label>
                                    <input
                                        type="text"
                                        name="username"
                                        className="form-control"
                                        placeholder="Unique username"
                                        value={formData.username}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Email Address</label>
                                    <input
                                        type="email"
                                        name="email"
                                        className="form-control"
                                        placeholder="example@domain.com"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Phone Number</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        className="form-control"
                                        placeholder="9876543210"
                                        value={formData.phone}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Address</label>
                                    <textarea
                                        name="address"
                                        className="form-control"
                                        placeholder="Your address here"
                                        rows="2"
                                        value={formData.address}
                                        onChange={handleChange}
                                    ></textarea>
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
                                    <label className="form-label">Register As</label>
                                    <select
                                        name="role"
                                        className="form-select"
                                        value={formData.role}
                                        onChange={handleChange}
                                    >
                                        <option value="CUSTOMER">Customer</option>
                                        <option value="ADMIN">Admin</option>
                                    </select>
                                </div>

                                <button type="submit" className="btn btn-primary w-100">
                                    Register
                                </button>
                            </form>

                            <div className="text-center mt-3">
                                <small>Already have an account? <a href="/login">Login</a></small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
