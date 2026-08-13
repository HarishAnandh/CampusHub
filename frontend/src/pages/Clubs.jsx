import { useEffect, useState } from "react";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import ClubCard from "../components/ClubCard";
import CreateClubModal from "../components/CreateClubModal";

import { getClubs, createClub } from "../services/api";

import "../styles/clubs.css";

function Clubs() {
  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    loadClubs();
  }, []);

  const addIcons = (clubs) => {
    return clubs.map((club) => ({
      ...club,
      icon:
        club.icon ||
        (club.category === "Technology"
          ? "💻"
          : club.category === "Cultural"
          ? "🎭"
          : club.category === "Sports"
          ? "🏆"
          : "🏛️"),
    }));
  };

  const loadClubs = async () => {
    try {
      const data = await getClubs();
      setClubs(addIcons(data));
    } catch (err) {
      console.error(err);
      setError("Unable to load clubs.");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateClub = async (clubData) => {
    try {
      const newClub = await createClub(clubData);

      const clubWithIcon = {
        ...newClub,
        icon:
          clubData.icon ||
          (newClub.category === "Technology"
            ? "💻"
            : newClub.category === "Cultural"
            ? "🎭"
            : newClub.category === "Sports"
            ? "🏆"
            : "🏛️"),
      };

      setClubs((prevClubs) => [
        ...prevClubs,
        clubWithIcon,
      ]);

      setShowModal(false);
    } catch (err) {
      console.error(err);
      alert("Failed to create club.");
      throw err;
    }
  };

  return (
    <div className="dashboard-layout">
      <Sidebar />

      <main className="dashboard-content">
        <Navbar title="Clubs" />

        <div className="clubs-header">
          <div>
            <h1>Campus Clubs</h1>
            <p>
              Discover and participate in student communities.
            </p>
          </div>

          <button
            className="create-club-btn"
            onClick={() => setShowModal(true)}
          >
            + Create Club
          </button>
        </div>

        {loading && <p>Loading clubs...</p>}

        {error && <p>{error}</p>}

        {!loading && !error && (
          <div className="clubs-grid">
            {clubs.map((club) => (
              <ClubCard
                key={club.id}
                club={club}
              />
            ))}
          </div>
        )}

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