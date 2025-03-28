import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "../Redux/UserSlice";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";

const LoginUser = () => {

  const dispatch = useDispatch()
  const navigate =useNavigate()


  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState(""); // Success/error message

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL_BACKEND}/users/login`, formData, {
        withCredentials: true,
      });
      

      console.log(response)
      dispatch(setUser(response.data.data.user));
      // Store the JWT token in localStorage
      localStorage.setItem("refreshToken", response.data.data.refreshToken);
      localStorage.setItem("accessToken",response.data.data.accessToken)

      setMessage("Login successful!");

      setTimeout(() => navigate('/'), 1000);
    } catch (error) {
      console.error("Login error:", error);
      setMessage("Invalid email or password.");
    }
  };

  return (
<div className="flex items-center justify-center min-h-screen bg-gray-900">
  <div className="w-full max-w-md bg-gray-800 shadow-lg rounded-lg p-6">
    <h2 className="text-2xl font-semibold text-center text-gray-100 mb-4">Login</h2>

    {message && <p className="text-red-400 text-center mb-4">{message}</p>}

    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
        className="w-full px-4 py-2 bg-gray-700 text-gray-100 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-400"
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        required
        className="w-full px-4 py-2 bg-gray-700 text-gray-100 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-400"
      />
      <button
        type="submit"
        className="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition duration-300"
      >
        Login
      </button>
    </form>
    <div className="flex items-center space-x-2  pt-4 pl-1 ">
      <p className="text-white">Don't have an account?</p>
      <NavLink to='/register' className='text-blue-500'>Register</NavLink>
    </div>

  </div>
</div>



  );
};
export default LoginUser;
