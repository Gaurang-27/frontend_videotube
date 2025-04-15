import axios from "axios";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import SubscribeButton from "../Usercontrols/SubscribeButton";
import { useNavigate } from "react-router-dom";

const ChannelVideos = function(){
    
    const {user_id } = useParams();

    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [video, setvideo] =useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1); // backend should return this
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BASE_URL_BACKEND}/videos/userid/${user_id}?page=${currentPage}`,{withCredentials: true});
                setTotalPages(Math.ceil(response.data.statusCode[0]?.total_count / 12));
                //console.log(response.data)
                setData(response.data);
                setvideo(response.data.statusCode)
                //console.log(response.data.statusCode)
            } catch (err) {
                setError(err.message);
            }
        };

        fetchData();
    }, [user_id]);

    const handleClick = function(element){
        navigate(`/${element.video_id}`, {state : element})
    }

    const handleNext = () => {
      if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
    };
  
    const handlePrev = () => {
      if (currentPage > 1) setCurrentPage(prev => prev - 1);
    };
    if(error) return <p>{error}</p>

    return(
        <div className="px-3 flex justify-center w-full mb-4">
        <div className="w-full pr-4 pt-6">
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {video.length > 0 ? (
              video.map((element, index) => (
                <div key={index} className="bg-gray-800 p-4 rounded-lg shadow-md">
                  <img
                    onClick={() => handleClick(element)}
                    src={element.thumbnail_url}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-48 object-contain rounded-md cursor-pointer transition-transform duration-300 hover:scale-105 bg-black"
                  />
                  <h3 className="text-lg font-medium mt-2 text-white">{element.title}</h3>
                </div>
              ))
            ) : (
              <p className="text-gray-400 col-span-3">No videos available</p>
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
    )
}

export default ChannelVideos