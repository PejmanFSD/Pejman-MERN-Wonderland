import { useEffect, useState } from "react";
import ReviewSection from "../../Components/ReviewSection";
const gridSize = 20;
export default function Snake({ updateTotalPoint, currentUser }) {
  // The snake is an array of grids (an array of objects). At first
  // it's only one grid that is located in the { x: 0, y: 0 } location:
  const [snake, setSnake] = useState([{ x: 0, y: 0 }]);
  // The moment the game starts, the snake doesn't move:
  const [direction, setDirection] = useState({ x: 0, y: 0 });
  const [gameOver, setGameOver] = useState(false);
  // Even the initial location of the food is a random location:
  const [food, setFood] = useState(generateFood());

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
      newHead.x >= gridSize ||
      newHead.y >= gridSize
    ) {
      setGameOver(true);
      return;
    }
    // Self collision; if the location of any of the  grids(segments)
    // of the snake is equal to the location of the head, the user looses:
    for (let segment of snake) {
      if (segment.x === newHead.x && segment.y === newHead.y) {
        setGameOver(true);
        return;
      }
    }
    // If no collisions happen, then add the new head to the snake's array
    // (...snake => de-structured snake):
    const newSnake = [newHead, ...snake];
    // And remove the last element of the array unless the snake gets the food:
    // Eat food
    if (newHead.x === food.x && newHead.y === food.y) {
      // If the snake gets the food, don't remove the last element of the array,
      // just generate a new random food:
      setFood(generateFood());
    } else {
      // If the snake doesn't get the food, remove the last element of the array:
      newSnake.pop();
    }
    setSnake(newSnake);
  };
  function generateFood() {
    return {
      x: Math.floor(Math.random() * gridSize),
      y: Math.floor(Math.random() * gridSize),
    };
  }
  // Game loop:
  useEffect(() => {
    if (gameOver) return;
    const interval = setInterval(() => {
      moveSnake();
    }, 150);
    return () => clearInterval(interval);
  }, [snake, direction, gameOver]);
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
  // Game loop:
  useEffect(() => {
    if (gameOver) return;
    const interval = setInterval(() => {
      moveSnake();
    }, 250);
    return () => clearInterval(interval);
  }, [snake, direction, gameOver]);
  const cells = [];
  for (let y = 0; y < gridSize; y++) {
    for (let x = 0; x < gridSize; x++) {
      const isSnake = snake.some(
        (segment) => segment.x === x && segment.y === y,
      );
      const isFood = food.x === x && food.y === y;
      cells.push(
        <div
          key={`${x}-${y}`}
          style={{
            width: "20px",
            height: "20px",
            background: isSnake ? "lime" : isFood ? "red" : "#1e1e1e",
          }}
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
