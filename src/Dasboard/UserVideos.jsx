import axios from "axios";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import DeleteVideo from "./DeleteVideo";
import { useNavigate } from "react-router-dom";

function UserVideos() {
    const [videos, setVideos] = useState([]); // Store videos list
    const [error, setError] = useState(null);
    const user = useSelector((state) => state.user.user);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1); // backend should return this
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BASE_URL_BACKEND}/videos/userid/${user.user_id}?page=${currentPage}`);
                setVideos(response.data.statusCode);
                setTotalPages(Math.ceil(response.data.statusCode[0]?.total_count / 12)); // Assuming this is the array of videos
            } catch (err) {
                setError(err.message);
            }
        };

        fetchData();
    }, []);

    const handleClick = (video) => {
        navigate(`/${video.video_id}`, { state: video });
    };

    // ✅ Function to handle video deletion success
    const handleDeleteSuccess = (deletedVideoId) => {
        setVideos((prevVideos) => prevVideos.filter(video => video.video_id !== deletedVideoId));
    };

    const handleNext = () => {
        if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
      };
    
      const handlePrev = () => {
        if (currentPage > 1) setCurrentPage(prev => prev - 1);
      };

    if (error) return <p>{error}</p>;

    return (
      <div className="pl-15 pr-10 pt-20 flex justify-start w-full mb-4">
      <div className="w-full pr-4 pt-6">
          {/* Responsive Grid: 4 columns on large screens, 2 on medium, 1 on small */}
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ">
              {videos.length > 0 ? (
                  videos.map((video, index) => (
                      <div key={index} className="bg-gray-800 p-4 rounded-lg shadow-md">
                          <img
                              onClick={() => handleClick(video)}
                              src={video.thumbnail_url}
                              alt={`Thumbnail ${index + 1}`}
                              className="w-full h-48 object-contain rounded-md cursor-pointer transition-transform duration-300 hover:scale-105 bg-black"
                          />
                          <h3 className="text-lg font-medium mt-2 text-white">{video.title}</h3>
                          <DeleteVideo videoId={video.video_id} onDeleteSuccess={handleDeleteSuccess} />
                      </div>
                  ))
              ) : (
                  <p className="text-gray-400 col-span-full text-center">No videos available</p>
              )}
          </div>
      </div>

      {totalPages > 1 && (
        <div className="mt-6 flex gap-4">
          <button
            onClick={handlePrev}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-700 text-white rounded disabled:opacity-50"
          >
            Prev
          </button>
          <span className="text-white py-2 text-md">Page {currentPage} of {totalPages}</span>
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-700 text-white rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
  </div>
  
    );
}

export default UserVideos;
