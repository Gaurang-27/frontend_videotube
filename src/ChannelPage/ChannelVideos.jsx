import axios from "axios";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import SubscribeButton from "../Usercontrols/SubscribeButton";

const ChannelVideos = function(){
    
    const {user_id } = useParams();

    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [video, setvideo] =useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BASE_URL_BACKEND}/videos/userid/${user_id}`,{withCredentials: true});

                console.log(response.data)
                setData(response.data);
                setvideo(response.data.statusCode)
                console.log(response.data.statusCode)
            } catch (err) {
                setError(err.message);
            }
        };

        fetchData();
    }, [user_id]);


    // const [videoUrls, setVideoUrls] = useState([]); // Store extracted URLs

    // useEffect(() => {
    //     if (Array.isArray(video)) {
    //         const urls = video.map((element) => element.video_url); // Extract URLs
    //         setVideoUrls(urls); // Update state with URLs
    //     }
    // }, [video]); // Runs whenever `video` changes

    // useEffect(() => {
    //     console.log(videoUrls); // Check extracted URLs
    // }, [videoUrls]); // Log new URLs when updated
    if(error) return <p>{error}</p>

    return(
        <div className="pr-14 pt-20 flex justify-end w-full">
        <div className="w-3/4 pr-4 pt-6">
          <div className="grid grid-cols-3 gap-6">
            {video.length > 0 ? (
              video.map((element, index) => (
                <div key={index} className="bg-gray-800 p-4 rounded-lg shadow-md">
                  <img
                    onClick={() => handleClick(element)}
                    src={element.thumbnail_url}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-48 object-cover rounded-md cursor-pointer transition-transform duration-300 hover:scale-105"
                  />
                  <h3 className="text-lg font-medium mt-2 text-white">{element.title}</h3>
                </div>
              ))
            ) : (
              <p className="text-gray-400 col-span-3">No videos available</p>
            )}
          </div>
        </div>
      </div>
    )
}

export default ChannelVideos