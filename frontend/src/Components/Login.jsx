import { useState } from 'react';
import { useNavigate } from "react-router-dom";


function LoginPage({ onClose }) {
  const navigate = useNavigate();

const handleClose = () => {
  navigate(-1); // or navigate(-1) to go back
};

  const [showPassword, setShowPassword] = useState(false);

  // In Components/Login.jsx

// You'll likely want a state to manage errors from the server
const [error, setError] = useState('');

const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors

    // Get form values directly from the event
    const email = e.target.elements.email.value;
    const password = e.target.elements.password.value;

    if (!email || !password) {
        setError('Please enter both email and password.');
        return;
    }

    try {
        const response = await fetch('http://localhost:5000/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (!response.ok) {
            // If the server returns an error (e.g., 401 Unauthorized)
            throw new Error(data.message || 'Login failed. Please check your credentials.');
        }
        
        // 1. On successful login, save user info to localStorage
        // This keeps the user logged in across browser sessions.
        localStorage.setItem('userInfo', JSON.stringify(data));
        
        console.log('User logged in:', data);
        
        // 2. Redirect to the main application page
        navigate('/home');

    } catch (err) {
        console.error('Login error:', err.message);
        setError(err.message); // Display the error message to the user
    }
};

// In your JSX, you can add a place to display the error:
// <form onSubmit={handleSubmit} className="space-y-5">
//   {error && <p className="text-sm text-red-200 text-center">{error}</p>}
//   ... rest of your form
// </form>
;

  return (
    <div className="fixed inset-0 bg-[#00272B]/70 flex items-center justify-center z-50">
      <div className="relative bg-[#457B9D] text-white p-6 rounded-lg w-11/12 max-w-md shadow-lg">
        {/* ❌ Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-2 right-3 text-white text-xl hover:text-red-300"
        >
          ❌
        </button>

        {/* Inner Login Form */}
        <div className="sm:max-w-sm md:max-w-md mx-auto p-6 rounded-2xl shadow-md bg-[#457B9D] text-white transition-all duration-300 ease-in-out">
          <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div className="transition duration-300">
              <label htmlFor="email" className="block mb-1 font-medium">
                Email<span className="text-red-300">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="w-full p-2 rounded bg-white text-black focus:outline-none focus:ring-2 focus:ring-[#588157] transition"
                placeholder="Enter your email"
              />
            </div>

            {/* Password */}
            <div className="transition duration-300">
              <label htmlFor="password" className="block mb-1 font-medium">
                Password<span className="text-red-300">*</span>
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  className="w-full p-2 rounded bg-white text-black pr-10 focus:outline-none focus:ring-2 focus:ring-[#588157] transition"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-sm text-[#457B9D] hover:text-[#588157] transition"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {/* Forgot Password */}
            <div className="text-right">
              <button
                type="button"
                className="text-sm text-white underline hover:text-[#C7F0BD] transition"
              >
                Forgot Password?
              </button>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-[#593D3B] hover:bg-[#C7F0BD] hover:text-black text-white font-semibold py-2 rounded transition-all duration-200"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;

