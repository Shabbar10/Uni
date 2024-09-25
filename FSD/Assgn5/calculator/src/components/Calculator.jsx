import React, { useState } from 'react';

const Calculator = () => {
  const [input, setInput] = useState('');

  const handleClick = (value) => {
    setInput(input + value);
  };

  const handleClear = () => {
    setInput('');
  };

  const handleCalculate = () => {
    try {
      setInput(eval(input).toString()); // Use eval with caution in production
    } catch (error) {
      setInput('Error');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-zinc-900">
      <div className="bg-gray-700 rounded-lg shadow-lg p-6 w-80">
        <input
          type="text"
          value={input}
          readOnly
          className="w-full p-2 text-right text-2xl border border-gray-300 rounded mb-4"
        />
        <div className="grid grid-cols-4 gap-2">
          {['7', '8', '9', '/'].map((value) => (
            <button
              key={value}
              onClick={() => handleClick(value)}
              className="bg-blue-500 text-white p-4 rounded hover:bg-blue-600"
            >
              {value}
            </button>
          ))}
          {['4', '5', '6', '*'].map((value) => (
            <button
              key={value}
              onClick={() => handleClick(value)}
              className="bg-blue-500 text-white p-4 rounded hover:bg-blue-600"
            >
              {value}
            </button>
          ))}
          {['1', '2', '3', '-'].map((value) => (
            <button
              key={value}
              onClick={() => handleClick(value)}
              className="bg-blue-500 text-white p-4 rounded hover:bg-blue-600"
            >
              {value}
            </button>
          ))}
          {['0', 'C', '+', '='].map((value) => (
            <button
              key={value}
              onClick={() => (value === 'C' ? handleClear() : value === '=' ? handleCalculate() : handleClick(value))}
              className={`bg-blue-500 text-white p-4 rounded hover:bg-blue-600 ${value === 'C' ? 'col-span-2' : ''
                }`}
            >
              {value}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Calculator;
