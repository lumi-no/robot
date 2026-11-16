
import React from "react";
import WeatherPanel from "../components/WeatherPanel";

function DataPage() {
  return (
    <div className="page">
      <div className="page-heading">
        <h1>🌤️ Дані зовнішнього API</h1>
        <p>
          Поточні погодні показники для Києва
          за інформацією Open-Meteo.
        </p>
      </div>

      <section className="panel">
        <h2>Погодні умови середовища</h2>

        <WeatherPanel />

        <p className="api-note">
          Дані завантажуються за допомогою Fetch API.
          У цьому навчальному застосунку погода
          відображається для ознайомлення й не впливає
          на алгоритм маршрутизації.
        </p>
      </section>
    </div>
  );
}

export default DataPage;
