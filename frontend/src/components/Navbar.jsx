import { FaBell, FaUserCircle } from "react-icons/fa";

function Navbar({ title }) {
  return (
    <header className="navbar">
      <h2>{title}</h2>

      <div className="nav-right">
        <FaBell className="icon" />
        <div className="user-profile">
          <FaUserCircle className="profile-icon" />
          <span>@PixelKnight</span>
        </div>
      </div>
    </header>
  );
}

export default Navbar;