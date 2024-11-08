import React, { useState } from 'react';
import StudentSystem from './components/StudentSystem';
import LibrarySystem from './components/LibrarySystem';
import EmployeeSystem from './components/EmployeeSystem';
import FlightSystem from './components/FlightSystem';
import './App.css'; // Import your CSS file

export default function App() {
  const [activeSystem, setActiveSystem] = useState('student');

  return (
    <div id="root" className="bg-gray-100 min-h-screen p-8">
      <header className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-800">Management System</h1>
        <p className="text-lg text-gray-600">Select a system to manage</p>
      </header>

      <nav className="mb-8">
        <ul className="flex justify-center gap-6 list-none"> {/* Ensures buttons are in one row with spacing */}
          <li>
            <button
              onClick={() => setActiveSystem('student')}
              className={`w-48 h-12 rounded transition-colors duration-300 ${activeSystem === 'student' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
            >
              Student Registration
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveSystem('library')}
              className={`w-48 h-12 rounded transition-colors duration-300 ${activeSystem === 'library' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
            >
              Library Management
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveSystem('employee')}
              className={`w-48 h-12 rounded transition-colors duration-300 ${activeSystem === 'employee' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
            >
              Employee Management
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveSystem('flight')}
              className={`w-48 h-12 rounded transition-colors duration-300 ${activeSystem === 'flight' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
            >
              Flight Booking
            </button>
          </li>
        </ul>
      </nav>

      <div className="card bg-white rounded-lg shadow-lg p-6">
        {activeSystem === 'student' && <StudentSystem />}
        {activeSystem === 'library' && <LibrarySystem />}
        {activeSystem === 'employee' && <EmployeeSystem />}
        {activeSystem === 'flight' && <FlightSystem />}
      </div>
    </div>
  );
}
