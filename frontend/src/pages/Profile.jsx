import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

import "../styles/profile.css";

function Profile() {
  const navigate = useNavigate();

  const username = localStorage.getItem("username");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");

    navigate("/login");
  };

  return (
    <div className="dashboard-layout">

      <Sidebar />

      <main className="dashboard-content">

        <Navbar title="Profile" />

        <div className="profile-page">

          <div className="profile-header">

            <div className="profile-avatar">
              {username?.charAt(0).toUpperCase() || "U"}
            </div>

            <div>
              <h1>{username || "User"}</h1>
              <p>@{username || "user"}</p>
            </div>

          </div>

          <div className="profile-grid">

            <div className="profile-card">

              <h2>👤 Account</h2>

              <div className="profile-info">
                <span>Username</span>
                <strong>{username || "Not available"}</strong>
              </div>

              <div className="profile-info">
                <span>Email</span>
                <strong>Loading from account...</strong>
              </div>

            </div>

            <div className="profile-card">

              <h2>🏛️ CampusHub Activity</h2>

              <div className="profile-stats">

                <div>
                  <strong>0</strong>
                  <span>Clubs Joined</span>
                </div>

                <div>
                  <strong>0</strong>
                  <span>Events</span>
                </div>

                <div>
                  <strong>0</strong>
                  <span>Polls</span>
                </div>

              </div>

            </div>

          </div>

          <div className="profile-card">

            <h2>⚙️ Account Settings</h2>

            <button
              className="logout-btn"
              onClick={handleLogout}
            >
              🚪 Logout
            </button>

          </div>

        </div>

      </main>

    </div>
  );
}

export default Profile;