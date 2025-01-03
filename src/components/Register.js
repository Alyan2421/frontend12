
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import background from '../assets/background.jpg'
import { TextField, Button, Typography, Box, Container,List,ListItem } from "@mui/material";
import axios from 'axios'
const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [passwordRules, setPasswordRules] = useState({
    length: false,
    number: false,
    specialChar: false,
    capitalLetter: false,
  });

  const navigate = useNavigate();
  const apiUrl = process.env.REACT_APP_API_URL;
  console.log('api url', apiUrl);
  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const response = await axios.post(`${apiUrl}/register`, { username, email, password });

      if (response.status === 201 && response.data.message) {
        setMessage(response.data.message);
        navigate("/login");
      } else {
        setMessage("Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Registration failed:", error);

      if (error.response && error.response.data && error.response.data.error) {
        setMessage(error.response.data.error);
      } else {
        setMessage("Registration failed. Please try again.");
      }
    }
  };

  // Password validation logic
  const validatePassword = (password) => {
    const lengthValid = password.length >= 8;
    const numberValid = /[0-9]/.test(password);
    const specialCharValid = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const capitalLetterValid = /[A-Z]/.test(password);

    setPasswordRules({
      length: lengthValid,
      number: numberValid,
      specialChar: specialCharValid,
      capitalLetter: capitalLetterValid,
    });

    return lengthValid && numberValid && specialCharValid && capitalLetterValid;
  };

  const handlePasswordChange = (e) => {
    const passwordValue = e.target.value;
    setPassword(passwordValue);

    if (passwordValue) {
      const isValid = validatePassword(passwordValue);
      setPasswordError(!isValid);
    }
  };

  const handleEmailChange = (e) => {
    const emailValue = e.target.value;
    setEmail(emailValue);
  };

  // Regex for email validation
  const isEmailValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);

  return (
    <Container
    maxWidth="xs"
    sx={{
     backgroundImage: `url(${background})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 4,
    }}
  >
    <Box
      component="form"
      onSubmit={handleRegister}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 4,
        background: "rgba(255, 255, 255, 0.1)", // Transparent background
        backdropFilter: "blur(8px)", // Glass effect
        webkitBackdropFilter: "blur(8px)", // Safari compatibility
        borderRadius: 3,
        boxShadow: "0 8px 20px rgba(0, 0, 0, 0.5)", // Strong shadow for depth
        width: "100%",
        maxWidth: 400,
        color: "#fff", // White text
      }}
    >
      <Typography
        variant="h4"
        sx={{
          marginBottom: 3,
          fontWeight: "bold",
          color: "white",
          textShadow: "0 1px 4px rgba(0, 0, 0, 0.7)", // Subtle text shadow
        }}
      >
        Create Account
      </Typography>
  
      {message && (
        <Typography
          sx={{
            marginBottom: 3,
            color: message.includes("failed") ? "red" : "green",
          }}
        >
          {message}
        </Typography>
      )}
  
      <TextField
        label="Username"
        variant="outlined"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
        fullWidth
        sx={{
          marginBottom: 3,
          backgroundColor: "rgba(255, 255, 255, 0.15)", // Transparent input fields
          borderRadius: 2,
          "& .MuiOutlinedInput-root": {
            color: "white", // White text inside input
            "& fieldset": {
              borderColor: "rgba(255, 255, 255, 0.2)", // Subtle border
            },
            "&:hover fieldset": {
              borderColor: "white", // Highlight on hover
            },
          },
        }}
      />
  
      <TextField
        label="Email"
        variant="outlined"
        value={email}
        onChange={handleEmailChange}
        required
        fullWidth
        error={!isEmailValid && email.length > 0}
        helperText={!isEmailValid && email.length > 0 ? "Invalid email address" : ""}
        sx={{
          marginBottom: 3,
          backgroundColor: "rgba(255, 255, 255, 0.15)",
          borderRadius: 2,
          "& .MuiOutlinedInput-root": {
            color: "white",
            "& fieldset": {
              borderColor: "rgba(255, 255, 255, 0.2)",
            },
            "&:hover fieldset": {
              borderColor: "white",
            },
          },
        }}
      />
  
      <TextField
        label="Password"
        type="password"
        variant="outlined"
        value={password}
        onChange={handlePasswordChange}
        required
        fullWidth
        error={passwordError}
        helperText={passwordError ? "Password does not meet criteria" : ""}
        sx={{
          marginBottom: 3,
          backgroundColor: "rgba(255, 255, 255, 0.15)",
          borderRadius: 2,
          "& .MuiOutlinedInput-root": {
            color: "white",
            "& fieldset": {
              borderColor: "rgba(255, 255, 255, 0.2)",
            },
            "&:hover fieldset": {
              borderColor: "white",
            },
          },
        }}
      />
  
      <List sx={{ width: "100%", marginBottom: 3, color: "#fff" }}>
        <Typography variant="body1" sx={{ marginBottom: 1 }}>
          Password must include:
        </Typography>
        {Object.entries(passwordRules).map(([rule, isValid]) => (
          <ListItem
            key={rule}
            sx={{
              color: isValid ? "green" : "red",
              fontWeight: "bold",
            }}
          >
            {rule === "length" && "At least 8 characters"}
            {rule === "number" && "At least one number"}
            {rule === "specialChar" && "At least one special character"}
            {rule === "capitalLetter" && "At least one capital letter"}
          </ListItem>
        ))}
      </List>
  
      <Button
        type="submit"
        variant="contained"
        fullWidth
        disabled={!isEmailValid || passwordError}
        sx={{
          padding: "12px",
          fontSize: "16px",
          fontWeight: "bold",
          backgroundColor: "rgba(255, 69, 58, 0.85)",
          color: "#fff",
          boxShadow: "0 4px 15px rgba(255, 69, 58, 0.4)",
          "&:hover": {
            backgroundColor: "rgba(255, 69, 58, 1)",
          },
        }}
      >
        Register
      </Button>
    </Box>
  </Container>
  
  );
};

export default Register;

