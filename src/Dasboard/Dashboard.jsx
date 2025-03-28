import SubscriberCard from "./SubscriberCard";
import SubscribersPage from "./SubscribersPage";
import UserPanelCard from "./UserPanelCard";
import { Outlet } from "react-router-dom";
import UserVideos from "./UserVideos";
import UploadVideo from "./UploadVideo";
import { useSelector } from "react-redux";
import LoginUser from '../Usercontrols/LoginUser'
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Dashboard() {

    const isLoggedIn = useSelector((state) => state.user.isLoggedIn || false)
    const navigate = useNavigate()

    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/login', { replace: true });
        }
    }, [isLoggedIn, navigate]); // Runs when isLoggedIn or navigate changes

    if (!isLoggedIn) {
        return null; // Prevents rendering before redirection
    }

    return (
        <>

            <div className="flex flex-col sm:flex-row justify-start items-center w-full mt-10 gap-20 px-16">
                {/* Left: User Panel Card */}
                <div className="w-96 sm:w-96" >
                    <UserPanelCard />
                </div>

                {/* Right: Outlet (Will render Subscribers Card) */}
                <div className="w-96 sm:w-96">
                    <Outlet />
                </div>

                <div className="flex-1 flex justify-center items-center">
                    <h1 className="text-4xl font-bold text-white">Welcome to Dashboard</h1>
                </div>
            </div>


            <UserVideos />
            <div className="flex gap-15 p-15">
                <button
                    onClick={()=>navigate('/upload-video')}
                    className="text-white font-semibold bg-blue-600 hover:bg-blue-700 px-8 py-5  rounded-md transition duration-300 text-xl">
                        Upload Video
                </button>
                <button
                    className="text-white font-semibold bg-blue-600 hover:bg-blue-700 px-8 py-5  rounded-md transition duration-300 text-xl">
                        Update Personal Details
                </button>
            </div>
        </>
    );
}

export default Dashboard;
