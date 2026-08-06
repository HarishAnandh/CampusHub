import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "../styles/login.css";

function Login() {

  const navigate = useNavigate();

  const [username, setUsername] = useState("");

  const [password, setPassword] = useState("");

  const handleLogin = (e) => {

    e.preventDefault();

    // Temporary login

    navigate("/dashboard");
  };

  return (
    <div className="login-page">

      <div className="login-card">

        <div className="logo">

          <h1>🏛 CampusHub</h1>

          <p>One Platform. Every Club. Every Voice.</p>

        </div>

        <form onSubmit={handleLogin}>

          <div className="input-group">

            <label>Username</label>

            <input
              type="text"
              placeholder="@PixelKnight"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

          </div>

          <div className="input-group">

            <label>Password</label>

            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

          </div>

          <button className="login-btn">
            Login
          </button>

        </form>

        <div className="bottom-links">

          New here? <span>Create Account</span>

        </div>

      </div>

    </div>
  );
}

export default Login;