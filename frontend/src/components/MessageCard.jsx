function MessageCard({ user, message, likes, replies }) {
    return (
      <div className="message-card">
        <div className="message-header">
          <h3>🕵️ {user}</h3>
        </div>
  
        <p className="message-text">{message}</p>
  
        <div className="message-footer">
          <span>❤️ {likes}</span>
          <span>💬 {replies} Replies</span>
        </div>
  
        <div className="message-buttons">
          <button>👍 Like</button>
          <button>💬 Reply</button>
        </div>
      </div>
    );
  }
  
  export default MessageCard;