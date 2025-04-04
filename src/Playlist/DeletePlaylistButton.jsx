import axios from "axios";
import { Trash } from "lucide-react";

const DeletePlaylistButton = ({ playlistId, onDeleteSuccess }) => {



  const handleDelete = async () => {

    try {
      await axios.delete(
        `${import.meta.env.VITE_BASE_URL_BACKEND}/playlist/delete-playlist/${playlistId}`,
        { withCredentials: true }
      );

      onDeleteSuccess(playlistId);
    } catch (error) {
      console.error("Failed to delete playlist:", error);
      alert("Could not delete playlist. Please try again.");
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="text-red-500 hover:text-red-700 transition"
      title="Delete Playlist"
    >
      <Trash size={20} />
    </button>
  );
};

export default DeletePlaylistButton;
