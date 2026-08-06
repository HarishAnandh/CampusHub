import { useState } from "react";

function CreateClubModal({ onClose, onCreate }) {
  const [club, setClub] = useState({
    name: "",
    category: "",
    icon: "🏛️",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    onCreate({
      id: Date.now(),
      ...club,
      members: 1,
    });

    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal">

        <h2>Create Club</h2>

        <form onSubmit={handleSubmit}>

          <input
            placeholder="Club Name"
            value={club.name}
            onChange={(e) =>
              setClub({ ...club, name: e.target.value })
            }
          />

          <input
            placeholder="Category"
            value={club.category}
            onChange={(e) =>
              setClub({ ...club, category: e.target.value })
            }
          />

          <input
            placeholder="Emoji Icon (🎵 💻 ⚽)"
            value={club.icon}
            onChange={(e) =>
              setClub({ ...club, icon: e.target.value })
            }
          />

          <button type="submit">
            Create Club
          </button>

        </form>

      </div>
    </div>
  );
}

export default CreateClubModal;