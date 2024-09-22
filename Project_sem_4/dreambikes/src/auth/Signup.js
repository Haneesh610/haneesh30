import React, { useContext, useState } from 'react';
import { AuthContext } from './Authcontext';
import { Link, useNavigate } from 'react-router-dom';
import "../styles/signup.css";

const Signup = () => {
  const { signup } = useContext(AuthContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  
  const navigate = useNavigate(); // Hook for navigation

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validate empty fields
    if (!name || !email || !phoneNumber || !password || !confirmPassword) {
      setError('All fields are required');
      return;
    }

    // Validate phone number length (assuming 10 digits)
    if (phoneNumber.length !== 10 || isNaN(phoneNumber)) {
      setError('Phone number must be 10 digits');
      return;
    }

    // Validate password confirmation
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      await signup(name, email, phoneNumber, password, confirmPassword);
      alert('Signup successful!');
      
      // Reset form fields
      setName('');
      setEmail('');
      setPhoneNumber('');
      setPassword('');
      setConfirmPassword('');

      // Redirect to login page
      navigate('/login');
    } catch (err) {
      setError(err.response ? err.response.data : 'Signup failed');
    }
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2>Create an Account</h2>

        <input 
          className="signup-input" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          placeholder="Name" 
          required 
        />
        <input 
          className="signup-input" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          placeholder="Email" 
          type="email" 
          required 
        />
        <input 
          className="signup-input" 
          value={phoneNumber} 
          onChange={(e) => setPhoneNumber(e.target.value)} 
          placeholder="Phone Number" 
          required 
        />
        <input 
          className="signup-input" 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          placeholder="Password" 
          required 
        />
        <input 
          className="signup-input" 
          type="password" 
          value={confirmPassword} 
          onChange={(e) => setConfirmPassword(e.target.value)} 
          placeholder="Confirm Password" 
          required 
        />
        <button className="signup-button" type="submit">Signup</button>

        {error && <p className="error">{error}</p>}
        
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
