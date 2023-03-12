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
  const [location, setLocation] = useState("");
  const [weatherData, setWeatherData] = useState<WeatherType>();
  const changeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(event.target.value);
  };
  console.log(weatherData);
  const checked = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      search();
    }
  };
  const inputRef = useRef<HTMLInputElement>(null);
  const search = async () => {
    setLocation("");
    inputRef.current?.focus();
    const res = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&lang=vi&appid=${API_key}&units=metric`
    );

    setWeatherData({
      city: res.data.name,
      feels_like: res.data.main.feels_like,
      temp: res.data.main.temp,
      humidity: res.data.main.humidity,
      description: res.data.weather[0].description,
      windSpeed: res.data.wind.speed,
    });
  };
  return (
    <div className="weather_search">
      <div className="weather_search_input">
        <input
          type="text"
          placeholder="Search a city"
          value={location}
          onChange={changeInput}
          onKeyDown={checked}
          ref={inputRef}
        />
      </div>
      <div className="">
        <div className="weather_location">
          <h3>{weatherData?.city}</h3>
        </div>
      </div>
    </div>
  );
}
