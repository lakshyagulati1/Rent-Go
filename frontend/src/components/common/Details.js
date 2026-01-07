import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./Details.css";

const Details = () => {
    const { id } = useParams();
    const [car, setCar] = useState(null);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [totalPrice, setTotalPrice] = useState(0);
    const [message, setMessage] = useState("");

    useEffect(() => {
        axios.get(`http://localhost:8080/api/cars/${id}`)
            .then(res => setCar(res.data))
            .catch(err => console.error("Error fetching car details:", err));
    }, [id]);

    useEffect(() => {
        if (startDate && endDate && car) {
            const days =
                (new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24);
            if (days > 0) {
                setTotalPrice(days * car.pricePerDay);
            } else {
                setTotalPrice(0);
            }
        }
    }, [startDate, endDate, car]);

    const handleBooking = () => {
        const user = JSON.parse(localStorage.getItem("user")); // assuming login stores this

        if (!user || !startDate || !endDate) {
            setMessage("Please login and select valid dates.");
            return;
        }

        const booking = {
            carId: car.id,
            userId: user.id,
            startDate,
            endDate,
        };

        axios.post("http://localhost:8080/api/bookings", booking)
            .then(() => setMessage("✅ Booking confirmed!"))
            .catch(() => setMessage("❌ Booking failed. Try again."));
    };

    if (!car) return <div className="container mt-5">Loading car details...</div>;

    return (
        <div className="container mt-5 details-card">
            <div className="row">
                <div className="col-md-6">
                    <img
                        src={car.imageUrl}
                        alt={`${car.brand} ${car.model}`}
                        className="img-fluid rounded shadow"
                    />
                </div>
                <div className="col-md-6">
                    <h2>{car.brand} {car.model} ({car.year})</h2>
                    <p><strong>Variant:</strong> {car.variant}</p>
                    <p><strong>Fuel Type:</strong> {car.fuelType}</p>
                    <p><strong>Car Type:</strong> {car.carType}</p>
                    <p><strong>Price Per Day:</strong> ₹{car.pricePerDay}</p>
                    <p><strong>Availability:</strong>
                        {car.available ? (
                            <span className="text-success"> Available</span>
                        ) : (
                            <span className="text-danger"> Not Available</span>
                        )}
                    </p>

                    {/* Booking Form */}
                    {car.available && (
                        <div className="mt-4">
                            <label>Start Date:</label>
                            <input
                                type="date"
                                className="form-control mb-2"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                            />
                            <label>End Date:</label>
                            <input
                                type="date"
                                className="form-control mb-2"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                            />
                            {totalPrice > 0 && (
                                <p><strong>Total Price:</strong> ₹{totalPrice}</p>
                            )}
                            <button className="btn btn-success" onClick={handleBooking}>
                                Confirm Booking
                            </button>
                            {message && <p className="mt-3">{message}</p>}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Details;
