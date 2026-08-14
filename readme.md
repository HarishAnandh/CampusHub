# 🏛️ CampusHub

A student-focused campus management platform that brings clubs, events, polls, discussions, profiles, and student interactions together in one place.

## 🚀 Project Overview

CampusHub is a full-stack web application designed to provide students with a centralized platform for discovering and participating in campus activities.

The application supports:

* Student authentication
* Campus clubs
* Club membership
* Club discussions
* Club events
* Polls and voting
* User profiles
* Campus event locations
* Dynamic dashboard information
* Responsive UI

---

# 🛠️ Tech Stack

## Frontend

* React.js
* Vite
* React Router DOM
* CSS
* JavaScript
* React Icons

## Backend

* FastAPI
* Python
* SQLAlchemy
* Uvicorn
* JWT-based authentication

## Database

* PostgreSQL
* Supabase

## Deployment

* **Frontend:** Vercel
* **Backend:** Render
* **Database:** Supabase Cloud

---

# 📁 Project Structure

```text
CampusHub/
│
├── frontend/
│   ├── src/
│   │   ├── assets/
│   │   │
│   │   ├── components/
│   │   │   ├── Sidebar.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── DashboardCard.jsx
│   │   │   ├── EventCard.jsx
│   │   │   ├── AnnouncementCard.jsx
│   │   │   └── QuickAction.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Clubs.jsx
│   │   │   ├── ClubDetails.jsx
│   │   │   ├── Events.jsx
│   │   │   ├── Polls.jsx
│   │   │   └── Profile.jsx
│   │   │
│   │   ├── services/
│   │   │   └── api.js
│   │   │
│   │   ├── styles/
│   │   │   ├── global.css
│   │   │   ├── login.css
│   │   │   ├── dashboard.css
│   │   │   ├── events.css
│   │   │   ├── profile.css
│   │   │   └── clubDetails.css
│   │   │
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   └── package.json
│
├── backend/
│   ├── main.py
│   ├── models.py
│   ├── database.py
│   ├── requirements.txt
│   └── ...
│
└── README.md
```

---

# 🔐 Authentication

CampusHub includes backend-connected authentication.

### Registration

Students can create an account using:

* Username
* Email
* Password

### Login

Users authenticate through the FastAPI backend.

Authentication information is stored in the browser using:

```text
localStorage
```

The frontend uses the backend API through:

```text
VITE_API_URL
```

---

# 🏛️ Clubs

The Clubs module allows students to discover and interact with campus clubs.

### Features

* View available clubs
* View club details
* Join clubs
* Prevent duplicate membership
* Display club members
* Create club discussions
* Create club events
* View upcoming club events
* Edit club information

### Club Members

Once a user joins a club, they can be displayed in the **Club Members** section.

Membership information is stored in the PostgreSQL database.

---

# 💬 Anonymous Club Discussions

Club members can participate in anonymous discussions.

Users can:

* Create anonymous posts
* View existing posts
* View post timestamps

The user's identity is not displayed in the discussion UI.

---

# 📅 Events

CampusHub includes an Events module for discovering campus activities.

Currently supported:

* Event listing
* Event cards
* Event search
* Event date and time
* Event location
* Event description
* Club-specific event creation
* Campus event location visualization

The Events page is designed to support a live map where event locations can be represented using markers.

### Planned

* Fully functional global event creation
* Editable event information
* Editable event locations
* Interactive map-based event selection

---

# 🗳️ Polls

CampusHub includes a polling system.

Students can:

* View polls
* Create polls
* Add multiple options
* Vote on options
* View poll results

Poll data is stored in PostgreSQL.

---

# 📊 Dashboard

The Dashboard provides an overview of the student's CampusHub activity.

### Dashboard information

* My Clubs
* Events
* Active Polls
* Documents
* Upcoming Events
* Recent Announcements
* Quick Actions

The dashboard uses backend data for clubs and polls instead of relying entirely on static values.

### Quick Actions

The Dashboard provides shortcuts for:

* Create Club
* Create Event
* Create Poll

---

# 👤 Profile

The Profile section contains:

* Username
* Account information
* CampusHub activity
* Clubs joined
* Events
* Polls
* Account settings
* Logout

## Credits

CampusHub credits:

* **Harish Anandh** — Founder
* **Shanmugavel M** — CEO, Tech Head
* **Stefon S** — CMO

### Product

**A Hector Product**

---

# 🗺️ Event Location System

CampusHub includes support for displaying event locations.

The Events page is designed with a map-based interface where:

* Events can have locations
* Locations can be represented using markers
* Selecting an event can show its location
* Event descriptions can be displayed below the map

The system can later be extended with an interactive map provider.

---

# 🔌 API Integration

The frontend communicates with the FastAPI backend through:

```text
src/services/api.js
```

The API layer handles operations including:

```text
Authentication
Clubs
Club Posts
Club Events
Polls
Voting
Club Membership
Club Members
```

The backend API is deployed on Render.

---

# 🌐 Deployment

## Frontend — Vercel

The React/Vite frontend is deployed through Vercel.

Production API URL:

```text
https://campushub-backend-mvns.onrender.com
```

The Vercel environment variable should be:

```env
VITE_API_URL=https://campushub-backend-mvns.onrender.com
```

## Backend — Render

The FastAPI backend is deployed on Render.

The backend connects to the PostgreSQL database hosted through Supabase.

## Database — Supabase

CampusHub uses PostgreSQL through Supabase.

Database configuration is provided through environment variables and should **never be committed to GitHub**.

---

# 💻 Local Development

## Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend:

```text
http://localhost:5173
```

For local development, the frontend `.env` can contain:

```env
VITE_API_URL=http://127.0.0.1:8000
```

## Backend

```bash
cd backend
uvicorn main:app --reload
```

Backend:

```text
http://127.0.0.1:8000
```

FastAPI documentation:

```text
http://127.0.0.1:8000/docs
```

---

# 🔒 Environment Variables

Do **not** commit `.env` files containing credentials or database URLs.

Example frontend:

```env
VITE_API_URL=http://127.0.0.1:8000
```

Production Vercel:

```env
VITE_API_URL=https://campushub-backend-mvns.onrender.com
```

Backend environment variables include database configuration and other deployment secrets.

---

# 📌 Current Status

## Completed

* [x] React + Vite frontend
* [x] FastAPI backend
* [x] PostgreSQL/Supabase integration
* [x] User registration
* [x] User login
* [x] Dashboard
* [x] Clubs
* [x] Club details
* [x] Club membership
* [x] Club members
* [x] Anonymous discussions
* [x] Club events
* [x] Poll creation
* [x] Poll voting
* [x] Profile
* [x] Credits section
* [x] Vercel frontend deployment
* [x] Render backend deployment
* [x] Supabase database

## In Progress / Planned

* [ ] Fully functional global event creation
* [ ] Editable event locations
* [ ] Interactive live event map
* [ ] Dynamic announcements
* [ ] Document management
* [ ] More detailed dashboard analytics
* [ ] Additional profile statistics
* [ ] Improved event discovery

---

# 👨‍💻 Development

CampusHub is developed as a full-stack student-focused platform with a modular architecture.

The project separates:

```text
Frontend
    ↓
REST API
    ↓
FastAPI Backend
    ↓
SQLAlchemy
    ↓
PostgreSQL / Supabase
```

This architecture allows individual modules such as clubs, polls, events, and user profiles to be developed and extended independently.

---

# 📜 License

This project is currently developed as a CampusHub project for educational and demonstration purposes.

---

## 🏛️ CampusHub

**One Platform. Every Club. Every Voice.**
