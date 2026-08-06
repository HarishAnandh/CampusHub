import "../styles/dashboard.css";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import DashboardCard from "../components/DashboardCard";
import EventCard from "../components/EventCard";
import AnnouncementCard from "../components/AnnouncementCard";
import QuickAction from "../components/QuickAction";

function Dashboard() {

  const stats = [
    { title: "My Clubs", value: 4 },
    { title: "Events", value: 8 },
    { title: "Active Polls", value: 3 },
    { title: "Documents", value: 21 }
  ];

  const events = [
    {
      title: "AI Workshop",
      club: "Coding Club",
      date: "Tomorrow"
    },
    {
      title: "Hackathon",
      club: "IEEE",
      date: "Friday"
    }
  ];

  const announcements = [
    {
      title: "Coding Club Recruitment",
      time: "2 hours ago"
    },
    {
      title: "IEEE General Meeting",
      time: "Yesterday"
    }
  ];

  return (
    <div className="dashboard-layout">

      <Sidebar />

      <main className="dashboard-content">

      <Navbar title="Dashboard" />

        <h1>Welcome back, @PixelKnight 👋</h1>

        <p className="subtitle">
          One Platform. Every Club. Every Voice.
        </p>

        <div className="card-grid">
          {stats.map((card, index) => (
            <DashboardCard
              key={index}
              title={card.title}
              value={card.value}
            />
          ))}
        </div>

        <div className="dashboard-sections">

          <div>

            <h2>Upcoming Events</h2>

            {events.map((event, index) => (
              <EventCard key={index} {...event} />
            ))}

          </div>

          <div>

            <h2>Recent Announcements</h2>

            {announcements.map((item, index) => (
              <AnnouncementCard key={index} {...item} />
            ))}

            <h2 style={{ marginTop: "30px" }}>
              Quick Actions
            </h2>

            <QuickAction text="➕ Create Club" />
            <QuickAction text="📅 Create Event" />
            <QuickAction text="🗳 Create Poll" />

          </div>

        </div>

      </main>

    </div>
  );
}

export default Dashboard;