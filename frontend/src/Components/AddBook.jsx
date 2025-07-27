import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const BACKEND_URL=import.meta.env.VITE_BACKEND_URL

function AddBook() {
  const navigate = useNavigate();

  const [moreOptions, setMoreOptions] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    genre: '',
    description: '',
    publicationYear: '',
    seriesName: ''
  });
  const [coverImageFile, setCoverImageFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const genres = [ 'Fiction', 'Non-fiction', 'Science', 'Biography', 'Fantasy', 'History', 'Mystery', 'Romance', 'Self-Help', 'Other' ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setCoverImageFile(e.target.files[0]);
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.author.trim()) newErrors.author = 'Author is required';
    if (!coverImageFile) newErrors.coverImage = 'Cover image is required';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    setSubmitting(true);
    setErrors({});

    const bookData = new FormData();
    bookData.append('title', formData.title);
    bookData.append('author', formData.author);
    bookData.append('genre', formData.genre);
    bookData.append('description', formData.description);
    bookData.append('publicationYear', formData.publicationYear);
    bookData.append('seriesName', formData.seriesName);
    bookData.append('coverImage', coverImageFile);

    try {
      const response = await fetch(`${BACKEND_URL}/api/books`, {
        method: 'POST',
        body: bookData,
      });

      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message || 'Failed to add the book.');
      }

      navigate('/books');

    } catch (error) {
      console.error('Submission Error:', error);
      setErrors({ submit: error.message });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-[#00272B]/70 flex items-center justify-center z-50">
      <div className="relative bg-[#457B9D] text-white p-6 rounded-lg w-11/12 max-w-md shadow-lg">
        <button onClick={() => navigate(-1)} className="absolute top-2 right-3 text-white text-xl hover:text-red-300"> ❌ </button>
        <div className="sm:max-w-sm md:max-w-md mx-auto p-6 rounded-2xl bg-[#457B9D] text-white">
          <h2 className="text-2xl font-bold mb-4 text-center">Add New Book</h2>
          <form className="space-y-4" onSubmit={handleSubmit} noValidate>
            
            {/* Title */}
            <div>
              <label htmlFor="title" className="block font-medium"> Title <span className="text-red-300">*</span> </label>
              <input type="text" id="title" name="title" required className="w-full p-2 rounded bg-white text-black mt-1" value={formData.title} onChange={handleChange} />
              {errors.title && <p className="text-sm text-red-200 mt-1">{errors.title}</p>}
            </div>

            {/* Author */}
            <div>
              <label htmlFor="author" className="block font-medium"> Author <span className="text-red-300">*</span> </label>
              <input type="text" id="author" name="author" required className="w-full p-2 rounded bg-white text-black mt-1" value={formData.author} onChange={handleChange} />
              {errors.author && <p className="text-sm text-red-200 mt-1">{errors.author}</p>}
            </div>

            {/* Cover Image */}
            <div>
              <label htmlFor="coverImage" className="block font-medium"> Cover Image <span className="text-red-300">*</span> </label>
              <input type="file" id="coverImage" name="coverImage" required className="w-full p-2 rounded bg-white text-black mt-1" onChange={handleFileChange} />
              {errors.coverImage && <p className="text-sm text-red-200 mt-1">{errors.coverImage}</p>}
            </div>
            
            {/* Genre */}
            <div>
              <label htmlFor="genre" className="block font-medium"> Genre (optional) </label>
              <select id="genre" name="genre" className="w-full p-2 rounded bg-white text-black mt-1" value={formData.genre} onChange={handleChange}>
                <option value="">Select genre</option>
                {genres.map((g) => ( <option key={g} value={g}> {g} </option> ))}
              </select>
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block font-medium"> Description (optional) </label>
              <textarea id="description" name="description" rows={3} className="w-full p-2 rounded bg-white text-black mt-1" value={formData.description} onChange={handleChange}></textarea>
            </div>

            {/* More Options Toggle */}
            <div className="flex items-center gap-2">
              <input type="checkbox" id="moreOptions" checked={moreOptions} onChange={() => setMoreOptions(!moreOptions)} />
              <label htmlFor="moreOptions" className="cursor-pointer font-medium"> More Options </label>
            </div>

            {/* More Options Section */}
            {moreOptions && (
              <div className="space-y-4 p-4 bg-[#588157] rounded-lg">
                <div>
                  <label htmlFor="publicationYear" className="block font-medium"> Publication Year (optional) </label>
                  <input type="number" name="publicationYear" id="publicationYear" className="w-full p-2 rounded bg-white text-black mt-1" value={formData.publicationYear} onChange={handleChange} />
                </div>
                <div>
                  <label htmlFor="seriesName" className="block font-medium"> Series Name (optional) </label>
                  <input type="text" name="seriesName" id="seriesName" className="w-full p-2 rounded bg-white text-black mt-1" value={formData.seriesName} onChange={handleChange} />
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button type="submit" disabled={submitting} className="w-full bg-[#593D3B] hover:bg-[#C7F0BD] hover:text-black text-white font-semibold py-2 rounded transition-all duration-200 disabled:bg-gray-400">
              {submitting ? 'Submitting...' : 'Submit'}
            </button>
            {errors.submit && <p className="text-sm text-red-200 mt-2 text-center">{errors.submit}</p>}
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddBook;