// src/components/home/SearchBar.js
import React, { useState } from 'react';



const SearchBar = ({ onSearchChange, onFilterChange }) => {
    const [searchText, setSearchText] = useState('');
    const [filter, setFilter] = useState('all');

    const handleSearch = e => {
        setSearchText(e.target.value);
        onSearchChange(e.target.value);
    };

    const handleFilter = e => {
        setFilter(e.target.value);
        onFilterChange(e.target.value);
    };




    return (
        <div className="d-flex justify-content-between align-items-center mb-4">
            <input
                type="text"
                className="form-control me-3"
                style={{ maxWidth: '300px' }}
                placeholder="Search cars..."
                value={searchText}
                onChange={handleSearch}
            />

            <select className="form-select" style={{ maxWidth: '200px' }} value={filter} onChange={handleFilter}>
                <option value="all">All Types</option>
                <option value="standard">Standard</option>
                <option value="sport">Sport</option>
                <option value="luxury">Luxury</option>
            </select>
        </div>
    );
};

export default SearchBar;
