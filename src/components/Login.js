

// import React, { useState, useContext } from "react";
// import { AuthContext } from "../context/AuthContext";
// import { useNavigate } from "react-router-dom";
// import { TextField, Button, Typography, Box, Container } from "@mui/material";
// import axios from "axios";

// const LoginVariant2 = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const { login } = useContext(AuthContext);
//   const navigate = useNavigate();
//   const apiUrl = process.env.REACT_APP_API_URL;

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post(`${apiUrl}/login`, { email, password });
//       console.log("response from login", response.data.token);
//       localStorage.setItem("authToken", response.data.token);
//       alert(response.data.message);

//       login(response.data.token);
//       navigate("/upload", { state: { ...response.data } });
//     } catch (error) {
//       console.error("Login failed:", error);
//     }
//   };

//   const handleEmailChange = (e) => setEmail(e.target.value);
//   const isEmailValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);

//   return (
//     <Container
//       maxWidth="xs"
//       sx={{
//         minHeight: "100vh",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         background: "linear-gradient(135deg, #0f0c29, #302b63, #24243e)",
//         padding: 4,
//         mt:2
//       }}
//     >
//       <Box
//         component="form"
//         onSubmit={handleSubmit}
//         sx={{
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//           padding: 4,
//           background: "rgba(255, 255, 255, 0.15)",
//           borderRadius: 3,
//           boxShadow: "0 8px 32px rgba(0, 0, 0, 0.37)",
//           backdropFilter: "blur(8px)",
//           webkitBackdropFilter: "blur(8px)",
//           border: "1px solid rgba(255, 255, 255, 0.18)",
//           textAlign: "center",
//         }}
//       >
//         <Typography
//           variant="h3"
//           sx={{
//             marginBottom: 3,
//             color: "rgba(255, 255, 255, 0.9)",
//             fontWeight: 600,
//             textShadow: "0 1px 4px rgba(0, 0, 0, 0.5)",
//           }}
//         >
//           Welcome Back
//         </Typography>

//         <TextField
//           label="Email"
//           variant="outlined"
//           value={email}
//           onChange={handleEmailChange}
//           required
//           fullWidth
//           error={!isEmailValid && email.length > 0}
//           helperText={!isEmailValid && email.length > 0 ? "Invalid email address" : ""}
//           sx={{
//             marginBottom: 3,
//             backgroundColor: "rgba(255, 255, 255, 0.25)",
//             borderRadius: 2,
//             "& .MuiOutlinedInput-root": {
//               "& fieldset": {
//                 borderColor: "transparent",
//               },
//               "&:hover fieldset": {
//                 borderColor: "rgba(255, 255, 255, 0.5)",
//               },
//             },
//           }}
//         />

//         <TextField
//           label="Password"
//           type="password"
//           variant="outlined"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//           fullWidth
//           sx={{
//             marginBottom: 3,
//             backgroundColor: "rgba(255, 255, 255, 0.25)",
//             borderRadius: 2,
//             "& .MuiOutlinedInput-root": {
//               "& fieldset": {
//                 borderColor: "transparent",
//               },
//               "&:hover fieldset": {
//                 borderColor: "rgba(255, 255, 255, 0.5)",
//               },
//             },
//           }}
//         />

//         <Button
//           type="submit"
//           variant="contained"
//           fullWidth
//           sx={{
//             padding: "12px",
//             fontSize: "16px",
//             backgroundColor: "rgba(255, 69, 58, 0.85)",
//             color: "#fff",
//             fontWeight: 600,
//             boxShadow: "0 4px 15px rgba(255, 69, 58, 0.4)",
//             "&:hover": {
//               backgroundColor: "rgba(255, 69, 58, 1)",
//             },
//           }}
//         >
//           Sign In
//         </Button>
//       </Box>
//     </Container>
//   );
// };

// export default LoginVariant2;


import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Typography, Box, Container } from "@mui/material";
import axios from "axios";
import background from '../assets/background.jpg'
const LoginVariant2 = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const apiUrl = process.env.REACT_APP_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${apiUrl}/login`, { email, password });
      console.log("response from login", response.data.token);
      localStorage.setItem("authToken", response.data.token);
      alert(response.data.message);

      login(response.data.token);
      navigate("/upload", { state: { ...response.data } });
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleEmailChange = (e) => setEmail(e.target.value);
  const isEmailValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);

  return (
    <Container
      maxWidth="xs"
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: 4,
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: 4,
          borderRadius: 3,
          background: "rgba(255, 255, 255, 0.1)", // Transparent grayish background
          backdropFilter: "blur(8px)", // Glass effect
          webkitBackdropFilter: "blur(8px)", // Safari compatibility
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.5)", // Subtle shadow
          border: "1px solid rgba(255, 255, 255, 0.2)", // Subtle border
          textAlign: "center",
        }}
      >
        <Typography
          variant="h3"
          sx={{
            marginBottom: 3,
            color: "white", // White text color for visibility
            fontWeight: 600,
            textShadow: "0 1px 4px rgba(0, 0, 0, 0.5)", // Subtle shadow for text
          }}
        >
          Welcome Back
        </Typography>

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
            backgroundColor: "rgba(255, 255, 255, 0.15)", // Transparent input fields
            borderRadius: 2,
            "& .MuiOutlinedInput-root": {
              color: "white", // White text inside the fields
              "& fieldset": {
                borderColor: "rgba(255, 255, 255, 0.2)", // Subtle border
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
          onChange={(e) => setPassword(e.target.value)}
          required
          fullWidth
          sx={{
            marginBottom: 3,
            backgroundColor: "rgba(255, 255, 255, 0.15)", // Transparent input fields
            borderRadius: 2,
            "& .MuiOutlinedInput-root": {
              color: "white", // White text inside the fields
              "& fieldset": {
                borderColor: "rgba(255, 255, 255, 0.2)", // Subtle border
              },
              "&:hover fieldset": {
                borderColor: "white",
              },
            },
          }}
        />

        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{
            padding: "12px",
            fontSize: "16px",
            backgroundColor: "rgba(255, 69, 58, 0.85)",
            color: "#fff",
            fontWeight: 600,
            boxShadow: "0 4px 15px rgba(255, 69, 58, 0.4)",
            "&:hover": {
              backgroundColor: "rgba(255, 69, 58, 1)",
            },
          }}
        >
          Sign In
        </Button>
      </Box>
    </Container>
  );
};

export default LoginVariant2;
