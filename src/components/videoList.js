
import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Box,
  Typography,
  IconButton,
  Button,
  CardMedia,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";
import DownloadIcon from "@mui/icons-material/Download";
import AddIcon from "@mui/icons-material/Add";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import BWRoundedIcon from "@mui/icons-material/FilterNoneRounded";
import BlurIcon from "@mui/icons-material/BlurCircular";
import FilterNoneIcon from "@mui/icons-material/FilterNone";

const apiUrl = process.env.REACT_APP_API_URL;

const FeedPage = () => {
  const [videos, setVideos] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isCommentDialogOpen, setIsCommentDialogOpen] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([]);
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const videoRefs = useRef([]);
  const [likes, setLikes] = useState([]); // To store like status for each video
  const [filter, setFilter] = useState("");
  const [isListening, setIsListening] = useState(false);
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = useRef(
    SpeechRecognition ? new SpeechRecognition() : null
  );
  
  const handleVoiceCommand = useCallback((command) => {
    const video = videoRefs.current[currentIndex];
    if (video) {
        if (command.includes("play")) {
            video.play();
        } else if (command.includes("stop") || command.includes("pause")) {
            video.pause();
        }
    }
}, [currentIndex]);
  useEffect(() => {
    if (recognition.current) {
        recognition.current.continuous = true;
        recognition.current.interimResults = false;

        recognition.current.onresult = (event) => {
            const transcript = event.results[event.results.length - 1][0].transcript
                .trim()
                .toLowerCase();
            handleVoiceCommand(transcript);
        };

        recognition.current.onerror = (event) => {
            console.error("Speech recognition error:", event.error);
        };
    }
}, [handleVoiceCommand]);




  const toggleListening = () => {
    if (!recognition.current) {
      alert("Speech Recognition API is not supported in your browser.");
      return;
    }
    if (isListening) {
      recognition.current.stop();
    } else {
      recognition.current.start();
    }
    setIsListening((prev) => !prev);
  };
  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const { data } = await axios.get(`${apiUrl}/videos/videos`);
      const updatedVideos = data.map(video => ({
        ...video,
        videoUrl: video.videoUrl.replace(/^http:/, 'https:') // Replace http with https
      }));
      setVideos(updatedVideos);
      setComments(updatedVideos.map(() => []));
      setLikes(updatedVideos.map(() => 0)); // Initially setting all likes to 0
    } catch (err) {
      console.error(err);
    }
  };

  const handleLike = (index) => {
    const token = localStorage.getItem("authToken"); // Ensure the user is authenticated
    if (!token) {
      alert("You must be logged in to like.");
      return;
    }
    setLikes((prevLikes) => {
      const newLikes = [...prevLikes];
      newLikes[index] = newLikes[index] === 1 ? 0 : 1; // Toggle between 0 and 1
      return newLikes;
    });
  };

  const handleCommentClick = () => setIsCommentDialogOpen(true);

  const handleCommentSubmit = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      alert("You must be logged in to submit a comment.");
      return;
    }

    try {
      const videoId = videos[currentIndex]?._id;
      await axios.post(
        `${apiUrl}/videos/comment/${videoId}`,
        { text: commentText },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const newComment = { text: commentText };
      setComments((prevComments) => {
        const updatedComments = [...prevComments];
        updatedComments[currentIndex].push(newComment);
        return updatedComments;
      });
      setCommentText("");
      setIsCommentDialogOpen(false);
    } catch (err) {
      console.error("Failed to submit comment:", err);
    }
  };

  const handleDownload = async () => {
    const videoUrl = videos[currentIndex]?.videoUrl;
    if (videoUrl) {
      try {
        const response = await fetch(videoUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const blob = await response.blob();
        const blobUrl = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = blobUrl;
        link.download = `video-${currentIndex + 1}.mp4`;
        link.click();
        URL.revokeObjectURL(blobUrl);
      } catch (error) {
        console.error("Error downloading the video:", error);
      }
    }
  };

  const handleAudioDownload = async () => {
    const videoUrl = videos[currentIndex]?.videoUrl;
    if (videoUrl) {
      try {
        const audioExists = await hasAudio(videoUrl);
        if (audioExists) {
          const response = await fetch(videoUrl);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const blob = await response.blob();
          const blobUrl = URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = blobUrl;
          link.download = `audio-${currentIndex + 1}.mp3`;
          link.click();
          URL.revokeObjectURL(blobUrl);
        } else {
          alert('No audio present in the video.');
        }
      } catch (error) {
        console.error("Error downloading the audio:", error);
      }
    }
  };

  const hasAudio = async (videoUrl) => {
    try {
      const response = await fetch(videoUrl, { method: 'HEAD' });
      const contentType = response.headers.get('Content-Type');
      return contentType.includes('audio/') || contentType.includes('video/');
    } catch (error) {
      console.error('Error checking audio:', error);
      return false;
    }
  };



  const applyFilter = useCallback((index) => {
    const video = videoRefs.current[index];
    switch (filter) {
      case "B&W":
        video.style.filter = "grayscale(100%)";
        break;
      case "Blur":
        video.style.filter = "blur(5px)";
        break;
      case "Sharp":
        video.style.filter = "none"; // Reset to default
        break;
      default:
        video.style.filter = "none";
    }
  }, [filter]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = videoRefs.current.indexOf(entry.target);
            if (index !== -1) {
              setCurrentIndex(index);
              videoRefs.current[index].playbackRate = 1;
              videoRefs.current[index].setAttribute("playsinline", "true");
              videoRefs.current[index].setAttribute("muted", "muted");
              videoRefs.current[index].setAttribute("poster", "");
              applyFilter(index);
              console.log("Video at index", index, "set to 360p");
            }
          }
        });
      },
      { threshold: 0.5 }
    );

    videoRefs.current.forEach((video) => {
      observer.observe(video);
    });

    return () => {
      observer.disconnect();
    };
  }, [filter, applyFilter]);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "90vh",
        mt: 4,
        position: "relative",
        background: "#f5f5f5"
      }}
    >
      <Box
        ref={containerRef}
        sx={{
          width: 950,
          height: 550,
          backgroundColor: "#232323",
          borderRadius: 20,
          boxShadow: "0 0 20px rgba(100, 100, 255, 0.8)",
          overflow: "hidden",
          position: "relative",
        }}
      >
        {videos.map((video, index) => (
          <CardMedia
            key={video._id}
            component="video"
            src={video.videoUrl}
            controls
            ref={(el) => (videoRefs.current[index] = el)}
            autoPlay={index === currentIndex}
            loop
            muted
            controlsList="nodownload noplaybackrate"
            sx={{ width: "100%", height: "100%", objectFit: "contain" }}
          />
        ))}
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', position: "absolute", top: 100, left: 25 }}>
        {/* Filter Icons */}
        <IconButton
          onClick={() => setFilter("B&W")}
          sx={{ color: filter === "B&W" ? "primary.main" : "inherit" }}
        >
          <BWRoundedIcon />
        </IconButton>
        <IconButton
          onClick={() => setFilter("Blur")}
          sx={{ color: filter === "Blur" ? "primary.main" : "inherit" }}
        >
          <BlurIcon />
        </IconButton>
        <IconButton
          onClick={() => setFilter("Sharp")}
          sx={{ color: filter === "Sharp" ? "primary.main" : "inherit" }}
        >
          <FilterNoneIcon />
        </IconButton>
      </Box>

      <Button
        variant="contained"
        onClick={toggleListening}
        sx={{
          position: "absolute",
          bottom: 80,
          left: 20,
          backgroundColor: isListening ? "red" : "green",
          color: "white",
        }}
      >
        {isListening ? "Stop Listening" : "Start Voice Command"}
      </Button>


      {/* Icons placed outside the video card */}
      <IconButton
        sx={{
          position: "absolute",
          top: 20,
          left: 20,
          color: "black",
          fontSize: "2rem",
        }}
        onClick={() => handleLike(currentIndex)}
      >
        <FavoriteIcon fontSize="large" />
        <Typography sx={{ color: "black", fontSize: "0.8rem", textAlign: "center" }}>
          {likes[currentIndex] || 0} {/* Display the like count (0 or 1) */}
        </Typography>
      </IconButton>


      <IconButton
        sx={{
          position: "absolute",
          top: 20,
          right: 20,
          color: "black",
          fontSize: "2rem",
        }}
        onClick={handleDownload}
      >
        <DownloadIcon fontSize="large" />
      </IconButton>

      <IconButton
        sx={{
          position: "absolute",
          bottom: 20,
          left: 20,
          color: "black",
          fontSize: "2rem",
        }}
        onClick={handleCommentClick}
      >
        <CommentIcon fontSize="large" />
      </IconButton>

      <IconButton
        sx={{
          position: "absolute",
          bottom: 20,
          right: 20,
          color: "black",
          fontSize: "2rem",
        }}
        onClick={handleAudioDownload}
      >
        <MusicNoteIcon fontSize="large" />
      </IconButton>
      <Button
        variant="contained"
        sx={{
          position: "absolute",
          bottom: 80,
          right: 30,
          backgroundColor: "#64b5f6",
          color: "#fff",
          width: 60,
          height: 60,
          borderRadius: "50%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          "&:hover": { backgroundColor: "#42a5f5" },
        }}
        onClick={() => navigate("/upload")}
      >
        <AddIcon />
      </Button>

      {/* Comment Dialog */}
      <Dialog
        open={isCommentDialogOpen}
        onClose={() => setIsCommentDialogOpen(false)}
      >
        <DialogTitle>Add a Comment</DialogTitle>
        <DialogContent>
          <TextField
            label="Comment"
            variant="outlined"
            fullWidth
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsCommentDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleCommentSubmit} color="primary">
            Post
          </Button>
        </DialogActions>
      </Dialog>
      <Box sx={{ padding: "10px", color: "#fff", maxHeight: "200px", overflowY: "auto" }}>
        {comments[currentIndex]?.map((comment, index) => (
          <Typography key={index} sx={{ color: 'black', marginBottom: "8px" }}>
            {comment.text}
          </Typography>
        ))}
      </Box>
    </Box>
  );
};

export default FeedPage;






