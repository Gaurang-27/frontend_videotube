import { useState } from "react";
import axios from "axios";

function UploadVideo() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [videoFile, setVideoFile] = useState(null);
    const [thumbnailFile, setThumbnailFile] = useState(null);
    const [videoPreview, setVideoPreview] = useState(null);
    const [thumbnailPreview, setThumbnailPreview] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState("");

    // Handle video selection
    const handleVideoChange = (event) => {
        const file = event.target.files[0];

        if (file) {
            if (file.size > 100 * 1024 * 1024) { // 100MB limit
                setError("Video file size cannot exceed 100MB.");
                return;
            }
            setError(null);
            setVideoFile(file);
            setVideoPreview(URL.createObjectURL(file)); // Video preview
        }
    };

    // Handle thumbnail selection
    const handleThumbnailChange = (event) => {
        const file = event.target.files[0];

        if (file) {
            if (file.size > 10 * 1024 * 1024) { // 10MB limit
                setError("Thumbnail file size cannot exceed 10MB.");
                return;
            }
            setError(null);
            setThumbnailFile(file);
            setThumbnailPreview(URL.createObjectURL(file)); // Thumbnail preview
        }
    };

    // Handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!title || !description || !videoFile || !thumbnailFile) {
            setError("Please fill in all fields and select a video and thumbnail.");
            return;
        }

        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("videoFile", videoFile);
        formData.append("thumbnail", thumbnailFile);

        try {
            setUploading(true);
            setError(null);
            setSuccessMessage("");

            const response = await axios.post(`${import.meta.env.VITE_BASE_URL_BACKEND}/videos/publish-video`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
                withCredentials : true
            });
            

            setSuccessMessage("Video uploaded successfully!");
            setTitle("");
            setDescription("");
            setVideoFile(null);
            setThumbnailFile(null);
            setVideoPreview(null);
            setThumbnailPreview(null);
        } catch (error) {
            setError("Error uploading video. Please try again.");
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="flex items-center bottom-0 left-0 w-full min-h-screen bg-slate-900 text-white p-8 shadow-2xl backdrop-blur-lg">
    <div className="max-w-xl mx-auto bg-slate-800/60 p-6 rounded-xl shadow-lg border border-gray-700">
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-400">Upload a Video</h2>

        {error && <p className="text-red-400 text-center bg-red-900 p-2 rounded-lg">{error}</p>}
        {successMessage && <p className="text-green-400 text-center bg-green-900 p-2 rounded-lg">{successMessage}</p>}

        <form onSubmit={handleSubmit} className="space-y-5">
            {/* Video Title */}
            <input 
                type="text"
                placeholder="Video Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-3 bg-slate-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                required
            />

            {/* Video Description */}
            <textarea 
                placeholder="Video Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-3 bg-slate-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                required
            />

            {/* Video Upload */}
            <div className="space-y-2">
                <label className="text-gray-300 text-sm">Upload Video</label>
                <input 
                    type="file"
                    accept="video/*"
                    onChange={handleVideoChange}
                    className="w-full p-2 border border-gray-600 bg-slate-700 text-white rounded-lg cursor-pointer focus:ring-2 focus:ring-blue-500 transition-all"
                    required
                />
            </div>

            {/* Video Preview */}
            {videoPreview && (
    <div className="w-full mt-2 relative rounded-lg overflow-hidden shadow-md border border-gray-600" style={{ aspectRatio: "16 / 9" }}>
        <video controls src={videoPreview} className="absolute w-full h-full object-contain"></video>
    </div>
)}

            {/* Thumbnail Upload */}
            <div className="space-y-2">
                <label className="text-gray-300 text-sm">Upload Thumbnail</label>
                <input 
                    type="file"
                    accept="image/*"
                    onChange={handleThumbnailChange}
                    className="w-full p-2 border border-gray-600 bg-slate-700 text-white rounded-lg cursor-pointer focus:ring-2 focus:ring-blue-500 transition-all"
                    required
                />
            </div>

            {/* Thumbnail Preview */}
            {thumbnailPreview && (
    <div className="w-full mt-2 relative rounded-lg overflow-hidden shadow-md border border-gray-600" style={{ aspectRatio: "16 / 9" }}>
        <img src={thumbnailPreview} alt="Thumbnail Preview" className="absolute w-full h-full object-contain" />
    </div>
)}

            {/* Upload Button */}
            <button 
                type="submit" 
                className="bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 text-white px-6 py-3 rounded-lg w-full font-bold transition-all duration-300"
                disabled={uploading}
            >
                {uploading ? "Uploading..." : "Upload Video"}
            </button>
        </form>
    </div>
</div>


    );
}

export default UploadVideo;
