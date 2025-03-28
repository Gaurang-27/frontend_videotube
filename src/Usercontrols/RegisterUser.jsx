import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Registeruser = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    avatar: null, // Store the selected file
  });

  const [message, setMessage] = useState(""); // For success/error messages

  const navigate= useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, avatar: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create FormData to send files
    const formDataToSend = new FormData();
    formDataToSend.append("fullName", formData.fullName);
    formDataToSend.append("username", formData.username);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("password", formData.password);
    if (formData.avatar) {
      formDataToSend.append("avatar", formData.avatar);
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL_BACKEND}/users/register`, formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
    });
    

      setMessage(response.data.message); // Show success message
      setFormData({
        fullName: "",
        username: "",
        email: "",
        password: "",
        avatar: null,
      });
      setTimeout(() => {
        navigate('/login')
      }, 1500);
    } catch (error) {
      console.error("Registration error:", error);
      setMessage("Registration failed. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
  <div className="w-full max-w-md bg-gray-800 shadow-lg rounded-lg p-6">
    <h2 className="text-2xl font-semibold text-center text-gray-100 mb-4">Register</h2>

    {message && <p className="text-red-400 text-center mb-4">{message}</p>}

    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        name="fullName"
        placeholder="Full Name"
        value={formData.fullName}
        onChange={handleChange}
        required
        className="w-full px-4 py-2 bg-gray-700 text-gray-100 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-400"
      />
      <input
        type="text"
        name="username"
        placeholder="Username"
        value={formData.username}
        onChange={handleChange}
        required
        className="w-full px-4 py-2 bg-gray-700 text-gray-100 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-400"
      />
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
      <div className="w-full">
        <label className="block text-gray-300 text-sm mb-1">Upload Avatar</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full text-gray-300 bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 cursor-pointer file:bg-blue-500 file:text-white file:py-1 file:px-3 file:rounded-lg hover:file:bg-blue-600"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition duration-300"
      >
        Register
      </button>
    </form>

    {/* Avatar Preview */}
    {formData.avatar && (
      <div className="mt-6 text-center">
        <h4 className="text-gray-300 text-lg font-medium">Avatar Preview:</h4>
        <img
          src={URL.createObjectURL(formData.avatar)}
          alt="Avatar Preview"
          className="mt-2 w-24 h-24 rounded-full border-2 border-gray-500 mx-auto object-cover"
        />
      </div>
    )}
  </div>
</div>

  );
};



export default Registeruser;
