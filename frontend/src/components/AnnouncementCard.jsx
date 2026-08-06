function AnnouncementCard({ title, time }) {
    return (
      <div className="announcement-card">
        <h4>{title}</h4>
        <p>{time}</p>
      </div>
    );
  }
  
  export default AnnouncementCard;