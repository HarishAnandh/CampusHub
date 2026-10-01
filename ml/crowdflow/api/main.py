from pathlib import Path

import joblib
import pandas as pd
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel


# --------------------------------------------------
# Paths
# --------------------------------------------------

BASE_DIR = Path(__file__).resolve().parent.parent

MODEL_PATH = (
    BASE_DIR
    / "model"
    / "crowdflow_risk_model.joblib"
)

PREPROCESSOR_PATH = (
    BASE_DIR
    / "model"
    / "crowdflow_preprocessor.joblib"
)


# --------------------------------------------------
# Load model
# --------------------------------------------------

model = joblib.load(MODEL_PATH)
preprocessor = joblib.load(PREPROCESSOR_PATH)


# --------------------------------------------------
# FastAPI application
# --------------------------------------------------

app = FastAPI(
    title="CrowdFlow ML API",
    description="ML-based crowd risk prediction API",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "https://campus-hub-woad-one.vercel.app",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --------------------------------------------------
# Request model
# --------------------------------------------------

class CrowdFlowRequest(BaseModel):
    disaster_type: str
    crowd_size: int
    venue_area: float
    entry_points: int
    exit_points: int
    road_width: float
    walking_speed: float
    emergency_response_time: float
    shelter_capacity: int
    blocked_route: str


# --------------------------------------------------
# Health check
# --------------------------------------------------

@app.get("/")
def root():
    return {
        "service": "CrowdFlow ML API",
        "status": "running",
    }


# --------------------------------------------------
# Prediction endpoint
# --------------------------------------------------

@app.post("/predict")
def predict_risk(request: CrowdFlowRequest):
    density = request.crowd_size / max(request.venue_area, 1)

    flow_rate = (
        density
        * request.walking_speed
        * request.road_width
        * max(request.exit_points, 1)
    )

    scenario = pd.DataFrame([{
        "disaster_type": request.disaster_type,
        "crowd_size": request.crowd_size,
        "venue_area": request.venue_area,
        "entry_points": request.entry_points,
        "exit_points": request.exit_points,
        "road_width": request.road_width,
        "walking_speed": request.walking_speed,
        "emergency_response_time": request.emergency_response_time,
        "shelter_capacity": request.shelter_capacity,
        "blocked_route": request.blocked_route,
        "density": density,
        "flow_rate": flow_rate,
    }])

    processed = preprocessor.transform(scenario)

    prediction = model.predict(processed)[0]

    probabilities = model.predict_proba(processed)[0]
    classes = model.classes_

    risk_probabilities = {
        class_name: round(float(probability) * 100, 2)
        for class_name, probability in zip(classes, probabilities)
    }

    return {
        "risk_level": prediction,
        "risk_probabilities": risk_probabilities,
        "density": round(density, 4),
        "flow_rate": round(flow_rate, 4),
    }