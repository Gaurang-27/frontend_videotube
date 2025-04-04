import React, { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate, useOutletContext } from "react-router-dom";
import { useSelector } from "react-redux";

const PlaylistButton = () => {
  
  const [error,setError] = useState("")
  const navigate  = useNavigate();
  const location = useLocation()
  const video_id = useOutletContext()

  const isLoggedIn = useSelector((state)=>state.user.isLoggedIn || false)


  const handleButtonClick = () => {
    if(!isLoggedIn){
        setError("Please Login first")
        setTimeout(() => {
            setError("")
        }, 2000);
        return;
    }
    navigate(`${location.pathname}/playlist-page`);

  };

  const addToPlaylist = async (playlistId) => {
    try {
      await axios.post(`/api/playlists/${playlistId}/add`, { user_id });
      alert("Item added to playlist!");
    } catch (error) {
      console.error("Error adding to playlist:", error);
      alert("Failed to add to playlist.");
    }
    setShowDropdown(false);
  };

  return (
    <div className="flex gap-6 items-center">
      <button
        onClick={handleButtonClick}
        className="bg-blue-500 text-white p-[9px] rounded hover:bg-blue-600"
      >
        Add to Playlist
      </button>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default PlaylistButton;
