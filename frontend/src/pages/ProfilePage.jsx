import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const BACKEND_URL=import.meta.env.VITE_BACKEND_URL

function ProfilePage() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);

  // Load user info from localStorage when the component mounts
  useEffect(() => {
    const storedUserInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (storedUserInfo) {
      setUserInfo(storedUserInfo);
    } else {
      // If no user info, redirect to login
      navigate('/login');
    }
  }, [navigate]);

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to permanently delete your account? This action cannot be undone.')) {
      return;
    }

    try {
      const response = await fetch(`${BACKEND_URL}/api/users/profile`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${userInfo.token}`, // Send auth token
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete account.');
      }

      // On success, clear localStorage and redirect to home
      localStorage.removeItem('userInfo');
      navigate('/');

    } catch (error) {
      console.error('Deletion error:', error);
      // You can set an error state here to notify the user
    }
  };

  if (!userInfo) {
    return null; // or a loading spinner
  }

  return (
    <div className="bg-gray-100 min-h-screen pt-12">
      <div className="container mx-auto max-w-lg p-6">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Your Profile</h1>
          
          <div className="space-y-4 text-lg">
            <p><strong>Name:</strong> {userInfo.name}</p>
            <p><strong>Email:</strong> {userInfo.email}</p>
            <p><strong>Role:</strong> {userInfo.role}</p>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              to="/update-profile" 
              className="w-full text-center bg-blue-500 text-white py-2 px-6 rounded hover:bg-blue-600 transition"
            >
              Update Profile
            </Link>
            <button 
              onClick={handleDelete}
              className="w-full bg-red-600 text-white py-2 px-6 rounded hover:bg-red-700 transition"
            >
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;