import React, { useEffect, useState } from "react";
import "./weather.css";

// Import icons
import clear_icon from "../assets/clear.png";
import cloud_icon from "../assets/cloud.png";
import drizzle_icon from "../assets/drizzle.png";
import humidity_icon from "../assets/humidity.png";
import rain_icon from "../assets/rain.png";
import search_icon from "../assets/search.png";
import snow_icon from "../assets/snow.png";
import wind_icon from "../assets/wind.png";

const Weather = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [icon, setIcon] = useState(clear_icon);

  const api_key = `${import.meta.env.VITE_API_KEY}`; // Replace with your API key

  const weatherIcons = {
    "01d": clear_icon,
    "01n": clear_icon,
    "02d": cloud_icon,
    "02n": cloud_icon,
    "03d": drizzle_icon,
    "03n": drizzle_icon,
    "04d": drizzle_icon,
    "04n": drizzle_icon,
    "09d": rain_icon,
    "09n": rain_icon,
    "10d": rain_icon,
    "10n": rain_icon,
    "11d": rain_icon,
    "11n": rain_icon,
    "13d": snow_icon,
    "13n": snow_icon,
    "50d": cloud_icon,
    "50n": cloud_icon,
  };

  const handleSearch = async () => {
    if (!city) {
      alert("Enter city name");
      return;
    }
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${api_key}`;
      const res = await fetch(url);
      const data = await res.json();
      console.log(data);

      if (data.cod === "404") {
        alert("City not found");
        setWeatherData(null);
        return;
      }
      setWeatherData(data);

      // Set weather icon
      const iconCode = data.weather[0].icon;
      setIcon(weatherIcons[iconCode] || clear_icon);
    } catch (err) {
      alert("Error fetching weather data");
    }
  };

  return (
    <div className="weather">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        <img
          src={search_icon}
          alt="search"
          onClick={handleSearch}
          style={{ cursor: "pointer" }}
        />
      </div>
      {weatherData && (
        <>
          <img src={icon} alt="weather icon" className="weather-icon" />
          <p className="temperature">{Math.round(weatherData.main.temp)}°C</p>
          <p className="city">{weatherData.name}</p>
          <div className="details">
            <div className="col">
              <img src={humidity_icon} alt="humidity" />
              <div>
                <p>{weatherData.main.humidity}%</p>
                <p>Humidity</p>
              </div>
            </div>
            <div className="col">
              <img src={wind_icon} alt="wind" />
              <div>
                <p>{Math.round(weatherData.wind.speed)} km/h</p>
                <p>Wind Speed</p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Weather;
