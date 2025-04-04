import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { ThumbsUp, ThumbsDown } from "lucide-react";

const LikeDislike = ({ video_id }) => {
  const [reaction, setReaction] = useState(null);
  const [likeCount, setLikeCount] = useState(0);
  const [dislikeCount, setDislikeCount] = useState(0)
  const [errorMessage, setErrorMessage] = useState("");
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn || false); // Get user data from Redux

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BASE_URL_BACKEND}/reaction/get-reaction-status/${video_id}`, { withCredentials: true })
      .then((res) => {
        setReaction(res.data.statusCode.reaction_type);
      })
      .catch((err) => console.error("Error fetching reaction status", err));

    axios
    .get(`${import.meta.env.VITE_BASE_URL_BACKEND}/reaction/get-reaction-count/${video_id}`,{withCredentials :true})
    .then((res)=>{
        const arr = res.data.statusCode;
        if(arr[0].reaction_type=='like')
            {
                setLikeCount(arr[0].count)
            }else{
                setDislikeCount(arr[0].count)
            }
        if(arr[1]){
            setDislikeCount(arr[1].count)
        }
    })
    .catch((err)=> console.error("Error fetching reaction count", err))
  }, [video_id]);

  const handleReaction = async (type) => {
    if (!isLoggedIn) {
      setErrorMessage("Login first to react");
      setTimeout(()=>setErrorMessage(""), 2000)
      return;
    }
    setErrorMessage("");

    if(reaction == type){
        if(reaction=='like'){setLikeCount(likeCount-1)}
        else {setDislikeCount(dislikeCount-1)}
    }else{
        if(reaction==null && type=='like'){setLikeCount((prev)=>prev+1)}
        else if(reaction == null && type == 'dislike'){setDislikeCount((prev)=>prev+1)}
        else{
            if(type == 'dislike'){
                setDislikeCount((prev)=>prev+1)
                setLikeCount((prev)=>Math.max(0,prev-1))
            }
            else{
                setLikeCount((prev)=>prev+1)
                setDislikeCount((prev)=>Math.max(0,prev-1))
            }
        }
    }

    try {
      const newReaction = type;
      setReaction(newReaction === reaction ? null : type);
      await axios.post(
        `${import.meta.env.VITE_BASE_URL_BACKEND}/reaction/toggle-reaction?video_id=${video_id}&reaction_type=${newReaction}`,
        {},
        { withCredentials: true }
      );
      
      
      //setLikeCount(0);
      //setDislikeCount(0)
      //setLikeCount((prev) => (newReaction === "like" ? prev + 1 : prev - 1));
      //setLikeCount((prev) => (newReaction === "like" ? prev + 1 : prev - 1));
    } catch (error) {
      console.error("Error updating reaction", error);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-4 items-center">
        <button
          className={`p-[9px] rounded-md flex items-center gap-1 ${reaction === "like" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          onClick={() => handleReaction("like")}
        >
          <ThumbsUp className="w-5 h-5" />
          <span>{likeCount}</span>
        </button>
        <button
          className={`p-[9px] rounded-md flex items-center gap-1 ${reaction === "dislike" ? "bg-red-500 text-white" : "bg-gray-200"}`}
          onClick={() => handleReaction("dislike")}
        >
          <ThumbsDown className="w-5 h-5" />
          <span>{dislikeCount}</span>   
        </button>
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      </div>
    </div>

  );
};

export default LikeDislike;
