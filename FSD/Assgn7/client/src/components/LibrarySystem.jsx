import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function LibrarySystem() {
  const [books, setBooks] = useState([]);
  const [formData, setFormData] = useState({
    bookName: '',
    isbn: '',
    bookTitle: '',
    authorName: '',
    publisherName: ''
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    const response = await axios.get('http://localhost:5000/api/books');
    setBooks(response.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await axios.put(`http://localhost:5000/api/books/${formData.isbn}`, formData);
      } else {
        await axios.post('http://localhost:5000/api/books', formData);
      }
      fetchBooks();
      resetForm();
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  const handleDelete = async (isbn) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      await axios.delete(`http://localhost:5000/api/books/${isbn}`);
      fetchBooks();
    }
  };

  const handleEdit = (book) => {
    setFormData({
      bookName: book.bookName,
      isbn: book.isbn,
      bookTitle: book.bookTitle,
      authorName: book.authorName,
      publisherName: book.publisherName
    });
    setIsEditing(true);
  };

  const resetForm = () => {
    setFormData({
      bookName: '',
      isbn: '',
      bookTitle: '',
      authorName: '',
      publisherName: ''
    });
    setIsEditing(false);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Library Management System</h2>

      <form onSubmit={handleSubmit} className="mb-8">
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Book Name"
            value={formData.bookName}
            onChange={(e) => setFormData({ ...formData, bookName: e.target.value })}
            className="p-2 border rounded"
            required
          />
          <input
            type="text"
            placeholder="ISBN"
            value={formData.isbn}
            onChange={(e) => setFormData({ ...formData, isbn: e.target.value })}
            className="p-2 border rounded"
            required
            disabled={isEditing}
          />
          <input
            type="text"
            placeholder="Book Title"
            value={formData.bookTitle}
            onChange={(e) => setFormData({ ...formData, bookTitle: e.target.value })}
            className="p-2 border rounded"
            required
          />
          <input
            type="text"
            placeholder="Author Name"
            value={formData.authorName}
            onChange={(e) => setFormData({ ...formData, authorName: e.target.value })}
            className="p-2 border rounded"
            required
          />
          <input
            type="text"
            placeholder="Publisher Name"
            value={formData.publisherName}
            onChange={(e) => setFormData({ ...formData, publisherName: e.target.value })}
            className="p-2 border rounded"
            required
          />
        </div>
        <div className="mt-4 flex gap-2">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            {isEditing ? 'Update Book' : 'Add Book'}
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
              <th className="border p-2">Book Name</th>
              <th className="border p-2">ISBN</th>
              <th className="border p-2">Book Title</th>
              <th className="border p-2">Author Name</th>
              <th className="border p-2">Publisher Name</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book.isbn}>
                <td className="border p-2">{book.bookName}</td>
                <td className="border p-2">{book.isbn}</td>
                <td className="border p-2">{book.bookTitle}</td>
                <td className="border p-2">{book.authorName}</td>
                <td className="border p-2">{book.publisherName}</td>
                <td className="border p-2">
                  <button
                    onClick={() => handleEdit(book)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(book.isbn)}
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
