import { NavLink } from "react-router-dom";
import './Header.css';
import Logout from "../Usercontrols/Logout.jsx";
import { useSelector } from "react-redux";
import { Menu, X } from "lucide-react";

const Header = function ({ className, onMenuToggle, isMenuOpen }) {
  const isLoggedIn = useSelector((state) => state.user?.isLoggedIn || false);

  return (
    <div className={`bg-[rgb(26,26,26)] text-white py-3 px-4 sm:px-6 ${className} top-0 left-0 w-full flex items-center justify-between z-50`}>
      
      {/* Left side: Menu (mobile) + Brand */}
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuToggle}
          className="lg:hidden text-white bg-gray-800 p-2 rounded z-50"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <NavLink to='/' className="text-lg sm:text-2xl font-bold text-white">
          Videotube
        </NavLink>
      </div>

      {/* Right side: Account + Login/Logout */}
      <div className="flex items-center gap-4 sm:gap-6">
        <NavLink
          to="/account-dashboard"
          className="text-sm sm:text-base font-semibold text-white hover:text-gray-300 transition"
        >
          Account
        </NavLink>

        {isLoggedIn ? (
          <Logout />
        ) : (
          <NavLink
            to="/login"
            className="text-sm sm:text-base font-medium text-white bg-blue-600 hover:bg-blue-700 px-3 py-1.5 rounded-md transition duration-300"
          >
            Login
          </NavLink>
        )}
      </div>
    </div>
  );
};

export default Header;
