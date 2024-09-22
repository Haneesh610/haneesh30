import React, { createContext, useState } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Signup function
  const signup = async (name, email, phoneNumber, password, confirmPassword) => {
    try {
      const response = await axios.post(
        'http://localhost:5000/signup',
        { name, email, phoneNumber, password, confirmPassword },
        { withCredentials: true }
      );
      setUser(response.data.user); // Save user data after signup
      return response.data;
    } catch (error) {
      console.error("Signup error:", error);
      throw error; // Optionally rethrow the error
    }
  };

  // Login function
  const login = async (email, password) => {
    try {
      const response = await axios.post(
        'http://localhost:5000/login',
        { email, password },
        { withCredentials: true }
      );
      setUser(response.data.user); // Save user data after login
      return response.data;
    } catch (error) {
      console.error("Login error:", error);
      throw error; // Optionally rethrow the error
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn: !!user, signup, login }}>
      {children}
    </AuthContext.Provider>
  );
};
