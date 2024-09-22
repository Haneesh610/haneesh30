import React, { useContext, useState } from 'react';
import { AuthContext } from './Authcontext';
import { Link, useNavigate } from 'react-router-dom';
import "../styles/login.css";

const Login = () => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate(); // Hook for navigation

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    console.log("Logging in with:", email, password); // Log email and password
    try {
      await login(email, password);
      alert("Login successful!"); // Log successful login
  
      // Reset form fields
      setEmail('');
      setPassword('');
  
      // Redirect to home page
      navigate('/'); // Ensure this route exists
    } catch (err) {
      console.error("Login error:", err); // Log the error
      setError(err.response ? err.response.data : 'Login failed');
    }
  };
  
  return (
    <div>
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Welcome back !!</h2>
        <input 
          className="login-input" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          placeholder="Email" 
          required 
        />
        <input 
          className="login-input" 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          placeholder="Password" 
          required 
        />
        <button className="login-button" type="submit">Login</button>
        {error && <p className="error">{error}</p>}
        <p>
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
