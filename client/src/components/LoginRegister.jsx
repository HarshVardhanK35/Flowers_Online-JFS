import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function LoginRegister() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Send a POST request to the login API
    fetch('http://localhost:8080/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      } else {
        throw new Error("Invalid login credentials");
      }
    })
    .then((data) => {
      // Successful login, redirect to ProductList
      alert("Login successful");
      navigate('/products');
    })
    .catch((error) => {
      alert(error.message);
    });
  };

  return (
    <div className="container mt-5">
      <div className="row">
        {/* Left side - Existing User Login */}
        <div className="col-md-6">
          <h2>Existing User - Login</h2>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <Link to="/forgot-password">Forgot Password?</Link>
            </div>
            <button type="submit" className="btn btn-primary">Login</button>
          </form>
        </div>

        {/* Right side - Create Account */}
        <div className="col-md-6">
          <h2>Create Account</h2>
          <p>If you are a new user, please create an account.</p>
          <Link to="/register" className="btn btn-secondary">Create Account</Link>
        </div>
      </div>
    </div>
  );
}

export default LoginRegister;