
import React from "react";
import { ROWS, COLS, FINISH } from "../utils/pathfinding";

function RobotGrid({
  robotPosition,
  obstacles,
  path,
  onCellClick
}) {
  const totalCells = ROWS * COLS;
  const obstacleSet = new Set(obstacles);
  const pathSet = new Set(path);

  return (
    <div className="grid-wrapper">
      <div
        className="robot-grid"
        style={{
          gridTemplateColumns: `repeat(${COLS}, 1fr)`
        }}
      >
        {Array.from({ length: totalCells }, (_, index) => {
          let className = "cell";
          let content = "";

          if (obstacleSet.has(index)) {
            className += " obstacle";
          } else if (index === robotPosition) {
            className += " robot";
            content = "🤖";
          } else if (index === FINISH) {
            className += " finish";
            content = "🏁";
          } else if (pathSet.has(index)) {
            className += " path";
            content = "•";
          }

          return (
            <button
              key={index}
              type="button"
              className={className}
              onClick={() => onCellClick(index)}
              aria-label={`Клітинка ${index + 1}`}
              title={`Клітинка ${index + 1}`}
            >
              {content}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default RobotGrid;
