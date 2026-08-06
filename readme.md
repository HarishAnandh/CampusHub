# 🏛️ CampusHub Frontend Handover

## Current Progress

The React project has been initialized using **Vite** and the basic frontend architecture has been set up.

### ✅ Completed

#### Project Setup
- React + Vite initialized
- Required dependencies installed:
  - react-router-dom
  - axios
  - react-icons
- Basic folder structure created

```
src/
│
├── assets/
├── components/
│   ├── Sidebar.jsx
│   ├── Navbar.jsx
│   ├── DashboardCard.jsx
│   ├── EventCard.jsx
│   ├── AnnouncementCard.jsx
│   └── QuickAction.jsx
│
├── pages/
│   ├── Login.jsx
│   ├── Dashboard.jsx
│   ├── Clubs.jsx
│   ├── ClubDetails.jsx
│   ├── Events.jsx
│   ├── Polls.jsx
│   └── Profile.jsx
│
├── services/
├── context/
├── styles/
│   ├── global.css
│   ├── login.css
│   └── dashboard.css
│
├── App.jsx
└── main.jsx
```

---

## Routing

React Router has been configured.

Available routes:

- `/`
- `/dashboard`
- `/clubs`
- `/clubs/:id`
- `/events`
- `/polls`
- `/profile`

---

## Login Page

Completed:

- Username login UI
- Password field
- CampusHub branding
- Responsive login card
- Login button currently navigates directly to Dashboard (temporary)

Authentication is **not connected to the backend yet**.

---

## Dashboard

Completed:

- Sidebar
- Navbar
- Dashboard cards
- Welcome section
- Upcoming Events section
- Recent Announcements section
- Quick Actions section

Currently using **mock data**.

---

## Styling

Completed:

- Global styling
- Login page styling
- Dashboard layout styling
- Sidebar styling
- Card styling

---

## Components Created

- Sidebar
- Navbar
- DashboardCard
- EventCard
- AnnouncementCard
- QuickAction

These components are reusable.

---

## Backend Status

Not started.

Currently everything uses static/mock data.

---

## Next Tasks

### Clubs Module

- Design Clubs page
- Club cards
- Search bar
- Join Club button
- Create Club page
- Club Details page

### Events

- Events list
- Event Details
- Create Event

### Polls

- Poll listing
- Voting UI
- Results page

### Profile

- User profile
- Joined clubs
- Settings

### Documents

- Upload page
- Download page

### Backend Integration

Later connect using:

- FastAPI
- PostgreSQL (Supabase)
- Axios API calls

---

## Tech Stack

Frontend

- React
- Vite
- React Router DOM
- Axios
- React Icons
- CSS

Backend (planned)

- FastAPI
- SQLAlchemy
- PostgreSQL
- JWT

---

## Run the Project

```bash
npm install
npm run dev
```

Runs on:

```
http://localhost:5173
```

---

## Notes

- Dashboard currently uses mock data.
- Authentication is temporary.
- Backend integration will be done after frontend pages are completed.
- Keep component-based architecture while developing new pages.