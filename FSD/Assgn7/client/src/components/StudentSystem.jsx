import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function StudentSystem() {
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    rollNo: '',
    password: '',
    confirmPassword: '',
    contact: ''
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    const response = await axios.get('http://localhost:5000/api/students');
    setStudents(response.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }

    try {
      if (isEditing) {
        await axios.put(`http://localhost:5000/api/students/${formData.rollNo}`, formData);
      } else {
        await axios.post('http://localhost:5000/api/students', formData);
      }
      fetchStudents();
      resetForm();
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  const handleDelete = async (rollNo) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      await axios.delete(`http://localhost:5000/api/students/${rollNo}`);
      fetchStudents();
    }
  };

  const handleEdit = (student) => {
    setFormData({
      firstName: student.firstName,
      lastName: student.lastName,
      rollNo: student.rollNo,
      password: student.password,
      confirmPassword: student.password,
      contact: student.contact
    });
    setIsEditing(true);
  };

  const resetForm = () => {
    setFormData({
      firstName: '',
      lastName: '',
      rollNo: '',
      password: '',
      confirmPassword: '',
      contact: ''
    });
    setIsEditing(false);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Student Registration System</h2>

      <form onSubmit={handleSubmit} className="mb-8">
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="First Name"
            value={formData.firstName}
            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            className="p-2 border rounded"
            required
          />
          <input
            type="text"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
            className="p-2 border rounded"
            required
          />
          <input
            type="text"
            placeholder="Roll No"
            value={formData.rollNo}
            onChange={(e) => setFormData({ ...formData, rollNo: e.target.value })}
            className="p-2 border rounded"
            required
            disabled={isEditing}
          />
          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className="p-2 border rounded"
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            className="p-2 border rounded"
            required
          />
          <input
            type="tel"
            placeholder="Contact Number"
            value={formData.contact}
            onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
            className="p-2 border rounded"
            required
          />
        </div>
        <div className="mt-4 flex gap-2">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            {isEditing ? 'Update Student' : 'Add Student'}
          </button>
          {isEditing && (
            <button
              type="button"
              onClick={resetForm}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border">
          <thead>
            <tr>
              <th className="border p-2">First Name</th>
              <th className="border p-2">Last Name</th>
              <th className="border p-2">Roll No</th>
              <th className="border p-2">Contact Number</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.rollNo}>
                <td className="border p-2">{student.firstName}</td>
                <td className="border p-2">{student.lastName}</td>
                <td className="border p-2">{student.rollNo}</td>
                <td className="border p-2">{student.contact}</td>
                <td className="border p-2">
                  <button
                    onClick={() => handleEdit(student)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(student.rollNo)}
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
