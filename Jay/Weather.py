import requests
import os
from dotenv import load_dotenv

load_dotenv()

def get_weather(location):
    if not location:
        return "Please specify a city for the weather."

    api_key = os.getenv("weather_api")
    if not api_key:
        return "Weather API key not found. Please set 'weather_api' in your .env file."

    api_key = api_key.strip()

    try:
        result = requests.get(
            f"http://api.openweathermap.org/data/2.5/weather?q={location}&appid={api_key}&units=metric"
        )
        data = result.json()
    except requests.RequestException:
        return "Failed to fetch weather data. Please try again later."

    if data.get("cod") == "404":
        return f"City '{location}' not found. Please check the location."

    description = data["weather"][0]["description"]
    feels_like = round(data["main"]["feels_like"])
    temp_max = round(data["main"]["temp_max"])
    temp_min = round(data["main"]["temp_min"])
    city = location[0].upper() + location[1:]

    weather_text = (
        f"There is {description} in {city}. "
        f"It feels like {feels_like}°C with a high of {temp_max}°C and a low of {temp_min}°C."
    )

    return weather_text