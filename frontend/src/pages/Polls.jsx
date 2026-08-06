import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

import "../styles/polls.css";

function Polls() {
  const [presidentVote, setPresidentVote] = useState("");
  const [eventVote, setEventVote] = useState("");

  return (
    <div className="dashboard-layout">
      <Sidebar />

      <main className="dashboard-content">
        <Navbar title="Polls & Elections" />

        <div className="polls-header">
          <h1>🗳️ Student Polls & Elections</h1>
          <p>Vote anonymously and participate in club decisions.</p>
        </div>

        {/* Election Card */}
        <div className="poll-card">
          <h2>🏛️ Coding Club President Election</h2>

          <label>
            <input
              type="radio"
              value="Harish"
              checked={presidentVote === "Harish"}
              onChange={(e) => setPresidentVote(e.target.value)}
            />
            Harish Anandh
          </label>

          <label>
            <input
              type="radio"
              value="Rahul"
              checked={presidentVote === "Rahul"}
              onChange={(e) => setPresidentVote(e.target.value)}
            />
            Rahul Kumar
          </label>

          <label>
            <input
              type="radio"
              value="Priya"
              checked={presidentVote === "Priya"}
              onChange={(e) => setPresidentVote(e.target.value)}
            />
            Priya Sharma
          </label>

          <button className="vote-btn">
            Submit Vote
          </button>
        </div>

        {/* Poll Card */}
        <div className="poll-card">
          <h2>💡 Best Technical Event</h2>

          <label>
            <input
              type="radio"
              value="Hackathon"
              checked={eventVote === "Hackathon"}
              onChange={(e) => setEventVote(e.target.value)}
            />
            Hackathon
          </label>

          <label>
            <input
              type="radio"
              value="AI Workshop"
              checked={eventVote === "AI Workshop"}
              onChange={(e) => setEventVote(e.target.value)}
            />
            AI Workshop
          </label>

          <label>
            <input
              type="radio"
              value="Coding Contest"
              checked={eventVote === "Coding Contest"}
              onChange={(e) => setEventVote(e.target.value)}
            />
            Coding Contest
          </label>

          <button className="vote-btn">
            Submit Vote
          </button>
        </div>

        {/* Results */}
        <div className="poll-card">
          <h2>📊 Current Poll Results</h2>

          <div className="result">
            <span>Hackathon</span>
            <div className="progress">
              <div className="fill" style={{ width: "60%" }}></div>
            </div>
            <span>60%</span>
          </div>

          <div className="result">
            <span>AI Workshop</span>
            <div className="progress">
              <div className="fill" style={{ width: "30%" }}></div>
            </div>
            <span>30%</span>
          </div>

          <div className="result">
            <span>Coding Contest</span>
            <div className="progress">
              <div className="fill" style={{ width: "10%" }}></div>
            </div>
            <span>10%</span>
          </div>
        </div>

      </main>
    </div>
  );
}

export default Polls;