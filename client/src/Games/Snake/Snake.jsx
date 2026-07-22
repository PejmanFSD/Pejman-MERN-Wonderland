import { useEffect, useState } from "react";
import ReviewSection from "../../Components/ReviewSection";
import ConfirmationBox from "../ConfirmationBox";
import { useNavigate } from "react-router-dom";
import Play from "./Play.png";
import Pause from "./Pause.png";
import AboutSnake from "./AboutSnake";

const gridSize = 20;

export default function Snake({ updateTotalPoint, currentUser }) {
  const [isAboutPage, setIsAboutPage] = useState(false);
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
  const [delay, setDelay] = useState(130);
  const [userPoint, setUserPoint] = useState(0);
  const [finalMessage, setFinalMessage] = useState("");
  const [isTogglingReset, setIsTogglingReset] = useState(false);
  const [isTogglingLevel, setIsTogglingLevel] = useState(false);
  const [isTogglingHomePage, setIsTogglingHomePage] = useState(false);
  const [directions, setDirections] = useState([]);
  const [showReviews, setShowReviews] = useState(true);

  const navigate = useNavigate();
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
    setIsGameStarted(false);
    setSnake([{ x: 0, y: 0 }]);
    setDirection({ x: 0, y: 0 });
    setDirections([]);
    // setDirections((currDirections) => [...currDirections, "None"]);
    setFood(generateFood());
    setDelay(130);
    setUserPoint(0);
    setFinalMessage("");
    setIsTogglingReset(false);
    setIsTogglingLevel(false);
    setIsTogglingHomePage(false);
    setShowReviews(true);
  };
  const toggleReset = () => {
    setDirection({ x: 0, y: 0 });
    setDirections((currDirections) => [...currDirections, "None"]);
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
  const toggleLevel = () => {
    setDirection({ x: 0, y: 0 });
    setDirections((currDirections) => [...currDirections, "None"]);
    setIsTogglingLevel(true);
  };
  const toggleLevelYes = () => {
    if (easyMode) {
      setEasyMode(false);
      setNormalMode(true);
    } else if (normalMode) {
      setNormalMode(false);
      setEasyMode(true);
    }
    handlePlayAgain();
  };
  const toggleLevelCancel = () => {
    setIsTogglingLevel(false);
  };
  const toggleHomePage = () => {
    setDirection({ x: 0, y: 0 });
    setDirections((currDirections) => [...currDirections, "None"]);
    setIsTogglingHomePage(true);
  };
  const toggleHomePageYes = () => {
    navigate("/");
  };
  const toggleHomePageCancel = () => {
    setIsTogglingHomePage(false);
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
      setFinalMessage("You Lose!");
      setDirection({ x: 0, y: 0 });
      setDirections((currDirections) => [...currDirections, "None"]);
      return;
    }
    // Self collision; if the location of any of the  grids(segments)
    // of the snake is equal to the location of the head, the user loses:
    for (let segment of snake) {
      if (segment.x === newHead.x && segment.y === newHead.y) {
        // setIsGameStarted(false);
        setFinalMessage("You Lose!");
        setDirection({ x: 0, y: 0 });
        setDirections((currDirections) => [...currDirections, "None"]);
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
        setDelay((currDelay) => currDelay - 2);
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
  const handleAboutPage = () => {
    setIsAboutPage(true);
  };
  const handleReviewSection = () => {
    setShowReviews((currShowReviews) => !currShowReviews);
  };
  const handleUp = () => {
    if (
      isTogglingReset ||
      isTogglingLevel ||
      isTogglingHomePage ||
      finalMessage !== ""
    ) {
      setDirection({ x: 0, y: 0 });
      setDirections((currDirections) => [...currDirections, "None"]);
    } else {
      if (direction.y === 1) return; // Don't kill the snake if it shifts to the opposite direction
      setDirection({ x: 0, y: -1 });
      setDirections((currDirections) => [...currDirections, "Up"]);
    }
  };
  const handleLeft = () => {
    if (
      isTogglingReset ||
      isTogglingLevel ||
      isTogglingHomePage ||
      finalMessage !== ""
    ) {
      setDirection({ x: 0, y: 0 });
      setDirections((currDirections) => [...currDirections, "None"]);
    } else {
      if (direction.x === 1) return; // Don't kill the snake if it shifts to the opposite direction
      setDirection({ x: -1, y: 0 });
      setDirections((currDirections) => [...currDirections, "Left"]);
    }
  };
  const handleRight = () => {
    if (
      isTogglingReset ||
      isTogglingLevel ||
      isTogglingHomePage ||
      finalMessage !== ""
    ) {
      setDirection({ x: 0, y: 0 });
      setDirections((currDirections) => [...currDirections, "None"]);
    } else {
      if (direction.x === -1) return; // Don't kill the snake if it shifts to the opposite direction
      setDirection({ x: 1, y: 0 });
      setDirections((currDirections) => [...currDirections, "Right"]);
    }
  };
  const handleDown = () => {
    if (
      isTogglingReset ||
      isTogglingLevel ||
      isTogglingHomePage ||
      finalMessage !== ""
    ) {
      setDirection({ x: 0, y: 0 });
      setDirections((currDirections) => [...currDirections, "None"]);
    } else {
      if (direction.y === -1) return; // Don't kill the snake if it shifts to the opposite direction
      setDirection({ x: 0, y: 1 });
      setDirections((currDirections) => [...currDirections, "Down"]);
    }
  };
  const handlePause = () => {
    if (directions.length > 0 && directions[directions.length - 1] === "None") {
      for (let i = directions.length - 1; i >= 0; i--) {
        if (directions[i] !== "None") {
          if (directions[i] === "Up") {
            setDirection({ x: 0, y: -1 });
            setDirections((currDirections) => [...currDirections, "Up"]);
            break;
          }
        }

        if (directions[i] !== "None") {
          if (directions[i] === "Down") {
            setDirection({ x: 0, y: 1 });
            setDirections((currDirections) => [...currDirections, "Down"]);
            break;
          }
        }

        if (directions[i] !== "None") {
          if (directions[i] === "Left") {
            setDirection({ x: -1, y: 0 });
            setDirections((currDirections) => [...currDirections, "Left"]);
            break;
          }
        }

        if (directions[i] !== "None") {
          if (directions[i] === "Right") {
            setDirection({ x: 1, y: 0 });
            setDirections((currDirections) => [...currDirections, "Right"]);
            break;
          }
        }
      }
    } else {
      setDirection({ x: 0, y: 0 });
      setDirections((currDirections) => [...currDirections, "None"]);
    }
  };
  // Game loop:
  useEffect(() => {
    if (!isGameStarted) return;
    else if (direction === { x: 0, y: 0 }) {
      return;
    } else {
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
        if (
          directions.length > 0 &&
          directions[directions.length - 1] === "None"
        ) {
          if (e.key === " ") {
            e.preventDefault();
            for (let i = directions.length - 1; i >= 0; i--) {
              if (isGameStarted && directions[i] !== "None") {
                if (directions[i] === "Up") {
                  e.preventDefault();
                  setDirection({ x: 0, y: -1 });
                  setDirections((currDirections) => [...currDirections, "Up"]);
                  break;
                }
              }

              if (directions[i] !== "None") {
                if (directions[i] === "Down") {
                  e.preventDefault();
                  setDirection({ x: 0, y: 1 });
                  setDirections((currDirections) => [
                    ...currDirections,
                    "Down",
                  ]);
                  break;
                }
              }

              if (directions[i] !== "None") {
                if (directions[i] === "Left") {
                  setDirection({ x: -1, y: 0 });
                  setDirections((currDirections) => [
                    ...currDirections,
                    "Left",
                  ]);
                  break;
                }
              }

              if (directions[i] !== "None") {
                if (directions[i] === "Right") {
                  setDirection({ x: 1, y: 0 });
                  setDirections((currDirections) => [
                    ...currDirections,
                    "Right",
                  ]);
                  break;
                }
              }
            }
          } else {
            return;
          }
        } else {
          if (e.key === " ") {
            e.preventDefault();
            if (directions.length === 0) {
              setFinalMessage("You Lose!");
            }
            setDirection({ x: 0, y: 0 });
            setDirections((currDirections) => [...currDirections, "None"]);
          } else if (e.key === "ArrowUp" && isGameStarted) {
            if (isTogglingReset || isTogglingLevel || isTogglingHomePage) {
              e.preventDefault();
              setDirection({ x: 0, y: 0 });
              setDirections((currDirections) => [...currDirections, "None"]);
            } else {
              e.preventDefault();
              if (direction.y === 1) return; // Don't kill the snake if it shifts to the opposite direction
              setDirection({ x: 0, y: -1 });
              setDirections((currDirections) => [...currDirections, "Up"]);
            }
          } else if (e.key === "ArrowDown") {
            if (isTogglingReset || isTogglingLevel || isTogglingHomePage) {
              e.preventDefault();
              setDirection({ x: 0, y: 0 });
              setDirections((currDirections) => [...currDirections, "None"]);
            } else {
              e.preventDefault();
              if (direction.y === -1) return; // Don't kill the snake if it shifts to the opposite direction
              setDirection({ x: 0, y: 1 });
              setDirections((currDirections) => [...currDirections, "Down"]);
            }
          } else if (e.key === "ArrowLeft") {
            if (isTogglingReset || isTogglingLevel || isTogglingHomePage) {
              setDirection({ x: 0, y: 0 });
              setDirections((currDirections) => [...currDirections, "None"]);
            } else {
              if (direction.x === 1) return; // Don't kill the snake if it shifts to the opposite direction
              setDirection({ x: -1, y: 0 });
              setDirections((currDirections) => [...currDirections, "Left"]);
            }
          } else if (e.key === "ArrowRight") {
            if (isTogglingReset || isTogglingLevel || isTogglingHomePage) {
              setDirection({ x: 0, y: 0 });
              setDirections((currDirections) => [...currDirections, "None"]);
            } else {
              if (direction.x === -1) return; // Don't kill the snake if it shifts to the opposite direction
              setDirection({ x: 1, y: 0 });
              setDirections((currDirections) => [...currDirections, "Right"]);
            }
          }
        }
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [direction, finalMessage]);
  // The winning condition:
  useEffect(() => {
    if (userPoint === 40) {
      if (easyMode) {
        setFinalMessage("You Win!");
        setDirection({ x: 0, y: 0 });
        setDirections((currDirections) => [...currDirections, "None"]);
        updateTotalPoint(3);
      } else if (normalMode) {
        setFinalMessage("You Win!");
        setDirection({ x: 0, y: 0 });
        setDirections((currDirections) => [...currDirections, "None"]);
        updateTotalPoint(12);
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
            width: "15px",
            height: "15px",
            background:
              isSnake && finalMessage === "You Lose!"
                ? "gray"
                : isSnake && finalMessage === ""
                  ? "lime"
                  : isSnake && finalMessage === "You Win!"
                    ? "Yellow"
                      : isFood
                        ? "red"
                        : "#1e1e1e",
          }}
        />,
      );
    }
  }
  useEffect(() => {
    document.title = "Snake";
  }, []);
  return (
    <div>
      {isAboutPage && <AboutSnake setIsAboutPage={setIsAboutPage} />}
      {!isAboutPage && (
        <div>
          <h2 className="fasterOne" style={{ fontSize: "45px" }}>
            Snake
          </h2>
          <div className="container">
            <div className="row">
              <div className="col-lg-3 align-self-center">
                {!isTogglingHomePage &&
                  !isTogglingLevel &&
                  !isTogglingReset && (
                    <button
                      className="btn3 my-1"
                      style={{ width: "200px" }}
                      onClick={handleAboutPage}
                      disabled={
                        direction.x === 0 && direction.y === 0 && isGameStarted
                      }
                    >
                      About Snake
                    </button>
                  )}
              </div>
              <div className="col-lg-3 align-self-center">
                {!isTogglingReset &&
                  !isTogglingHomePage &&
                  !isTogglingLevel && (
                    <button
                      className="btn3 my-1"
                      style={{ width: "200px" }}
                      onClick={() => toggleLevel()}
                      disabled={
                        (!easyMode && !normalMode) ||
                        finalMessage !== "" ||
                        (direction.x === 0 &&
                          direction.y === 0 &&
                          isGameStarted)
                      }
                    >
                      {`${easyMode ? "Switch to Normal Mode" : normalMode ? "Switch to Easy Mode" : "Switch level"}`}
                    </button>
                  )}
              </div>
              <div className="col-lg-3 align-self-center">
                {!isTogglingReset &&
                  !isTogglingHomePage &&
                  !isTogglingLevel && (
                    <button
                      className="btn3 my-1"
                      style={{ width: "200px" }}
                      onClick={toggleReset}
                      disabled={
                        (!easyMode && !normalMode) ||
                        finalMessage !== "" ||
                        (direction.x === 0 &&
                          direction.y === 0 &&
                          isGameStarted)
                      }
                    >
                      Reset the Game
                    </button>
                  )}
              </div>
              <div className="col-lg-3 align-self-center">
                {!isTogglingHomePage &&
                  !isTogglingReset &&
                  !isTogglingLevel && (
                    <button
                      className="btn3 my-1"
                      style={{ width: "200px" }}
                      onClick={() => toggleHomePage()}
                      disabled={
                        direction.x === 0 && direction.y === 0 && isGameStarted
                      }
                    >
                      Back to home page
                    </button>
                  )}
              </div>
            </div>
          </div>

          {isTogglingLevel && finalMessage === "" && (
            <div className="container">
              <div className="row">
                <div className="col-10 offset-1 d-flex justify-content-center">
                  <ConfirmationBox
                    question={`Are you sure you want to switch to ${
                      easyMode ? "Normal Mode" : "Easy Mode"
                    }?`}
                    toggleYes={toggleLevelYes}
                    toggleCancel={toggleLevelCancel}
                    easyMode={easyMode}
                  />
                </div>
              </div>
            </div>
          )}
          {isTogglingReset && finalMessage === "" && (
            <div className="container">
              <div className="row">
                <div className="col-10 offset-1 d-flex justify-content-center">
                  <ConfirmationBox
                    question="Are you sure you want to reset the game?"
                    toggleYes={toggleResetYes}
                    toggleCancel={toggleResetCancel}
                  />
                </div>
              </div>
            </div>
          )}
          {isTogglingHomePage && (
            <div className="container">
              <div className="row">
                <div className="col-10 offset-1 d-flex justify-content-center">
                  <ConfirmationBox
                    question="Are you sure you want to go back to Home Page?"
                    toggleYes={toggleHomePageYes}
                    toggleCancel={toggleHomePageCancel}
                  />
                </div>
              </div>
            </div>
          )}
          {!isGameStarted &&
            !easyMode &&
            !normalMode &&
            !isTogglingHomePage && (
              <div
                className="four-buttons-container"
                style={{ marginTop: "15px" }}
              >
                <button className="btn1" onClick={handleEasyMode}>
                  Easy Mode
                </button>
                <button className="btn1" onClick={handleNormalMode}>
                  Normal Mode
                </button>
              </div>
            )}
          {!isGameStarted &&
            (easyMode || normalMode) &&
            !isTogglingLevel &&
            !isTogglingHomePage &&
            !isTogglingReset && (
              <button
                className="btn1"
                onClick={handleStart}
                style={{ marginTop: "15px" }}
              >
                Start the Game
              </button>
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
                finalMessage === "You Win!" &&
                !isTogglingHomePage && (
                  <div>
                    <div className="container">
                      <div className="row">
                        <div className="col-10 offset-1 d-flex justify-content-center">
                          <h3
                            className="fasterOne"
                            style={{ fontSize: "40px" }}
                          >
                            {finalMessage}
                          </h3>
                        </div>
                      </div>
                    </div>
                    <div>Play Again?</div>
                    <button
                      className="btn2"
                      onClick={handlePlayAgain}
                      style={{ marginTop: "10px" }}
                    >
                      Ok
                    </button>
                  </div>
                )}
              {finalMessage &&
                finalMessage === "You Lose!" &&
                !isTogglingHomePage && (
                  <div>
                    <div className="container">
                      <div className="row">
                        <div className="col-10 offset-1 d-flex justify-content-center">
                          <h3
                            className="fasterOne"
                            style={{ fontSize: "40px" }}
                          >
                            {finalMessage}
                          </h3>
                        </div>
                      </div>
                    </div>
                    <div>Try Again?</div>
                    <button
                      className="btn2"
                      onClick={handlePlayAgain}
                      style={{ marginTop: "10px" }}
                    >
                      Ok
                    </button>
                  </div>
                )}
              <div className="my-2">
                <div
                  style={{
                    display: "flex",
                    gap: "4px",
                  }}
                >
                  {new Array(10)
                    .fill(null)
                    .map((s, i) =>
                      i < userPoint ? (
                        <div key={i}>⚫</div>
                      ) : (
                        <div key={i}>⚪</div>
                      ),
                    )}
                </div>
                <div
                  style={{
                    display: "flex",
                    gap: "4px",
                  }}
                >
                  {new Array(10)
                    .fill(null)
                    .map((s, i) =>
                      i + 10 < userPoint ? (
                        <div key={i}>⚫</div>
                      ) : (
                        <div key={i}>⚪</div>
                      ),
                    )}
                </div>
                <div
                  style={{
                    display: "flex",
                    gap: "4px",
                  }}
                >
                  {new Array(10)
                    .fill(null)
                    .map((s, i) =>
                      i + 20 < userPoint ? (
                        <div key={i}>⚫</div>
                      ) : (
                        <div key={i}>⚪</div>
                      ),
                    )}
                </div>
                <div
                  style={{
                    display: "flex",
                    gap: "4px",
                  }}
                >
                  {new Array(10)
                    .fill(null)
                    .map((s, i) =>
                      i + 30 < userPoint ? (
                        <div key={i}>⚫</div>
                      ) : (
                        <div key={i}>⚪</div>
                      ),
                    )}
                </div>
              </div>
              <div className="container">
                <div className="row">
                  <div className="d-none d-sm-block d-flex justify-content-center">
                    <div className="my-2">
                      <strong>
                        Pause / Resume the game with the "Space" key
                      </strong>
                      <div>
                        {direction.x === 0 && direction.y === 0 ? (
                          <img
                            src={Play}
                            width="40px"
                            style={{ margin: "10px" }}
                            alt=""
                          />
                        ) : (
                          <img
                            src={Pause}
                            width="40px"
                            style={{ margin: "10px" }}
                            alt=""
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(20, 15px)",
                  gridTemplateRows: "repeat(20, 15px)",
                  gap: "1px",
                  background: "#333",
                  padding: "5px",
                }}
              >
                {cells}
              </div>
              <div>
                <button
                  onClick={handleUp}
                  className="btnSnake mt-1"
                  disabled={
                    finalMessage !== "" ||
                    (direction.x === 0 &&
                      direction.y === 0 &&
                      directions.length > 0) ||
                    (direction.x === 0 && direction.y === 1)
                  }
                >
                  &#8593;
                </button>
                <br />
                <button
                  onClick={handleLeft}
                  className="btnSnake"
                  disabled={
                    finalMessage !== "" ||
                    (direction.x === 0 &&
                      direction.y === 0 &&
                      directions.length > 0) ||
                    (direction.x === 1 && direction.y === 0)
                  }
                >
                  &#8592;
                </button>
                <button
                  onClick={handlePause}
                  className="btnSnake"
                  disabled={finalMessage !== "" || directions.length === 0}
                >
                  {direction.x === 0 && direction.y === 0 ? "▶" : "| |"}
                </button>
                <button
                  onClick={handleRight}
                  className="btnSnake"
                  disabled={
                    finalMessage !== "" ||
                    (direction.x === 0 &&
                      direction.y === 0 &&
                      directions.length > 0) ||
                    (direction.x === -1 && direction.y === 0)
                  }
                >
                  &#8594;
                </button>
                <br />
                <button
                  onClick={handleDown}
                  className="btnSnake"
                  disabled={
                    finalMessage !== "" ||
                    (direction.x === 0 &&
                      direction.y === 0 &&
                      directions.length > 0) ||
                    (direction.x === 0 && direction.y === -1)
                  }
                >
                  &#8595;
                </button>
              </div>
            </div>
          )}
          <br />
          {!isTogglingReset &&
            !isTogglingHomePage &&
            !isTogglingLevel &&
            isGameStarted && (
              <button className="btn1" onClick={handleReviewSection}>
                {showReviews
                  ? "Hide the Reviews Section"
                  : "Show the Reviews Section"}
              </button>
            )}
          {isGameStarted &&
            !isTogglingReset &&
            !isTogglingLevel &&
            !isTogglingHomePage &&
            showReviews && (
              <ReviewSection game="Snake" currentUser={currentUser} />
            )}
          <div style={{ marginTop: "50px" }}></div>
        </div>
      )}
    </div>
  );
}
