import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const SubscribersPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const subscribers = location.state || []; // Retrieve subscribers list
    //console.log(subscribers)

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
        <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md relative">
            {/* Close Button */}
            <button
                className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 text-2xl"
                onClick={() => navigate(-1)}
            >
                &times;
            </button>
    
            <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">Subscribers</h1>
    
            {subscribers.length === 0 ? (
                <p className="text-gray-600 text-center">No subscribers available.</p>
            ) : (
                <div className="space-y-3">
                    {subscribers.map((sub) => (
                        <div key={sub.user_id} className="flex items-center gap-4 border-b py-3">
                            <img
                                src={sub.avatar || "https://via.placeholder.com/50"}
                                alt={sub.fullName}
                                className="w-12 h-12 rounded-full border"
                            />
                            <div>
                                <h3 className="text-lg font-semibold text-gray-700">{sub.fullName}</h3>
                                <p className="text-gray-500">@{sub.username}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    </div>
    

    );
};

export default SubscribersPage;
