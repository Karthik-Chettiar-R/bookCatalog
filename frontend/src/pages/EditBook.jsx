import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const BACKEND_URL=import.meta.env.VITE_BACKEND_URL

function EditBook() {
  const { id } = useParams(); // Get the book ID from the URL
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    description: '',
    genre: '',
    publicationYear: '',
    seriesName: ''
  });
  const [coverImageFile, setCoverImageFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

 
  useEffect(() => {
    const fetchBookData = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/api/books/${id}`);
        if (!response.ok) throw new Error('Could not fetch book data.');
        const data = await response.json();
        setFormData({
          title: data.title,
          author: data.author,
          description: data.description || '',
          genre: data.genre || '',
          publicationYear: data.publicationYear || '',
          seriesName: data.seriesName || '',
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchBookData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setCoverImageFile(e.target.files[0]);
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const bookData = new FormData();
    

    Object.keys(formData).forEach(key => bookData.append(key, formData[key]));
    
    
    if (coverImageFile) {
      bookData.append('coverImage', coverImageFile);
    }

    try {
      const response = await fetch(`${BACKEND_URL}/api/books/${id}`, {
        method: 'PUT',
        body: bookData,
      });
      if (!response.ok) throw new Error('Failed to update book.');
      
      navigate('/books'); // Go back to the dashboard on success
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Edit Book</h1>
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
          <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
        </div>
        <div>
          <label htmlFor="author" className="block text-sm font-medium text-gray-700">Author</label>
          <input type="text" id="author" name="author" value={formData.author} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
          <textarea id="description" name="description" value={formData.description} onChange={handleChange} rows="4" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"></textarea>
        </div>
        <div>
          <label htmlFor="coverImage" className="block text-sm font-medium text-gray-700">Cover Image (optional: upload to change)</label>
          <input type="file" id="coverImage" name="coverImage" onChange={handleFileChange} className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"/>
        </div>
        <div className="flex justify-end gap-4">
            <button type="button" onClick={() => navigate(-1)} className="py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                Cancel
            </button>
            <button type="submit" className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
                Save Changes
            </button>
        </div>
      </form>
    </div>
  );
}

export default EditBook;