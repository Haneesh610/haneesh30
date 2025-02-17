import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { adminLogin } from "../redux/action";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "../styles/auth.css";

const AdminLogin = () => {
  const [credentials, setCredentials] = useState({ id: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const error = useSelector((state) => state.cart.error);
  const currentUser = useSelector((state) => state.cart.currentUser);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (credentials.id === "q1w2e3" && credentials.password === "6969") {
      dispatch(adminLogin(credentials));
    } else {
      toast.error("Invalid admin credentials");
    }
  };

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("currentUser"));
    if (storedUser && storedUser.role === "admin") {
      navigate("/admin");
    }
  }, [navigate]);
  
  useEffect(() => {
    if (error) {
      toast.error("Invalid Credentials");
    }
    if (currentUser && currentUser.role === "admin") {
      toast.success("Login successful!");
      navigate("/admin");
    }
  }, [error, currentUser, navigate]);

  return (
    <div className="auth-container">
      <h2>Admin Login
        <img src="./user-gear.png" alt="" />
      </h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Admin ID"
          value={credentials.id}
          onChange={(e) => setCredentials({ ...credentials, id: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={credentials.password}
          onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default AdminLogin;