import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import EventCard from "../components/EventCard";

import "../styles/events.css";

function Events() {
  const [search, setSearch] = useState("");

  const events = [
    {
      id: 1,
      title: "Hackathon 2026",
      club: "Coding Club",
      date: "25 Aug 2026",
      time: "9:00 AM",
      location: "CEG Auditorium",
      participants: 238,
      category: "Technology",
      icon: "🚀",
    },
    {
      id: 2,
      title: "AI Workshop",
      club: "AI Club",
      date: "30 Aug 2026",
      time: "10:30 AM",
      location: "Seminar Hall",
      participants: 84,
      category: "Workshop",
      icon: "🤖",
    },
    {
      id: 3,
      title: "Cultural Night",
      club: "Cultural Club",
      date: "5 Sept 2026",
      time: "6:00 PM",
      location: "Open Air Theatre",
      participants: 420,
      category: "Cultural",
      icon: "🎭",
    },
  ];

  const filteredEvents = events.filter((event) =>
    event.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="dashboard-layout">
      <Sidebar />

      <main className="dashboard-content">
        <Navbar title="Events" />

        <div className="event-header">
          <div>
            <h1>Upcoming Events</h1>
            <p>Discover and register for campus events.</p>
          </div>

          <button className="create-btn">
            + Create Event
          </button>
        </div>

        <input
          type="text"
          className="search-box"
          placeholder="Search events..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="events-grid">
          {filteredEvents.map((event) => (
            <EventCard key={event.id} {...event} />
          ))}
        </div>
      </main>
    </div>
  );
}

export default Events;