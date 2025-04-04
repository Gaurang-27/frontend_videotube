import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import DeletePlaylistButton from "../Playlist/DeletePlaylistButton";
import { Menu, X } from "lucide-react";


const SubsBar = ({ isMenuOpen, setIsMenuOpen }) => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openSection, setOpenSection] = useState("first");
  // const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isLoggedIn = useSelector((state) => state?.user?.isLoggedIn || false);

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL_BACKEND}/subs/subscribedto-list`,
          { withCredentials: true }
        );
        setSubscriptions(response.data.statusCode);
      } catch {
        setError("Failed to fetch subscriptions");
      }
    };

    const fetchPlaylists = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL_BACKEND}/playlist/get-user-playlists`,
          { withCredentials: true }
        );
        setPlaylists(response.data.statusCode);
      } catch (err) {
        console.error("Error fetching playlists:", err);
      }
    };

    fetchSubscriptions();
    fetchPlaylists();
    setLoading(false);
  }, []);

  const toggleSection = (section) => {
    setOpenSection((prev) => (prev === section ? null : section));
  };

  const handleDeleteSuccess = (deletedId) => {
    setPlaylists((prev) => prev.filter((p) => p.playlist_id !== deletedId));
  };

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  if (loading) return <p>Loading...</p>;
  if (error && isLoggedIn) return <p>{error}</p>;

  return (
    <>
      {/* Hamburger button for mobile */}
      {/* <button
        onClick={toggleMenu}
        className="lg:hidden fixed top-5 left-4 z-50 text-white bg-gray-800 p-2 rounded"
      >
        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button> */}

      {/* Sidebar container */}
      <nav
        className={`bg-[rgb(26,26,26)] text-white p-4 shadow-lg h-screen overflow-y-auto custom-scroll transition-transform duration-300 z-40 
        fixed top-0 left-0 w-64 
        ${isMenuOpen ? "translate-x-0" : "-translate-x-full"} 
        lg:translate-x-0 lg:static lg:w-1/5 lg:block`}
      >
        {/* Subscribed Channels */}
        <div className="mb-6 mt-10 lg:mt-0">
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
            <ul className="space-y-3 mt-3">
              {subscriptions.map((channel) => (
                <li key={channel.user_id}>
                  <NavLink
                    to={`/channel/${channel.user_id}`}
                    className={({ isActive }) =>
                      `block px-3 py-2 rounded-lg transition-colors duration-300 ${
                        isActive
                          ? "bg-blue-600 text-white font-bold"
                          : "bg-gray-700 hover:bg-gray-600"
                      }`
                    }
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {channel.fullName}
                  </NavLink>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Playlists */}
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
          {openSection === "second" &&
            (playlists.length === 0 ? (
              <div className="text-center text-gray-500 py-4 mt-6">
                No playlists found.
              </div>
            ) : (
              <ul className="space-y-3 mt-3">
                {playlists.map((playlist) => (
                  <li key={playlist.playlist_id}>
                    <div className="flex items-center justify-between bg-gray-700 hover:bg-gray-600 rounded-lg px-3 py-2 transition-colors duration-300">
                      <NavLink
                        to={`/playlist/${playlist.playlist_id}`}
                        className={({ isActive }) =>
                          `flex-1 font-medium ${
                            isActive
                              ? "text-white font-bold"
                              : "text-gray-200 hover:text-white"
                          }`
                        }
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {playlist.name}
                      </NavLink>
                      <DeletePlaylistButton
                        playlistId={playlist.playlist_id}
                        onDeleteSuccess={handleDeleteSuccess}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            ))}
        </div>
      </nav>
    </>
  );
};

export default SubsBar;
