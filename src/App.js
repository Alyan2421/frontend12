import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Register from "./components/Register";

import UploadPage from './components/videoUpload'
import FeedPage from './components/videoList'
const App = () => {
  return (
    <AuthProvider>
    
        <Router>
          <Navbar />
          <Routes>
            {/* <Route path="/" element={<HomePage />} /> */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/upload" element={<UploadPage/>} />
            <Route path="/" element={<FeedPage/>} />
          </Routes>
        </Router>
    
    </AuthProvider>
  );
};

export default App;