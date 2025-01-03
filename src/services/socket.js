import { io } from "socket.io-client";

// Connect to the Socket.io server
const socket = io("http://localhost:5000");  // Replace with your server URL

export default socket;
