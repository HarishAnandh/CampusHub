import React, { useState } from "react";

function CrowdInputForm({ onSimulate }) {
    const [formData, setFormData] = useState({
        disasterType: "Fire",
        population: 1000,
        venueArea: 5000,
        entryPoints: 2,
        exitPoints: 4,
        walkingSpeed: 1.2,
        blockedRoute: "None",
        emergencyResponse: 5,
        shelterCapacity: 800,
    });

    const updateValue = (field, value) => {
        setFormData((previous) => ({
            ...previous,
            [field]: value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        onSimulate(formData);
    };

    return (
        <section className="scenario-panel">
            <h2>SCENARIO PARAMETERS</h2>

            <form onSubmit={handleSubmit}>
                <div className="parameter-group">
                    <label>DISASTER TYPE</label>

                    <select
                        value={formData.disasterType}
                        onChange={(event) =>
                            updateValue("disasterType", event.target.value)
                        }
                    >
                        <option>Fire</option>
                        <option>Flood</option>
                        <option>Earthquake</option>
                        <option>Stampede</option>
                        <option>Chemical Leak</option>
                    </select>
                </div>

                <div className="parameter-group">
                    <div className="parameter-heading">
                        <label>POPULATION</label>
                        <strong>{formData.population.toLocaleString()}</strong>
                    </div>

                    <input
                        type="range"
                        min="100"
                        max="10000"
                        step="100"
                        value={formData.population}
                        onChange={(event) =>
                            updateValue("population", Number(event.target.value))
                        }
                    />

                    <div className="range-labels">
                        <span>100</span>
                        <span>10,000</span>
                    </div>
                </div>

                <div className="parameter-group">
                    <div className="parameter-heading">
                        <label>AREA SIZE</label>
                        <strong>{formData.venueArea.toLocaleString()} M²</strong>
                    </div>

                    <input
                        type="range"
                        min="500"
                        max="50000"
                        step="500"
                        value={formData.venueArea}
                        onChange={(event) =>
                            updateValue("venueArea", Number(event.target.value))
                        }
                    />

                    <div className="range-labels">
                        <span>500</span>
                        <span>50,000</span>
                    </div>
                </div>

                <div className="parameter-group">
                    <div className="parameter-heading">
                        <label>NUMBER OF EXITS</label>
                        <strong>{formData.exitPoints}</strong>
                    </div>

                    <input
                        type="range"
                        min="1"
                        max="8"
                        value={formData.exitPoints}
                        onChange={(event) =>
                            updateValue("exitPoints", Number(event.target.value))
                        }
                    />

                    <div className="range-labels">
                        <span>1</span>
                        <span>8</span>
                    </div>
                </div>

                <div className="parameter-group">
                    <div className="parameter-heading">
                        <label>WALKING SPEED</label>
                        <strong>{formData.walkingSpeed.toFixed(1)} M/S</strong>
                    </div>

                    <input
                        type="range"
                        min="0.3"
                        max="2"
                        step="0.1"
                        value={formData.walkingSpeed}
                        onChange={(event) =>
                            updateValue("walkingSpeed", Number(event.target.value))
                        }
                    />

                    <div className="range-labels">
                        <span>0.3</span>
                        <span>2.0</span>
                    </div>
                </div>

                <div className="parameter-group">
                    <div className="parameter-heading">
                        <label>BLOCKED ROUTE</label>
                        <strong>{formData.blockedRoute}</strong>
                    </div>

                    <select
                        value={formData.blockedRoute}
                        onChange={(event) =>
                            updateValue("blockedRoute", event.target.value)
                        }
                    >
                        <option value="None">None</option>
                        <option value="LibraryJunction">Library Junction</option>
                        <option value="SportsGround">Sports Ground</option>
                        <option value="AuditoriumRoad">Auditorium Road</option>
                        <option value="HostelBlock">Hostel Block</option>
                        <option value="Cafeteria">Cafeteria</option>
                    </select>
                </div>

                <div className="parameter-group">
                    <div className="parameter-heading">
                        <label>EMERGENCY RESPONSE</label>
                        <strong>{formData.emergencyResponse} MIN</strong>
                    </div>

                    <input
                        type="range"
                        min="1"
                        max="30"
                        value={formData.emergencyResponse}
                        onChange={(event) =>
                            updateValue("emergencyResponse", Number(event.target.value))
                        }
                    />

                    <div className="range-labels">
                        <span>1</span>
                        <span>30</span>
                    </div>
                </div>

                <div className="parameter-group">
                    <div className="parameter-heading">
                        <label>SHELTER CAPACITY</label>
                        <strong>{formData.shelterCapacity.toLocaleString()}</strong>
                    </div>

                    <input
                        type="range"
                        min="100"
                        max="5000"
                        step="100"
                        value={formData.shelterCapacity}
                        onChange={(event) =>
                            updateValue("shelterCapacity", Number(event.target.value))
                        }
                    />

                    <div className="range-labels">
                        <span>100</span>
                        <span>5,000</span>
                    </div>
                </div>

                <button className="run-button" type="submit">
                    RUN SIMULATION
                </button>
            </form>
        </section>
    );
}

export default CrowdInputForm;