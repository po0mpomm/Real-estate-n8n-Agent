from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import joblib
import pandas as pd
import json

app = FastAPI(title="Dwello.AI House Price Prediction API")

# Load Model
try:
    model = joblib.load('bengaluru_price_model.joblib')
except Exception as e:
    model = None
    print(f"Warning: Could not load model. Error: {e}")

# Define request schema matching the frontend payload
class PredictionRequest(BaseModel):
    totalSqft: float
    bathrooms: int
    bhk: int
    location: str

@app.get("/")
async def root():
    return {
        "message": "Welcome to the Dwello.AI Machine Learning API!",
        "endpoints": {
            "/predict": "POST - Submit JSON with totalSqft, bathrooms, bhk, and location",
            "/docs": "GET - View Interactive Swagger Documentation",
            "/health": "GET - Check API and Model Status"
        }
    }

@app.post("/predict")
async def predict_price(request: PredictionRequest):
    if not model:
        raise HTTPException(status_code=500, detail="Machine Learning model is not loaded.")

    try:
        # The original model pipeline expects these exact feature names: 
        # ["total_sqft_num", "bath", "bhk", "location_bucket"]
        
        # We process 'location' exactly how it was done in training
        # Basically, the model used a location_bucket which had an 'other' class for rare locations
        # If the incoming location isn't recognized, the pipeline's OneHotEncoder (with handle_unknown='ignore') handles it nicely. 

        input_data = pd.DataFrame([{
            "total_sqft_num": request.totalSqft,
            "bath": request.bathrooms,
            "BHK": request.bhk,
            "location_bucket": request.location
        }])

        prediction = model.predict(input_data)
        
        # The model returns price in Lakhs
        predicted_price_lakhs = float(prediction[0])

        return {
            "success": True,
            "predicted_price_lakhs": round(predicted_price_lakhs, 2),
            "input": request.dict()
        }

    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.get("/health")
async def health_check():
    return {"status": "healthy", "model_loaded": model is not None}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("api:app", host="127.0.0.1", port=8000, reload=True) 
