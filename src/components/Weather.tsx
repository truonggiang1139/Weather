import axios from "axios";
import React, { useState, useRef } from "react";
const API_key = "af7b97960284dd1d6d6a3ec4ae4d502e";

type WeatherType = {
  city: string;
  feels_like: string;
  temp: string;
  humidity: string;
  description: string;
  windSpeed: string;
};
export default function Weather() {
  const [weatherData, setWeatherData] = useState<WeatherType>();
  const inputRef = useRef<HTMLInputElement>(null);
  const checked = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      search();
    }
  };
  const search = async () => {
    if (inputRef.current){
      inputRef.current.focus();
      let tempCity=inputRef.current.value;
      inputRef.current.value="";
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${tempCity}&lang=vi&appid=${API_key}&units=metric`
      );
      setWeatherData({
        city: res.data.name,
        feels_like: res.data.main.feels_like,
        temp: res.data.main.temp,
        humidity: res.data.main.humidity,
        description: res.data.weather[0].description,
        windSpeed: res.data.wind.speed,
      });
      
    }
  };
  return (
    <div className="weather_search">
      <div className="weather_search_input">
        <input
          type="text"
          placeholder="Mời nhập địa điểm"
          onKeyDown={checked}
          ref={inputRef}
        />
      </div>
      <div className="main">
        <div className="weather_location">
          <h3>{weatherData?.city?`${weatherData?.city}`:''}</h3>
        </div>
        <div className="weather_des">
          <p>{weatherData?.description?`${weatherData?.description}`:''}</p>
        </div>
        <div className="weather_temp">
          <h1>{weatherData?.temp?`${weatherData?.temp}°C`:''}</h1>
        </div>
      </div>
      {weatherData && 
      <div className="footer">
        <div className="weather_feels_like">
          <p>Cảm giác như</p>
          <p>{weatherData?.feels_like?`${weatherData?.feels_like}°C`:''}</p>
        </div>
        <div className="weather_humility">
          <p>Độ ẩm không khí</p>
          <p>{weatherData?.humidity?`${weatherData?.humidity}%`:''}</p>
        </div>
        <div className="weather_wind">
          <p>Tốc độ gió</p>
          <p>{weatherData?.windSpeed?`${weatherData?.windSpeed}m/s`:''}</p>
        </div>
      </div>}
    </div>
  );
}
