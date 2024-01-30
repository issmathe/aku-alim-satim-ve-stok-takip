import React, { useState, useEffect } from "react";
import axios from "axios";

const HavaDurumu = () => {
  const [weatherData, setWeatherData] = useState({});
  const apiKey = "2d178176a844e521c5e0288bdeee8618"; // API anahtarınızı buraya ekleyin

  useEffect(() => {
    const fetchData = async () => {
      try {
        navigator.geolocation.getCurrentPosition(async (position) => {
          const { latitude, longitude } = position.coords;
          const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&lang=tr&units=metric&appid=${apiKey}`
          );
          setWeatherData(response.data);
        });
      } catch (error) {
        console.error("Hava durumu bilgisi alınamadı:", error.message);
      }
    };

    fetchData();
  }, [apiKey]);

  // Sıcaklık değerini tam sayıya yuvarla
  const roundedTemperature = weatherData.main ? Math.round(weatherData.main.temp) : null;

  return (
    <div className="hava-durumu">
      {weatherData.main && (
        <div style={{display:"flex"}} >
          <p style={{marginRight:"15px"}}>Hava: {roundedTemperature}°</p>
          <p style={{fontSize:"20px"}}>{weatherData.weather[0].description}</p>
        </div>
      )}
    </div>
  );
};

export default HavaDurumu;
