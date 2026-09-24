import React from "react";

function CrowdSimulation({ result }) {
    if (!result) {
        return (
            <section className="results-panel">
                <h2>SIMULATION RESULTS</h2>

                <p className="empty-result">
                    Adjust parameters and click <strong>Run Simulation</strong> to see
                    results.
                </p>
            </section>
        );
    }

    const {
        density,
        estimatedTravelTime,
        congestion,
        bottleneck,
        route,
        affectedPeople,
        shelterUsage,
        severity,
    } = result;

    return (
        <section className="results-panel">
            <h2>SIMULATION RESULTS</h2>

            <div className="metrics-grid">
                <div className="metric-card severity-card">
                    <span>SEVERITY</span>
                    <strong>{severity}</strong>
                </div>

                <div className="metric-card">
                    <span>EVACUATION TIME</span>
                    <strong>
                        {estimatedTravelTime
                            ? `${estimatedTravelTime.toFixed(1)} min`
                            : "N/A"}
                    </strong>
                </div>

                <div className="metric-card">
                    <span>CROWD DENSITY</span>
                    <strong>{density.toFixed(1)} ppl/m²</strong>
                </div>

                <div className="metric-card">
                    <span>CONGESTION</span>
                    <strong>{congestion}</strong>
                    <div className="metric-progress">
                        <div
                            style={{
                                width:
                                    congestion === "Critical"
                                        ? "100%"
                                        : congestion === "High"
                                            ? "75%"
                                            : congestion === "Moderate"
                                                ? "50%"
                                                : "20%",
                            }}
                        />
                    </div>
                </div>

                <div className="metric-card">
                    <span>BOTTLENECKS</span>
                    <strong>{route?.path?.length ? 1 : 0}</strong>
                </div>

                <div className="metric-card">
                    <span>SHELTER USAGE</span>
                    <strong>{shelterUsage}%</strong>
                    <div className="metric-progress shelter-progress">
                        <div style={{ width: `${Math.min(shelterUsage, 100)}%` }} />
                    </div>
                </div>

                <div className="metric-card">
                    <span>AFFECTED PEOPLE</span>
                    <strong>{affectedPeople}</strong>
                </div>
            </div>

            <h3>BOTTLENECK LOCATIONS</h3>

            <div className="bottleneck-tags">
                <span>{bottleneck}</span>
            </div>

            <h3>EVACUATION ROUTE DIAGRAM</h3>

            <div className="route-diagram">
                <h4>EVACUATION MAP</h4>

                <div className="route-map">
                    <div className="route-node route-top">4</div>
                    <div className="route-node route-left">3</div>
                    <div className="route-node route-right">1</div>
                    <div className="route-node route-bottom">2</div>

                    <div className="danger-point">
                        <span>!</span>
                    </div>

                    <div className="route-line vertical-line" />
                    <div className="route-line horizontal-line" />

                    <p className="danger-label">Danger</p>
                </div>
            </div>

            <div className="route-summary">
                <strong>CALCULATED ROUTE</strong>

                {route?.available ? (
                    <p>{route.path.join(" → ")}</p>
                ) : (
                    <p>No available evacuation route.</p>
                )}
            </div>
        </section>
    );
}

export default CrowdSimulation;