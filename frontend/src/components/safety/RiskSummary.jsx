import React from "react";

function RiskSummary() {
    return (
        <section className="risk-summary-grid">
            <div className="risk-stat-card">
                <span>Total Reports</span>
                <strong>0</strong>
            </div>

            <div className="risk-stat-card">
                <span>High-Risk Areas</span>
                <strong>0</strong>
            </div>

            <div className="risk-stat-card">
                <span>Verified Reports</span>
                <strong>0</strong>
            </div>
        </section>
    );
}

export default RiskSummary;