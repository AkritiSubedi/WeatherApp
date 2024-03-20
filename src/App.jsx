import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import "./App.css";
import clear_icon from "/clear.png";
import rain_icon from "/rain.png";
import snow_icon from "/snow.png";
import wind_icon from "/wind.png";
import humidity_icon from "/humidity.png";

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [image, setImage] = useState(null);
  const [containerStyle, setContainerStyle] = useState({});

  const api_key = "290855c78c8a87c74808c28010980ae4";

  const search = async () => {
    const inputField = document.querySelector(".search");
    const city = inputField.value.trim();

    if (city === "") {
      return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${api_key}`;

    const response = await fetch(url);
    if (!response.ok) {
      return;
    }

    const data = await response.json();

    setWeatherData({
      humidity: data.main.humidity + " %",
      windRate: Math.floor(data.wind.speed) + " km/h",
      temperature: Math.floor(data.main.temp) + "°C",
      location: data.name,
    });

    const temp = data.main.temp;
    if (temp >= 22) {
      setImage(clear_icon);
    } else if (temp <= 15 || temp >= 1) {
      setImage(rain_icon);
    } else if (temp <= 7 && temp >= -20) {
      setImage(snow_icon);
    }

    // Adjust container size
    setContainerStyle({ height: "auto" });
  };

  return (
    <div className="maincontainer" style={containerStyle}>
      <div className="secondcontainer">
        <div class="search-box">
          <input className="search" type="text" placeholder="Search" />
          <button className="sicon" onClick={search}>
            <CiSearch />
          </button>
        </div>
        {weatherData && (
          <>
            <div className="">
              <img className="sky" src={image} alt="" />
            </div>
            <div className="text">
              <h>{weatherData.temperature}</h>
              <p className="p">{weatherData.location}</p>
            </div>
            <div className="lcontainer">
              <div className="humidity">
                <img className="icon1" src={humidity_icon} alt="" />
                <div className="ihumidity">
                  <h1 className="humidity-percentage">
                    {weatherData.humidity}
                  </h1>
                  <p className="pa">Humidity</p>
                </div>
              </div>
              <div className="speed">
                <img className="icon1" src={wind_icon} alt="" />
                <div className="ispeed">
                  <h1 className="wind-rate">{weatherData.windRate}</h1>
                  <p className="pa">WindSpeed</p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
