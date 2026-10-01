import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import { simulateRoute } from "../../services/safety/routeSimulation";
import CrowdInputForm from "../../components/safety/CrowdInputForm";
import CrowdSimulation from "../../components/safety/CrowdSimulation";
import { predictCrowdRisk } from "../../services/safety/crowdApi";
import "../../styles/safety/crowdFlow.css";

function CrowdFlow() {
  // 1. Your states
  const [simulationResult, setSimulationResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 2. Your simulation function
  const handleSimulation = async (formData) => {
    try {
      setLoading(true);
      setError("");
  
      const routeResult = simulateRoute({
        crowdSize: Number(formData.population),
        venueArea: Number(formData.venueArea),
        entryPoints: Number(formData.entryPoints),
        exitPoints: Number(formData.exitPoints),
        roadWidth: Number(formData.roadWidth || 5),
        walkingSpeed: Number(formData.walkingSpeed),
        emergencyResponseTime: Number(formData.emergencyResponse || 5),
        blockedRoute: formData.blockedRoute,
    });
  
      const mlResult = await predictCrowdRisk(formData);
  
      const shelterUsage =
  (Number(formData.population) /
    Math.max(Number(formData.shelterCapacity), 1)) *
  100;
  
      const affectedPeople =
        Number(formData.population) * 0.15;
  
        setSimulationResult({
          ...routeResult,
        
          mlRisk: mlResult,
        
          shelterUsage,
          affectedPeople,
        
          // TEMPORARY TEST DATA — exactly 4 branches
          decisionBranches: [
            {
              node: "LibraryJunction",
              distance: 10,
              route: [
                "MainGate",
                "LibraryJunction",
                "AuditoriumRoad",
                "ExitGate",
              ],
            },
            {
              node: "SportsGround",
              distance: 13,
              route: [
                "MainGate",
                "SportsGround",
                "Cafeteria",
                "ExitGate",
              ],
            },
            {
              node: "HostelBlock",
              distance: 15,
              route: [
                "MainGate",
                "HostelBlock",
                "Cafeteria",
                "ExitGate",
              ],
            },
            {
              node: "Cafeteria",
              distance: 17,
              route: [
                "MainGate",
                "Cafeteria",
                "ExitGate",
              ],
            },
          ],
        });
    } catch (err) {
      console.error(err);
      setError("Unable to run the crowd risk simulation.");
    } finally {
      setLoading(false);
    }
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