import React, { useState } from 'react';
import axios from 'axios';



const AddCar = () => {
    const [car, setCar] = useState({
        brand: '',
        model: '',
        year: '',
        pricePerDay: '',
        imageUrl: '',
        fuelType: '',
        variant: '',
        carType: '',
        available: true,
    });



    const fuelTypes = ['PETROL', 'DIESEL', 'ELECTRIC', 'HYBRID'];
    const variants = ['STANDARD', 'LUXURY', 'SUV'];
    const carTypes = ['SEDAN', 'SUV', 'HATCHBACK', 'CONVERTIBLE'];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCar({ ...car, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:8080/api/cars', car);
            alert('Car added successfully!');
            console.log(res.data);
        } catch (error) {
            console.error('Error adding car:', error);
            alert('Failed to add car.');
        }
    };

    return (
        <div style={{ padding: '2rem' }}>
            <h2>Add a Car</h2>
            <form onSubmit={handleSubmit}>
                <input name="brand" placeholder="Brand" value={car.brand} onChange={handleChange} /><br />
                <input name="model" placeholder="Model" value={car.model} onChange={handleChange} /><br />
                <input name="year" placeholder="Year" value={car.year} onChange={handleChange} /><br />
                <input name="pricePerDay" placeholder="Price per Day" value={car.pricePerDay} onChange={handleChange} /><br />
                <input name="imageUrl" placeholder="Image URL" value={car.imageUrl} onChange={handleChange} /><br />

                <label>Fuel Type:
                    <select name="fuelType" value={car.fuelType} onChange={handleChange}>
                        <option value="">Select Fuel</option>
                        {fuelTypes.map((type) => (
                            <option key={type} value={type}>{type}</option>
                        ))}
                    </select>
                </label><br />

                <label>Variant:
                    <select name="variant" value={car.variant} onChange={handleChange}>
                        <option value="">Select Variant</option>
                        {variants.map((v) => (
                            <option key={v} value={v}>{v}</option>
                        ))}
                    </select>
                </label><br />

                <label>Car Type:
                    <select name="carType" value={car.carType} onChange={handleChange}>
                        <option value="">Select Car Type</option>
                        {carTypes.map((c) => (
                            <option key={c} value={c}>{c}</option>
                        ))}
                    </select>
                </label><br />

                <label>
                    Available:
                    <select name="available" value={car.available} onChange={handleChange}>
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                    </select>
                </label><br />

                <button type="submit">Add Car</button>
            </form>
        </div>
    );
};

export default AddCar;
