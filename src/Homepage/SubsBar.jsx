import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

const SubsBar = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const isLoggedIn = useSelector((state)=>state?.user?.isLoggedIn || false)

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        console.log(`${import.meta.env.VITE_BASE_URL_BACKEND}/subs/subscribedto-list`)
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL_BACKEND}/subs/subscribedto-list`,{withCredentials: true});
        // Adjust endpoint as needed
        console.log(response)
        setSubscriptions(response.data.statusCode);
      } catch (err) {
        setError("Failed to fetch subscriptions");
      } finally {
        setLoading(false);
      }
    };

    fetchSubscriptions();
  }, []);

  if (loading) return <p>Loading...</p>; 
  if (error && isLoggedIn) return <p>{error}</p>;

  return (
    <nav className="w-1/5 h-screen bg-[rgb(26,26,26)] text-white p-4 fixed left-0 top-20 shadow-lg">
  <h3 className="text-xl font-semibold mb-4 border-b border-gray-600 pb-2">
    Subscribed Channels
  </h3>
  <ul className="space-y-3">
    {subscriptions.map((channel) => (
      <li key={channel.user_id}>
        <NavLink
          to={`/channel/${channel.user_id}`}
          className={({ isActive }) =>
            `block px-3 py-2 rounded-lg transition-colors duration-300 ${
              isActive ? "bg-blue-600 text-white font-bold" : "bg-gray-700 hover:bg-gray-600"
            }`
          }
        >
          {channel.fullName}
        </NavLink>
      </li>
    ))}
  </ul>
</nav>

  );
};

export default SubsBar;
