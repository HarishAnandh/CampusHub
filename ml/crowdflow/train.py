import os
import joblib
import pandas as pd

from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import OneHotEncoder
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import (
    accuracy_score,
    classification_report,
    confusion_matrix,
    f1_score,
)

# --------------------------------------------------
# 1. Load dataset
# --------------------------------------------------

DATASET_PATH = "crowdflow_synthetic_dataset.csv"

df = pd.read_csv(DATASET_PATH)

print("=" * 60)
print("CrowdFlow ML Training")
print("=" * 60)

print(f"\nDataset shape: {df.shape}")

print("\nRisk distribution:")
print(df["risk_level"].value_counts())

print("\nSplit distribution:")
print(df["split"].value_counts())


# --------------------------------------------------
# 2. Separate features and target
# --------------------------------------------------

TARGET = "risk_level"

DROP_COLUMNS = [
    "id",
    "risk_level",
    "split",
]

X = df.drop(columns=DROP_COLUMNS)
y = df[TARGET]


# --------------------------------------------------
# 3. Use the predefined dataset split
# --------------------------------------------------

train_df = df[df["split"] == "train"].copy()
validation_df = df[df["split"] == "validation"].copy()
test_df = df[df["split"] == "test"].copy()

X_train = train_df.drop(columns=DROP_COLUMNS)
y_train = train_df[TARGET]

X_validation = validation_df.drop(columns=DROP_COLUMNS)
y_validation = validation_df[TARGET]

X_test = test_df.drop(columns=DROP_COLUMNS)
y_test = test_df[TARGET]

print("\nTraining records:", len(X_train))
print("Validation records:", len(X_validation))
print("Test records:", len(X_test))


# --------------------------------------------------
# 4. Identify categorical and numerical features
# --------------------------------------------------

categorical_features = [
    "disaster_type",
    "blocked_route",
]

numerical_features = [
    "crowd_size",
    "venue_area",
    "entry_points",
    "exit_points",
    "road_width",
    "walking_speed",
    "emergency_response_time",
    "shelter_capacity",
    "density",
    "flow_rate",
]


# --------------------------------------------------
# 5. Preprocessing
# --------------------------------------------------

preprocessor = ColumnTransformer(
    transformers=[
        (
            "categorical",
            OneHotEncoder(
                handle_unknown="ignore"
            ),
            categorical_features,
        ),
        (
            "numerical",
            "passthrough",
            numerical_features,
        ),
    ]
)


# --------------------------------------------------
# 6. Transform training data
# --------------------------------------------------

X_train_processed = preprocessor.fit_transform(X_train)

X_validation_processed = preprocessor.transform(
    X_validation
)

X_test_processed = preprocessor.transform(
    X_test
)


# --------------------------------------------------
# 7. Train Random Forest
# --------------------------------------------------

print("\nTraining Random Forest...")

model = RandomForestClassifier(
    n_estimators=300,
    max_depth=12,
    min_samples_split=4,
    min_samples_leaf=2,
    random_state=42,
    class_weight="balanced",
    n_jobs=-1,
)

model.fit(
    X_train_processed,
    y_train,
)

print("Training complete.")


# --------------------------------------------------
# 8. Validation evaluation
# --------------------------------------------------

validation_predictions = model.predict(
    X_validation_processed
)

validation_accuracy = accuracy_score(
    y_validation,
    validation_predictions,
)

validation_f1 = f1_score(
    y_validation,
    validation_predictions,
    average="macro",
)

print("\n" + "=" * 60)
print("VALIDATION RESULTS")
print("=" * 60)

print(
    f"Accuracy : {validation_accuracy:.4f}"
)

print(
    f"Macro F1 : {validation_f1:.4f}"
)

print("\nClassification Report:")
print(
    classification_report(
        y_validation,
        validation_predictions,
        zero_division=0,
    )
)


# --------------------------------------------------
# 9. Final test evaluation
# --------------------------------------------------

test_predictions = model.predict(
    X_test_processed
)

test_accuracy = accuracy_score(
    y_test,
    test_predictions,
)

test_f1 = f1_score(
    y_test,
    test_predictions,
    average="macro",
)

print("\n" + "=" * 60)
print("TEST RESULTS")
print("=" * 60)

print(
    f"Accuracy : {test_accuracy:.4f}"
)

print(
    f"Macro F1 : {test_f1:.4f}"
)

print("\nClassification Report:")
print(
    classification_report(
        y_test,
        test_predictions,
        zero_division=0,
    )
)


# --------------------------------------------------
# 10. Confusion matrix
# --------------------------------------------------

labels = [
    "Low",
    "Moderate",
    "High",
    "Critical",
]

cm = confusion_matrix(
    y_test,
    test_predictions,
    labels=labels,
)

print("\nConfusion Matrix:")
print(labels)
print(cm)


# --------------------------------------------------
# 11. Save model
# --------------------------------------------------

MODEL_DIR = "model"

os.makedirs(
    MODEL_DIR,
    exist_ok=True,
)

model_path = os.path.join(
    MODEL_DIR,
    "crowdflow_risk_model.joblib",
)

preprocessor_path = os.path.join(
    MODEL_DIR,
    "crowdflow_preprocessor.joblib",
)

joblib.dump(
    model,
    model_path,
)

joblib.dump(
    preprocessor,
    preprocessor_path,
)

print("\n" + "=" * 60)
print("MODEL SAVED")
print("=" * 60)

print(f"Model       : {model_path}")
print(f"Preprocessor: {preprocessor_path}")

print("\nCrowdFlow ML training completed successfully.")