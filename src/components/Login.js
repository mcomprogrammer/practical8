import React, { useState } from 'react';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    // Fetch users from local storage
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Check if the email and password match any user
    const user = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );

    if (user) {
      // Store logged-in user in local storage
      localStorage.setItem('loggedInUser', JSON.stringify(user));
      alert('Login successful!');
      // Optionally, redirect to another page
      // window.location.href = '/home'; // Example: Redirect to home page
    } else {
      alert('Invalid email or password. Please try again.');
    }
  };

  return (
    <div className="login">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
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
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
