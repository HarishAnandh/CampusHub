import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import "../styles/profile.css";

function Profile() {
  const navigate = useNavigate();
  const username = localStorage.getItem("username") || "User";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/login");
  };

  const credits = [
    {
      name: "Harish Anandh",
      role: "Founder & Developer",
      image:
        "https://media.licdn.com/dms/image/v2/D4D03AQG66hyrbAZa4Q/profile-displayphoto-crop_800_800/B4DZ_AxEZyIYAI-/0/1785645520784?e=1788393600&v=beta&t=DTgi_FK0au-G9NczU0enz1Eknm-d48llUdFA32HxuUY",
    },
    {
      name: "Shanmugavel M",
      role: "CEO, Tech Head",
      image:
        "https://th.bing.com/th/id/OIP.i_sA55b7v1PJwZ8vl9YGhgAAAA?r=0&o=7&rm=3&rs=1&pid=ImgDetMain",
    },
    {
      name: "Stefon S",
      role: "CMO & Logistics",
      image:
        "https://media.licdn.com/dms/image/v2/D4E03AQHaLBI4tbRrNg/profile-displayphoto-crop_800_800/B4EZut7p_wMAAM-/0/1768149656532?e=1788393600&v=beta&t=9TQDu0emQR0tYKxQIU5P2PItvQIWgqRxS5Qr5gGcn20",
    },
  ];

  // Temporary data until the joined-clubs API is connected.
  const joinedClubs = [
    {
      name: "Coding Club",
      category: "Technology",
      icon: "💻",
    },
    {
      name: "AI Club",
      category: "Artificial Intelligence",
      icon: "🤖",
    },
    {
      name: "IEEE",
      category: "Engineering",
      icon: "⚡",
    },
  ];

  return (
    <div className="dashboard-layout">
      <Sidebar />

      <main className="dashboard-content">
        <Navbar title="Profile" />

        <div className="profile-page">

          {/* PLAYER PROFILE CARD */}
          <section className="player-card">

            <div className="player-card-top">
              <div className="player-avatar">
                {username.charAt(0).toUpperCase()}
              </div>

              <div className="player-info">
                <div className="player-label">
                  CAMPUSHUB MEMBER
                </div>

                <h1>{username}</h1>

                <p>@{username}</p>

                <span className="player-status">
                  ● Active on Campus
                </span>
              </div>

              <div className="player-level">
                <span>LEVEL</span>
                <strong>08</strong>
              </div>
            </div>

            {/* XP / ACTIVITY */}
            <div className="xp-section">
              <div className="xp-header">
                <span>Campus Activity</span>
                <strong>760 XP</strong>
              </div>

              <div className="xp-bar">
                <div className="xp-fill"></div>
              </div>

              <div className="xp-footer">
                <span>Keep participating!</span>
                <span>76%</span>
              </div>
            </div>

            {/* STATS */}
            <div className="player-stats">

              <div className="player-stat">
                <span className="stat-icon">🏛️</span>
                <strong>0</strong>
                <small>Clubs Joined</small>
              </div>

              <div className="player-stat">
                <span className="stat-icon">📅</span>
                <strong>0</strong>
                <small>Events</small>
              </div>

              <div className="player-stat">
                <span className="stat-icon">🗳️</span>
                <strong>0</strong>
                <small>Polls</small>
              </div>

              <div className="player-stat">
                <span className="stat-icon">💬</span>
                <strong>0</strong>
                <small>Posts</small>
              </div>

            </div>

          </section>

          {/* ACCOUNT */}
          <section className="profile-card account-card">

            <div className="section-heading">
              <div>
                <span className="section-kicker">ACCOUNT</span>
                <h2>Player Information</h2>
              </div>

              <span className="section-badge">✓ Verified</span>
            </div>

            <div className="profile-info">
              <span>Username</span>
              <strong>{username}</strong>
            </div>

            <div className="profile-info">
              <span>Email</span>
              <strong>Loading from account...</strong>
            </div>

          </section>

          {/* JOINED CLUBS */}
          <section className="profile-card clubs-profile-card">

            <div className="section-heading">
              <div>
                <span className="section-kicker">CAMPUS</span>
                <h2>My Clubs</h2>
              </div>

              <button
                className="browse-clubs-btn"
                onClick={() => navigate("/clubs")}
              >
                Browse Clubs →
              </button>
            </div>

            <div className="joined-clubs">

              {joinedClubs.map((club) => (
                <div
                  className="joined-club"
                  key={club.name}
                >
                  <div className="club-game-icon">
                    {club.icon}
                  </div>

                  <div>
                    <h3>{club.name}</h3>
                    <p>{club.category}</p>
                  </div>

                  <span className="member-badge">
                    MEMBER
                  </span>
                </div>
              ))}

            </div>

          </section>

          {/* ACCOUNT SETTINGS */}
          <section className="profile-card settings-card">

            <div>
              <span className="section-kicker">SETTINGS</span>
              <h2>Account Settings</h2>
            </div>

            <button
              className="logout-btn"
              onClick={handleLogout}
            >
              🚪 Logout
            </button>

          </section>

          {/* CREDITS */}
          <section className="profile-card credits-section">

            <div className="section-heading">
              <div>
                <span className="section-kicker">CREDITS</span>
                <h2>Behind CampusHub</h2>
              </div>
            </div>

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

          </section>

          <div className="product-credit">
            A Hector Product
          </div>

        </div>
      </main>
    </div>
  );
}

export default Profile;