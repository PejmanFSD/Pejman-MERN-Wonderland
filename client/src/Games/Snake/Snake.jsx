import { useEffect, useState } from "react";
import ReviewSection from "../../Components/ReviewSection";
import ModeExplaination from "../ModeExplaination";
import ConfirmationBox from "../ConfirmationBox";

const gridSize = 20;

export default function Snake({ updateTotalPoint, currentUser }) {
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [easyMode, setEasyMode] = useState(false);
  const [normalMode, setNormalMode] = useState(false);
  // The snake is an array of grids (an array of objects). At first
  // it's only one grid that is located in the { x: 0, y: 0 } location:
  const [snake, setSnake] = useState([{ x: 0, y: 0 }]);
  // The moment the game starts, the snake doesn't move:
  const [direction, setDirection] = useState({ x: 0, y: 0 });
  // Even the initial location of the food is a random location:
  const [food, setFood] = useState(generateFood());
  const [delay, setDelay] = useState(145);
  const [userPoint, setUserPoint] = useState(0);
  const [finalMessage, setFinalMessage] = useState("");
  const [isTogglingReset, setIsTogglingReset] = useState(false);

  const handleEasyMode = () => {
    setEasyMode(true);
    setNormalMode(false);
  };
  const handleNormalMode = () => {
    setNormalMode(true);
    setEasyMode(false);
  };
  const handleStart = () => {
    setIsGameStarted(true);
  };
  const handlePlayAgain = () => {
    setIsGameStarted(true);
    setSnake([{ x: 0, y: 0 }]);
    setDirection({ x: 0, y: 0 });
    setFood(generateFood());
    setDelay(145);
    setUserPoint(0);
    setFinalMessage("");
    setIsTogglingReset(false);
    //   setIsTogglingLevel(false);
    //   setIsTogglingHomePage(false);
  };
  const toggleReset = () => {
    setDirection({ x: 0, y: 0 });
    setIsTogglingReset(true);
  };
  const toggleResetYes = () => {
    setIsGameStarted(false);
    setIsTogglingReset(false);
    handlePlayAgain();
  };
  const toggleResetCancel = () => {
    setIsTogglingReset(false);
  };
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
      // setIsGameStarted(false);
      setFinalMessage("You loose!");
      setDirection({ x: 0, y: 0 });
      return;
    }
    // Self collision; if the location of any of the  grids(segments)
    // of the snake is equal to the location of the head, the user looses:
    for (let segment of snake) {
      if (segment.x === newHead.x && segment.y === newHead.y) {
        // setIsGameStarted(false);
        setFinalMessage("You loose!");
        setDirection({ x: 0, y: 0 });
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
      if (userPoint < 39) {
        setFood(generateFood());
      }
      setUserPoint((currUserPoint) => currUserPoint + 1);
      if (normalMode) {
        setDelay((currDelay) => currDelay - 3);
      }
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
    if (!isGameStarted) return;
    else {
      const interval = setInterval(() => {
        moveSnake();
      }, delay);
      return () => clearInterval(interval);
    }
  }, [snake, direction, isGameStarted]);
  // Keyboard controls
  useEffect(() => {
    if (finalMessage === "") {
      const handleKeyDown = (e) => {
        if (e.key === "ArrowUp") {
          if (isTogglingReset) {
            setDirection({ x: 0, y: 0 });
          } else {
            if (direction.y === 1) return; // Don't kill the snake if it shifts to the opposite direction
            setDirection({ x: 0, y: -1 });
          }
        } else if (e.key === "ArrowDown") {
          if (isTogglingReset) {
            setDirection({ x: 0, y: 0 });
          } else {
            if (direction.y === -1) return; // Don't kill the snake if it shifts to the opposite direction
            setDirection({ x: 0, y: 1 });
          }
        } else if (e.key === "ArrowLeft") {
          if (isTogglingReset) {
            setDirection({ x: 0, y: 0 });
          } else {
            if (direction.x === 1) return; // Don't kill the snake if it shifts to the opposite direction
            setDirection({ x: -1, y: 0 });
          }
        } else if (e.key === "ArrowRight") {
          if (isTogglingReset) {
            setDirection({ x: 0, y: 0 });
          } else {
            if (direction.x === -1) return; // Don't kill the snake if it shifts to the opposite direction
            setDirection({ x: 1, y: 0 });
          }
        }
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [direction]);
  // The winning condition:
  useEffect(() => {
    if (userPoint === 40) {
      if (easyMode) {
        setDirection({ x: 0, y: 0 });
        setFinalMessage("You Win, but you don't get any stars!");
      } else if (normalMode) {
        setDirection({ x: 0, y: 0 });
        setFinalMessage("You Win!");
      }
    }
  }, [userPoint]);
  // Creating the board:
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
            background:
              isSnake && finalMessage === "You loose!"
                ? "gray"
                : isSnake && finalMessage === ""
                  ? "lime"
                  : isSnake && finalMessage === "You Win!"
                    ? "Yellow"
                    : isSnake &&
                        finalMessage === "You Win, but you don't get any stars!"
                      ? "Yellow"
                      : isFood
                        ? "red"
                        : "#1e1e1e",
          }}
        />,
      );
    }
  }
  return (
    <div>
      <h2>Snake</h2>
      {easyMode && !normalMode
        ? !isTogglingReset && (
            //   !isTogglingLevel &&
            //   !isTogglingHomePage
            <ModeExplaination message="Easy Mode: The snake's speed doesn't increase, you won't get any stars if you win." />
          )
        : !easyMode &&
          normalMode &&
          !isTogglingReset && (
            // !isTogglingLevel &&
            // !isTogglingHomePage &&
            <ModeExplaination message="Normal Mode: The snake's speed increases after reaching each apple, you get one star if you win." />
          )}
      {!isGameStarted && !easyMode && !normalMode && (
        <div>
          <button onClick={handleEasyMode}>Easy Mode</button>
          <button onClick={handleNormalMode}>Normal Mode</button>
        </div>
      )}
      {!isGameStarted && (easyMode || normalMode) && (
        // !isTogglingLevel &&
        <button onClick={handleStart}>Start the Game</button>
      )}
      {isGameStarted &&
        !isTogglingReset &&
        finalMessage === "" &&
        //   !isTogglingHomePage &&
        //   !isTogglingLevel &&
        (easyMode || normalMode) && (
          <div>
            <button onClick={toggleReset}>Reset the Game</button>
          </div>
        )}
      {isTogglingReset && finalMessage === "" && (
        <div>
          <ConfirmationBox
            question="Are you sure you want to reset the game?"
            toggleYes={toggleResetYes}
            toggleCancel={toggleResetCancel}
          />
        </div>
      )}
      {isGameStarted && (easyMode || normalMode) && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {finalMessage &&
            (finalMessage === "You Win!" ||
              finalMessage === "You Win, but you don't get any stars!") && (
              // !isTogglingHomePage &&
              <div>
                <h3>{finalMessage}</h3>
                <div>Play Again?</div>
                <button onClick={handlePlayAgain}>Ok</button>
              </div>
            )}
          {finalMessage && finalMessage === "You loose!" && (
            // !isTogglingHomePage &&
            <div>
              <h3>{finalMessage}</h3>
              <div>Try Again?</div>
              <button onClick={handlePlayAgain}>Ok</button>
            </div>
          )}
          {/* <div style={{ color: "green" }}>
            <strong>Your Point: {userPoint}</strong>
          </div> */}
          <br />
          <div
            style={{
              display: "flex",
              gap: "4px",
            }}
          >
            {new Array(20)
              .fill(null)
              .map((s, i) =>
                i < userPoint ? <div key={i}>⚫</div> : <div key={i}>⚪</div>,
              )}
          </div>
          <div
            style={{
              display: "flex",
              gap: "4px",
            }}
          >
            {new Array(20)
              .fill(null)
              .map((s, i) =>
                i + 20 < userPoint ? (
                  <div key={i}>⚫</div>
                ) : (
                  <div key={i}>⚪</div>
                ),
              )}
          </div>
          <br />
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
        </div>
      )}
      {/* {isGameStarted && !isTogglingReset && !isTogglingHomePage && <ReviewSection game="Snake" currentUser={currentUser} />} */}
    </div>
  );
}
