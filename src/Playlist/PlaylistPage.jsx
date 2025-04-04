import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import DeletePlaylistButton from "./DeletePlaylistButton";

const PlaylistPage = () => {
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newPlaylistName, setNewPlaylistName] = useState("");
  const [desc, setDesc] = useState("")
  const navigate = useNavigate();
  const context = useOutletContext()

  const [message, setMessage] = useState("")
  const [error, setError] = useState("")

  const [exist, setExist] = useState(false)


  useEffect(() => {
    document.body.classList.add("overflow-hidden"); // Lock scroll on open
    fetchPlaylists();

    return () => {
      document.body.classList.remove("overflow-hidden"); // Unlock on close
    };
  }, []);

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

  const addToPlaylist = async (video_id, playlistId) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL_BACKEND}/playlist/add-video-to-playlist?video_id=${video_id}&playlist_id=${playlistId}`, {}, { withCredentials: true });

      if (response.data.statusCode.exist) {
        setMessage("Video already exist in this playlist")
        setTimeout(() => {
          setMessage("")
        }, 1500);
        return;
      }

      setMessage("Video added to the playlist")
      setTimeout(() => {
        setMessage("")
      }, 1500);
    } catch (error) {
      //console.error("Error adding to playlist:", error);
      setMessage("Could not add Video to playlist")
      setTimeout(() => {
        setMessage("")
      }, 1500);
    }
  };

  const createNewPlaylist = async () => {
    if (!newPlaylistName.trim()) return;

    try {
      await axios.post(
        `${import.meta.env.VITE_BASE_URL_BACKEND}/playlist/create-playlist`,
        { name: newPlaylistName, description: desc },
        { withCredentials: true }
      );
      setNewPlaylistName("");
      setDesc("")

      fetchPlaylists();

      setMessage("Playlist Created")
      setTimeout(() => {
        setMessage("")
      }, 1500);
    } catch (error) {
      console.error("Error creating playlist:", error);
      setMessage("Could not create playlist")
      setTimeout(() => {
        setMessage("")
      }, 1500);
    }
  };

  const handleDeleteSuccess = (deletedId) => {
    // remove from state or refetch
    setPlaylists(prev => prev.filter(p => p.playlist_id !== deletedId));
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 relative ">
        <button
          className="absolute top-3 right-4 text-gray-400 hover:text-black text-2xl"
          onClick={() => navigate(-1)}
        >
          &times;
        </button>

        <h2 className="text-xl font-semibold text-center">Your Playlists</h2>

        <div className="pt-4">
          <h3 className="text-sm font-medium mb-2">Create New Playlist</h3>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={newPlaylistName}
                onChange={(e) => setNewPlaylistName(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
                placeholder="Playlist name"
              />
              <button
                onClick={createNewPlaylist}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Create
              </button>
            </div>
            <div className="pt-2 flex">
              <input
                type="text"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
                placeholder="Description"
              />
            </div>
          </div>

          {message ? <p className="text-blue-600 p-4 pb-0">{message}</p> : null}
        </div>

        <div className="mt-6 ">
          {loading ? (
            <div className="text-center text-gray-600 py-4 mt-6">Loading...</div>
          ) : playlists.length === 0 ? (
            <div className="text-center text-gray-500 py-4 mt-6">No playlists found.</div>
          ) : (
            <div className="space-y-2 mb-4 max-h-100 overflow-y-auto mt-6">
              {playlists.map((playlist) => (
                <div
                  key={playlist.playlist_id}
                  className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded px-4 py-2 mb-2 hover:bg-gray-100 transition"
                >
                  <button
                    onClick={() => addToPlaylist(context, playlist.playlist_id)}
                    className="text-left text-gray-800 font-medium w-full"
                  >
                    {playlist.name}
                  </button>

                  <DeletePlaylistButton
                    playlistId={playlist.playlist_id}
                    onDeleteSuccess={handleDeleteSuccess}
                  />
                </div>
              ))}

            </div>
          )}
        </div>


      </div>
    </div>
  );
};

export default PlaylistPage;
