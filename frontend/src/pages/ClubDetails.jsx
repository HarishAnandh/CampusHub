import { useLocation } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

import "../styles/clubDetails.css";

function ClubDetails() {

  const location = useLocation();

  const club = location.state?.club;

  if (!club) {
    return <h2>Club not found.</h2>;
  }

  return (
    <div className="dashboard-layout">

      <Sidebar />

      <main className="dashboard-content">

      <Navbar title="Club Details" />

        <div className="club-details">

          <h1>
            {club.icon} {club.name}
          </h1>

          <p className="category">
            {club.category}
          </p>

          <div className="stats">

            <div>

              <h3>{club.members}</h3>

              <p>Members</p>

            </div>

            <div>

              <h3>2025</h3>

              <p>Founded</p>

            </div>

          </div>

          <section>

            <h2>About</h2>

            <p>
              The {club.name} encourages students to
              collaborate, organize events, participate
              in competitions, and build technical as well
              as leadership skills.
            </p>

          </section>

          <section>

            <h2>Upcoming Events</h2>

            <ul>
              <li>📅 Hackathon 2026</li>
              <li>📅 AI Workshop</li>
              <li>📅 Weekly Meetup</li>
            </ul>

          </section>

          <section>

            <h2>Announcements</h2>

            <ul>
              <li>📢 Club recruitment is open.</li>
              <li>📢 Meeting on Friday at 5 PM.</li>
            </ul>

          </section>

          <button className="join-btn">
            Join Club
          </button>

        </div>

      </main>

    </div>
  );
}

export default ClubDetails;