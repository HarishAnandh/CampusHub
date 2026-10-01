import joblib
import pandas as pd


# --------------------------------------------------
# 1. Load trained model and preprocessor
# --------------------------------------------------

model = joblib.load(
    "model/crowdflow_risk_model.joblib"
)

preprocessor = joblib.load(
    "model/crowdflow_preprocessor.joblib"
)


# --------------------------------------------------
# 2. Create a new CrowdFlow scenario
# --------------------------------------------------

scenario = pd.DataFrame([
    {
        "disaster_type": "Fire",
        "crowd_size": 8000,
        "venue_area": 1000,
        "entry_points": 2,
        "exit_points": 2,
        "road_width": 5,
        "walking_speed": 1.2,
        "emergency_response_time": 8,
        "shelter_capacity": 6000,
        "blocked_route": "None",
        "density": 8.0,
        "flow_rate": 48.0,
    }
])


# --------------------------------------------------
# 3. Preprocess the scenario
# --------------------------------------------------

scenario_processed = preprocessor.transform(
    scenario
)


# --------------------------------------------------
# 4. Predict risk
# --------------------------------------------------

prediction = model.predict(
    scenario_processed
)[0]


probabilities = model.predict_proba(
    scenario_processed
)[0]


classes = model.classes_


# --------------------------------------------------
# 5. Display result
# --------------------------------------------------

print("=" * 60)
print("CROWDFLOW RISK PREDICTION")
print("=" * 60)

print("\nScenario:")
print(scenario.to_string(index=False))

print("\nPredicted Risk:")
print(f"  {prediction}")

print("\nRisk Probabilities:")

for class_name, probability in zip(
    classes,
    probabilities
):
    print(
        f"  {class_name:<10} "
        f"{probability * 100:.2f}%"
    )

print("\n" + "=" * 60)
