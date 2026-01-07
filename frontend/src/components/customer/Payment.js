import React, { useState } from 'react';
import axios from 'axios';

const Payment = ({ carId, userId, startDate, endDate }) => {
    const [licenceFile, setLicenceFile] = useState(null);
    const [licenceExpiryDate, setLicenceExpiryDate] = useState('');
    const [idProofFile, setIdProofFile] = useState(null);
    const [idProofType, setIdProofType] = useState('');
    const [idProofNumber, setIdProofNumber] = useState('');
    const [damageConsent, setDamageConsent] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    // Upload file helper
    const uploadFile = async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        const response = await axios.post('http://localhost:8080/api/files/upload', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        return response.data;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!licenceFile || !idProofFile) {
            setError('Please upload both Driving Licence and ID Proof files.');
            return;
        }
        if (!licenceExpiryDate || !idProofType || !idProofNumber || !damageConsent || !paymentMethod) {
            setError('Please fill all required fields and accept consent.');
            return;
        }

        try {
            setLoading(true);
            const licenceUrl = await uploadFile(licenceFile);
            const idProofUrl = await uploadFile(idProofFile);

            const bookingPayload = {
                carId,
                userId,
                startDate,
                endDate,
                licenceDocument: licenceUrl,
                licenceExpiryDate,
                idProofDocument: idProofUrl,
                idProofType,
                idProofNumber,
                damageConsent,
                paymentMethod,
                paymentStatus: 'PENDING',
            };

            await axios.post('http://localhost:8080/api/bookings', bookingPayload);

            setSuccess('Booking and payment info submitted successfully!');
        } catch (uploadError) {
            setError('Submission failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            style={{
                maxWidth: '500px',
                margin: '32px auto',
                background: 'rgba(0,0,0,0.20)',
                borderRadius: '16px',
                padding: '32px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
            }}
        >
            <h3 style={{ textAlign: 'center', marginBottom: '24px' }}>Complete Your Payment and Documents</h3>

            {/* Licence Upload */}
            <div style={{ marginBottom: '16px' }}>
                <label style={{ fontWeight: 'bold' }}>Driving Licence<span style={{ color: 'red' }}>*</span>:</label>
                <input type="file" style={{ marginTop: 8 }} onChange={e => setLicenceFile(e.target.files[0])} required />
            </div>
            <div style={{ marginBottom: '16px' }}>
                <label style={{ fontWeight: 'bold' }}>Licence Expiry Date<span style={{ color: 'red' }}>*</span>:</label>
                <input type="date" style={{ marginLeft: 8 }} value={licenceExpiryDate} onChange={e => setLicenceExpiryDate(e.target.value)} required />
            </div>

            {/* ID Proof Upload */}
            <div style={{ marginBottom: '16px' }}>
                <label style={{ fontWeight: 'bold' }}>ID Proof Type<span style={{ color: 'red' }}>*</span>:</label>
                <select value={idProofType} style={{ marginLeft: '8px' }} onChange={e => setIdProofType(e.target.value)} required>
                    <option value="">Select</option>
                    <option value="Aadhaar">Aadhaar</option>
                    <option value="Passport">Passport</option>
                    <option value="Visa">Visa</option>
                </select>
            </div>
            <div style={{ marginBottom: '16px' }}>
                <label style={{ fontWeight: 'bold' }}>ID Proof Number<span style={{ color: 'red' }}>*</span>:</label>
                <input
                    type="text"
                    style={{ marginLeft: '8px' }}
                    value={idProofNumber}
                    onChange={e => setIdProofNumber(e.target.value)}
                    required
                />
            </div>
            <div style={{ marginBottom: '16px' }}>
                <label style={{ fontWeight: 'bold' }}>ID Proof Document<span style={{ color: 'red' }}>*</span>:</label>
                <input type="file" style={{ marginTop: 8 }} onChange={e => setIdProofFile(e.target.files[0])} required />
            </div>

            {/* Consent */}
            <div style={{ marginBottom: '20px' }}>
                <input
                    type="checkbox"
                    checked={damageConsent}
                    onChange={e => setDamageConsent(e.target.checked)}
                    required
                />
                <span style={{ marginLeft: '8px' }}>
                    I agree I will be responsible for expenses in case of rental damage.
                </span>
            </div>

            {/* Payment Method */}
            <fieldset style={{ marginBottom: '18px', padding: 0, border: 'none' }}>
                <legend style={{ fontWeight: 'bold', marginBottom: '8px' }}>Select Payment Method<span style={{ color: 'red' }}>*</span>:</legend>
                <label style={{ marginRight: 10 }}>
                    <input
                        type="radio"
                        name="paymentMethod"
                        value="Card"
                        checked={paymentMethod === 'Card'}
                        onChange={e => setPaymentMethod(e.target.value)}
                        required
                    /> Card
                </label>
                <label style={{ marginRight: 10 }}>
                    <input
                        type="radio"
                        name="paymentMethod"
                        value="UPI"
                        checked={paymentMethod === 'UPI'}
                        onChange={e => setPaymentMethod(e.target.value)}
                    /> UPI
                </label>
                <label>
                    <input
                        type="radio"
                        name="paymentMethod"
                        value="Bank"
                        checked={paymentMethod === 'Bank'}
                        onChange={e => setPaymentMethod(e.target.value)}
                    /> Bank Transfer
                </label>
            </fieldset>

            {/* Error/success messages */}
            {error && <div style={{ color: 'red', marginBottom: '8px', textAlign: 'center' }}>{error}</div>}
            {success && <div style={{ color: 'green', marginBottom: '8px', textAlign: 'center' }}>{success}</div>}

            {/* Submit */}
            <div style={{ textAlign: 'center' }}>
                <button
                    type="submit"
                    disabled={loading}
                    style={{
                        marginTop: '8px',
                        padding: '10px 26px',
                        fontWeight: 'bold',
                        fontSize: '1.1em',
                        borderRadius: '8px',
                        background: '#246BFD',
                        color: '#fff',
                        border: 'none',
                        boxShadow: '0 2px 5px rgba(0,0,0,0.04)',
                        cursor: loading ? 'not-allowed' : 'pointer'
                    }}
                >
                    {loading ? 'Submitting...' : 'Submit Payment & Book'}
                </button>
            </div>
        </form>
    );
};

export default Payment;
