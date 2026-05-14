import { useEffect, useState } from "react";
import ReviewSection from "../../Components/ReviewSection";

export default function Snake({ updateTotalPoint, currentUser }) {
  // The snake is an array of grids (an array of objects). At first
  // it's only one grid that is located in the { x: 0, y: 0 } location:
  const [snake, setSnake] = useState([{ x: 0, y: 0 }]);
  // The moment the game starts, the snake doesn't move:
  const [direction, setDirection] = useState({ x: 0, y: 0 });
  const [gameOver, setGameOver] = useState(false);

  // Game loop:
  useEffect(() => {
    if (gameOver) return;
    const interval = setInterval(() => {
      moveSnake();
    }, 150);

    return () => clearInterval(interval);
  }, [snake, direction, gameOver]);
  //  Moving the snake:
  const moveSnake = () => {
    // In each moment, one of the parameters of x or y is either
    // 1 or -1, so when both of them are 0, it means that either
    // the game is over or it hasn't started yet:
    if (direction.x === 0 && direction.y === 0) return;
    // The head of the snake is always the first
    // element of the array:
    const head = snake[0];
    // Creating the updated situation of the head of the snake, based on the direction
    // (the direction is defined by the arrow button that's been pressed by the user):
    const newHead = {
      x: head.x + direction.x,
      y: head.y + direction.y,
    };
    // Wall collision:
    if (
      newHead.x < 0 ||
      newHead.y < 0 ||
      newHead.x >= 20 ||
      newHead.y >= 20
    ) {
      setGameOver(true);
      return;
    }
    // If no collisions happen, then add the new head to the snake's array
    // (...snake => de-structured snake):
    const newSnake = [newHead, ...snake];
    // And remove the last element of the array unless the snake gets the food:
    newSnake.pop();
    setSnake(newSnake);
  };
  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowUp") {
        if (direction.y === 1) return; // Don't kill the snake if it shifts to the opposite direction
        setDirection({ x: 0, y: -1 });
      } else if (e.key === "ArrowDown") {
        if (direction.y === -1) return; // Don't kill the snake if it shifts to the opposite direction
        setDirection({ x: 0, y: 1 });
      } else if (e.key === "ArrowLeft") {
        if (direction.x === 1) return; // Don't kill the snake if it shifts to the opposite direction
        setDirection({ x: -1, y: 0 });
      } else if (e.key === "ArrowRight") {
        if (direction.x === -1) return; // Don't kill the snake if it shifts to the opposite direction
        setDirection({ x: 1, y: 0 });
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [direction]);
  const cells = [];
  for (let y = 0; y < 20; y++) {
    for (let x = 0; x < 20; x++) {
      const isSnake = snake.some(
        (segment) => segment.x === x && segment.y === y,
      );
      cells.push(
        <div
          key={`${x}-${y}`}
          style={{ width: "20px", height: "20px", background: isSnake ? "lime" : "#1e1e1e" }}
        />,
      );
    }
  }
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h2>Snake</h2>
      {gameOver && <h4>You loose!</h4>}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(20, 20px)",
          gridTemplateRows: "repeat(20, 20px)",
          gap: "1px",
          background: "#333",
          padding: "5px",
        }}
      >
        {cells}
      </div>
      {/* {isGameStarted && !isTogglingReset && !isTogglingHomePage && <ReviewSection game="Snake" currentUser={currentUser} />} */}
    </div>
  );
}
