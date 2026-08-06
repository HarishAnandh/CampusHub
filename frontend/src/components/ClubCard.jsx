import { Link } from "react-router-dom";

function ClubCard({ club }) {
  return (
    <div className="club-card">
      <h2>{club.icon} {club.name}</h2>

      <p><strong>Members:</strong> {club.members}</p>

      <p><strong>Category:</strong> {club.category}</p>

      <div className="club-buttons">
      <Link to={`/clubs/${club.id}`} state={{ club }}>
          <button className="view-btn">View Club</button>
        </Link>

        <button className="join-btn">
          Join Club
        </button>
      </div>
    </div>
  );
}

export default ClubCard;