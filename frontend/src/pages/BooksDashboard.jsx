import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const BACKEND_URL=import.meta.env.VITE_BACKEND_URL

function BooksDashboard() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${BACKEND_URL}/api/books`);
        if (!response.ok) {
          throw new Error('Failed to fetch books');
        }
        const data = await response.json();
        setBooks(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []); 

  if (loading) {
    return <div className="text-center mt-10">Loading books...</div>;
  }

  if (error) {
    return <div className="text-center mt-10 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <Link to="/" className="bg-[#808080] text-white px-4 py-2 rounded-md hover:opacity-90 transition">
          Go back
        </Link>
        <h1 className="text-3xl font-bold text-[#457B9D]">Books Catalogue</h1>
        <Link to="/add-book" className="bg-[#588157] text-white px-4 py-2 rounded-md hover:opacity-90 transition">
          + Add New Book
        </Link>
      </div>

      {books.length === 0 ? (
        <p>No books found. Add one to get started!</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {books.map((book) => (
            <Link key={book._id} to={`/books/${book._id}`} className="block">
    <div className="bg-white border rounded-lg shadow-md overflow-hidden h-full hover:shadow-xl transition-shadow duration-200">
      <img 
        src={book.coverImage.url} 
        alt={`Cover of ${book.title}`} 
        className="w-full h-56 object-cover" 
      />
      <div className="p-4">
        <h2 className="text-xl font-semibold truncate" title={book.title}>{book.title}</h2>
        <p className="text-gray-600">by {book.author}</p>
      </div>
    </div>
  </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default BooksDashboard;