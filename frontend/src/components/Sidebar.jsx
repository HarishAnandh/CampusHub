import { NavLink } from "react-router-dom";
import "../styles/sidebar.css";

function Sidebar() {
  return (
    <aside className="sidebar">
      <h2 className="logo">🏛 CampusHub</h2>

      <nav>
        <NavLink to="/dashboard">🏠 Dashboard</NavLink>
        <NavLink to="/clubs">👥 Clubs</NavLink>
        <NavLink to="/events">📅 Events</NavLink>
        <NavLink to="/polls">🗳️ Polls</NavLink>
        <NavLink to="/discussions">💬 Discussions</NavLink>

        {/*<NavLink to="/campus-shield">
          🛡️ CampusShield
        </NavLink>
        */}

        <NavLink to="/crowd-flow">
          🚨 CrowdFlow
        </NavLink>
        <NavLink to="/profile">👤 Profile</NavLink>
      </nav>
    </aside>
  );
}

export default Sidebar;