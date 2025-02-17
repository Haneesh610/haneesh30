import React, { useState } from "react";
import { useDispatch,useSelector} from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../redux/action";
import { selectUsers } from "../redux/selector";
import { toast } from "react-toastify";

import "../styles/auth.css"

const Signup = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: ""
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const users = useSelector(selectUsers);

  const handleSubmit = (e) => {
    e.preventDefault();
    const existingUSer = users.find((user)=> user.email===userData.email);
    if(existingUSer){
      toast.error("User already exists!");
      return;
      }
    else{
      toast.success("User registered successfully!");
      dispatch(registerUser({...userData,cart:[]}));
      console.log("User:",userData)
      navigate("/login");
    }
  };

  return (
    <div className="auth-container">
      <h2>Sign Up
        <img src="./add-user.png" alt="" />
      </h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={userData.name}
          onChange={(e) => setUserData({...userData, name: e.target.value})}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={userData.email}
          onChange={(e) => setUserData({...userData, email: e.target.value})}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={userData.password}
          onChange={(e) => setUserData({...userData, password: e.target.value})}
          required
        />
        <button type="submit">Sign Up</button>
      </form>
      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default Signup;