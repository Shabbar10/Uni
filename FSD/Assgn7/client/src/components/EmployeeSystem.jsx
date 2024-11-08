import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function EmployeeSystem() {
  const [employees, setEmployees] = useState([]);
  const [formData, setFormData] = useState({
    employeeName: '',
    employeeId: '',
    departmentName: '',
    phoneNumber: '',
    joiningDate: ''
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    const response = await axios.get('http://localhost:5000/api/employees');
    setEmployees(response.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await axios.put(`http://localhost:5000/api/employees/${formData.employeeId}`, formData);
      } else {
        await axios.post('http://localhost:5000/api/employees', formData);
      }
      fetchEmployees();
      resetForm();
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  const handleDelete = async (employeeId) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      await axios.delete(`http://localhost:5000/api/employees/${employeeId}`);
      fetchEmployees();
    }
  };

  const handleEdit = (employee) => {
    setFormData({
      employeeName: employee.employeeName,
      employeeId: employee.employeeId,
      departmentName: employee.departmentName,
      phoneNumber: employee.phoneNumber,
      joiningDate: employee.joiningDate.split('T')[0]
    });
    setIsEditing(true);
  };

  const resetForm = () => {
    setFormData({
      employeeName: '',
      employeeId: '',
      departmentName: '',
      phoneNumber: '',
      joiningDate: ''
    });
    setIsEditing(false);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Employee Management System</h2>

      <form onSubmit={handleSubmit} className="mb-8">
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Employee Name"
            value={formData.employeeName}
            onChange={(e) => setFormData({ ...formData, employeeName: e.target.value })}
            className="p-2 border rounded"
            required
          />
          <input
            type="text"
            placeholder="Employee ID"
            value={formData.employeeId}
            onChange={(e) => setFormData({ ...formData, employeeId: e.target.value })}
            className="p-2 border rounded"
            required
            disabled={isEditing}
          />
          <input
            type="text"
            placeholder="Department Name"
            value={formData.departmentName}
            onChange={(e) => setFormData({ ...formData, departmentName: e.target.value })}
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
          />
          <input
            type="date"
            value={formData.joiningDate}
            onChange={(e) => setFormData({ ...formData, joiningDate: e.target.value })}
            className="p-2 border rounded"
            required
          />
        </div>
        <div className="mt-4 flex gap-2">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            {isEditing ? 'Update Employee' : 'Add Employee'}
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
              <th className="border p-2">Employee Name</th>
              <th className="border p-2">Employee ID</th>
              <th className="border p-2">Department</th>
              <th className="border p-2">Phone Number</th>
              <th className="border p-2">Joining Date</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.employeeId}>
                <td className="border p-2">{employee.employeeName}</td>
                <td className="border p-2">{employee.employeeId}</td>
                <td className="border p-2">{employee.departmentName}</td>
                <td className="border p-2">{employee.phoneNumber}</td>
                <td className="border p-2">{new Date(employee.joiningDate).toLocaleDateString()}</td>
                <td className="border p-2">
                  <button
                    onClick={() => handleEdit(employee)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(employee.employeeId)}
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
