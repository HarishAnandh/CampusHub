import { FaBell, FaUserCircle } from "react-icons/fa";

function Navbar({ title }) {
  const username = localStorage.getItem("username") || "User";

  return (
    <header className="navbar">
      <div className="navbar-title">
        <h2>{title}</h2>
      </div>

      <div className="nav-right">
        <button className="notification-btn" aria-label="Notifications">
          <FaBell />
          <span className="notification-dot"></span>
        </button>

        <div className="user-profile">
          <FaUserCircle className="profile-icon" />

          <div className="user-info">
            <span className="user-name">{username}</span>
            <span className="user-role">Student</span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;