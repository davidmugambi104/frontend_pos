import React, { useState } from 'react';
import validator from 'validator';
import './signup.css'; // Import the CSS file

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('user');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    const signupData = { username, password, role, email };  // Include email

    // Client-side validation
    if (!validator.isEmail(email)) {
      setErrorMessage('Please enter a valid email.');
      return;
    }

    if (!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/.test(password)) {
      setErrorMessage('Password must be at least 8 characters long, include a number, and a special character.');
      return;
    }

    setIsLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const API_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:5000/';
      const response = await fetch(`${API_URL}signup`, {  // Correct endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(signupData),
      });

      setIsLoading(false);

      if (!response.ok) {
        const error = await response.json();
        setErrorMessage(error.message || 'Something went wrong.');
        setSuccessMessage('');
      } else {
        const data = await response.json();
        setSuccessMessage(data.message || 'Account successfully created!');
        setErrorMessage('');
        setUsername('');
        setPassword('');
        setEmail('');
      }
    } catch (error) {
      setIsLoading(false);
      console.error('Error:', error);
      setErrorMessage('Error connecting to the server.');
      setSuccessMessage('');
    }
  };

  return (
    <div className="signup-container">
      <h2>Signup</h2>
      <form onSubmit={handleSignup}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Signing Up...' : 'Sign Up'}
        </button>
      </form>

      {errorMessage && <p className="error">{errorMessage}</p>}
      {successMessage && <p className="success">{successMessage}</p>}
    </div>
  );
};

export default Signup;
