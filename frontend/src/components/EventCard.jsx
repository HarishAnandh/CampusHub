function EventCard({
  icon,
  title,
  club,
  date,
  time,
  location,
  participants,
  category,
}) {
  return (
    <div className="event-card">
      <div className="event-top">
        <h2>
          {icon} {title}
        </h2>

        <span className="event-category">
          {category}
        </span>
      </div>

      <p>
        <strong>Club:</strong> {club}
      </p>

      <p>📅 {date}</p>

      <p>🕒 {time}</p>

      <p>📍 {location}</p>

      <p>👥 {participants} Registered</p>

      <div className="event-buttons">
        <button className="view-btn">
          View Details
        </button>

        <button className="register-btn">
          Register
        </button>
      </div>
    </div>
  );
}

export default EventCard;