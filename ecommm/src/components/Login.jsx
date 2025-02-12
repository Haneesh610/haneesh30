import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "../redux/selector";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../redux/action";
import { toast } from "react-toastify";
import "../styles/auth.css";

const Login = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const error = useSelector((state) => state.cart.error);
  const currentUser = useSelector(selectCurrentUser);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(credentials));
  };

  useEffect(() => {
    if (error) {
      toast.error("Invalid Credentials");
    }
    if (currentUser) {
      toast.success("Login successful!");
      navigate("/");
    }
  }, [error, currentUser, navigate]);

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={credentials.email}
          onChange={(e) =>
            setCredentials({ ...credentials, email: e.target.value })
          }
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={credentials.password}
          onChange={(e) =>
            setCredentials({ ...credentials, password: e.target.value })
          }
          required
        />
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </p>
    </div>
  );
};

export default Login;