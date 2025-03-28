import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";

const SubscriberCard = () => {

    const user = useSelector((state) => state.user.user)
    const [subs, setSubs] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate()

    useEffect(() => {
        const fetchSubscribers = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BASE_URL_BACKEND}/subs/subscriber-list/${user.user_id}`);
                // Replace with actual API route
                setSubs(response.data.statusCode);
            } catch (err) {
                setError("Failed to load subscribers");
                console.error("Error fetching subscribers:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchSubscribers();
    }, [user]);

    const handeclick = function () {
        console.log(subs)
        navigate(`/account-dashboard/subscriber-list`, { state: subs.subscribers })
    }

    return (
        <div className="min-h-[310px] bg-[rgb(28,28,28)] shadow-[0px_0px_10px_rgba(0,0,0,0.2)] rounded-xl p-8 w-96 text-center flex flex-col justify-center">
            <h2 className="text-3xl font-bold text-gray-300">Subscribers</h2>

            {loading ? (
                <p className="text-gray-500 mt-4">Loading...</p>
            ) : error ? (
                <p className="text-red-500 mt-4">{error}</p>
            ) : (
                <p className="text-5xl font-extrabold text-blue-600 mt-4">{subs.subscribers.length}</p>
            )}

            <p className="text-gray-500 mt-1 text-lg">Total Subscribers</p>

            <button
                onClick={handeclick}
                className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300"
            >
                See Subscribers
            </button>
        </div>

    );
};

export default SubscriberCard;
