import { Link } from "react-router-dom";

function ClubCard({ club }) {
  return (
    <div className="club-card">

      <div className="club-image-wrapper">
        {club.image_url ? (
          <img
            src={club.image_url}
            alt={club.name}
            className="club-image"
          />
        ) : (
          <div className="club-emoji">
            {club.icon || ""}
          </div>
        )}
      </div>

      <h2>{club.name}</h2>

      <p>
        <strong>Members:</strong> {club.members}
      </p>

      <p>
        <strong>Category:</strong> {club.category}
      </p>

      <div className="club-buttons">
        <Link
          to={`/clubs/${club.id}`}
          state={{ club }}
        >
          <button className="view-btn">
            View Club
          </button>
        </Link>

        <button className="join-btn">
          Join Club
        </button>
      </div>

    </div>
  );
}

export default ClubCard;