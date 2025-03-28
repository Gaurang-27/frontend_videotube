import { useState } from "react";
import { NavLink } from "react-router-dom";
import './Header.css';
import Logout from "../Usercontrols/Logout.jsx";
import { useSelector } from "react-redux";


const Header = function ({className}) {

    const isLoggedIn = useSelector((state)=>state.user?.isLoggedIn || false)
    console.log(isLoggedIn)

    return (
      <div className={`bg-[rgb(26,26,26)] text-white py-4 px-6 ${className} top-0 left-0 w-full `}>
  <ul className="flex items-center justify-between w-full">
    {/* Left side - Brand */}
    <li className="text-2xl font-bold"><NavLink to='/'>Videotube</NavLink></li>

    {/* Right side - Account and Login/Logout */}
    <div className="flex items-center space-x-6">
      <li className="cursor-pointer hover:text-gray-300 transition">
        <NavLink to={'/account-dashboard'}>
          Account
        </NavLink>
      </li>
      {isLoggedIn ? (
        <li><Logout /></li>
      ) : (
        <li className="text-white font-semibold bg-blue-600 hover:bg-blue-700 px-4 py-1 pb-2 rounded-md transition duration-300">
          <NavLink to={'/login'} className="text-white font-medium">Login</NavLink>
        </li>
      )}
    </div>
  </ul>
</div>

    );
  };
  
  export default Header;
  