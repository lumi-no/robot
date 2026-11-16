
import React, { useEffect, useState } from "react";

const API_URL =
  "https://api.open-meteo.com/v1/forecast" +
  "?latitude=50.45" +
  "&longitude=30.52" +
  "&current=temperature_2m,wind_speed_10m,precipitation" +
  "&timezone=Europe%2FKyiv";

function WeatherPanel() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function loadWeather() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(API_URL, {
          signal: controller.signal
        });

        if (!response.ok) {
          throw new Error("Помилка отримання даних");
        }

        const data = await response.json();

        if (!data.current) {
          throw new Error("API не повернув погодні дані");
        }

        setWeather(data.current);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadWeather();

    return () => controller.abort();
  }, []);

  if (loading) {
    return <p>Завантаження даних API...</p>;
  }

  if (error) {
    return (
      <div className="alert">
        Не вдалося завантажити дані: {error}
      </div>
    );
  }

  return (
    <div className="weather-grid">
      <div className="weather-card">
        <div className="weather-icon">🌡️</div>
        <h3>Температура</h3>
        <strong>{weather.temperature_2m} °C</strong>
      </div>

      <div className="weather-card">
        <div className="weather-icon">💨</div>
        <h3>Швидкість вітру</h3>
        <strong>{weather.wind_speed_10m} км/год</strong>
      </div>

      <div className="weather-card">
        <div className="weather-icon">🌧️</div>
        <h3>Опади</h3>
        <strong>{weather.precipitation} мм</strong>
      </div>
    </div>
  );
}

export default WeatherPanel;
