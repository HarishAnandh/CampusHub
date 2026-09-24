import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import { simulateRoute } from "../../services/safety/routeSimulation";
import CrowdInputForm from "../../components/safety/CrowdInputForm";
import CrowdSimulation from "../../components/safety/CrowdSimulation";

import "../../styles/safety/crowdFlow.css";

function CrowdFlow() {
  const [simulationResult, setSimulationResult] = useState(null);

  const handleSimulation = (formData) => {
    const routeResult = simulateRoute({
      crowdSize: formData.population,
      venueArea: formData.venueArea,
      entryPoints: formData.entryPoints,
      exitPoints: formData.exitPoints,
      roadWidth: 4,
      walkingSpeed: formData.walkingSpeed,
      blockedRoute: formData.blockedRoute,
    });

    const shelterUsage = Math.round(
      (formData.population / formData.shelterCapacity) * 100
    );

    const affectedPeople = Math.round(
      formData.population *
      Math.min(
        0.95,
        0.25 +
        formData.emergencyResponse / 100 +
        formData.population / 20000
      )
    );

    let severity = "LOW";

    if (routeResult.congestion === "Moderate") {
      severity = "MODERATE";
    } else if (routeResult.congestion === "High") {
      severity = "HIGH";
    } else if (routeResult.congestion === "Critical") {
      severity = "CRITICAL";
    }

    setSimulationResult({
      ...routeResult,
      severity,
      affectedPeople,
      shelterUsage,
    });
  };

  return (
    <div className="dashboard-layout">
      <Sidebar />

      <div className="dashboard-main">
        <Navbar />

        <main className="crowd-flow-page">
          <div className="safety-page-header">
            <div>
              <p className="page-eyebrow">Crowd Planning and Simulation</p>
              <h1>CrowdFlow</h1>
              <p>
                Configure crowd conditions and simulate movement and
                congestion.
              </p>
            </div>
          </div>

          <div className="crowd-content-grid">
            <CrowdInputForm onSimulate={handleSimulation} />

            <CrowdSimulation result={simulationResult} />
          </div>
        </main>
      </div>
    </div>
  );
}

export default CrowdFlow;