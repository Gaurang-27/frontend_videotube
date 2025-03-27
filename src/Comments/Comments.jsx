import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

const VideoComments = ({ videoId }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newComment, setNewComment] = useState("");
  const userId = useSelector((state) => state.user?.user?.user_id) || null;
  const [loginMessage, setLoginMessage] = useState("");

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL_BACKEND}/comment/get-comments/${videoId}`,
          { withCredentials: true }
        );
        setComments(response.data.statusCode);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [videoId]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!userId) {
        setLoginMessage("Please login to comment.");
        return;
      }
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL_BACKEND}/comment/add-comment/${videoId}`,
        { video_id: videoId, user_id : userId, comment_text: newComment },
        { withCredentials: true }
      );
      setComments([...comments, response.data.statusCode]);
      setNewComment("");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_BASE_URL_BACKEND}/comment/delete-comment/${commentId}`,
        { withCredentials: true }
      );
      setComments(comments.filter((comment) => comment.comment_id !== commentId));
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <p>Loading comments...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="p-4 bg-gray-700 rounded-lg">
      <h2 className="text-lg font-semibold mb-3 text-white">Comments</h2>
      {loginMessage && <p className="text-red-500 mb-2">{loginMessage}</p>}
      <form onSubmit={handleCommentSubmit} className="mb-4 text-white">
        <input
          type="text"
          className="p-2 w-full rounded border border-gray-300"
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          required
        />
        <button type="submit" className="mt-2 p-2 bg-blue-500 text-white rounded">
          Publish Comment
        </button>
      </form>
      {comments.length === 0 ? (
        <p>No comments yet.</p>
      ) : (
        <ul>
          {comments.map((comment) => (
            <li key={comment.comment_id} className="mb-2 p-2 border-b border-gray-300">
              <p className="font-semibold text-white">{comment.fullName}</p>
              <p className="text-white">{comment.comment_text }</p>
              {userId === comment.user_id && (
                <button
                  className="mt-1 p-1 bg-red-500 text-white rounded"
                  onClick={() => handleDeleteComment(comment.comment_id)}
                >
                  Delete
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default VideoComments;
