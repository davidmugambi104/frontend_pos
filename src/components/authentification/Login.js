import React, { useState } from 'react';
import './login.css'; // Importing the styles

// Login Component
const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    if (!username || !password) {
      setErrorMessage('Both username and password are required.');
      return false;
    }
    return true;
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    const loginData = { username, password };
    console.log('Sending data:', loginData); // Debug the data being sent

    try {
      const response = await fetch('http://127.0.0.1:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      if (!response.ok) {
        const error = await response.json();
        setErrorMessage(error.message || 'Invalid credentials.');
        setSuccessMessage('');
      } else {
        const data = await response.json();
        setSuccessMessage('Login successful!');
        setErrorMessage('');
        console.log('Login successful:', data);
        // Perform additional actions like redirecting or storing token
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('Error connecting to the server.');
      setSuccessMessage('');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          aria-label="Username"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          aria-label="Password"
        />
        <button type="submit" disabled={isSubmitting}>Login</button>
      </form>

      {errorMessage && <p className="error">{errorMessage}</p>}
      {successMessage && <p className="success">{successMessage}</p>}
    </div>
  );
};

export default Login;
