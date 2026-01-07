import React, { useState, useEffect, useContext } from 'react';
import { DarkModeContext } from '../../contexts/DarkModeContext';
import SearchBar from './SearchBar';
import axios from 'axios';
import './Home.css';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const { darkMode } = useContext(DarkModeContext);
    const navigate = useNavigate();

    const [cars, setCars] = useState([]);
    const [filteredCars, setFilteredCars] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState('all');

    useEffect(() => {
        // Fetch cars from backend API (adjust URL as per your API)
        axios.get('http://localhost:8080/api/cars')
            .then(response => {
                setCars(response.data);
                setFilteredCars(response.data);
            })
            .catch(error => {
                console.error('Error fetching cars:', error);
            });
    }, []);

    // Update filteredCars when search or filter changes
    useEffect(() => {
        let updatedCars = [...cars];

        if (filterType !== 'all') {
            updatedCars = updatedCars.filter(car => car.variant.toLowerCase() === filterType);
        }

        if (searchTerm) {
            updatedCars = updatedCars.filter(car =>
                (car.brand + ' ' + car.model).toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        setFilteredCars(updatedCars);
    }, [searchTerm, filterType, cars]);

    return (
        <>
            <div className="container mt-4">
                <SearchBar
                    onSearchChange={setSearchTerm}
                    onFilterChange={setFilterType}
                />

                <div className="row">
                    {filteredCars.length === 0 && (
                        <p>No cars found matching your criteria.</p>
                    )}

                    {filteredCars.map(car => (
                        <div
                            key={car.id}
                            className="col-lg-4 col-md-6 col-sm-12 mb-4"
                        >
                            <div
                                className={`card car-card h-100 shadow-sm ${darkMode ? 'bg-dark text-white' : 'bg-white text-dark'
                                    }`}
                                style={{ transition: 'background-color 0.5s ease, color 0.5s ease' }}
                            >
                                <img
                                    src={car.imageUrl}
                                    className="card-img-top"
                                    alt={`${car.brand} ${car.model}`}
                                    style={{ height: '200px', objectFit: 'cover', transition: 'filter 0.5s ease' }}
                                />
                                <div className="card-body d-flex flex-column">
                                    <h5 className="card-title">{car.brand} {car.model}</h5>
                                    <p className="card-text">₹{car.pricePerDay} / day</p>
                                    <p className={`card-text ${darkMode ? 'text-light' : 'text-muted'}`}>
                                        {car.variant}
                                    </p>
                                    <button
                                        className={`btn mt-auto ${darkMode ? 'btn-outline-light' : 'btn-primary'}`}
                                        onClick={() => navigate(`/car/${car.id}`)}
                                    >
                                        Rent Now
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Home;
