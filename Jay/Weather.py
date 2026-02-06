import requests
import os
from dotenv import load_dotenv

load_dotenv()

def get_weather(location):
    if not location:
        return "Please specify a city for the weather."

    api_key = os.getenv("weather_api").strip()
    result = requests.get(f"http://api.openweathermap.org/data/2.5/weather?q={location}&appid={api_key}&units=metric")
    
    data = result.json()
    
    if data.get("cod") == "404":
        return {"error": "City not found. Please check the location."}
    
    weather_info = {
        "description": data["weather"][0]["description"].capitalize(),
        "feels_like": round(data["main"]["feels_like"]),
        "high": round(data["main"]["temp_max"]),
        "low": round(data["main"]["temp_min"]),
        "location": location.capitalize()
    }
    
    return weather_info
