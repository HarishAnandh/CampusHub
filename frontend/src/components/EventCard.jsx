function EventCard({ title, club, date }) {
    return (
      <div className="event-card">
        <h3>{title}</h3>
        <p>{club}</p>
        <span>{date}</span>
      </div>
    );
  }
  
  export default EventCard;