import { useState } from "react";
import { NavLink } from "react-router-dom";
import './Header.css';
import Logout from "../Usercontrols/Logout.jsx";
import { useSelector } from "react-redux";


const Header = function () {

    const isLoggedIn = useSelector((state)=>state.user?.isLoggedIn || false)
    console.log(isLoggedIn)

    return (
      <div className="bg-gray-900 text-white py-4 px-6 fixed top-0 left-0 w-full shadow-lg">
        <ul className="flex justify-between items-center max-w-6xl mx-auto">
          <li className="text-xl font-bold">📹 Videotube</li>
          <li className="cursor-pointer hover:text-gray-300 transition">Subscriptions</li>
          <li className="cursor-pointer hover:text-gray-300 transition">
            <NavLink to={'/account-dashboard'}>
              Account
            </NavLink>
          </li>
        {isLoggedIn==true?<li><Logout/></li>:
          <li><NavLink to={'/login'}>Login</NavLink></li>}
          {/* <li><Logout></Logout></li> */}
        </ul>
      </div>
    );
  };
  
  export default Header;
  