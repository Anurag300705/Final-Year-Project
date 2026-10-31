import os
from pathlib import Path
from typing import Optional, Union

import joblib
import numpy as np
import pandas as pd
from fastapi import FastAPI, HTTPException, Response
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

# Initialize FastAPI app
app = FastAPI(
    title="Mental Health & Digital Wellness Predictor API",
    description="Backend API powered by a trained Machine Learning model to assess student mental health scores based on daily digital and lifestyle habits.",
    version="1.0.0",
)

# Enable CORS for frontend integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins (e.g. Vite dev server on port 5173)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load trained Model
BASE_DIR = Path(__file__).resolve().parent
MODEL_FILE = BASE_DIR / "Model.pkl"

model = None

try:
    if MODEL_FILE.exists():
        model = joblib.load(MODEL_FILE)
        print(f"[INFO] Successfully loaded model from {MODEL_FILE}")
    else:
        print(f"[WARNING] Model file not found at {MODEL_FILE}")
except Exception as e:
    print(f"[ERROR] Failed to load model from {MODEL_FILE}: {e}")

# Known top countries from training dataset
TOP_COUNTRIES = {
    "India",
    "USA",
    "Canada",
    "Australia",
    "UK",
    "Germany",
    "Mexico",
    "Turkey",
    "France",
    "Other",
}


def normalize_country(country: str) -> str:
    cleaned = (country or "").strip()
    if cleaned in TOP_COUNTRIES:
        return cleaned
    # Normalize common abbreviations
    abbr_map = {
        "united states": "USA",
        "united states of america": "USA",
        "us": "USA",
        "united kingdom": "UK",
        "great britain": "UK",
        "england": "UK",
    }
    lower = cleaned.lower()
    if lower in abbr_map:
        return abbr_map[lower]
    return "Other"


def normalize_stress(stress: Union[str, int, float]) -> str:
    if isinstance(stress, (int, float)):
        val = float(stress)
        if val <= 3:
            return "Low"
        elif val <= 6:
            return "Medium"
        elif val <= 8:
            return "High"
        else:
            return "Very High"
    s = str(stress).strip()
    mapping = {
        "low": "Low",
        "medium": "Medium",
        "high": "High",
        "very high": "Very High",
        "very_high": "Very High",
    }
    return mapping.get(s.lower(), "Medium")


def normalize_academic_level(level: str) -> str:
    cleaned = (level or "").strip().lower()
    if "high" in cleaned or "school" in cleaned:
        return "High School"
    elif "grad" in cleaned and "under" not in cleaned:
        return "Graduate"
    else:
        return "Undergraduate"


def normalize_purpose(purpose: str) -> str:
    cleaned = (purpose or "").strip().lower()
    if "edu" in cleaned or "study" in cleaned:
        return "Education"
    elif "net" in cleaned or "work" in cleaned or "career" in cleaned:
        return "Networking"
    elif "news" in cleaned:
        return "News"
    else:
        return "Entertainment"


def get_category_label(score: float) -> str:
    if score < 3:
        return "Needs Attention"
    if score < 5:
        return "Fair"
    if score < 7:
        return "Good"
    if score < 9:
        return "Very Good"
    return "Excellent"


def get_feedback_message(score: float) -> str:
    if score < 3:
        return "Your daily routine shows signs of digital overload and stress. Consider reviewing your screen habits, establishing consistent sleep schedules, and seeking support if needed."
    elif score < 5:
        return "Consider making gradual, sustainable changes to your sleep, physical activity, and screen-time habits to support better mental well-being."
    elif score < 7:
        return "Your daily routine has several positive habits supporting your well-being. Look for opportunities to reduce stress and boost restful offline activities."
    elif score < 9:
        return "Your reported habits reflect a healthy and balanced routine. Keep prioritizing restorative sleep, movement, and mindful device use."
    else:
        return "Outstanding balance! Your habits correspond to a very high wellness score. Continue maintaining this healthy and mindful lifestyle."


# Request Schema
class PredictionRequest(BaseModel):
    age: float = Field(default=21, description="Age in years (e.g. 18-100)")
    gender: str = Field(default="Female", description="Gender (Female, Male, Other)")
    academic_lvl: Optional[str] = Field(
        default="Undergraduate",
        alias="academic_level",
        description="Academic level (Undergraduate, Graduate, High School)",
    )
    country: str = Field(default="India", description="Country of residence")
    most_used_platform: Optional[str] = Field(
        default="Instagram",
        alias="social_platform",
        description="Most used social media platform",
    )
    purpose_of_use: Optional[str] = Field(
        default="Entertainment",
        description="Primary purpose of social media use (Entertainment, Education, Networking, News)",
    )
    avg_daily_usage_hours: Optional[float] = Field(
        default=5.0,
        alias="screen_time",
        description="Average daily social media usage in hours",
    )
    daily_unlocks: float = Field(
        default=120, description="Estimated number of times phone is unlocked daily"
    )
    study_hours: float = Field(
        default=4.0, description="Hours spent studying or working daily"
    )
    physical_activity: Optional[float] = Field(
        default=1.5,
        alias="physical_activity_hours",
        description="Daily physical activity in hours",
    )
    sleep: Optional[float] = Field(
        default=7.0,
        alias="sleep_hours",
        description="Average sleep hours per night",
    )
    stress: Optional[Union[str, int, float]] = Field(
        default="Medium",
        alias="stress_level",
        description="Perceived stress level (Low, Medium, High, Very High or 1-10)",
    )

    class Config:
        populate_by_name = True


# Response Schema
class PredictionResponse(BaseModel):
    score: float
    category: str
    message: str
    details: dict


@app.get("/", summary="Root status check")
@app.head("/", summary="Root status check (HEAD)", operation_id="read_root_head")
def read_root(response: Response):
    response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    return {
        "status": "online",
        "message": "Student Digital Wellness & Mental Health Score API is running.",
        "model_loaded": model is not None,
    }


@app.get("/health", summary="Health check endpoint")
@app.head("/health", summary="Health check endpoint (HEAD)", operation_id="health_check_head")
def health_check(response: Response):
    response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    return {
        "status": "healthy" if model is not None else "degraded",
        "model_loaded": model is not None,
        "supported_features": [
            "Age",
            "Gender",
            "Academic_Level",
            "Country",
            "Most_Used_Platform",
            "Purpose_Of_Use",
            "Avg_Daily_Usage_Hours",
            "Daily_Unlocks",
            "Study_Hours",
            "Physical_Activity_Hours",
            "Sleep_Hours_Per_Night",
            "Stress_Level",
        ],
    }


@app.post("/predict", response_model=PredictionResponse)
def predict(req: PredictionRequest):
    if model is None:
        raise HTTPException(
            status_code=503,
            detail="Machine learning model is not available. Please ensure Model.pkl is present.",
        )

    try:
        # Normalize and prepare feature values
        age_val = float(req.age)
        study_hours_val = max(0.0, float(req.study_hours))
        avg_usage_val = max(0.0, float(req.avg_daily_usage_hours))
        unlocks_val = max(0.0, float(req.daily_unlocks))

        # Handle physical activity: if someone inputs > 24 (like minutes), convert to hours
        activity_val = float(req.physical_activity)
        if activity_val > 24:
            activity_val = activity_val / 60.0
        activity_val = min(max(activity_val, 0.0), 24.0)

        sleep_val = min(max(float(req.sleep), 0.0), 24.0)
        stress_val = normalize_stress(req.stress)
        gender_val = req.gender.capitalize() if req.gender else "Female"
        academic_val = normalize_academic_level(req.academic_lvl)
        purpose_val = normalize_purpose(req.purpose_of_use)
        country_val = normalize_country(req.country)
        platform_val = req.most_used_platform or "Instagram"

        # Build DataFrame with exact column names expected by the trained pipeline
        input_df = pd.DataFrame(
            [
                {
                    "Study_Hours": study_hours_val,
                    "Age": age_val,
                    "Avg_Daily_Usage_Hours": avg_usage_val,
                    "Daily_Unlocks": unlocks_val,
                    "Physical_Activity_Hours": activity_val,
                    "Sleep_Hours_Per_Night": sleep_val,
                    "Stress_Level": stress_val,
                    "Gender": gender_val,
                    "Academic_Level": academic_val,
                    "Most_Used_Platform": platform_val,
                    "Purpose_Of_Use": purpose_val,
                    "grp_country": country_val,
                }
            ]
        )

        raw_pred = model.predict(input_df)
        score = float(raw_pred[0])
        # Clip to realistic bounds [0.0, 10.0]
        score = round(max(0.0, min(10.0, score)), 2)

        category = get_category_label(score)
        message = get_feedback_message(score)

        return PredictionResponse(
            score=score,
            category=category,
            message=message,
            details={
                "normalized_inputs": {
                    "age": age_val,
                    "gender": gender_val,
                    "academic_level": academic_val,
                    "country": country_val,
                    "most_used_platform": platform_val,
                    "purpose_of_use": purpose_val,
                    "avg_daily_usage_hours": avg_usage_val,
                    "daily_unlocks": unlocks_val,
                    "study_hours": study_hours_val,
                    "physical_activity_hours": activity_val,
                    "sleep_hours": sleep_val,
                    "stress_level": stress_val,
                }
            },
        )

    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"Prediction failed: {str(e)}"
        )


if __name__ == "__main__":
    import uvicorn

    port = int(os.environ.get("PORT", 8000))
    uvicorn.run("main:app", host="0.0.0.0", port=port, reload=False)
