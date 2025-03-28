import { useSelector } from "react-redux";

const UserPanelCard = () => {
    const user = useSelector((state) => state.user.user); // Get user data from Redux
    console.log(user)

    if (!user) return <p>User not logged in.</p>;

    return (
        <div className=" bg-gray-800 text-white p-8 w-96 rounded-xl shadow-2xl text-center min-h-[300px]">
            <img 
                src={user.avatar} 
                alt="User Avatar" 
                className="w-32 h-32 rounded-full object-cover mx-auto mb-6 border-4 border-gray-600"
            />
            <h2 className="text-2xl font-bold">{user.username}</h2>
            <p className="text-lg text-gray-300 mt-2"><strong>Full Name:</strong> {user.fullName}</p>
            <p className="text-lg text-gray-300"><strong>Email:</strong> {user.email}</p>
        </div>
    );
};

export default UserPanelCard;
