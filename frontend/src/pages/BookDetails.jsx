import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

const BACKEND_URL=import.meta.env.VITE_BACKEND_URL

function BookDetails() {
  const { id } = useParams(); 
  const navigate = useNavigate();
  
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');


  useEffect(() => {
    const fetchBook = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${BACKEND_URL}/api/books/${id}`);
        if (!response.ok) {
          throw new Error('Book not found.');
        }
        const data = await response.json();
        setBook(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchBook();
  }, [id]);

  // Delete handler
  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to permanently delete this book?')) {
      return;
    }
    try {
      const response = await fetch(`${BACKEND_URL}/api/books/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete book.');
      }
      // On successful deletion, navigate back to the main dashboard
      navigate('/books');
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div className="text-center p-10">Loading...</div>;
  if (error) return <div className="text-center p-10 text-red-500">{error}</div>;
  if (!book) return null;

  return (
    <div className="container mx-auto p-4 sm:p-6">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden md:flex">
        <img 
          src={book.coverImage.url} 
          alt={`Cover of ${book.title}`} 
          className="w-full md:w-1/3 h-auto object-cover"
        />
        <div className="p-6 flex flex-col justify-between w-full">
          <div>
            <div className="flex justify-between items-start">
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">{book.title}</h1>
              <Link to={`/edit-book/${book._id}`} className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition whitespace-nowrap">
                Edit Book
              </Link>
            </div>
            <p className="text-xl text-gray-600 mt-2">by {book.author}</p>
            
            <div className="mt-6 space-y-4 text-gray-700">
              <p>{book.description}</p>
              {book.genre && <p><strong>Genre:</strong> {book.genre}</p>}
              {book.publicationYear && <p><strong>Published:</strong> {book.publicationYear}</p>}
              {book.seriesName && <p><strong>Series:</strong> {book.seriesName}</p>}
            </div>
          </div>
          
          <div className="mt-8 flex justify-end">
            <button 
              onClick={handleDelete}
              className="bg-red-600 text-white py-2 px-5 rounded hover:bg-red-700 transition"
            >
              Delete Book
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookDetails;