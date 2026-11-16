
import React, { useEffect, useMemo, useState } from "react";
import RobotGrid from "../components/RobotGrid";

import {
  START,
  FINISH,
  findPath,
  generateObstacles
} from "../utils/pathfinding";

function Simulator({ settings }) {
  const [robotPosition, setRobotPosition] = useState(START);
  const [obstacles, setObstacles] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [steps, setSteps] = useState(0);

  // Маршрут обчислюється від поточної позиції робота
  const path = useMemo(() => {
    return findPath(robotPosition, FINISH, obstacles);
  }, [robotPosition, obstacles]);

  const isFinished = robotPosition === FINISH;
  const isBlocked = path.length === 0 && !isFinished;

  // Анімація руху робота
  useEffect(() => {
    if (!isRunning || isFinished || isBlocked) {
      return;
    }

    const timer = setTimeout(() => {
      const nextCell = path[1];

      if (nextCell !== undefined) {
        setRobotPosition(nextCell);
        setSteps((previous) => previous + 1);
      }
    }, settings.speed);

    return () => clearTimeout(timer);
  }, [
    isRunning,
    isFinished,
    isBlocked,
    path,
    settings.speed
  ]);

  // Зупинка при досягненні фінішу або блокуванні шляху
  useEffect(() => {
    if (isFinished || isBlocked) {
      setIsRunning(false);
    }
  }, [isFinished, isBlocked]);

  // Додавання або видалення перешкоди
  function handleCellClick(index) {
    if (index === robotPosition || index === FINISH) {
      return;
    }

    setObstacles((previous) => {
      if (previous.includes(index)) {
        return previous.filter((cell) => cell !== index);
      }

      return [...previous, index];
    });
  }

  // Старт або пауза
  function toggleRunning() {
    if (isFinished || isBlocked) {
      return;
    }

    setIsRunning((previous) => !previous);
  }

  // Повне скидання симуляції
  function resetSimulation() {
    setIsRunning(false);
    setRobotPosition(START);
    setObstacles([]);
    setSteps(0);
  }

  // Створення випадкових перешкод
  function randomizeObstacles() {
    setIsRunning(false);
    setRobotPosition(START);
    setSteps(0);

    const newObstacles = generateObstacles(
      settings.obstacleCount
    );

    setObstacles(newObstacles);
  }

  // Визначення статусу робота
  let status = "Готовий до запуску";

  if (isRunning) {
    status = "Робот рухається";
  } else if (isFinished) {
    status = "Ціль досягнуто!";
  } else if (isBlocked) {
    status = "Маршрут заблоковано";
  } else if (steps > 0) {
    status = "Рух призупинено";
  }

  return (
    <div className="page">
      <div className="page-heading">
        <h1>🤖 Симулятор руху робота</h1>
        <p>
          Натискайте на клітинки, щоб створювати
          або прибирати перешкоди.
        </p>
      </div>

      <div className="simulator-layout">
        <section className="panel grid-panel">
          <div className="panel-title">
            <h2>Карта середовища</h2>
            <span className="status-badge">{status}</span>
          </div>

          <RobotGrid
            robotPosition={robotPosition}
            obstacles={obstacles}
            path={path}
            onCellClick={handleCellClick}
          />

          <div className="legend">
            <span>🤖 Робот</span>
            <span>🏁 Фініш</span>
            <span>🟦 Маршрут</span>
            <span>⬛ Перешкода</span>
          </div>
        </section>

        <aside className="panel control-panel">
          <h2>Панель керування</h2>

          <div className="control-buttons">
            <button
              className="btn btn-primary"
              onClick={toggleRunning}
              disabled={isFinished || isBlocked}
            >
              {isRunning ? "⏸ Пауза" : "▶ Старт"}
            </button>

            <button
              className="btn btn-secondary"
              onClick={randomizeObstacles}
            >
              🎲 Випадкові перешкоди
            </button>

            <button
              className="btn btn-outline"
              onClick={resetSimulation}
            >
              🔄 Скинути все
            </button>
          </div>

          <div className="statistics">
            <h3>Статистика руху</h3>

            <div className="stat-row">
              <span>Пройдено кроків:</span>
              <strong>{steps}</strong>
            </div>

            <div className="stat-row">
              <span>Залишилось кроків:</span>
              <strong>
                {isBlocked ? "—" : Math.max(0, path.length - 1)}
              </strong>
            </div>

            <div className="stat-row">
              <span>Кількість перешкод:</span>
              <strong>{obstacles.length}</strong>
            </div>

            <div className="stat-row">
              <span>Швидкість:</span>
              <strong>{settings.speed} мс/крок</strong>
            </div>
          </div>

          <div className="info-box">
            {isFinished
              ? "✅ Робот успішно досягнув цілі!"
              : isBlocked
                ? "⚠️ Шлях відсутній. Приберіть перешкоди."
                : "💡 Змінюйте перешкоди навіть під час руху — робот знайде новий маршрут."}
          </div>
        </aside>
      </div>
    </div>
  );
}

export default Simulator;
