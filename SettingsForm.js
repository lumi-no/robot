
import React, { useState } from "react";

function SettingsForm({ settings, onSave }) {
  const [speed, setSpeed] = useState(settings.speed);
  const [obstacleCount, setObstacleCount] = useState(
    settings.obstacleCount
  );
  const [saved, setSaved] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();

    onSave({
      speed: Number(speed),
      obstacleCount: Number(obstacleCount)
    });

    setSaved(true);
  }

  return (
    <form className="settings-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="speed">Швидкість робота</label>

        <select
          id="speed"
          value={speed}
          onChange={(event) => {
            setSpeed(Number(event.target.value));
            setSaved(false);
          }}
        >
          <option value={800}>Повільна</option>
          <option value={400}>Середня</option>
          <option value={150}>Швидка</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="obstacleCount">
          Кількість випадкових перешкод
        </label>

        <input
          type="range"
          id="obstacleCount"
          min="0"
          max="80"
          value={obstacleCount}
          onChange={(event) => {
            setObstacleCount(Number(event.target.value));
            setSaved(false);
          }}
        />

        <p className="range-value">
          {obstacleCount} перешкод
        </p>
      </div>

      <button className="btn btn-primary" type="submit">
        Зберегти налаштування
      </button>

      {saved && (
        <p className="success-message">
          ✅ Налаштування успішно збережено!
        </p>
      )}
    </form>
  );
}

export default SettingsForm;
