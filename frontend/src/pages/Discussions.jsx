import { useState } from "react";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import MessageCard from "../components/MessageCard";

import "../styles/discussions.css";

function Discussions() {

  const [text, setText] = useState("");

  const [messages, setMessages] = useState([
    {
      id: 1,
      user: "Anonymous Falcon",
      message: "Anyone interested in participating in the upcoming Hackathon?",
      likes: 18,
      replies: 5,
    },
    {
      id: 2,
      user: "Anonymous Tiger",
      message: "Can the Coding Club organize a React workshop?",
      likes: 12,
      replies: 3,
    },
    {
      id: 3,
      user: "Anonymous Panda",
      message: "The AI Workshop last week was amazing!",
      likes: 25,
      replies: 7,
    },
  ]);

  const anonymousNames = [
    "Anonymous Eagle",
    "Anonymous Wolf",
    "Anonymous Phoenix",
    "Anonymous Lion",
    "Anonymous Shark",
    "Anonymous Owl",
  ];

  const postMessage = () => {
    if (!text.trim()) return;

    const randomUser =
      anonymousNames[Math.floor(Math.random() * anonymousNames.length)];

    const newMessage = {
      id: Date.now(),
      user: randomUser,
      message: text,
      likes: 0,
      replies: 0,
    };

    setMessages([newMessage, ...messages]);
    setText("");
  };

  return (
    <div className="dashboard-layout">

      <Sidebar />

      <main className="dashboard-content">

        <Navbar title="Club Discussions" />

        <div className="discussion-header">
          <h1>💬 Anonymous Club Discussions</h1>

          <p>
            Share ideas, ask questions, and discuss with your club members.
            Your identity is hidden.
          </p>
        </div>

        <div className="post-box">

          <textarea
            placeholder="Share something anonymously..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          <button onClick={postMessage}>
            Post Anonymously
          </button>

        </div>

        <div className="messages">

          {messages.map((msg) => (
            <MessageCard
              key={msg.id}
              {...msg}
            />
          ))}

        </div>

      </main>

    </div>
  );
}

export default Discussions;