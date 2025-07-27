import { useState } from "react";
import { useNavigate } from "react-router-dom";

function UpdateProfile({ onClose }) {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate(-1); 
  };

  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Profile updated!");
   
    navigate("/home");
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

       
        <div className="p-6 rounded-2xl shadow-md bg-[#457B9D] text-white transition-all duration-300 ease-in-out">
          <h2 className="text-2xl font-bold mb-6 text-center">Update Profile</h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            
            <div>
              <label className="block mb-1 font-medium">
                Name<span className="text-red-300">*</span>
              </label>
              <input
                type="text"
                required
                className="w-full p-2 rounded bg-white text-black focus:outline-none focus:ring-2 focus:ring-[#588157] transition"
                placeholder="Enter your name"
              />
            </div>

            
            <div>
              <label className="block mb-1 font-medium">
                Email<span className="text-red-300">*</span>
              </label>
              <input
                type="email"
                required
                className="w-full p-2 rounded bg-white text-black focus:outline-none focus:ring-2 focus:ring-[#588157] transition"
                placeholder="Enter your email"
              />
            </div>

         
            <div>
              <label className="block mb-1 font-medium">
                Current Password<span className="text-red-300">*</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  className="w-full p-2 rounded bg-white text-black pr-10 focus:outline-none focus:ring-2 focus:ring-[#588157] transition"
                  placeholder="Enter current password"
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

           
            <div>
              <label className="block mb-1 font-medium">New Password</label>
              <input
                type="password"
                className="w-full p-2 rounded bg-white text-black focus:outline-none focus:ring-2 focus:ring-[#588157] transition"
                placeholder="Enter new password (optional)"
              />
            </div>

      

            
            <button
              type="submit"
              className="w-full bg-[#593D3B] hover:bg-[#C7F0BD] hover:text-black text-white font-semibold py-2 rounded transition-all duration-200"
            >
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdateProfile;
