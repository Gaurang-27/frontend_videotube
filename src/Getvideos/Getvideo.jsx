import axios from "axios";
import { useState, useEffect } from "react";
import { NavLink} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Logout from "../Usercontrols/Logout";

function Getvideo(){
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [video, setvideo] =useState({});
    const navigate = useNavigate()

    useEffect(() => {
        console.log(import.meta.env.VITE_BASE_URL_BACKEND)
        const fetchData = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BASE_URL_BACKEND}/videos`);
                //console.log(response.data)
                setData(response.data);
                setvideo(response.data.statusCode)
                //console.log(response.data.statusCode)
            } catch (err) {
                setError(err.message);
            }
        };

        fetchData();
    }, []);

    const handleClick = function(element){
        navigate(`/${element.video_id}`, {state : element})
    }

    if(error) return <p>{error}</p>

    return(
<div className="px-3 flex justify-center w-full">
  <div className="w-full pr-4 pt-6">
    <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
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
</div>



    )
}

export default Getvideo