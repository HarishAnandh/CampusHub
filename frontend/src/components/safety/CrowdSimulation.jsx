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
        blockedRoute,
        decisionBranches = [],
    } = result;

    /*
     * IMPORTANT:
     * Branches come ONLY from decisionBranches.
     *
     * route.path is used only to determine which branch
     * was selected by the route calculation.
     */
    const branches = decisionBranches.slice(0, 6);

    /*
     * The first node after MainGate in the calculated route
     * tells us which decision branch was selected.
     *
     * Example:
     * MainGate → LibraryJunction → AuditoriumRoad → ExitGate
     *
     * Selected branch = LibraryJunction
     */
    const selectedBranch =
        route?.path?.length > 1
            ? route.path[1]
            : null;

    /*
     * Calculate positions around ONE fixed center node.
     *
     * Different branch counts produce different combinations:
     *
     * 2 → left / right
     * 3 → top / bottom-left / bottom-right
     * 4 → top / right / bottom / left
     * 5 → top + four surrounding
     * 6 → six evenly distributed branches
     */
    const getBranchPosition = (index, total) => {
        const layouts = {
            2: [-90, 90],

            3: [-90, 30, 150],

            4: [-90, 0, 90, 180],

            5: [-90, -18, 54, 126, 198],

            6: [-90, -30, 30, 90, 150, 210],
        };

        const angles = layouts[total] || layouts[6];

        return angles[index] ?? -90;
    };

    /*
     * Convert angle to coordinates around the center.
     *
     * The center remains at 50%, 50%.
     * Every branch is positioned relative to it.
     */
    const getBranchStyle = (angle) => {
        const radius = 38;

        const radians = (angle * Math.PI) / 180;

        const x = 50 + radius * Math.cos(radians);
        const y = 50 + radius * Math.sin(radians);

        return {
            left: `${x}%`,
            top: `${y}%`,
        };
    };

    /*
     * Line from the center to a branch.
     */
    const getLineStyle = (angle) => {
        const length = 38;

        return {
            left: "50%",
            top: "50%",
            width: `${length}%`,
            transform: `
                rotate(${angle}deg)
                translateX(0)
            `,
        };
    };

    return (
        <section className="results-panel">
            <h2>SIMULATION RESULTS</h2>

            <div className="metrics-grid">
                <div className="metric-card severity-card">
                    <span>SEVERITY</span>
                    <strong>
                        {result?.mlRisk?.risk_level || "—"}
                    </strong>
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

                    <strong>
                        {density.toFixed(2)} ppl/m²
                    </strong>
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

                    <strong>
                        {route?.path?.length ? 1 : 0}
                    </strong>
                </div>

                <div className="metric-card">
                    <span>SHELTER USAGE</span>

                    <strong>
                        {result?.shelterUsage?.toFixed(1)}%
                    </strong>

                    <div className="progress-track">
                        <div
                            className="progress-fill"
                            style={{
                                width: `${Math.min(
                                    result?.shelterUsage ?? 0,
                                    100
                                )}%`,
                            }}
                        />
                    </div>
                </div>

                <div className="metric-card">
                    <span>AFFECTED PEOPLE</span>

                    <strong>
                        {affectedPeople}
                    </strong>
                </div>
            </div>

            <h3>BOTTLENECK LOCATIONS</h3>

            <div className="bottleneck-tags">
                <span>{bottleneck}</span>
            </div>

            <h3>EVACUATION ROUTE DIAGRAM</h3>

            <div className="route-diagram">
                <h4>EVACUATION MAP</h4>

                <div className="decision-route-map">

                    {/* ---------------------------------
                        CONNECTIONS FROM CENTER
                    ---------------------------------- */}

                    {branches.map((branch, index) => {
                        const angle = getBranchPosition(
                            index,
                            branches.length
                        );

                        const isSelected =
                            branch.node === selectedBranch;

                        const isBlocked =
                            branch.node === blockedRoute;

                        return (
                            <div
                                key={`line-${branch.node}`}
                                className={`decision-route-line
                                    ${isSelected ? "selected-route-line" : ""}
                                    ${isBlocked ? "blocked-route-line" : ""}
                                `}
                                style={getLineStyle(angle)}
                            />
                        );
                    })}


                    {/* ---------------------------------
                        FIXED CENTRAL DECISION NODE
                    ---------------------------------- */}

                    <div className="central-decision-node">
                        <span>!</span>

                        <small>
                            DECISION
                        </small>
                    </div>


                    {/* ---------------------------------
                        DYNAMIC DECISION BRANCHES
                    ---------------------------------- */}

                    {branches.map((branch, index) => {
                        const angle = getBranchPosition(
                            index,
                            branches.length
                        );

                        const isSelected =
                            branch.node === selectedBranch;

                        const isBlocked =
                            branch.node === blockedRoute;

                        return (
                            <div
                                key={branch.node}
                                className={`
                                    decision-branch
                                    ${isSelected
                                        ? "selected-decision-branch"
                                        : ""
                                    }
                                    ${isBlocked
                                        ? "blocked-decision-branch"
                                        : ""
                                    }
                                `}
                                style={getBranchStyle(angle)}
                            >
                                <span className="branch-number">
                                    {index + 1}
                                </span>

                                <span className="branch-name">
                                    {branch.node}
                                </span>

                                {isBlocked && (
                                    <span className="blocked-label">
                                        BLOCKED
                                    </span>
                                )}

                                {isSelected && !isBlocked && (
                                    <span className="selected-label">
                                        SELECTED
                                    </span>
                                )}
                            </div>
                        );
                    })}


                    {/* ---------------------------------
                        CENTER LABEL
                    ---------------------------------- */}

                    <div className="decision-map-label">
                        MAIN DECISION POINT
                    </div>
                </div>
            </div>

            {/* ---------------------------------
                CALCULATED ROUTE
            ---------------------------------- */}

            <div className="route-summary">
                <strong>CALCULATED ROUTE</strong>

                {route?.available ? (
                    <p>
                        {route.path.join(" → ")}
                    </p>
                ) : (
                    <p>
                        No available evacuation route.
                    </p>
                )}
            </div>
        </section>
    );
}

export default CrowdSimulation;