

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, TextField, Typography, Card, CardContent, CircularProgress } from '@mui/material';

import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import axios from 'axios'
const UploadPage = () => {
  const navigate = useNavigate();
  const [video, setVideo] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const userId = localStorage.getItem("authToken");
  console.log('upload userid', userId);
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
      background: 'linear-gradient(to bottom right, #f8b195, #f67280, #c06c84)', // New gradient background
    }}
  >
    <Card
      sx={{
        maxWidth: 500,
        width: '100%',
        background: 'rgba(255, 255, 255, 0.2)', // Lighter frosted glass effect
        backdropFilter: 'blur(12px)', // Enhanced blur for frosted effect
        color: '#fff',
        borderRadius: '20px', // Softer rounded corners
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)', // Deeper shadow for modern look
        overflow: 'hidden',
        padding: 4,
        border: '1px solid rgba(255, 255, 255, 0.3)', // Slightly more prominent border
      }}
    >
      <CardContent>
        <Typography
          variant="h4"
          sx={{
            color: 'white', // Accent color from gradient
            textAlign: 'center',
            marginBottom: '25px',
            fontFamily: 'Poppins, sans-serif', // Modern font
            fontWeight: '700',
          }}
        >
          Upload Your Video
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              marginBottom: '25px',
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
                borderRadius: '12px',
                border: '2px solid #f67280',
                cursor: 'pointer',
                width: '100%',
                boxShadow: '0 10px 20px rgba(0, 0, 0, 0.3)',
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
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              borderRadius: '12px',
              '& label': { color: '#f67280' },
              '& input': { color: '#fff' },
              '&:hover label': { color: '#c06c84' },
              '&:focus-within label': { color: '#c06c84' },
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
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              borderRadius: '12px',
              '& label': { color: '#f67280' },
              '& input': { color: '#fff' },
              '&:hover label': { color: '#c06c84' },
              '&:focus-within label': { color: '#c06c84' },
            }}
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={loading}
            sx={{
              backgroundColor: loading ? '#888' : '#f67280',
              color: '#fff',
              borderRadius: '12px',
              padding: '14px',
              boxShadow: '0 10px 20px rgba(0, 0, 0, 0.3)',
              '&:hover': {
                backgroundColor: loading ? '#888' : '#c06c84',
                boxShadow: '0 15px 30px rgba(0, 0, 0, 0.4)',
                transform: 'scale(1.05)',
              },
              transition: 'all 0.3s ease-in-out',
            }}
            startIcon={
              loading ? <CircularProgress size={24} sx={{ color: '#fff' }} /> : <CloudUploadIcon />
            }
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
              backgroundColor: '#c06c84',
              color: '#fff',
              borderRadius: '12px',
              padding: '14px',
              boxShadow: '0 10px 20px rgba(0, 0, 0, 0.3)',
              '&:hover': {
                backgroundColor: '#a05262',
                boxShadow: '0 15px 30px rgba(0, 0, 0, 0.4)',
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
