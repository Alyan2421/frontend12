

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, TextField, Typography, Card, CardContent, CircularProgress} from '@mui/material';

import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import axios from 'axios'
const UploadPage = () => {
  const navigate = useNavigate();
  const [video, setVideo] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const userId = localStorage.getItem("authToken");
  console.log('upload userid',userId);
  const apiUrl = process.env.REACT_APP_API_URL;
  const handleFileChange = (e) => {
    setVideo(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!video) {
      alert('Please select a video file.');
      return;
    }

    const formData = new FormData();
    formData.append('video', video);
    formData.append('title', title);
    formData.append('description', description);
    formData.append('userId', userId);

    setLoading(true);

    try {
    
       await axios.post(`${apiUrl}/videos/upload`, formData, {
        headers: {
          Authorization: `Bearer ${userId}`,
          "Content-Type": "multipart/form-data",
        },
      });
      alert('Video uploaded successfully!');
      setTitle('');
      setDescription('');
      setVideo(null);
      navigate('/');
    } catch (err) {
      const errorMessage = err.response?.data?.error || 'Create Account to upload, like, and comment on the Video';
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleNavigation = () => {
    navigate('/');
  };

  return (
<Box
  sx={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    background: 'linear-gradient(to bottom, #1a1a1a, #333)', // Gradient background
  }}
>
  <Card
    sx={{
      maxWidth: 500,
      width: '100%',
      background: 'rgba(255, 255, 255, 0.1)', // Semi-transparent background
      backdropFilter: 'blur(10px)', // Frosted glass effect
      color: '#fff',
      borderRadius: '15px',
      boxShadow: '0 15px 30px rgba(0, 0, 0, 0.3)',
      overflow: 'hidden',
      padding: 3,
      border: '1px solid rgba(255, 255, 255, 0.2)', // Subtle border
    }}
  >
    <CardContent>
      <Typography
        variant="h5"
        sx={{
          color: '#00bcd4',
          textAlign: 'center',
          marginBottom: '20px',
          fontFamily: 'Roboto, sans-serif',
          fontWeight: 'bold',
        }}
      >
        Upload Your Video
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '20px',
          }}
        >
          <input
            type="file"
            accept="video/*"
            onChange={handleFileChange}
            required
            style={{
              margin: '10px 0',
              backgroundColor: 'transparent',
              color: '#fff',
              padding: '12px',
              borderRadius: '10px',
              border: '2px solid #00bcd4',
              cursor: 'pointer',
              width: '100%',
              boxShadow: '0 5px 15px rgba(0, 0, 0, 0.3)',
              transition: 'all 0.3s ease-in-out',
            }}
          />
        </Box>
        <TextField
          label="Title"
          variant="outlined"
          fullWidth
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          sx={{
            marginBottom: '15px',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '10px',
            '& label': { color: '#00bcd4' },
            '& input': { color: '#fff' },
            '&:hover label': { color: '#0097a7' },
            '&:focus-within label': { color: '#0097a7' },
          }}
        />
        <TextField
          label="Description"
          variant="outlined"
          multiline
          rows={3}
          fullWidth
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          sx={{
            marginBottom: '20px',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '10px',
            '& label': { color: '#00bcd4' },
            '& input': { color: '#fff' },
            '&:hover label': { color: '#0097a7' },
            '&:focus-within label': { color: '#0097a7' },
          }}
        />
        <Button
          type="submit"
          variant="contained"
          fullWidth
          disabled={loading}
          sx={{
            backgroundColor: loading ? '#444' : '#00bcd4',
            color: '#fff',
            borderRadius: '10px',
            padding: '12px',
            boxShadow: '0 5px 15px rgba(0, 0, 0, 0.3)',
            '&:hover': {
              backgroundColor: loading ? '#444' : '#0097a7',
              boxShadow: '0 10px 25px rgba(0, 0, 0, 0.4)',
              transform: 'scale(1.05)',
            },
            transition: 'all 0.3s ease-in-out',
          }}
          startIcon={loading ? <CircularProgress size={24} sx={{ color: '#fff' }} /> : <CloudUploadIcon />}
        >
          {loading ? 'Uploading...' : 'Upload Video'}
        </Button>
        <Button
          variant="contained"
          fullWidth
          disabled={loading}
          onClick={handleNavigation}
          sx={{
            mt: 2,
            backgroundColor: '#0097a7',
            color: '#fff',
            borderRadius: '10px',
            padding: '12px',
            boxShadow: '0 5px 15px rgba(0, 0, 0, 0.3)',
            '&:hover': {
              backgroundColor: '#007f8a',
              boxShadow: '0 10px 25px rgba(0, 0, 0, 0.4)',
              transform: 'scale(1.05)',
            },
            transition: 'all 0.3s ease-in-out',
          }}
        >
          Watch Reels
        </Button>
      </form>
    </CardContent>
  </Card>
</Box>




  );
};

export default UploadPage;
