import { useState } from "react";

function CreateClubModal({ onClose, onCreate }) {
  const [club, setClub] = useState({
    name: "",
    category: "",
    icon: "🏛️",
  });

  const [creating, setCreating] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!club.name.trim() || !club.category.trim()) {
      alert("Please enter club name and category.");
      return;
    }

    try {
      setCreating(true);

      await onCreate({
        name: club.name,
        category: club.category,
      });
    } catch (error) {
      console.error(error);
    } finally {
      setCreating(false);
    }
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
              setClub({
                ...club,
                name: e.target.value,
              })
            }
          />

          <input
            placeholder="Category"
            value={club.category}
            onChange={(e) =>
              setClub({
                ...club,
                category: e.target.value,
              })
            }
          />

          <input
            placeholder="Emoji Icon (🎵 💻 ⚽)"
            value={club.icon}
            onChange={(e) =>
              setClub({
                ...club,
                icon: e.target.value,
              })
            }
          />

          <div className="modal-buttons">
            <button
              type="button"
              onClick={onClose}
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={creating}
            >
              {creating ? "Creating..." : "Create Club"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateClubModal;