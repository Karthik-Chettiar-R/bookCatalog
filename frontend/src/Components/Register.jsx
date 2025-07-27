import { useState } from 'react';
import { useNavigate } from "react-router-dom";

const BACKEND_URL=import.meta.env.VITE_BACKEND_URL


function RegisterPage({ onClose }) {
  const navigate = useNavigate();

const handleClose = () => {
  navigate(-1); 
};

  

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '',
    agree: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'Full Name is required';
    if (!form.email.includes('@') || !form.email.includes('.'))
      newErrors.email = 'Enter a valid email';
    if (form.password.length < 6)
      newErrors.password = 'Password must be at least 6 characters';
    if (form.confirmPassword !== form.password)
      newErrors.confirmPassword = 'Passwords do not match';
    if (!form.agree) newErrors.agree = 'You must agree to the terms';
    return newErrors;
  };

 const handleSubmit = async (e) => {
    e.preventDefault();
    // ... your validation logic ...

    try {
        const response = await fetch(`${BACKEND_URL}/users/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: form.name,
                email: form.email,
                password: form.password,
                role: form.role,
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Registration failed');
        }

        console.log('User registered:', data);
        
        localStorage.setItem('userInfo', JSON.stringify(data));
        navigate('/books');

    } catch (error) {
        console.error(error);
        setErrors({ submit: error.message });
    }
};

  return (
    <div className="fixed inset-0 bg-[#00272B]/70 flex items-center justify-center z-50">
      <div className="relative bg-[#457B9D] text-white p-6 rounded-lg w-11/12 max-w-md shadow-lg">
      
        <button
           onClick={handleClose}
          className="absolute top-2 right-3 text-white text-xl hover:text-red-300"
        >
          ❌
        </button>

        
        <div className="w-full sm:max-w-sm md:max-w-md mx-auto mt-0 p-6 rounded-2xl shadow-lg bg-[#457B9D] text-white transition-all duration-300 ease-in-out">
          <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
           
            <div>
              <label htmlFor="name" className="block mb-1">
                Full Name<span className="text-red-300">*</span>
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                className={`w-full p-2 rounded bg-white text-black focus:outline-none focus:ring-2 focus:ring-[#588157] transition-transform duration-200 ${
                  errors.name ? 'ring-2 ring-red-400' : ''
                }`}
              />
              {errors.name && (
                <p className="text-sm text-red-200 mt-1 animate-fade-in">{errors.name}</p>
              )}
            </div>

          
            <div>
              <label htmlFor="email" className="block mb-1">
                Email<span className="text-red-300">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                className={`w-full p-2 rounded bg-white text-black focus:outline-none focus:ring-2 focus:ring-[#588157] transition-transform duration-200 ${
                  errors.email ? 'ring-2 ring-red-400' : ''
                }`}
              />
              {errors.email && (
                <p className="text-sm text-red-200 mt-1 animate-fade-in">{errors.email}</p>
              )}
            </div>

           
            <div>
              <label htmlFor="password" className="block mb-1">
                Password<span className="text-red-300">*</span>
              </label>
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={form.password}
                onChange={handleChange}
                placeholder="Eg:- 90210"
                className={`w-full p-2 rounded bg-white text-black focus:outline-none focus:ring-2 focus:ring-[#588157] transition-transform duration-200 ${
                  errors.password ? 'ring-2 ring-red-400' : ''
                }`}
              />
              <p className="text-sm text-white mt-1">Min. 6 characters</p>
              {errors.password && (
                <p className="text-sm text-red-200 mt-1 animate-fade-in">{errors.password}</p>
              )}
            </div>

            
            <div>
              <label htmlFor="confirmPassword" className="block mb-1">
                Confirm Password<span className="text-red-300">*</span>
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showPassword ? 'text' : 'password'}
                value={form.confirmPassword}
                onChange={handleChange}
                className={`w-full p-2 rounded bg-white text-black focus:outline-none focus:ring-2 focus:ring-[#588157] transition-transform duration-200 ${
                  errors.confirmPassword ? 'ring-2 ring-red-400' : ''
                }`}
              />
              {errors.confirmPassword && (
                <p className="text-sm text-red-200 mt-1 animate-fade-in">{errors.confirmPassword}</p>
              )}
            </div>

           
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="showPassword"
                checked={showPassword}
                onChange={() => setShowPassword((prev) => !prev)}
              />
              <label htmlFor="showPassword">Show Password</label>
            </div>

            
            <div>
              <label htmlFor="role" className="block mb-1">
                Role (optional)
              </label>
              <select
                id="role"
                name="role"
                value={form.role}
                onChange={handleChange}
                className="w-full p-2 rounded bg-white text-black"
              >
                <option value="">Select role</option>
                <option value="Reader">Reader</option>
                <option value="Librarian">Librarian</option>
                <option value="Admin">Admin</option>
              </select>
            </div>

     
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="agree"
                name="agree"
                checked={form.agree}
                onChange={handleChange}
              />
              <label htmlFor="agree">
                I agree to the <span className="underline">terms and conditions</span>
                <span className="text-red-300">*</span>
              </label>
            </div>
            {errors.agree && (
              <p className="text-sm text-red-200 animate-fade-in">{errors.agree}</p>
            )}

           
            <button
              type="submit"
              className="w-full bg-[#593D3B] hover:bg-[#C7F0BD] hover:text-black text-white font-semibold py-2 rounded transition duration-300"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
