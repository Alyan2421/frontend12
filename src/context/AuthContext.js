import React, { createContext, useState, useEffect } from "react";
import {jwtDecode} from "jwt-decode";
import Cookies from "js-cookie";

// Create context
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = Cookies.get("jwtToken");
    if (token) {
      const decoded = jwtDecode(token);
      setUser(decoded);
    }
  }, []);

  const login = (token) => {
    Cookies.set("jwtToken", token, { expires: 7 }); // Store token in cookies
    const decoded = jwtDecode(token);
    setUser(decoded);
  };

  const logout = () => {
    Cookies.remove("jwtToken");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
