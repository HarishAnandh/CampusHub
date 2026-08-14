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

  const credits = [
    {
      name: "Harish Anandh",
      role: "Founder & Developer",
      image: "https://media.licdn.com/dms/image/v2/D4D03AQG66hyrbAZa4Q/profile-displayphoto-crop_800_800/B4DZ_AxEZyIYAI-/0/1785645520784?e=1788393600&v=beta&t=DTgi_FK0au-G9NczU0enz1Eknm-d48llUdFA32HxuUY",
    },
    {
      name: "Shanmugavel M",
      role: "CEO, Tech Head",
      image: "https://th.bing.com/th/id/OIP.i_sA55b7v1PJwZ8vl9YGhgAAAA?r=0&o=7rm=3&rs=1&pid=ImgDetMain&o=7&rm=3",
    },
    {
      name: "Stefon S",
      role: "CMO & Logistics",
      image: "https://media.licdn.com/dms/image/v2/D4E03AQHaLBI4tbRrNg/profile-displayphoto-crop_800_800/B4EZut7p_wMAAM-/0/1768149656532?e=1788393600&v=beta&t=9TQDu0emQR0tYKxQIU5P2PItvQIWgqRxS5Qr5gGcn20",
    },
  ];

  return (
    <div className="dashboard-layout">

      <Sidebar />

      <main className="dashboard-content">

        <Navbar title="Profile" />

        <div className="profile-page">

          {/* PROFILE HEADER */}

          <div className="profile-header">

            <div className="profile-avatar">
              {username?.charAt(0).toUpperCase() || "U"}
            </div>

            <div>
              <h1>{username || "User"}</h1>
              <p>@{username || "user"}</p>
            </div>

          </div>

          {/* PROFILE INFORMATION */}

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

          {/* ACCOUNT SETTINGS */}

          <div className="profile-card">

            <h2>⚙️ Account Settings</h2>

            <button
              className="logout-btn"
              onClick={handleLogout}
            >
              🚪 Logout
            </button>

          </div>

          {/* CREDITS */}

          <div className="profile-card credits-section">

            <h2>✨ Credits</h2>

            <p className="credits-subtitle">
              The team behind CampusHub
            </p>

            <div className="credits-grid">

              {credits.map((person) => (
                <div
                  className="credit-card"
                  key={person.name}
                >

                  <img
                    src={person.image}
                    alt={person.name}
                    className="credit-image"
                  />

                  <h3>{person.name}</h3>

                  <p>{person.role}</p>

                </div>
              ))}

            </div>

          </div>

          {/* PRODUCT CREDIT */}

          <div className="product-credit">
            A Hector Product
          </div>

        </div>

      </main>

    </div>
  );
}

export default Profile;