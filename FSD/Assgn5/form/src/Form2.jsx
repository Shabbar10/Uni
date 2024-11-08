import React, { useState } from 'react';

const FormValidation2 = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    dob: '',
    gender: '',
    phone: ''
  });

  const [formErrors, setFormErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  const validateForm = () => {
    const errors = {};

    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }

    if (!formData.dob) {
      errors.dob = 'Date of birth is required';
    }

    if (!formData.gender) {
      errors.gender = 'Please select your gender';
    }

    const phoneRegex = /^[0-9]{10}$/;
    if (!formData.phone) {
      errors.phone = 'Phone number is required';
    } else if (!phoneRegex.test(formData.phone)) {
      errors.phone = 'Please enter a valid 10-digit phone number';
    }

    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      setSuccessMessage('Form submitted successfully!');
      setFormErrors({});
      setFormData({
        name: '',
        email: '',
        dob: '',
        gender: '',
        phone: ''
      });
    } else {
      setFormErrors(errors);
      setSuccessMessage('');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-teal-400 to-blue-500 text-gray-900">
      <div className="bg-gray-800 text-white p-8 rounded-lg shadow-xl w-96">
        <h1 className="text-3xl font-extrabold mb-6 text-center text-yellow-400">User Data Form</h1>

        <form onSubmit={handleSubmit}>
          {/* Name Field */}
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full p-2 border rounded ${formErrors.name ? 'border-red-500' : 'border-gray-500'
                } bg-gray-700 text-white`}
              placeholder="Enter your name"
            />
            {formErrors.name && <p className="text-red-500 text-sm">{formErrors.name}</p>}
          </div>

          {/* Email Field */}
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full p-2 border rounded ${formErrors.email ? 'border-red-500' : 'border-gray-500'
                } bg-gray-700 text-white`}
              placeholder="Enter your email"
            />
            {formErrors.email && <p className="text-red-500 text-sm">{formErrors.email}</p>}
          </div>

          {/* Date of Birth Field */}
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Date of Birth</label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              className={`w-full p-2 border rounded ${formErrors.dob ? 'border-red-500' : 'border-gray-500'
                } bg-gray-700 text-white`}
            />
            {formErrors.dob && <p className="text-red-500 text-sm">{formErrors.dob}</p>}
          </div>

          {/* Gender Field */}
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className={`w-full p-2 border rounded ${formErrors.gender ? 'border-red-500' : 'border-gray-500'
                } bg-gray-700 text-white`}
            >
              <option value="">Select gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            {formErrors.gender && <p className="text-red-500 text-sm">{formErrors.gender}</p>}
          </div>

          {/* Phone Field */}
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Phone Number</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={`w-full p-2 border rounded ${formErrors.phone ? 'border-red-500' : 'border-gray-500'
                } bg-gray-700 text-white`}
              placeholder="Enter your 10-digit phone number"
            />
            {formErrors.phone && <p className="text-red-500 text-sm">{formErrors.phone}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-400 text-gray-900 p-2 rounded-lg font-bold hover:bg-yellow-500"
          >
            Submit
          </button>

          {successMessage && (
            <p className="text-green-400 text-sm mt-4 text-center">{successMessage}</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default FormValidation2;
