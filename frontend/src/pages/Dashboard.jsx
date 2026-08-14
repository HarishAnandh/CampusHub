import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/dashboard.css";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import DashboardCard from "../components/DashboardCard";
import EventCard from "../components/EventCard";
import AnnouncementCard from "../components/AnnouncementCard";
import QuickAction from "../components/QuickAction";

import {
  getClubs,
  getPolls,
} from "../services/api";

function Dashboard() {
  const username = localStorage.getItem("username") || "User";
  const navigate = useNavigate();
  const [clubs, setClubs] = useState([]);
  const [polls, setPolls] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const [clubsData, pollsData] = await Promise.all([
        getClubs(),
        getPolls(),
      ]);

      setClubs(clubsData || []);
      setPolls(pollsData || []);
    } catch (error) {
      console.error("Failed to load dashboard:", error);
    } finally {
      setLoading(false);
    }
  };

  /*
   * Events and announcements will be connected to the backend
   * once the global events/announcement APIs are added.
   *
   * Keeping these here temporarily prevents the dashboard
   * from breaking while those modules are still being developed.
   */
  const events = [
    {
      title: "AI Workshop",
      club: "Coding Club",
      date: "Tomorrow",
    },
    {
      title: "Hackathon",
      club: "IEEE",
      date: "Friday",
    },
  ];

  const announcements = [
    {
      title: "Coding Club Recruitment",
      time: "2 hours ago",
    },
    {
      title: "IEEE General Meeting",
      time: "Yesterday",
    },
  ];

  const stats = [
    {
      title: "My Clubs",
      value: loading ? "..." : clubs.length,
    },
    {
      title: "Events",
      value: events.length,
    },
    {
      title: "Active Polls",
      value: loading ? "..." : polls.length,
    },
    {
      title: "Documents",
      value: 0,
    },
  ];

  return (
    <div className="dashboard-layout">

      <Sidebar />

      <main className="dashboard-content">

        <Navbar title="Dashboard" />

        <h1>
          Welcome back, {username} 👋
        </h1>

        <p className="subtitle">
          One Platform. Every Club. Every Voice.
        </p>

        {/* STAT CARDS */}

        <div className="card-grid">

          {stats.map((card, index) => (
            <DashboardCard
              key={index}
              title={card.title}
              value={card.value}
            />
          ))}

        </div>

        {/* DASHBOARD SECTIONS */}

        <div className="dashboard-sections">

          {/* UPCOMING EVENTS */}

          <div>

            <h2>Upcoming Events</h2>

            {events.length === 0 ? (
              <p>No upcoming events.</p>
            ) : (
              events.map((event, index) => (
                <EventCard
                  key={index}
                  {...event}
                />
              ))
            )}

          </div>

          {/* ANNOUNCEMENTS + QUICK ACTIONS */}

          <div>

            <h2>Recent Announcements</h2>

            {announcements.length === 0 ? (
              <p>No recent announcements.</p>
            ) : (
              announcements.map((item, index) => (
                <AnnouncementCard
                  key={index}
                  {...item}
                />
              ))
            )}

            <h2 style={{ marginTop: "30px" }}>
              Quick Actions
            </h2>

            <div onClick={() => navigate("/clubs")}>
  <QuickAction text="➕ Create Club" />
</div>

<div onClick={() => navigate("/events")}>
  <QuickAction text="📅 Create Event" />
</div>

<div onClick={() => navigate("/polls")}>
  <QuickAction text="🗳 Create Poll" />
</div>

          </div>

        </div>

      </main>

    </div>
  );
}

export default Dashboard;