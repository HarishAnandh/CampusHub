import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import EventCard from "../components/EventCard";

import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";

import "leaflet/dist/leaflet.css";
import "../styles/events.css";

// Fix Leaflet marker icons with Vite
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

// Moves the map when an event is selected
function MapFocus({ event }) {
  const map = useMap();

  if (event) {
    map.setView([event.latitude, event.longitude], 16);
  }

  return null;
}

function Events() {
  const [search, setSearch] = useState("");
  const [selectedEvent, setSelectedEvent] = useState(null);

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
      latitude: 13.0108,
      longitude: 80.2356,
      description:
        "Join us for a 24-hour campus hackathon where students collaborate, build innovative solutions and compete with teams from across campus.",
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
      latitude: 13.0125,
      longitude: 80.2368,
      description:
        "Learn the fundamentals of artificial intelligence and explore practical applications through an interactive hands-on workshop.",
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
      latitude: 13.0095,
      longitude: 80.2378,
      description:
        "Experience an evening of music, dance, performances and cultural activities organized by the CampusHub community.",
    },
  ];

  const filteredEvents = events.filter((event) =>
    event.title.toLowerCase().includes(search.toLowerCase())
  );

  const defaultCenter = [13.0108, 80.2356];

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

        {/* MAP */}
        <section className="event-map-section">
          <div className="map-heading">
            <div>
              <h2>Campus Events Map</h2>
              <p>Explore where events are happening around campus.</p>
            </div>

            <span className="map-live">
              ● Live Map
            </span>
          </div>

          <div className="event-map">
            <MapContainer
              center={defaultCenter}
              zoom={16}
              scrollWheelZoom={true}
            >
              <TileLayer
                attribution='&copy; OpenStreetMap contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              <MapFocus event={selectedEvent} />

              {filteredEvents.map((event) => (
                <Marker
                  key={event.id}
                  position={[event.latitude, event.longitude]}
                  eventHandlers={{
                    click: () => setSelectedEvent(event),
                  }}
                >
                  <Popup>
                    <div className="map-popup">
                      <strong>{event.icon} {event.title}</strong>
                      <p>{event.location}</p>

                      <button
                        onClick={() => setSelectedEvent(event)}
                      >
                        View Event
                      </button>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        </section>

        {/* SEARCH */}
        <input
          type="text"
          className="search-box"
          placeholder="Search events..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* EVENT CARDS */}
        <div className="events-grid">
          {filteredEvents.map((event) => (
            <div
              key={event.id}
              onClick={() => setSelectedEvent(event)}
              className={
                selectedEvent?.id === event.id
                  ? "event-card-wrapper selected-event"
                  : "event-card-wrapper"
              }
            >
              <EventCard {...event} />
            </div>
          ))}
        </div>

        {/* SELECTED EVENT DESCRIPTION */}
        {selectedEvent && (
          <section className="selected-event-section">
            <div className="selected-event-header">
              <div>
                <span className="selected-category">
                  {selectedEvent.category}
                </span>

                <h2>
                  {selectedEvent.icon} {selectedEvent.title}
                </h2>

                <p className="selected-club">
                  Organized by {selectedEvent.club}
                </p>
              </div>

              <button
                className="close-event-btn"
                onClick={() => setSelectedEvent(null)}
              >
                ✕
              </button>
            </div>

            <div className="event-info-row">
              <span>📅 {selectedEvent.date}</span>
              <span>⏰ {selectedEvent.time}</span>
              <span>📍 {selectedEvent.location}</span>
              <span>👥 {selectedEvent.participants} participants</span>
            </div>

            <div className="event-description">
              <h3>About this event</h3>

              <p>{selectedEvent.description}</p>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

export default Events;