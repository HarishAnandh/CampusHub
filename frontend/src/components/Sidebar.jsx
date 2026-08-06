import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaUsers,
  FaCalendarAlt,
  FaVoteYea,
  FaFileAlt,
  FaUser,
} from "react-icons/fa";

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

        <NavLink to="/profile">👤 Profile</NavLink>
</nav>
    </aside>
  );
}

export default Sidebar;