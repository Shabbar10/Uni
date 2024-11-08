const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/management-system', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Import models
const Student = require('./models/Student');
const Book = require('./models/Book');
const Employee = require('./models/Employee');
const Flight = require('./models/Flight');

// Student Routes
app.post('/api/students', async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();
    res.status(201).json(student);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.get('/api/students', async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.put('/api/students/:rollNo', async (req, res) => {
  try {
    const student = await Student.findOneAndUpdate(
      { rollNo: req.params.rollNo },
      req.body,
      { new: true }
    );
    res.json(student);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.delete('/api/students/:rollNo', async (req, res) => {
  try {
    await Student.findOneAndDelete({ rollNo: req.params.rollNo });
    res.json({ message: 'Student deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Book Routes
app.post('/api/books', async (req, res) => {
  try {
    const book = new Book(req.body);
    await book.save();
    res.status(201).json(book);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.get('/api/books', async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.put('/api/books/:isbn', async (req, res) => {
  try {
    const book = await Book.findOneAndUpdate(
      { isbn: req.params.isbn },
      req.body,
      { new: true }
    );
    res.json(book);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.delete('/api/books/:isbn', async (req, res) => {
  try {
    await Book.findOneAndDelete({ isbn: req.params.isbn });
    res.json({ message: 'Book deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Employee Routes
app.post('/api/employees', async (req, res) => {
  try {
    const employee = new Employee(req.body);
    await employee.save();
    res.status(201).json(employee);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.get('/api/employees', async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.put('/api/employees/:employeeId', async (req, res) => {
  try {
    const employee = await Employee.findOneAndUpdate(
      { employeeId: req.params.employeeId },
      req.body,
      { new: true }
    );
    res.json(employee);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.delete('/api/employees/:employeeId', async (req, res) => {
  try {
    await Employee.findOneAndDelete({ employeeId: req.params.employeeId });
    res.json({ message: 'Employee deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Flight Routes
app.post('/api/flights', async (req, res) => {
  try {
    const flight = new Flight(req.body);
    await flight.save();
    res.status(201).json(flight);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.get('/api/flights', async (req, res) => {
  try {
    const flights = await Flight.find();
    res.json(flights);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.put('/api/flights/:phoneNumber', async (req, res) => {
  try {
    const flight = await Flight.findOneAndUpdate(
      { phoneNumber: req.params.phoneNumber },
      req.body,
      { new: true }
    );
    res.json(flight);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.delete('/api/flights/:phoneNumber', async (req, res) => {
  try {
    await Flight.findOneAndDelete({ phoneNumber: req.params.phoneNumber });
    res.json({ message: 'Flight record deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(5000, () => console.log('Server running on port 5000'));
