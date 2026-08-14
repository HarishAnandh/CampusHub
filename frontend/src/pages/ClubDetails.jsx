import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

import {
  getClubPosts,
  createClubPost,
  getClubEvents,
  createClubEvent,
  updateClub,
  joinClub,
  leaveClub,
  getClubMembers,
} from "../services/api";

import "../styles/clubDetails.css";

function ClubDetails() {
  const location = useLocation();

  const initialClub = location.state?.club;

  const [club, setClub] = useState(initialClub);

  const [posts, setPosts] = useState([]);
  const [events, setEvents] = useState([]);
  const [members, setMembers] = useState([]);

  const [postContent, setPostContent] = useState("");

  const [showEventForm, setShowEventForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);

  const [isMember, setIsMember] = useState(false);

  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  const [editData, setEditData] = useState({
    name: initialClub?.name || "",
    description: initialClub?.description || "",
    category: initialClub?.category || "",
  });

  const [eventData, setEventData] = useState({
    title: "",
    description: "",
    event_date: "",
    location: "",
  });

  const username = localStorage.getItem("username");

  if (!club) {
    return <h2>Club not found.</h2>;
  }

  useEffect(() => {
    loadClubData();
  }, [club.id]);

  const loadClubData = async () => {
    try {
      const [
        postsData,
        eventsData,
        membersData,
      ] = await Promise.all([
        getClubPosts(club.id),
        getClubEvents(club.id),
        getClubMembers(club.id),
      ]);

      setPosts(postsData);
      setEvents(eventsData);
      setMembers(membersData);

      const currentUserIsMember = membersData.some(
        (member) => member.username === username
      );

      setIsMember(currentUserIsMember);

      setClub((prev) => ({
        ...prev,
        members: membersData.length,
      }));
    } catch (error) {
      console.error("Failed to load club data:", error);
    } finally {
      setLoading(false);
    }
  };

  // -------------------------
  // Join / Leave Club
  // -------------------------

  const handleJoinClub = async () => {
    if (!username) {
      alert("Please login first.");
      return;
    }

    setActionLoading(true);

    try {
      if (isMember) {
        await leaveClub(club.id, username);
        setIsMember(false);
      } else {
        await joinClub(club.id, username);
        setIsMember(true);
      }

      await loadClubData();
    } catch (error) {
      console.error(error);
      alert(error.message);
    } finally {
      setActionLoading(false);
    }
  };

  // -------------------------
  // Edit Club
  // -------------------------

  const handleEditClub = async (e) => {
    e.preventDefault();

    if (!editData.name.trim()) {
      alert("Club name is required.");
      return;
    }

    try {
      const updatedClub = await updateClub(
        club.id,
        editData
      );

      setClub((prev) => ({
        ...prev,
        ...updatedClub,
      }));

      setShowEditForm(false);

      alert("Club updated successfully.");
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  // -------------------------
  // Create Post
  // -------------------------

  const handlePost = async (e) => {
    e.preventDefault();

    if (!postContent.trim()) return;

    if (!username) {
      alert("Please login first.");
      return;
    }

    try {
      const newPost = await createClubPost(
        club.id,
        {
          content: postContent,
          username: username,
        }
      );

      setPosts((prevPosts) => [
        newPost,
        ...prevPosts,
      ]);

      setPostContent("");
    } catch (error) {
      console.error(error);
      alert("Failed to create post.");
    }
  };

  // -------------------------
  // Create Event
  // -------------------------

  const handleCreateEvent = async (e) => {
    e.preventDefault();

    if (!eventData.title || !eventData.event_date) {
      alert("Please enter an event title and date.");
      return;
    }

    if (!username) {
      alert("Please login first.");
      return;
    }

    try {
      const newEvent = await createClubEvent(
        club.id,
        {
          ...eventData,
          created_by: username,
        }
      );

      setEvents((prevEvents) => [
        ...prevEvents,
        newEvent,
      ]);

      setEventData({
        title: "",
        description: "",
        event_date: "",
        location: "",
      });

      setShowEventForm(false);
    } catch (error) {
      console.error(error);
      alert("Failed to create event.");
    }
  };

  return (
    <div className="dashboard-layout">

      <Sidebar />

      <main className="dashboard-content">

        <Navbar title="Club Details" />

        <div className="club-details">

          {/* CLUB HEADER */}

          <div className="club-title-row">

            <div>
              <h1>
                {club.icon} {club.name}
              </h1>

              <p className="category">
                {club.category}
              </p>
            </div>

            <button
              className="edit-club-btn"
              onClick={() =>
                setShowEditForm(!showEditForm)
              }
            >
              ✏️ Edit Club
            </button>

          </div>

          {/* EDIT FORM */}

          {showEditForm && (

            <form
              className="event-form"
              onSubmit={handleEditClub}
            >

              <h2>Edit Club</h2>

              <input
                type="text"
                placeholder="Club name"
                value={editData.name}
                onChange={(e) =>
                  setEditData({
                    ...editData,
                    name: e.target.value,
                  })
                }
              />

              <textarea
                placeholder="Club description"
                value={editData.description}
                onChange={(e) =>
                  setEditData({
                    ...editData,
                    description: e.target.value,
                  })
                }
              />

              <input
                type="text"
                placeholder="Category"
                value={editData.category}
                onChange={(e) =>
                  setEditData({
                    ...editData,
                    category: e.target.value,
                  })
                }
              />

              <button type="submit">
                Save Changes
              </button>

            </form>
          )}

          {/* STATS */}

          <div className="stats">

            <div>
              <h3>{club.members || members.length}</h3>
              <p>Members</p>
            </div>

            <div>
              <h3>2025</h3>
              <p>Founded</p>
            </div>

          </div>

          {/* ABOUT */}

          <section>

            <h2>About</h2>

            <p>
              {club.description ||
                `The ${club.name} encourages students to
                collaborate, organize events, participate
                in competitions, and build technical as well
                as leadership skills.`}
            </p>

          </section>

          {/* EVENTS */}

          <section>

            <div className="section-header">

              <h2>Upcoming Events</h2>

              <button
                className="join-btn"
                onClick={() =>
                  setShowEventForm(!showEventForm)
                }
              >
                + Add Event
              </button>

            </div>

            {showEventForm && (

              <form
                className="event-form"
                onSubmit={handleCreateEvent}
              >

                <input
                  type="text"
                  placeholder="Event title"
                  value={eventData.title}
                  onChange={(e) =>
                    setEventData({
                      ...eventData,
                      title: e.target.value,
                    })
                  }
                />

                <textarea
                  placeholder="Event description"
                  value={eventData.description}
                  onChange={(e) =>
                    setEventData({
                      ...eventData,
                      description: e.target.value,
                    })
                  }
                />

                <input
                  type="datetime-local"
                  value={eventData.event_date}
                  onChange={(e) =>
                    setEventData({
                      ...eventData,
                      event_date: e.target.value,
                    })
                  }
                />

                <input
                  type="text"
                  placeholder="Location"
                  value={eventData.location}
                  onChange={(e) =>
                    setEventData({
                      ...eventData,
                      location: e.target.value,
                    })
                  }
                />

                <button type="submit">
                  Create Event
                </button>

              </form>
            )}

            {loading ? (
              <p>Loading events...</p>
            ) : events.length === 0 ? (
              <p>No upcoming events.</p>
            ) : (
              <ul>

                {events.map((event) => (

                  <li key={event.id}>

                    📅 <strong>
                      {event.title}
                    </strong>

                    {event.location && (
                      <span>
                        {" "} — {event.location}
                      </span>
                    )}

                    <br />

                    <small>
                      {new Date(
                        event.event_date
                      ).toLocaleString()}
                    </small>

                    {event.description && (
                      <p>
                        {event.description}
                      </p>
                    )}

                  </li>

                ))}

              </ul>
            )}

          </section>

          {/* DISCUSSION */}

          <section>

            <h2>Club Discussion</h2>

            <form onSubmit={handlePost}>

              <textarea
                placeholder="Share something with the club..."
                value={postContent}
                onChange={(e) =>
                  setPostContent(e.target.value)
                }
              />

              <button type="submit">
                Post
              </button>

            </form>

            <div className="posts">

              {loading ? (
                <p>Loading posts...</p>
              ) : posts.length === 0 ? (
                <p>
                  No posts yet. Start the discussion!
                </p>
              ) : (

                posts.map((post) => (

                  <div
                    className="post-card"
                    key={post.id}
                  >

                    <strong>
                      👤 {post.username || "Anonymous"}
                    </strong>

                    <p>{post.content}</p>

                    <small>
                      {post.created_at &&
                        new Date(
                          post.created_at
                        ).toLocaleString()}
                    </small>

                  </div>

                ))

              )}

            </div>

          </section>

          {/* CLUB MEMBERS */}

          <section className="club-members-section">

            <div className="section-header">

              <div>
                <h2>Club Members</h2>

                <p>
                  {members.length}{" "}
                  {members.length === 1
                    ? "member"
                    : "members"}
                </p>
              </div>

            </div>

            {members.length === 0 ? (

              <p>
                No members yet. Be the first to join!
              </p>

            ) : (

              <div className="club-members-grid">

                {members.map((member) => (

                  <div
                    className="club-member-card"
                    key={member.id}
                  >

                    <div className="member-avatar">
                      {member.username
                        ?.charAt(0)
                        .toUpperCase()}
                    </div>

                    <div>
                      <strong>
                        {member.username}
                      </strong>

                      <p>
                        Club Member
                      </p>
                    </div>

                  </div>

                ))}

              </div>
            )}

          </section>

          {/* JOIN / LEAVE */}

          <button
            className="join-btn"
            onClick={handleJoinClub}
            disabled={actionLoading}
          >
            {actionLoading
              ? "Please wait..."
              : isMember
              ? "Leave Club"
              : "Join Club"}
          </button>

        </div>

      </main>

    </div>
  );
}

export default ClubDetails;