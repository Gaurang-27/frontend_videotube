import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import DeletePlaylistButton from "../Playlist/DeletePlaylistButton";

const SubsBar = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openSection, setOpenSection] = useState("first");

  const [playlists, setPlaylists] = useState([]);
  //const navigate = useNavigate();

  const fetchPlaylists = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL_BACKEND}/playlist/get-user-playlists`,
        { withCredentials: true }
      );
      setPlaylists(response.data.statusCode); // Adjust based on your actual response structure
    } catch (error) {
      console.error("Error fetching playlists:", error);
    }
    setLoading(false);
  };

  const isLoggedIn = useSelector((state) => state?.user?.isLoggedIn || false);

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL_BACKEND}/subs/subscribedto-list`,
          { withCredentials: true }
        );
        setSubscriptions(response.data.statusCode);
      } catch (err) {
        setError("Failed to fetch subscriptions");
      } finally {
        setLoading(false);
      }
    };

    fetchSubscriptions();
    fetchPlaylists();
  }, []);

  const toggleSection = (section) => {
    setOpenSection((prev) => (prev === section ? null : section));
  };

  const handleDeleteSuccess = (deletedId) => {
    // remove from state or refetch
    setPlaylists(prev => prev.filter(p => p.playlist_id !== deletedId));
  };

  if (loading) return <p>Loading...</p>;
  if (error && isLoggedIn) return <p>{error}</p>;

  return (
    <nav className="w-1/5 bg-[rgb(26,26,26)] h-screen text-white p-4 fixed left-0 top-20 shadow-lg overflow-y-auto">

      {/* First Section */}
      <div className="mb-6">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold border-b border-gray-600 pb-2">
            Subscribed Channels
          </h3>
          <button
            className="text-sm text-blue-400 hover:text-blue-300"
            onClick={() => toggleSection("first")}
          >
            {openSection === "first" ? "Hide" : "Show"}
          </button>
        </div>
        {openSection === "first" && (
          <ul className="space-y-3 mt-3 overflow-y-auto custom-scroll">
            {subscriptions.map((channel) => (
              <li key={channel.user_id}>
                <NavLink
                  to={`/channel/${channel.user_id}`}
                  className={({ isActive }) =>
                    `block px-3 py-2 rounded-lg transition-colors duration-300 ${isActive
                      ? "bg-blue-600 text-white font-bold"
                      : "bg-gray-700 hover:bg-gray-600"
                    }`
                  }
                >
                  {channel.fullName}
                </NavLink>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Second Section */}
      <div>
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold border-b border-gray-600 pb-2">
            Playlists
          </h3>
          <button
            className="text-sm text-blue-400 hover:text-blue-300"
            onClick={() => toggleSection("second")}
          >
            {openSection === "second" ? "Hide" : "Show"}
          </button>
        </div>
        {openSection === "second" && (
          playlists.length === 0 ? (
            <div className="text-center text-gray-500 py-4 mt-6">No playlists found.</div>
          ) : (
            <ul className="space-y-3 mt-3 overflow-y-auto custom-scroll">
              {playlists.map((playlists) => (
                <li key={playlists.playlist_id}>
                <div className="flex items-center justify-between bg-gray-700 hover:bg-gray-600 rounded-lg px-3 py-2 transition-colors duration-300">
                  <NavLink
                    to={`/playlist/${playlists.playlist_id}`}
                    className={({ isActive }) =>
                      `flex-1 font-medium ${
                        isActive
                          ? "text-white font-bold"
                          : "text-gray-200 hover:text-white"
                      }`
                    }
                  >
                    {playlists.name}
                  </NavLink>
              
                  <DeletePlaylistButton
                    playlistId={playlists.playlist_id}
                    onDeleteSuccess={handleDeleteSuccess}
                  />
                </div>
              </li>
              
              ))}
            </ul>
          )
        )}

      </div>
    </nav>
  );
};

export default SubsBar;
