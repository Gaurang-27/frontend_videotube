import Header from "./Header";
import Getvideo from "../Getvideos/Getvideo";
import { NavLink, Outlet } from "react-router-dom";
import SubsBar from "./Navbar";
import { useSelector } from "react-redux";
import { useState } from "react";


const Homepage = function () {

    const isLoggedIn = useSelector((state) => state?.user?.isLoggedIn || false)

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <>
            <Header onMenuToggle={() => setIsMenuOpen(prev => !prev)} isMenuOpen={isMenuOpen} />
            <div className="flex"> {/* pt-20 because Header is fixed and 80px tall */}
                <SubsBar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
                <div className="flex-1">
                    <Outlet />
                </div>
            </div>
        </>

    )
}

export default Homepage
