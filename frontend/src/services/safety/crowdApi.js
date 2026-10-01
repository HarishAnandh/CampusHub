const API_BASE_URL = "https://campushub-crowdflow-ml.onrender.com";

export async function predictCrowdRisk(data) {
  const payload = {
    disaster_type: data.disasterType,
    crowd_size: Number(data.population),
    venue_area: Number(data.venueArea),
    entry_points: Number(data.entryPoints),
    exit_points: Number(data.exitPoints),
    road_width: Number(data.roadWidth || 5),
    walking_speed: Number(data.walkingSpeed),
    emergency_response_time: Number(data.emergencyResponse),
    shelter_capacity: Number(data.shelterCapacity),
    blocked_route: data.blockedRoute,
  };

  console.log("CrowdFlow ML payload:", payload);

  const response = await fetch(`${API_BASE_URL}/predict`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorBody = await response.text();

    console.error("ML API error:", response.status, errorBody);

    throw new Error(`ML API error ${response.status}: ${errorBody}`);
  }

  return response.json();
}