// src/components/common/Navbar.js
import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { DarkModeContext } from '../../contexts/DarkModeContext';
import './Navbar.css';

const Navbar = () => {
    const { darkMode, setDarkMode } = useContext(DarkModeContext);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [role, setRole] = useState(null);
    const user = JSON.parse(localStorage.getItem('user'));
    const username = user?.username || '';
    const [showWelcome, setShowWelcome] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const userRole = localStorage.getItem('role');
        setIsLoggedIn(!!token);
        setRole(userRole);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.removeItem('user');
        window.location.href = '/';
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setShowWelcome((prev) => !prev); // Toggle every 10s
        }, 10000);

        return () => clearInterval(interval);
    }, []);

    return (
        <nav className={`navbar navbar-expand-lg ${darkMode ? 'navbar-dark bg-dark' : 'navbar-light bg-light'} px-4`}>
            <Link
                className="navbar-brand d-flex align-items-center gap-2"
                to="/"
                style={{ height: '100%', alignItems: 'center' }}
            >
                <img
                    src="https://cdn-icons-png.flaticon.com/512/2972/2972185.png"
                    alt="RentGo Logo"
                    width="35"
                    height="35"
                    style={{ verticalAlign: 'middle' }}
                />
                <div className="brand-wrapper d-flex align-items-center" style={{ position: 'relative', minHeight: '35px' }}>
                    <span className={`brand-text ${!showWelcome ? 'fade-in' : 'fade-out'}`}>
                        RentGo
                    </span>
                    <span className={`welcome-text ${showWelcome ? 'fade-in' : 'fade-out'}`}>
                        Welcome, {username}
                    </span>
                </div>
            </Link>

            <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse justify-content-end align-items-center" id="navbarSupportedContent">
                <ul className="navbar-nav me-3 mb-2 mb-lg-0">
                    {!isLoggedIn ? (
                        <>
                            <li className="nav-item">
                                <Link className="nav-link" to="/login">Login</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/register">Register</Link>
                            </li>
                        </>
                    ) : (
                        <>
                            {role === 'ADMIN' && (
                                <li className="nav-item">
                                    <Link className="nav-link" to="/admin/dashboard">Admin Dashboard</Link>
                                </li>
                            )}
                            {role === 'CUSTOMER' && (
                                <li className="nav-item">
                                    <Link className="nav-link" to="/customer/dashboard">Customer Dashboard</Link>
                                </li>
                            )}
                            <li className="nav-item">
                                <button className="btn btn-link nav-link" onClick={handleLogout} style={{ cursor: 'pointer' }}>
                                    Logout
                                </button>
                            </li>
                        </>
                    )}
                </ul>

                {/* Dark Mode Toggle Icon Only */}
                <div className="d-flex align-items-center ms-3">
                    <button
                        className="btn btn-outline-secondary rounded-circle"
                        style={{
                            width: '38px',
                            height: '38px',
                            padding: 0,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            border: 'none',
                            background: 'none'
                        }}
                        onClick={() => setDarkMode(!darkMode)}
                        aria-label="Toggle dark mode"
                    >
                        {darkMode ? (
                            <img

                                src="https://cdn-icons-png.flaticon.com/512/869/869869.png"
                                alt="Night"
                                style={{ width: '28px', height: '28px' }}
                            />
                        ) : (
                            <img
                                src="https://cdn-icons-png.flaticon.com/512/702/702471.png"
                                alt="Day"
                                style={{ width: '28px', height: '28px' }}
                            />
                        )}
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
