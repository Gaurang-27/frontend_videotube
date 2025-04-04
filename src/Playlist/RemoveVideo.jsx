import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";

const RemoveVideo= ({ videoId, onDeleteSuccess }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const param = useParams()

    const handleDelete = async () => {
        if (!videoId) return;

        setLoading(true);
        setError(null);

        try {
            await axios.delete(`${import.meta.env.VITE_BASE_URL_BACKEND}/playlist/remove-video-from-playlist?video_id=${videoId}&playlist_id=${param.playlist_id}`,{withCredentials : true});
            onDeleteSuccess(videoId); // Notify parent to update UI
        } catch (err) {
            setError("Failed to delete video.");
            //console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <button 
                onClick={handleDelete} 
                disabled={loading}
                style={{ backgroundColor: "red", color: "white", padding: "5px", border: "none", cursor: "pointer" ,borderRadius : '5px',fontSize :'13px',marginTop : '7px',transition: "background-color 0.2s ease"}}
                onMouseEnter={(e) => e.target.style.backgroundColor = "#B22222"}
                onMouseLeave={(e) => e.target.style.backgroundColor = "red"}
            >
                {loading ? "Removing..." : "Remove"}
            </button>
            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    );
};

export default RemoveVideo;
