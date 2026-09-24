import React from "react";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

import SafetyReportForm from "../../components/safety/SafetyReportForm";
import SafetyMap from "../../components/safety/SafetyMap";
import RiskSummary from "../../components/safety/RiskSummary";

import "../../styles/safety/campusShield.css";

function CampusShield() {
  return (
    <div className="dashboard-layout">
      <Sidebar />

      <div className="dashboard-main">
        <Navbar />

        <main className="campus-shield-page">
          <div className="safety-page-header">
            <div>
              <p className="page-eyebrow">Campus Safety Intelligence</p>
              <h1>CampusShield</h1>
              <p>
                Report campus safety concerns and explore data-driven safety
                insights.
              </p>
            </div>
          </div>

          <RiskSummary />

          <div className="safety-content-grid">
            <SafetyReportForm />
            <SafetyMap />
          </div>
        </main>
      </div>
    </div>
  );
}

export default CampusShield;