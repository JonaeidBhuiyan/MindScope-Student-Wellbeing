import pandas as pd
from fastapi import FastAPI
import joblib
from pydantic import BaseModel,Field
from pathlib import Path
from typing import Literal
from fastapi.middleware.cors import CORSMiddleware

BASE_DIR = Path(__file__).resolve().parent

model_path = BASE_DIR / "Mental_Health_model.pkl"

model = joblib.load(model_path)


app = FastAPI()



app.add_middleware(
CORSMiddleware,
allow_origins=["*"],
allow_methods=["*"],
allow_headers=["*"],
)






top_countries =['Other','India','USA','Canada','Australia','UK','Germany','Mexico','Turkey','France']

class StudentData(BaseModel):
    Age: int = Field(..., gt=0, description="Enter you age")
    Gender: Literal['Male','Female']
    Country: str
    Academic_Level: Literal['Undergraduate', 'Graduate', 'High School']
    Most_Used_Platform: Literal['Facebook', 'LinkedIn', 'Instagram', 'Snapchat', 'Twitter','YouTube', 'TikTok', 'LINE', 'KakaoTalk', 'VKontakte', 'WhatsApp','WeChat']
    Purpose_Of_Use: Literal['Networking', 'Education', 'Entertainment', 'News']
    Avg_Daily_Usage_Hours: float = Field(..., ge=0, description="Enter your daily usage hours")
    Daily_Unlocks: int = Field(..., ge=0, description="Enter your study hours")
    Study_Hours: float = Field(..., ge=0, description="Enter your Physical Activity Hours")
    Physical_Activity_Hours: float = Field(..., ge=0, description="Enter your physical activity hours")
    Sleep_Hours_Per_Night: float = Field(..., ge=0, le=24, description="Enter Sleep Hours Per Night")
    Stress_Level: Literal['Medium', 'Low', 'Very High', 'High']



class PredictionResponse(BaseModel):
    predicted_mental_health_score:float





@app.get("/")
def home():
    return {
        "message": "Student Mental Health Prediction API is running!"
    }






@app.post('/predict' , response_model=PredictionResponse)
def predict(data : StudentData):
    country_group = data.Country if data.Country in  top_countries else 'Other'
    input_row = pd.DataFrame([{
        'Age'                         : data.Age,
        'Gender'                      : data.Gender,
        'Country'                     : data.Country,
        'Academic_Level'              : data.Academic_Level,
        'Most_Used_Platform'          : data.Most_Used_Platform,
        'Purpose_Of_Use'              : data.Purpose_Of_Use,
        'Avg_Daily_Usage_Hours'       : data.Avg_Daily_Usage_Hours,
        'Daily_Unlocks'               : data.Daily_Unlocks,
        'Study_Hours'                 : data.Study_Hours,
        'Physical_Activity_Hours'     : data.Physical_Activity_Hours,
        'Sleep_Hours_Per_Night'       : data.Sleep_Hours_Per_Night,
        'Stress_Level'                : data.Stress_Level,
        'group_countries'             : country_group
    }])
    
    prediction = model.predict(input_row)[0]
    
    
    return PredictionResponse(predicted_mental_health_score=round(float(prediction),2))









































