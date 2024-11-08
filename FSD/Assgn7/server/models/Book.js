const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  bookName: { type: String, required: true },
  isbn: { type: String, required: true, unique: true },
  bookTitle: { type: String, required: true },
  authorName: { type: String, required: true },
  publisherName: { type: String, required: true }
});

module.exports = mongoose.model('Book', bookSchema);
