import Header from "./Header";
import Getvideo from "../Getvideos/Getvideo";
import { NavLink, Outlet } from "react-router-dom";
import SubsBar from "./SubsBar";
import { useSelector } from "react-redux";


const Homepage = function(){

    const isLoggedIn = useSelector((state)=>state?.user?.isLoggedIn || false)

    return(
        <>
        <Header className={"fixed"}></Header>
        <Outlet/>
        <SubsBar/>
        </>
    )
}

export default Homepage
