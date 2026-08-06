import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import ClubCard from "../components/ClubCard";
import CreateClubModal from "../components/CreateClubModal";
import "../styles/clubs.css";

function Clubs() {
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");
  const handleCreateClub = (newClub) => {
    setClubs([...clubs, newClub]);
  };
  const [clubs, setClubs] = useState([
    {
      id: 1,
      icon: "💻",
      name: "Coding Club",
      members: 120,
      category: "Technology",
    },
    {
      id: 2,
      icon: "🤖",
      name: "AI Club",
      members: 85,
      category: "Artificial Intelligence",
    },
    {
      id: 3,
      icon: "🎭",
      name: "Drama Club",
      members: 60,
      category: "Arts",
    },
    {
      id: 4,
      icon: "🏸",
      name: "Sports Club",
      members: 150,
      category: "Sports",
    },
  ]);

  const filteredClubs = clubs.filter((club) =>
    club.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="dashboard-layout">

      <Sidebar />

      <main className="dashboard-content">

      <Navbar title="Clubs" />

        <div className="club-header">

          <h1>Clubs</h1>

          <button
        className="create-btn"
        onClick={() => setShowModal(true)}>
        + Create Club
          </button>


        </div>

        <input
          className="search-box"
          placeholder="Search clubs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="clubs-grid">

          {filteredClubs.map((club) => (
            <ClubCard
              key={club.id}
              club={club}
            />
          ))}

        </div>
        {showModal && (
  <CreateClubModal
    onClose={() => setShowModal(false)}
    onCreate={handleCreateClub}
  />
)}
      </main>

    </div>
  );
}

export default Clubs;