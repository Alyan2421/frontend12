
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Button, Box, IconButton } from "@mui/material";
import { AuthContext } from "../context/AuthContext";
import ticktok from '../assets/lasttiktok.jpg';

const NavbarVariant2 = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    localStorage.clear();
    navigate("/login");
  };

  return (
    <AppBar
      position="static"
      sx={{
        background: "linear-gradient(135deg, #ff7e5f, #feb47b, #f7b733)",

        color: "#fff",
        padding: "0 20px",
      }}
    >
      <Toolbar sx={{ justifyContent: "start", height: 70 }}>
        <IconButton edge="start" component={Link} to="/">
          <img src={ticktok} alt="TikTok" style={{ height: "100px" }} />
        </IconButton>
        <Box sx={{ position: "absolute", right: 20 }}>
          {user ? (
            <Button
              onClick={handleLogout}
              sx={{
                backgroundColor: "#ff7e5f", // Warm peachy-pink
                color: "#fff",
                '&:hover': { backgroundColor: "#feb47b" }, // Soft coral
              }}
            >
              Logout
            </Button>
          ) : (
            <>
              <Button
                component={Link}
                to="/login"
                sx={{
                  border: "1px solid #ff7e5f", // Matches the gradient color
                  color: "white",
                  '&:hover': { backgroundColor: "rgba(255, 126, 95, 0.2)" }, // Translucent peachy hover
                }}
              >
                Login
              </Button>
              <Button
                component={Link}
                to="/register"
                sx={{
                  backgroundColor: "#feb47b", // Soft coral
                  color: "#fff",
                  '&:hover': { backgroundColor: "#f7b733" }, // Vibrant golden-yellow
                  marginLeft: 1,
                }}
              >
                Register
              </Button>
            </>
          )}
        </Box>

      </Toolbar>
    </AppBar>
  );
};

export default NavbarVariant2;
