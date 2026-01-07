// src/components/common/Footer.js
import React from 'react';
import './Footer.css'; // add this import

const Footer = () => {
    return (
        <footer className="footer-sticky bg-dark text-white text-center py-3">
            <div className="container">
                <p className="mb-0">
                    &copy; {new Date().getFullYear()} RentGo. All rights reserved.
                </p>
                <small>
                    Developed by Navpreet Singh.
                </small>
            </div>
        </footer>
    );
};

export default Footer;
