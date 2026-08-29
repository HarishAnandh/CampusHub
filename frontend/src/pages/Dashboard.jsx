import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "../styles/dashboard.css";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import DashboardCard from "../components/DashboardCard";
import AnnouncementCard from "../components/AnnouncementCard";
import QuickAction from "../components/QuickAction";

import {
  getClubs,
  getPolls,
} from "../services/api";

function Dashboard() {
  const username = localStorage.getItem("username") || "User";
  const navigate = useNavigate();

  const [clubs, setClubs] = useState([]);
  const [polls, setPolls] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const [clubsData, pollsData] = await Promise.all([
        getClubs(),
        getPolls(),
      ]);

      setClubs(clubsData || []);
      setPolls(pollsData || []);
    } catch (error) {
      console.error("Failed to load dashboard:", error);
    } finally {
      setLoading(false);
    }
  };

  /* --------------------------------
     STATIC PEOPLE GRAPH
     -------------------------------- */

  const peopleData = [
    { year: "2021", value: 8 },
    { year: "2022", value: 18 },
    { year: "2023", value: 20 },
    { year: "2024", value: 33 },
    { year: "2025", value: 36 },
  ];

  /* --------------------------------
     CLUB CATEGORY SPLIT
     -------------------------------- */

  const categoryCounts = clubs.reduce((acc, club) => {
    const category = club.category || "Other";

    acc[category] = (acc[category] || 0) + 1;

    return acc;
  }, {});

  const categoryEntries = Object.entries(categoryCounts);

  const totalClubs = clubs.length;

  const donutColors = [
    "#ff7f27",
    "#356b7a",
    "#8a9a5b",
    "#d6a756",
    "#7b8794",
    "#c76d4d",
  ];

  /* --------------------------------
     GRAPH CALCULATIONS
     -------------------------------- */

  const graphWidth = 760;
  const graphHeight = 360;

  const graphLeft = 70;
  const graphRight = 25;
  const graphTop = 25;
  const graphBottom = 55;

  const plotWidth =
    graphWidth - graphLeft - graphRight;

  const plotHeight =
    graphHeight - graphTop - graphBottom;

  const maxValue = 40;

  const getX = (index) =>
    graphLeft +
    (index / (peopleData.length - 1)) * plotWidth;

  const getY = (value) =>
    graphTop +
    plotHeight -
    (value / maxValue) * plotHeight;

  const points = peopleData
    .map((item, index) => {
      return `${getX(index)},${getY(item.value)}`;
    })
    .join(" ");

  const gridValues = [0, 10, 20, 30, 40];


  
  /* --------------------------------
     STATS
     -------------------------------- */

  const stats = [
    {
      title: "My Clubs",
      value: loading ? "..." : clubs.length,
    },
    {
      title: "Events",
      value: 2,
    },
    {
      title: "Active Polls",
      value: loading ? "..." : polls.length,
    },
    {
      title: "Documents",
      value: 0,
    },
  ];

  const announcements = [
    {
      title: "Coding Club Recruitment",
      time: "2 hours ago",
    },
    {
      title: "IEEE General Meeting",
      time: "Yesterday",
    },
  ];

  return (
    <div className="dashboard-layout">

      <Sidebar />

      <main className="dashboard-content">

        <Navbar title="Dashboard" />

        {/* HERO */}

        <section className="dashboard-hero">

          <h1>
            Welcome back, {username} 👋
          </h1>

          <p className="subtitle">
            One Platform. Every Club. Every Voice.
          </p>

        </section>

        {/* STAT CARDS */}

        <div className="card-grid">

          {stats.map((card, index) => (
            <DashboardCard
              key={index}
              title={card.title}
              value={card.value}
            />
          ))}

        </div>

        {/* MAIN DASHBOARD */}

        <div className="dashboard-sections">

          {/* LEFT SIDE */}

          <div className="dashboard-main-column">

            {/* PEOPLE GRAPH */}

            <section className="dashboard-panel graph-panel">

              <div className="panel-header">

                <div>
                  <h2>People on CampusHub</h2>

                  <p>
                    Community growth over time
                  </p>
                </div>

                <span className="live-indicator">
                  <span></span>
                  Live
                </span>

              </div>

              {loading ? (

                <div className="chart-loading">

                  <div className="loading-spinner"></div>

                  <p>
                    Loading community data...
                  </p>

                </div>

              ) : (

                <div className="graph-container">

                  <svg
                    viewBox={`0 0 ${graphWidth} ${graphHeight}`}
                    className="people-graph"
                  >

                    {/* GRID + Y AXIS */}

                    {gridValues.map((value) => {

                      const y = getY(value);

                      return (
                        <g key={value}>

                          <line
                            x1={graphLeft}
                            y1={y}
                            x2={graphWidth - graphRight}
                            y2={y}
                            className="graph-grid-line"
                          />

                          <text
                            x={graphLeft - 15}
                            y={y + 5}
                            className="graph-y-label"
                            textAnchor="end"
                          >
                            {value}
                          </text>

                        </g>
                      );
                    })}

                    {/* AXES */}

                    <line
                      x1={graphLeft}
                      y1={graphTop}
                      x2={graphLeft}
                      y2={graphHeight - graphBottom}
                      className="graph-axis"
                    />

                    <line
                      x1={graphLeft}
                      y1={graphHeight - graphBottom}
                      x2={graphWidth - graphRight}
                      y2={graphHeight - graphBottom}
                      className="graph-axis"
                    />

                    {/* Y AXIS LABEL */}

                    <text
                      x="18"
                      y={graphHeight / 2}
                      className="axis-title"
                      transform={`rotate(-90 18 ${
                        graphHeight / 2
                      })`}
                      textAnchor="middle"
                    >
                      People
                    </text>

                    {/* X AXIS LABEL */}

                    <text
                      x={graphWidth / 2}
                      y={graphHeight - 5}
                      className="axis-title"
                      textAnchor="middle"
                    >
                      Year
                    </text>

                    {/* X LABELS */}

                    {peopleData.map((item, index) => (

                      <text
                        key={item.year}
                        x={getX(index)}
                        y={graphHeight - 28}
                        className="graph-x-label"
                        textAnchor="middle"
                      >
                        {item.year}
                      </text>

                    ))}

                    {/* LINE */}

                    <polyline
                      points={points}
                      className="people-line"
                    />

                    {/* POINTS */}

                    {peopleData.map((item, index) => (

                      <g key={item.year}>

                        <circle
                          cx={getX(index)}
                          cy={getY(item.value)}
                          r="7"
                          className="graph-point"
                        />

                        <circle
                          cx={getX(index)}
                          cy={getY(item.value)}
                          r="13"
                          className="graph-point-glow"
                        />

                      </g>

                    ))}

                  </svg>

                </div>

              )}

            </section>
            <section className="dashboard-panel dashboard-radar">

<div className="radar-header">

  <div>
    <h3>Campus Activity Radar</h3>
    <p>Live campus activity scan</p>
  </div>

  <span className="radar-status">
    ● ACTIVE
  </span>

</div>

<div className="radar">

  <div className="radar-ring ring-1"></div>
  <div className="radar-ring ring-2"></div>
  <div className="radar-ring ring-3"></div>

  <div className="radar-line"></div>

  <span className="radar-dot dot-1"></span>
  <span className="radar-dot dot-2"></span>
  <span className="radar-dot dot-3"></span>
  <span className="radar-dot dot-4"></span>

  <div className="radar-center"></div>

</div>

</section>
          </div>

          {/* RIGHT SIDE */}

          <div className="dashboard-side-column">

            {/* DONUT */}

            <section className="dashboard-panel donut-panel">

              <div className="panel-header">

                <div>
                  <h2>Club Distribution</h2>

                  <p>
                    Clubs by category
                  </p>
                </div>

              </div>

              

              {loading ? (

                <div className="donut-loading">
                  <div className="loading-spinner"></div>
                </div>

              ) : totalClubs === 0 ? (

                <div className="empty-chart">
                  No clubs available
                </div>

              ) : (

                <>
                  <div className="donut-wrapper">

                    <div
                      className="donut-chart"
                      style={{
                        background: (() => {

                          let current = 0;

                          const segments =
                            categoryEntries.map(
                              ([, count], index) => {

                                const start =
                                  (current /
                                    totalClubs) *
                                  100;

                                current += count;

                                const end =
                                  (current /
                                    totalClubs) *
                                  100;

                                return `${donutColors[index % donutColors.length]} ${start}% ${end}%`;

                              }
                            );

                          return `conic-gradient(${segments.join(", ")})`;

                        })(),
                      }}
                    >

                      <div className="donut-center">

                        <strong>
                          {totalClubs}
                        </strong>

                        <span>
                          Clubs
                        </span>

                      </div>

                    </div>

                  </div>

                  <div className="donut-legend">

                    {categoryEntries.map(
                      ([category, count], index) => (

                        <div
                          className="legend-item"
                          key={category}
                        >

                          <span
                            className="legend-dot"
                            style={{
                              background:
                                donutColors[
                                  index %
                                    donutColors.length
                                ],
                            }}
                          ></span>

                          <span className="legend-name">
                            {category}
                          </span>

                          <span className="legend-value">
                            {count}
                          </span>

                        </div>

                      )
                    )}

                  </div>
                </>

              )}

            </section>

            {/* ANNOUNCEMENTS */}

            <section className="announcement-section">

              <h2>Recent Announcements</h2>

              {announcements.map(
                (item, index) => (
                  <AnnouncementCard
                    key={index}
                    {...item}
                  />
                )
              )}

            </section>

            {/* QUICK ACTIONS */}

            <section className="quick-actions">

              <h2>Quick Actions</h2>

              <div
                onClick={() =>
                  navigate("/clubs")
                }
              >
                <QuickAction text="➕ Create Club" />
              </div>

              <div
                onClick={() =>
                  navigate("/events")
                }
              >
                <QuickAction text="📅 Create Event" />
              </div>

              <div
                onClick={() =>
                  navigate("/polls")
                }
              >
                <QuickAction text="🗳 Create Poll" />
              </div>

            </section>

          </div>

        </div>

      </main>

    </div>

    
  );
}

export default Dashboard;