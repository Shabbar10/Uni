import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function FlightSystem() {
  const [flights, setFlights] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    passengerName: '',
    from: '',
    to: '',
    departureDate: '',
    arrivalDate: '',
    phoneNumber: '',
    emailId: ''
  });

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchFlights();
  }, []);

  const fetchFlights = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get('http://localhost:5000/api/flights');
      setFlights(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      const errorMessage = error.response
        ? `Server error: ${error.response.status} - ${error.response.data?.message || error.response.statusText}`
        : error.message === 'Network Error'
          ? 'Unable to connect to the server. Please ensure the backend is running on port 5000.'
          : `Error: ${error.message}`;
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (new Date(formData.departureDate) > new Date(formData.arrivalDate)) {
        throw new Error('Departure date cannot be after arrival date');
      }

      if (isEditing) {
        await axios.put(`http://localhost:5000/api/flights/${formData.phoneNumber}`, formData);
      } else {
        await axios.post('http://localhost:5000/api/flights', formData);
      }
      await fetchFlights();
      resetForm();
    } catch (error) {
      setError(error.response?.data?.message || error.message || 'Error saving flight booking');
    }
  };

  const handleDelete = async (phoneNumber) => {
    if (window.confirm('Are you sure you want to delete this booking?')) {
      try {
        await axios.delete(`http://localhost:5000/api/flights/${phoneNumber}`);
        await fetchFlights();
      } catch (error) {
        setError('Error deleting flight booking: ' + (error.response?.data?.message || error.message));
      }
    }
  };

  const handleEdit = (flight) => {
    setFormData({
      passengerName: flight.passengerName,
      from: flight.from,
      to: flight.to,
      date: flight.date ? new Date(flight.date).toISOString().split('T')[0] : '',
      departureDate: flight.departureDate ? new Date(flight.departureDate).toISOString().split('T')[0] : '',
      arrivalDate: flight.arrivalDate ? new Date(flight.arrivalDate).toISOString().split('T')[0] : '',
      phoneNumber: flight.phoneNumber,
      emailId: flight.emailId
    });
    setIsEditing(true);
  };

  const resetForm = () => {
    setFormData({
      passengerName: '',
      from: '',
      to: '',
      date: '',
      departureDate: '',
      arrivalDate: '',
      phoneNumber: '',
      emailId: ''
    });
    setIsEditing(false);
    setError(null);
  };

  if (loading) {
    return <div className="p-4 text-blue-600">Loading flight bookings...</div>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Flight Booking Management System</h2>

      {error && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="mb-8">
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Passenger Name"
            value={formData.passengerName}
            onChange={(e) => setFormData({ ...formData, passengerName: e.target.value })}
            className="p-2 border rounded"
            required
          />
          <input
            type="text"
            placeholder="From"
            value={formData.from}
            onChange={(e) => setFormData({ ...formData, from: e.target.value })}
            className="p-2 border rounded"
            required
          />
          <input
            type="text"
            placeholder="To"
            value={formData.to}
            onChange={(e) => setFormData({ ...formData, to: e.target.value })}
            className="p-2 border rounded"
            required
          />
          <input
            type="date"
            placeholder="Departure Date"
            value={formData.departureDate}
            onChange={(e) => setFormData({ ...formData, departureDate: e.target.value })}
            className="p-2 border rounded"
            required
          />
          <input
            type="date"
            placeholder="Arrival Date"
            value={formData.arrivalDate}
            onChange={(e) => setFormData({ ...formData, arrivalDate: e.target.value })}
            className="p-2 border rounded"
            required
          />
          <input
            type="tel"
            placeholder="Phone Number"
            value={formData.phoneNumber}
            onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
            className="p-2 border rounded"
            required
            disabled={isEditing}
          />
          <input
            type="email"
            placeholder="Email ID"
            value={formData.emailId}
            onChange={(e) => setFormData({ ...formData, emailId: e.target.value })}
            className="p-2 border rounded"
            required
          />
        </div>
        <button type="submit" className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
          {isEditing ? 'Update Booking' : 'Add Booking'}
        </button>
      </form>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border">
          <thead>
            <tr>
              <th className="border p-2">Passenger Name</th>
              <th className="border p-2">From</th>
              <th className="border p-2">To</th>
              <th className="border p-2">Departure Date</th>
              <th className="border p-2">Arrival Date</th>
              <th className="border p-2">Phone Number</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {flights.map((flight) => (
              <tr key={flight.phoneNumber}>
                <td className="border p-2">{flight.passengerName}</td>
                <td className="border p-2">{flight.from}</td>
                <td className="border p-2">{flight.to}</td>
                <td className="border p-2">{flight.departureDate}</td>
                <td className="border p-2">{flight.arrivalDate}</td>
                <td className="border p-2">{flight.phoneNumber}</td>
                <td className="border p-2">
                  <button
                    onClick={() => handleEdit(flight)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(flight.phoneNumber)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
