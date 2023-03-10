import axios from "axios";
import { group } from "console";
import React, { useState, useRef } from "react";
const API_key = "af7b97960284dd1d6d6a3ec4ae4d502e";

type WindType = {
  deg: string;
  gust: string;
  speed: string;
};
export default function Weather() {
  const [location, setLocation] = useState("");
  const [weatherData, setWeatherData] = useState();
  const changeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(event.target.value);
  };
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

    const { wind }: { wind: WindType } = res.data;
  };
  return (
    <div className="weatherInput">
      <div className="">
        <input
          type="text"
          value={location}
          onChange={changeInput}
          onKeyDown={checked}
          ref={inputRef}
        />
        <button onClick={search}>Click</button>
      </div>
      <div>
        <h3>{}</h3>
      </div>
    </div>
  );
}
