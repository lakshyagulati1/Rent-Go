import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { DarkModeContext } from '../../contexts/DarkModeContext';
import Payment from './Payment';  // import the Payment component you created

const CustomerDashboard = () => {
    const { darkMode } = useContext(DarkModeContext);
    const [bookings, setBookings] = useState([]);
    const [selectedBooking, setSelectedBooking] = useState(null); // Track which booking is paying
    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        if (user) {
            axios
                .get(`http://localhost:8080/api/bookings/user/${user.id}`)
                .then((res) => setBookings(res.data))
                .catch((err) => console.error("Error fetching bookings:", err));
        }
    }, [user]);

    if (!user) {
        return <div className="container py-5">Please log in to view your bookings.</div>;
    }

    const handleEdit = (booking) => {
        alert("Edit booking " + booking.id);
    };

    const handlePay = (booking) => {
        setSelectedBooking(booking);  // Open payment modal or area with this booking
    };

    const closePayment = () => {
        setSelectedBooking(null);
        // Optionally refresh bookings after payment
        if (user) {
            axios
                .get(`http://localhost:8080/api/bookings/user/${user.id}`)
                .then((res) => setBookings(res.data))
                .catch((err) => console.error("Error fetching bookings:", err));
        }
    };

    return (
        <div className="container py-5">
            <h4 className="mb-4">Your Bookings</h4>

            {bookings.length === 0 ? (
                <p>No bookings found.</p>
            ) : (
                bookings.map((booking) => {
                    const car = booking.car;
                    if (!car) return null;

                    const start = new Date(booking.startDate);
                    const end = new Date(booking.endDate);
                    const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) || 1;
                    const total = days * car.pricePerDay;

                    return (
                        <div
                            key={booking.id}
                            className={`card shadow-sm mb-4 ${darkMode ? 'bg-dark text-white' : 'bg-white text-dark'}`}
                            style={{
                                width: "100%",
                                maxWidth: "100%",
                                borderRadius: "15px",
                                border: "none",
                                padding: "0",
                                transition: "background-color 0.5s ease, color 0.5s ease"
                            }}
                        >
                            <div className="d-flex flex-row align-items-center" style={{ minHeight: "140px" }}>
                                <img
                                    src={car.imageUrl}
                                    alt={car.model}
                                    style={{
                                        height: "120px",
                                        width: "auto",
                                        objectFit: "contain",
                                        borderRadius: "10px 0 0 10px",
                                        background: darkMode ? "#343a40" : "#f8f9fa",
                                        transition: "background-color 0.5s ease"
                                    }}
                                />

                                <div className="p-3 w-100">
                                    <h5 className="mb-2">{car.brand} {car.model}</h5>
                                    <div className="row mb-3">
                                        <div className="col-6">
                                            <div><strong>From:</strong> {booking.startDate}</div>
                                            <div><strong>Price/Day:</strong> ₹{car.pricePerDay}</div>
                                        </div>
                                        <div className="col-6">
                                            <div><strong>To:</strong> {booking.endDate}</div>
                                            <div><strong>Total:</strong> ₹{total}</div>
                                        </div>
                                    </div>

                                    <div className="d-flex justify-content-end gap-2" style={{ marginTop: "1rem" }}>
                                        <button
                                            className="btn btn-secondary"
                                            onClick={() => handleEdit(booking)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="btn btn-primary"
                                            onClick={() => handlePay(booking)}
                                        >
                                            Pay Rent
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })
            )}

            {/* Show Payment component modal or section */}
            {selectedBooking && (
                <div className="payment-modal">
                    <button onClick={closePayment} style={{ float: "right", marginBottom: "10px" }}>Close X</button>
                    <Payment
                        carId={selectedBooking.car.id}
                        userId={selectedBooking.userId}
                        startDate={selectedBooking.startDate}
                        endDate={selectedBooking.endDate}
                    />
                </div>
            )}
        </div>
    );
};

export default CustomerDashboard;
