import { Link } from "react-router-dom";
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
        <Link to="/dashboard"><FaHome /> Dashboard</Link>
        <Link to="/clubs"><FaUsers /> Clubs</Link>
        <Link to="/events"><FaCalendarAlt /> Events</Link>
        <Link to="/polls"><FaVoteYea /> Polls</Link>
        <Link to="/documents"><FaFileAlt /> Documents</Link>
        <Link to="/profile"><FaUser /> Profile</Link>
      </nav>
    </aside>
  );
}

export default Sidebar;