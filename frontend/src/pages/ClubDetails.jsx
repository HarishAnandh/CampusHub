import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

import {
  getClubPosts,
  createClubPost,
  getClubEvents,
  createClubEvent,
} from "../services/api";

import "../styles/clubDetails.css";

function ClubDetails() {
  const location = useLocation();

  const club = location.state?.club;

  const [posts, setPosts] = useState([]);
  const [events, setEvents] = useState([]);

  const [postContent, setPostContent] = useState("");

  const [showEventForm, setShowEventForm] = useState(false);

  const [eventData, setEventData] = useState({
    title: "",
    description: "",
    event_date: "",
    location: "",
  });

  const [loading, setLoading] = useState(true);

  if (!club) {
    return <h2>Club not found.</h2>;
  }

  useEffect(() => {
    loadClubData();
  }, [club.id]);

  const loadClubData = async () => {
    try {
      const [postsData, eventsData] = await Promise.all([
        getClubPosts(club.id),
        getClubEvents(club.id),
      ]);

      setPosts(postsData);
      setEvents(eventsData);
    } catch (error) {
      console.error("Failed to load club data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePost = async (e) => {
    e.preventDefault();

    if (!postContent.trim()) return;

    try {
      const newPost = await createClubPost(club.id, {
        content: postContent,
        username: "Anonymous",
      });

      setPosts((prevPosts) => [newPost, ...prevPosts]);

      setPostContent("");
    } catch (error) {
      console.error(error);
      alert("Failed to create post.");
    }
  };

  const handleCreateEvent = async (e) => {
    e.preventDefault();

    if (!eventData.title || !eventData.event_date) {
      alert("Please enter an event title and date.");
      return;
    }

    try {
      const newEvent = await createClubEvent(club.id, {
        ...eventData,
        created_by: "Anonymous",
      });

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

          <h1>
            {club.icon} {club.name}
          </h1>

          <p className="category">
            {club.category}
          </p>

          {/* STATS */}

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

          {/* ABOUT */}

          <section>

            <h2>About</h2>

            <p>
              The {club.name} encourages students to
              collaborate, organize events, participate
              in competitions, and build technical as well
              as leadership skills.
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

                    📅 <strong>{event.title}</strong>

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

          {/* ANONYMOUS POSTS */}

          <section>

            <h2>Anonymous Discussion</h2>

            <form onSubmit={handlePost}>

              <textarea
                placeholder="Share something with the club anonymously..."
                value={postContent}
                onChange={(e) =>
                  setPostContent(e.target.value)
                }
              />

              <button type="submit">
                Post Anonymously
              </button>

            </form>

            <div className="posts">

              {loading ? (
                <p>Loading posts...</p>
              ) : posts.length === 0 ? (
                <p>No posts yet. Start the discussion!</p>
              ) : (

                posts.map((post) => (

                  <div
                    className="post-card"
                    key={post.id}
                  >

                    <strong>👤 Anonymous</strong>

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

          {/* JOIN */}

          <button className="join-btn">
            Join Club
          </button>

        </div>

      </main>

    </div>
  );
}

export default ClubDetails;