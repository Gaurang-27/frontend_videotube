import { useState, useEffect } from "react";
import { NavLink, useLocation, useParams } from "react-router-dom";
import axios from "axios";
import SubscribeButton from "../Usercontrols/SubscribeButton";
import Comments from "../Comments/Comments";
import Header from "../Homepage/Header";
import ReactionButton from "../Reactions/ReactionButton";
import PlaylistButton from "../Playlist/PlaylistButton";
import { Outlet } from "react-router-dom";



const GetvideobyId = function ({ title, description, video_url }) {
  const location = useLocation();
  const [video, setvideo] = useState(location.state || null);
  //console.log("video is" ,video)
  const [error, setError] = useState(null);
  const { video_id } = useParams();
  const [channel, setChannel] = useState(null)



  useEffect(() => {
    if (video == null) {
      const fetchData = async () => {
        try {
          console.log(video_id);
          const response = await axios.get(`${import.meta.env.VITE_BASE_URL_BACKEND}/videos/videoid/${video_id}`);

          //console.log(response.data.statusCode)
          setvideo(response.data.statusCode)
        } catch (err) {
          console.log(err)
          setError(err.message);
        }
      };

      fetchData();
    }
    const getUserData = async function () {
      try {
        const result = await axios.get(`${import.meta.env.VITE_BASE_URL_BACKEND}/subs/subscriber-list/${video.user_id}`)
        console.log(result.data.statusCode);
        setChannel(result.data.statusCode)
      } catch (err) {
        console.log(err)
      }
    }
    getUserData();
  }, [video]);



  if (error) return <p>{error}</p>
  if (!video || !channel) return <p>loading...</p>

  return (
    <>
      <Header className={""} />
      <div className="pt-5 pb-2">
        <div className="w-[90%] lg:w-[85%] xl:w-[80%] mx-auto bg-gray-800 shadow-lg rounded-lg p-6">
          <div className="w-full aspect-[16/9] bg-black overflow-hidden rounded-lg">
            <video
              src={video.video_url}
              controls
              autoPlay
              className="w-full h-full object-contain"
              type="video/mp4"
            ></video>
          </div>
          <h2 className="text-2xl font-semibold mt-4 text-white">{video.title}</h2>
          <p className="text-white text-lg">{video.description}</p>
          <p className="text-gray-300 font-medium text-lg">
            Channel Name: <span className="font-semibold">{channel.user_fullName}</span>
          </p>
          <p className="text-gray-300 font-medium text-lg">
            Subscribers: <span className="font-semibold">{channel.subscribers.length}</span>
          </p>
          <div className="flex gap-6 mt-4 items-center">
            <SubscribeButton channel_id={channel.user_id} />
            <ReactionButton video_id={video.video_id} />
            <Outlet context={video.video_id}/>
          </div>
          <div className="mt-6">
            <Comments videoId={video.video_id} />
          </div>

        </div>
      </div>
    </>



  )
}


export default GetvideobyId;