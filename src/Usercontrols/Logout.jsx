import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { clearUser } from "../Redux/UserSlice";

const Logout = () => {

  const dispatch = useDispatch()

  const [message, setMessage] = useState("");
  //const navigate = useNavigate(); // For redirection

  const handleLogout = async () => {
    try {
        const refreshToken = localStorage.getItem("refreshToken");

        if (!refreshToken) {
          setMessage("No refresh token found. Please log in again.");
          return;
        }

      // Send logout request to the backend
      await axios.post(`${import.meta.env.VITE_BASE_URL_BACKEND}/users/logout`, {},{
        withCredentials:true
      });


      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");

      dispatch(clearUser());

      // Show logout success message
      setMessage("Logout successful!");

      // Redirect to login page after 2 seconds
      //setTimeout(() => navigate("/login"), 2000);
      
    } catch (error) {
      console.error("Logout failed:", error);
      setMessage("Failed to log out. Try again.");
    }
  };

  return (
    <div>
  <button 
    onClick={handleLogout} 
    className="text-sm sm:text-base font-medium text-white bg-blue-600 hover:bg-blue-700 px-3 py-1.5 rounded-md transition duration-300"
  >
    Logout
  </button>
  {message && (
    <p className="text-red-500 text-sm font-medium absolute top-12">
      {message}
    </p>
  )}
</div>

  );
};


export default Logout;
